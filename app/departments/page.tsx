import { CtaBanner, PageHero, Section } from "@/components/primitives";
import { DepartmentCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { departments } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Departments",
  description:
    "Departments at Gastro Plus Medical Complex Multan: gastroenterology, endoscopy suite, diagnostic laboratory, ultrasound and radiology, pharmacy and short stay unit.",
  path: "/departments/",
});

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        title="Departments"
        description="Clinic, endoscopy, laboratory, ultrasound, pharmacy and short stay beds in one building on Khanewal Road."
        crumbs={[{ name: "Departments", path: "/departments/" }]}
      />
      <Section>
        <div className="grid grid--3">
          {departments.map((d) => (
            <DepartmentCard key={d.slug} dept={d} />
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
