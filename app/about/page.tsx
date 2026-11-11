import Link from "next/link";
import { CtaBanner, PageHero, Section, SectionHeading } from "@/components/primitives";
import { DepartmentCard } from "@/components/cards";
import { SmartImage } from "@/components/smart-image";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { departments, specialists, whyChoose } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Gastro Plus Medical Complex Multan: our mission, our values and the specialist team delivering digestive and liver care in Multan.",
  path: "/about/",
});

export default function AboutPage() {
  const ceo = specialists[0];

  return (
    <>
      <PageHero
        title="About Gastro Plus Medical Complex"
        description="Specialist digestive and liver care, endoscopy and diagnostics on Khanewal Road, Multan."
        image="/images/banners/about.jpg"
        crumbs={[{ name: "About Us", path: "/about/" }]}
      />

      <Section>
        <div className="split">
          <div className="media-panel">
            <SmartImage src="/images/facility.jpg" alt="Patient waiting area" fallback="none" />
            <div className="media-panel__caption">
              <strong>Chowk Rasheedabad, Khanewal Road</strong>
              <span className="urdu" lang="ur" dir="rtl" style={{ display: "block", textAlign: "left" }}>
                {site.urduName}
              </span>
            </div>
          </div>
          <div>
            <h2>Why we set up Gastro Plus</h2>
            <p>
              Patients with stomach and liver problems in Multan often see one doctor, get tests at another lab, and go
              back and forth for weeks. Gastro Plus brings the gastroenterologist, endoscopy, laboratory, ultrasound
              and pharmacy into one building so diagnosis and treatment happen faster.
            </p>
            <ol className="values">
              {whyChoose.slice(0, 4).map((v) => (
                <li key={v.title}>
                  <div>
                    <strong>{v.title}</strong>
                    <span>{v.description}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section className="section--alt">
        <div className="glass profile-card">
          <div className="portrait">
            <SmartImage src={`/images/${ceo.slug}.jpg`} alt={ceo.name} />
          </div>
          <div>
            <span className="eyebrow">Leadership</span>
            <h2>{ceo.name}</h2>
            <div className="profile-role">
              {ceo.qualifications?.map((q) => (
                <span key={q} className="pill">
                  {q}
                </span>
              ))}
              <span className="pill">{ceo.title}</span>
              {ceo.roles.map((r) => (
                <span key={r} className="pill">
                  {r}
                </span>
              ))}
            </div>
            <p style={{ fontSize: "1.05rem" }}>{ceo.bio[0]}</p>
            <Link href={`/specialists/${ceo.slug}/`} className="btn btn--primary">
              Read Full Profile
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Our departments" />
        <div className="grid grid--3">
          {departments.map((d) => (
            <DepartmentCard key={d.slug} dept={d} />
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
