import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section, BookingButtons } from "@/components/primitives";
import { AsideBooking, AsideLinks } from "@/components/aside";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, procedureJsonLd } from "@/lib/seo";
import { findProcedure, procedures } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const proc = findProcedure(slug);
  if (!proc) return {};
  return buildMetadata({
    title: `${proc.title} in Multan`,
    description: `${proc.title}${proc.alsoKnownAs ? ` (${proc.alsoKnownAs})` : ""} at Gastro Plus Medical Complex Multan: why it is done, preparation, risks and recovery.`,
    path: `/procedures/${proc.slug}/`,
  });
}

function ListBlock({ title, icon, items }: { title: string; icon: IconName; items: string[] }) {
  return (
    <section className="glass detail-card">
      <h2>
        <Icon name={icon} size={22} /> {title}
      </h2>
      <ul className="ticks">
        {items.map((p) => (
          <li key={p}>
            <Icon name="check" size={18} />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Procedure page template (Roadmap §4, Page 5). */
export default async function ProcedurePage({ params }: Props) {
  const { slug } = await params;
  const proc = findProcedure(slug);
  if (!proc) notFound();

  const current = `/procedures/${proc.slug}/`;
  const updated = new Date(proc.lastUpdated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        eyebrow={proc.group}
        title={proc.title}
        description={proc.alsoKnownAs ? `${proc.alsoKnownAs}. ${proc.summary}` : proc.summary}
        image={proc.image}
        crumbs={[
          { name: "Procedures", path: "/procedures/" },
          { name: proc.title, path: current },
        ]}
      />
      <Section>
        <div className="with-aside">
          <div className="procedure">
            <h2>What is {proc.title}?</h2>
            <p className="detail-lead">{proc.whatItIs}</p>

            <h2>Why might it be recommended?</h2>
            <ul className="card__points">
              {proc.whyRecommended.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p className="procedure__fine">Not everyone with these symptoms needs this procedure.</p>

            <h2>Who decides if it is suitable?</h2>
            <p>{proc.suitability}</p>

            <div className="notice notice--strong">
              <strong>Your personal instructions come first.</strong> Fasting, bowel preparation and stopping medicines
              are different for each patient. Blood thinners, diabetes medicines, kidney disease, pregnancy and other
              factors can change what you need to do. Follow the written instructions your treating team gives you.
            </div>

            <div className="detail-grid">
              <ListBlock title="How to prepare" icon="calendar" items={proc.preparation} />
              <ListBlock title="During the procedure" icon="scan" items={proc.during} />
              <ListBlock title="Possible risks" icon="shield" items={proc.risks} />
              <ListBlock title="Recovery and follow-up" icon="heart" items={proc.recovery} />
            </div>

            <section className="urgent">
              <h2>
                <Icon name="phone" size={22} /> When to contact us or seek urgent care
              </h2>
              <ul className="card__points">
                {proc.whenToContact.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p>
                Contact the GPMC team if you notice any of these after your procedure. If symptoms are severe, call
                Rescue 1122 or go to the nearest emergency department.
              </p>
            </section>

            <div className="notice">
              <strong>Your safety during this procedure.</strong> Identity checks, informed consent, medication review
              and disinfection of endoscopes between patients are part of GPMC&apos;s patient-safety practices.{" "}
              <Link href="/about/#quality">Read about Quality &amp; Patient Safety</Link>.
            </div>

            <footer className="review-meta">
              <p>
                <strong>Last updated:</strong> {updated}
                {proc.reviewedBy && (
                  <>
                    {" · "}
                    <strong>Medically reviewed by:</strong> {proc.reviewedBy}
                  </>
                )}
              </p>
              <p>
                <strong>References:</strong>{" "}
                {proc.references.map((r, i) => (
                  <span key={r.href}>
                    {i > 0 && "; "}
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      {r.label}
                    </a>
                  </span>
                ))}
              </p>
              <p>
                General information only; it does not replace advice from your doctor. See also{" "}
                <Link href="/patient-resources/#preparation">preparation guides</Link>.
              </p>
            </footer>

            <BookingButtons department={proc.department} />
          </div>

          <aside className="aside">
            <AsideBooking title={`Request ${proc.title}`} department={proc.department} />
            <AsideLinks
              title="Our Procedures"
              current={current}
              links={procedures.map((p) => ({ label: p.title, href: `/procedures/${p.slug}/` }))}
            />
            <AsideLinks
              title="Before & after your visit"
              links={[
                { label: "Preparation guides", href: "/patient-resources/#preparation" },
                { label: "Quality & Patient Safety", href: "/about/#quality" },
                { label: "Patient rights", href: "/patient-resources/#rights" },
              ]}
            />
          </aside>
        </div>
      </Section>
      <JsonLd data={procedureJsonLd(proc)} />
    </>
  );
}
