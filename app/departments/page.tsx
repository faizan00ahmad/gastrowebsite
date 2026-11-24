import { CtaBanner, PageHero, Section, SectionHeading } from "@/components/primitives";
import { DepartmentCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { departments } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Departments",
  description:
    "Departments at Gastro Plus Medical Complex Multan: gastroenterology, liver clinic, endoscopy unit, dental surgery, diagnostic laboratory, ultrasound, pharmacy and short stay / IPD.",
  path: "/departments/",
});

export default function DepartmentsPage() {
  const clinical = departments.filter((d) => d.focus || d.slug === "dental-surgery");
  const support = departments.filter((d) => !clinical.includes(d));
  return (
    <>
      <PageHero
        title="Departments"
        description="Clinical areas and service units at GPMC. Procedures are listed separately on the Procedures page."
        crumbs={[{ name: "Departments", path: "/departments/" }]}
      />
      <Section>
        <SectionHeading eyebrow="Clinical" title="Clinical Departments" align="left" />
        <div className="grid grid--4">
          {clinical.map((d) => (
            <DepartmentCard key={d.slug} dept={d} />
          ))}
        </div>
      </Section>
      <Section className="section--alt">
        <SectionHeading eyebrow="Diagnostics & support" title="Diagnostic and Support Services" align="left" />
        <div className="grid grid--4">
          {support.map((d) => (
            <DepartmentCard key={d.slug} dept={d} />
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
