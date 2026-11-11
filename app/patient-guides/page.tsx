import { CtaBanner, IconTile, PageHero, Section } from "@/components/primitives";
import { buildMetadata } from "@/lib/seo";
import { guides } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Patient Guides",
  description:
    "Practical patient guides from Gastro Plus Medical Complex Multan: preparing for endoscopy and colonoscopy, and what to expect during a short stay.",
  path: "/patient-guides/",
});

export default function PatientGuidesPage() {
  return (
    <>
      <PageHero
        title="Patient Guides"
        description="How to prepare for endoscopy, colonoscopy and a short stay. Always follow your own doctor's instructions."
        crumbs={[{ name: "Patient Guides", path: "/patient-guides/" }]}
      />
      <Section>
        
        <div className="grid grid--3">
          {guides.map((g) => (
            <article key={g.title} className="glass glass--interactive card">
              <IconTile name="book" soft />
              <h3>{g.title}</h3>
              <p>{g.summary}</p>
              <ul className="card__points">
                {g.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
