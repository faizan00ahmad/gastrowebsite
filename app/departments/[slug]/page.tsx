import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/primitives";
import { AsideBooking, AsideLinks } from "@/components/aside";
import { Icon } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import { departments, findDepartment, findProcedure, findSpecialist } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dept = findDepartment(slug);
  if (!dept) return {};
  return buildMetadata({
    title: `${dept.title} in Multan`,
    description: `${dept.title} at Gastro Plus Medical Complex Multan. ${dept.overview}`,
    path: `/departments/${dept.slug}/`,
  });
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const dept = findDepartment(slug);
  if (!dept) notFound();

  const current = `/departments/${dept.slug}/`;
  const procs = (dept.procedures ?? []).map(findProcedure).filter((p) => p !== undefined);
  const docs = (dept.specialists ?? []).map(findSpecialist).filter((s) => s !== undefined);

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
            <p className="detail-lead">{dept.overview}</p>

            <div className="detail-grid">
              {dept.sections.map((s) => (
                <section key={s.heading} className="glass detail-card">
                  <h2>
                    <Icon name={dept.icon} size={22} /> {s.heading}
                  </h2>
                  <ul className="ticks">
                    {s.points.map((p) => (
                      <li key={p}>
                        <Icon name="check" size={18} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {dept.note && (
              <div className="notice" style={{ marginTop: 24 }}>
                {dept.note}
              </div>
            )}

            {procs.length > 0 && (
              <section style={{ marginTop: 36 }}>
                <h2>Related procedures</h2>
                <ul className="ticks">
                  {procs.map((p) => (
                    <li key={p.slug}>
                      <Icon name="arrow" size={18} />
                      <span>
                        <Link href={`/procedures/${p.slug}/`} className="link-arrow">
                          {p.title}
                        </Link>{" "}
                        – {p.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {docs.length > 0 && (
              <section style={{ marginTop: 36 }}>
                <h2>Specialists</h2>
                <ul className="ticks">
                  {docs.map((d) => (
                    <li key={d.slug}>
                      <Icon name="user" size={18} />
                      <span>
                        <Link href={`/specialists/${d.slug}/`} className="link-arrow">
                          {d.name}
                        </Link>{" "}
                        – {d.roles.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="aside">
            {dept.bookable && <AsideBooking department={dept.slug} />}
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
