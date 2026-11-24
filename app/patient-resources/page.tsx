import Link from "next/link";
import { CtaBanner, IconTile, PageHero, Section, SectionHeading } from "@/components/primitives";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  admissionGuide,
  faqs,
  findProcedure,
  patientResponsibilities,
  patientRights,
  preparationGuides,
  reportsGuide,
} from "@/lib/content";

export const metadata = buildMetadata({
  title: "Patient Resources",
  description:
    "Patient resources from Gastro Plus Medical Complex Multan: endoscopy, colonoscopy and ERCP preparation, admission and short stay, patient rights, reports and FAQs.",
  path: "/patient-resources/",
});

const contents = [
  { id: "preparation", label: "Procedure preparation" },
  { id: "admission", label: "Admission & short stay" },
  { id: "rights", label: "Patient rights & responsibilities" },
  { id: "reports", label: "Reports & follow-up" },
  { id: "faqs", label: "FAQs" },
];

export default function PatientResourcesPage() {
  return (
    <>
      <PageHero
        title="Patient Resources"
        description="Preparation, admission, rights and follow-up information. Always follow the personal instructions your treating team gives you."
        crumbs={[{ name: "Patient Resources", path: "/patient-resources/" }]}
      />

      <Section tight>
        <nav aria-label="On this page" className="toc">
          {contents.map((c) => (
            <a key={c.id} href={`#${c.id}`}>
              {c.label}
            </a>
          ))}
        </nav>
      </Section>

      <Section id="preparation" className="section--alt">
        <SectionHeading
          eyebrow="Procedure preparation"
          title="Preparing for Your Procedure"
          description="A short checklist for each procedure. The full explanation is on each procedure page."
          align="left"
        />
        <div className="grid grid--3">
          {preparationGuides.map((g) => {
            const proc = findProcedure(g.procedure);
            return (
              <article key={g.title} className="glass card">
                <IconTile name="calendar" soft />
                <h3>{g.title}</h3>
                <ul className="card__points">
                  {g.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {proc && (
                  <div className="card__footer">
                    <Link href={`/procedures/${proc.slug}/`} className="link-arrow">
                      About {proc.title} <Icon name="arrow" size={16} />
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <p className="notice notice--strong" style={{ marginTop: 24 }}>
          <strong>Do not stop any medicine on your own.</strong> Blood thinners, diabetes medicines, kidney disease,
          pregnancy and other factors can change your preparation. Your personal written instructions take priority
          over this general guide.
        </p>
      </Section>

      <Section id="admission">
        <SectionHeading eyebrow="Short stay / IPD" title="Admission & Short Stay" align="left" />
        <div className="grid grid--3">
          {admissionGuide.map((b) => (
            <article key={b.heading} className="glass card">
              <h3>{b.heading}</h3>
              <ul className="card__points">
                {b.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="rights" className="section--alt">
        <SectionHeading eyebrow="Your rights" title="Patient Rights & Responsibilities" align="left" />
        <div className="grid grid--2">
          <article className="glass card">
            <h3>Your rights</h3>
            <ul className="card__points">
              {patientRights.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
          <article className="glass card">
            <h3>Your responsibilities</h3>
            <ul className="card__points">
              {patientResponsibilities.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        </div>
        <p style={{ marginTop: 20 }}>
          <strong>Concerns and complaints:</strong> speak to the front desk, or call{" "}
          <a href={`tel:${site.phones[0].href}`}>{site.phones[0].display}</a>. Concerns are reviewed by GPMC
          management. Read more about our{" "}
          <Link href="/about/#quality">quality and patient safety practices</Link>.
        </p>
      </Section>

      <Section id="reports">
        <SectionHeading eyebrow="After your visit" title="Reports & Follow-up" align="left" />
        <ul className="ticks">
          {reportsGuide.map((r) => (
            <li key={r}>
              <Icon name="check" size={18} />
              {r}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faqs" className="section--alt">
        <div className="split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">FAQs</span>
            <h2>Frequently Asked Questions</h2>
            <p>
              Can&apos;t find your answer? Call {site.phones[0].display} and our front desk will help.
            </p>
          </div>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={f.question} open={i === 0}>
                <summary>
                  <span className="faq__num">{String(i + 1).padStart(2, "0")}</span>
                  {f.question}
                </summary>
                <div className="faq__body">
                  <p>{f.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
        <JsonLd data={faqJsonLd(faqs)} />
      </Section>

      <CtaBanner />
    </>
  );
}
