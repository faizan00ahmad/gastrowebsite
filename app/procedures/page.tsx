import { CtaBanner, PageHero, Section, SectionHeading } from "@/components/primitives";
import { ProcedureCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { procedureGroups, procedures } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Procedures",
  description:
    "Endoscopic procedures at Gastro Plus Medical Complex Multan: upper GI endoscopy (gastroscopy), colonoscopy and ERCP. Preparation, risks, recovery and appointment requests.",
  path: "/procedures/",
});

export default function ProceduresPage() {
  return (
    <>
      <PageHero
        title="Procedures"
        description="Endoscopic procedures available at GPMC, grouped by type. Each page explains why it is done, preparation, risks and recovery."
        crumbs={[{ name: "Procedures", path: "/procedures/" }]}
      />
      {procedureGroups.map((group, i) => (
        <Section key={group} className={i % 2 ? "section--alt" : undefined}>
          <SectionHeading title={group} align="left" />
          <div className="grid grid--3">
            {procedures
              .filter((p) => p.group === group)
              .map((p) => (
                <ProcedureCard key={p.slug} proc={p} />
              ))}
          </div>
        </Section>
      ))}
      <Section tight>
        <p className="notice">
          Only procedures currently performed at GPMC are listed here. If you have been advised another procedure,
          please ask our team whether it is available.
        </p>
      </Section>
      <CtaBanner department="endoscopy-unit" />
    </>
  );
}
