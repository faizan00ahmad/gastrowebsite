import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/primitives";
import { AsideBooking, AsideLinks } from "@/components/aside";
import { Icon } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import { departments, procedures } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return {};
  return buildMetadata({
    title: `${dept.title} in Multan`,
    description: `${dept.title} at Gastro Plus Medical Complex Multan. ${dept.summary}`,
    path: `/departments/${dept.slug}/`,
  });
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) notFound();

  const current = `/departments/${dept.slug}/`;
  // The endoscopy suite links straight to the procedures it performs.
  const related = dept.slug === "endoscopy-suite" || dept.slug === "gastroenterology" ? procedures : [];

  return (
    <>
      <PageHero
        eyebrow="Department"
        title={dept.title}
        description={dept.summary}
        image={dept.image}
        crumbs={[
          { name: "Departments", path: "/departments/" },
          { name: dept.title, path: current },
        ]}
      />
      <Section>
        <div className="with-aside">
          <div>
            <h2>What we offer</h2>
            <p className="detail-lead">
              {dept.summary} Our {dept.title.toLowerCase()} team works alongside our specialists, so your care is
              coordinated from consultation to follow-up.
            </p>
            <section className="glass detail-card" style={{ marginTop: 24 }}>
              <h2>
                <Icon name={dept.icon} size={22} /> Services
              </h2>
              <ul className="ticks">
                {dept.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={18} />
                    {p}
                  </li>
                ))}
              </ul>
            </section>

            {related.length > 0 && (
              <section style={{ marginTop: 32 }}>
                <h2>Related procedures</h2>
                <ul className="ticks">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Icon name="arrow" size={18} />
                      <span>
                        <Link href={`/procedures/${p.slug}/`} className="link-arrow">
                          {p.title}
                        </Link>{" "}
                        - {p.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="aside">
            <AsideBooking />
            <AsideLinks
              title="All Departments"
              current={current}
              links={departments.map((d) => ({ label: d.title, href: `/departments/${d.slug}/` }))}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
