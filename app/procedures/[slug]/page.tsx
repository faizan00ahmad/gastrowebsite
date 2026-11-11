import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/primitives";
import { AsideBooking, AsideLinks } from "@/components/aside";
import { Icon } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import { procedures } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return procedures.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const proc = procedures.find((p) => p.slug === slug);
  if (!proc) return {};
  return buildMetadata({
    title: `${proc.title} in Multan`,
    description: `${proc.title} in Multan at Gastro Plus Medical Complex. ${proc.summary}`,
    path: `/procedures/${proc.slug}/`,
  });
}

export default async function ProcedurePage({ params }: Props) {
  const { slug } = await params;
  const proc = procedures.find((p) => p.slug === slug);
  if (!proc) notFound();

  const current = `/procedures/${proc.slug}/`;

  return (
    <>
      <PageHero
        eyebrow="Procedure"
        title={proc.title}
        description={proc.summary}
        image={proc.image}
        crumbs={[
          { name: "Procedures", path: "/procedures/" },
          { name: proc.title, path: current },
        ]}
      />
      <Section>
        <div className="with-aside">
          <div>
            <h2>What is {proc.title}?</h2>
            <p className="detail-lead">{proc.whatItIs}</p>

            <div className="detail-grid">
              <section className="glass detail-card">
                <h2>
                  <Icon name="check" size={22} /> What to expect
                </h2>
                <ul className="ticks">
                  {proc.whatToExpect.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={18} />
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="glass detail-card">
                <h2>
                  <Icon name="calendar" size={22} /> Preparation
                </h2>
                <ul className="ticks">
                  {proc.preparation.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={18} />
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="notice" style={{ marginTop: 24 }}>
              Your doctor will give you personalised instructions. This page is general information and does not
              replace medical advice.
            </div>
          </div>

          <aside className="aside">
            <AsideBooking title={`Book ${proc.title}`} />
            <AsideLinks
              title="Our Procedures"
              current={current}
              links={procedures.map((p) => ({ label: p.title, href: `/procedures/${p.slug}/` }))}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
