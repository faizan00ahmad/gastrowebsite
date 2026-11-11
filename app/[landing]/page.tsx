import { CtaBanner, IconTile, PageHero, Section, BookingButtons } from "@/components/primitives";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { seoLandings } from "@/lib/content";
import Link from "next/link";
import { Icon } from "@/components/icons";

/**
 * Dedicated SEO landing pages (e.g. /gastroenterologist-in-multan/).
 * Each slug is defined in lib/content.ts. Unknown slugs return 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return seoLandings.map((p) => ({ landing: p.slug }));
}

type Props = { params: Promise<{ landing: string }> };

function findLanding(slug: string) {
  return seoLandings.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props) {
  const { landing } = await params;
  const page = findLanding(landing);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}/`,
  });
}

export default async function LandingPage({ params }: Props) {
  const { landing } = await params;
  const page = findLanding(landing);
  if (!page) return null;

  return (
    <>
      <PageHero
        title={page.h1}
        description={page.intro}
        crumbs={[{ name: page.h1, path: `/${page.slug}/` }]}
      />
      <Section>
        <div className="split">
          <div className="glass glass-pad stack">
            <h2>What we help with</h2>
            <ul className="card__points" style={{ fontSize: "1.02rem" }}>
              {page.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <BookingButtons />
          </div>
          <div className="grid" style={{ gap: 16 }}>
            {page.related.map((r) => (
              <Link key={r.href} href={r.href} className="glass glass--interactive card" style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                <IconTile name="activity" soft />
                <span style={{ fontWeight: 600, color: "var(--ink)", flex: 1 }}>{r.label}</span>
                <Icon name="arrow" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <CtaBanner />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: page.h1, path: `/${page.slug}/` }])}
      />
    </>
  );
}
