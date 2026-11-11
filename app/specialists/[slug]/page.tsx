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
    title: `${doc.name}, ${doc.specialty}`,
    description: `${doc.name} (${doc.roles[0]}) at Gastro Plus Medical Complex Multan. ${doc.bio[0].slice(0, 110)}…`,
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
        eyebrow={doc.specialty}
        title={doc.name}
        description={doc.roles.join(" · ")}
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
            <div className="profile-role">
              {doc.title && <span className="pill">{doc.title}</span>}
              {doc.roles.map((r) => (
                <span key={r} className="pill">
                  {r}
                </span>
              ))}
            </div>
            {doc.bio.map((p) => (
              <p key={p.slice(0, 30)} style={{ fontSize: "1.05rem" }}>
                {p}
              </p>
            ))}
            {doc.qualifications && (
              <>
                <h3>Qualifications</h3>
                <ul className="card__points">
                  {doc.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </>
            )}
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
