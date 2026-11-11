import { CtaBanner, PageHero, Section } from "@/components/primitives";
import { ProcedureCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { procedures } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Procedures",
  description:
    "Upper GI endoscopy, colonoscopy and ERCP at Gastro Plus Medical Complex Multan, with expert specialists and a comfort-focused approach.",
  path: "/procedures/",
});

export default function ProceduresPage() {
  return (
    <>
      <PageHero
        title="Endoscopy, Colonoscopy and ERCP"
        description="What each procedure is for, how to prepare, and what happens on the day."
        crumbs={[{ name: "Procedures", path: "/procedures/" }]}
      />
      <Section>
        <div className="grid grid--3">
          {procedures.map((p) => (
            <ProcedureCard key={p.slug} proc={p} />
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
