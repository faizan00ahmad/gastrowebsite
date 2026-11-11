import { CtaBanner, PageHero, Section } from "@/components/primitives";
import { ArticleCard } from "@/components/cards";
import { buildMetadata } from "@/lib/seo";
import { articles } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Health Blog",
  description:
    "Health awareness articles on fatty liver disease, colonoscopy and hepatitis from the gastroenterology team at Gastro Plus Medical Complex Multan.",
  path: "/blog/",
});

export default function BlogPage() {
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <PageHero
        title="Health Awareness & Patient Education"
        description="Clear, reliable information about digestive and liver health."
        crumbs={[{ name: "Health Blog", path: "/blog/" }]}
      />
      <Section>
        <div className="grid grid--3">
          {sorted.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
