import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section, BookingButtons } from "@/components/primitives";
import { JsonLd } from "@/components/json-ld";
import { SmartImage } from "@/components/smart-image";
import { buildMetadata, physicianJsonLd } from "@/lib/seo";
import { findDepartment, findSpecialist, procedures, specialists } from "@/lib/content";
import { opdHoursLabel } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = findSpecialist(slug);
  if (!doc) return {};
  return buildMetadata({
    title: `${doc.name}, ${doc.roles.join(" & ")} in Multan`,
    description:
      [
        doc.qualifications?.length ? `${doc.name} (${doc.qualifications.join(", ")})` : doc.name,
        doc.roles.join(", "),
        doc.positions.map((p) => `${p.role}, ${p.place}`).join("; "),
      ]
        .filter(Boolean)
        .join(". ") + ". Request an appointment at Gastro Plus Medical Complex Multan.",
    path: `/specialists/${doc.slug}/`,
  });
}

/** One profile template for every clinician (Roadmap §4, Page 3). */
export default async function SpecialistPage({ params }: Props) {
  const { slug } = await params;
  const doc = findSpecialist(slug);
  if (!doc) notFound();
  const dept = findDepartment(doc.department);

  return (
    <>
      <PageHero
        eyebrow={doc.specialty}
        title={doc.name}
        description={[doc.roles.join(" | "), (doc.qualifications ?? []).join(", ")].filter(Boolean).join(" · ")}
        crumbs={[
          { name: "Specialists", path: "/specialists/" },
          { name: doc.name, path: `/specialists/${doc.slug}/` },
        ]}
      />
      <Section>
        <div className="glass profile-card">
          <div className="portrait">
            <SmartImage src={doc.photo} alt={doc.name} eager />
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
              <h2 className="doc-subhead">Biography</h2>
              {doc.bio.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
              {doc.experience && (
                <p>
                  <strong>Experience:</strong> {doc.experience}
                </p>
              )}
            </section>

            <section>
              <h2 className="doc-subhead">Professional Roles</h2>
              <ul className="positions">
                {doc.positions.map((p) => (
                  <li key={p.role + p.place}>
                    <strong>{p.role}</strong>
                    <span>{p.place}</span>
                  </li>
                ))}
              </ul>
            </section>

            {doc.interests && (
              <section>
                <h2 className="doc-subhead">Clinical Interests</h2>
                <ul className="card__points">
                  {doc.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </section>
            )}

            {(doc.showProcedures || doc.performs?.length) && (
              <section>
                <h2 className="doc-subhead">Procedures at GPMC</h2>
                {doc.performs?.length ? (
                  <>
                    <p>Procedures performed by {doc.name}:</p>
                    <ul className="card__points">
                      {procedures
                        .filter((p) => doc.performs!.includes(p.slug))
                        .map((p) => (
                          <li key={p.slug}>
                            <Link href={`/procedures/${p.slug}/`}>{p.title}</Link>
                          </li>
                        ))}
                    </ul>
                    {procedures.some((p) => !doc.performs!.includes(p.slug)) && (
                      <>
                        <p>Also available at GPMC with other members of the team:</p>
                        <ul className="card__points">
                          {procedures
                            .filter((p) => !doc.performs!.includes(p.slug))
                            .map((p) => (
                              <li key={p.slug}>
                                <Link href={`/procedures/${p.slug}/`}>{p.title}</Link>
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <ul className="card__points">
                      {procedures.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/procedures/${p.slug}/`}>{p.title}</Link>
                        </li>
                      ))}
                    </ul>
                    <p className="field-hint">
                      These procedures are available at GPMC. Please ask our team which doctor will perform your
                      procedure.
                    </p>
                  </>
                )}
              </section>
            )}

            <section>
              <h2 className="doc-subhead">Consultation at GPMC</h2>
              {doc.schedule ? (
                <p>{doc.schedule}</p>
              ) : (
                <p>
                  GPMC OPD: {opdHoursLabel()}. Please call to confirm {doc.name}&apos;s clinic days before your visit.
                </p>
              )}
              {dept && (
                <p>
                  Department: <Link href={`/departments/${dept.slug}/`}>{dept.title}</Link>
                </p>
              )}
            </section>

            <BookingButtons department={doc.department} specialist={doc.slug} />
          </div>
        </div>
      </Section>
      <JsonLd data={physicianJsonLd(doc)} />
    </>
  );
}
