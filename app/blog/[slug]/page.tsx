import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/primitives";
import { AsideBooking, AsideLinks } from "@/components/aside";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { articles } from "@/lib/content";
import { site } from "@/lib/site";

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
  const date = new Date(article.published).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
              <time dateTime={article.published}>{date}</time>
              <span>{article.readingMinutes} min read</span>
              <span>{article.reviewedBy ? `Medically reviewed by ${article.reviewedBy}` : site.name}</span>
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
