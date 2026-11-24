import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/primitives";
import { AsideBooking, AsideLinks } from "@/components/aside";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { articles } from "@/lib/content";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.summary,
    path: `/blog/${article.slug}/`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const current = `/blog/${article.slug}/`;
  const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.summary}
        image={article.image}
        crumbs={[
          { name: "Health Blog", path: "/blog/" },
          { name: article.title, path: current },
        ]}
      />
      <Section>
        <div className="with-aside">
          <article>
            <p className="article-meta">
              <span>By {article.author}</span>
              {article.reviewedBy && <span>Medically reviewed by {article.reviewedBy}</span>}
              <span>
                Published <time dateTime={article.published}>{fmt(article.published)}</time>
              </span>
              <span>
                Updated <time dateTime={article.updated}>{fmt(article.updated)}</time>
              </span>
              <span>{article.readingMinutes} min read</span>
            </p>
            <div className="article-body">
              {article.body.map((p, i) =>
                p.startsWith("## ") ? (
                  <h2 key={p}>{p.slice(3)}</h2>
                ) : (
                  <p key={p.slice(0, 40)} className={i === 0 ? "detail-lead" : undefined}>
                    {p}
                  </p>
                ),
              )}
            </div>
            <section className="review-meta" style={{ marginTop: 28 }}>
              <h2>References</h2>
              <ul className="card__points">
                {article.references.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
              <h2>Related at GPMC</h2>
              <ul className="card__points">
                {article.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href}>{r.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <div className="notice" style={{ marginTop: 24 }}>
              This article is for general education and does not replace a consultation. Speak with a specialist about
              your own symptoms and results.
            </div>
          </article>

          <aside className="aside">
            <AsideBooking title="Talk to a Specialist" />
            <AsideLinks
              title="More Articles"
              current={current}
              links={articles.map((a) => ({ label: a.title, href: `/blog/${a.slug}/` }))}
            />
          </aside>
        </div>
      </Section>
      <JsonLd data={articleJsonLd(article)} />
    </>
  );
}
