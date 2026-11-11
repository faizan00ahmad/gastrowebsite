import { CtaBanner, PageHero, Section } from "@/components/primitives";
import { SpecialistCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { specialists } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Our Specialists",
  description:
    "Meet the gastroenterologists and hepatologists at Gastro Plus Medical Complex Multan, with qualifications, speciality and how to book.",
  path: "/specialists/",
});

export default function SpecialistsPage() {
  return (
    <>
      <PageHero
        title="Our Specialists"
        description="Consultant gastroenterology and liver care in Multan. More consultants will be listed here as they join."
        crumbs={[{ name: "Our Specialists", path: "/specialists/" }]}
      />
      <Section>
        <div className="grid grid--3">
          {specialists.map((doc) => (
            <SpecialistCard key={doc.slug} doc={doc} />
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
