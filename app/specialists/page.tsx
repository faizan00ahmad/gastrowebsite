import { CtaBanner, PageHero, Section } from "@/components/primitives";
import { SpecialistCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { specialists } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Specialists",
  description:
    "Specialists at Gastro Plus Medical Complex Multan: gastroenterology, hepatology and interventional endoscopy, and dental surgery. Qualifications and appointment requests.",
  path: "/specialists/",
});

export default function SpecialistsPage() {
  return (
    <>
      <PageHero
        title="Specialists"
        description="Find the right clinician and request an appointment. Full details are on each profile."
        crumbs={[{ name: "Specialists", path: "/specialists/" }]}
      />
      <Section>
        <div className="grid grid--doctors">
          {specialists.map((doc) => (
            <SpecialistCard key={doc.slug} doc={doc} />
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
