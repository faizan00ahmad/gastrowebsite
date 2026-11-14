import { notFound } from "next/navigation";
import { CtaBanner, PageHero, Section, BookingButtons } from "@/components/primitives";
import { JsonLd } from "@/components/json-ld";
import { SmartImage } from "@/components/smart-image";
import { buildMetadata, physicianJsonLd } from "@/lib/seo";
import { specialists } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function findSpecialist(slug: string) {
  return specialists.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = findSpecialist(slug);
  if (!doc) return {};
  return buildMetadata({
    title: `${doc.name}, ${doc.roles.join(" & ")} in Multan`,
    description: [
      doc.qualifications?.length ? `${doc.name} (${doc.qualifications.join(", ")})` : doc.name,
      doc.title,
      doc.roles.join(", "),
      doc.positions.map((p) => `${p.role}, ${p.place}`).join("; "),
    ]
      .filter(Boolean)
      .join(". ") + ".",
    path: `/specialists/${doc.slug}/`,
  });
}

export default async function SpecialistPage({ params }: Props) {
  const { slug } = await params;
  const doc = findSpecialist(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        eyebrow={doc.title ?? doc.specialty}
        title={doc.name}
        description={[doc.roles.join(" | "), (doc.qualifications ?? []).join(", ")].filter(Boolean).join(" · ")}
        crumbs={[
          { name: "Our Specialists", path: "/specialists/" },
          { name: doc.name, path: `/specialists/${doc.slug}/` },
        ]}
      />
      <Section>
        <div className="glass profile-card">
          <div className="portrait">
            <SmartImage src={`/images/${doc.slug}.jpg`} alt={doc.name} eager />
          </div>
          <div className="stack">
            <div>
              <p className="doc-roles">{doc.roles.join(" | ")}</p>
              <div className="profile-role">
                {doc.title && <span className="pill">{doc.title}</span>}
                {doc.qualifications?.map((q) => (
                  <span key={q} className="pill">
                    {q}
                  </span>
                ))}
              </div>
            </div>

            <section>
              <h2 className="doc-subhead">Current Positions</h2>
              <ul className="positions">
                {doc.positions.map((p) => (
                  <li key={p.role + p.place}>
                    <strong>{p.role}</strong>
                    <span>{p.place}</span>
                  </li>
                ))}
              </ul>
            </section>

            {doc.qualifications && (
              <section>
                <h2 className="doc-subhead">Qualifications</h2>
                <ul className="card__points">
                  {doc.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2 className="doc-subhead">
                {doc.positions.some((p) => p.role === "Chief Executive Officer") ? "Message from the CEO" : "About"}
              </h2>
              {doc.bio.map((p) => (
                <p key={p.slice(0, 30)} style={{ fontSize: "1.05rem" }}>
                  {p}
                </p>
              ))}
            </section>
            {doc.experience && (
              <p>
                <strong>Experience:</strong> {doc.experience}
              </p>
            )}
            <BookingButtons />
          </div>
        </div>
      </Section>
      <CtaBanner />
      <JsonLd data={physicianJsonLd(doc)} />
    </>
  );
}
