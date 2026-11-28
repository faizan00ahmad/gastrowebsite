import Link from "next/link";
import { CtaBanner, IconTile, PageHero, Section, SectionHeading } from "@/components/primitives";
import { SmartImage } from "@/components/smart-image";
import { Gallery } from "@/components/gallery";
import { Icon } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { departments, galleryImages, leadershipMessage, mission, qualityPractices, specialists, values, vision } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About GPMC",
  description:
    "About Gastro Plus Medical Complex Multan: our focus on digestive and liver care, vision, mission, values, leadership, facilities and patient safety.",
  path: "/about/",
});

/** In-house facilities. Roadmap: label in-house vs partner/referral clearly. */
const facilities = ["endoscopy-unit", "diagnostic-laboratory", "ultrasound", "pharmacy", "short-stay-ipd"];

export default function AboutPage() {
  const ceo = specialists[0];
  const facilityDepts = facilities.map((slug) => departments.find((d) => d.slug === slug)!).filter(Boolean);
  const facebook = site.social.find((s) => s.name === "Facebook");

  return (
    <>
      <PageHero
        title="About GPMC"
        description="A specialist-led centre for digestive and liver care on Khanewal Road, Multan."
        image="/images/banners/about.jpg"
        crumbs={[{ name: "About GPMC", path: "/about/" }]}
      />

      {/* 1. About GPMC */}
      <Section id="overview">
        <div className="split">
          <div className="media-panel">
            <SmartImage src="/images/facility.jpg" alt="" fallback="none" />
            <div className="media-panel__caption">
              <strong>Chowk Rasheedabad, Khanewal Road</strong>
              <span className="urdu" lang="ur" dir="rtl" style={{ display: "block", textAlign: "left" }}>
                {site.urduName}
              </span>
            </div>
          </div>
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>About Gastro Plus Medical Complex</h2>
            <p>
              Gastro Plus Medical Complex (GPMC) is a specialist-led centre in Multan focused on gastroenterology,
              hepatology and endoscopy. We see adults with digestive, liver, pancreatic and bile duct conditions, from
              a first consultation to endoscopic procedures and follow-up.
            </p>
            <p>
              Endoscopy, laboratory, ultrasound, pharmacy and short-stay beds are in the same building, so many
              investigations can be arranged during one visit. Dental Surgery is provided as a separate specialty.
            </p>
            <Link href="/departments/" className="link-arrow">
              See our departments <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* 2–3. Vision and mission */}
      <Section className="section--alt" id="mission">
        <div className="grid grid--2">
          <article className="statement">
            <span className="eyebrow">Our Vision</span>
            <p>{vision}</p>
          </article>
          <article className="statement">
            <span className="eyebrow">Our Mission</span>
            <p>{mission}</p>
          </article>
        </div>
      </Section>

      {/* 4. Values */}
      <Section>
        <SectionHeading eyebrow="What guides us" title="Our Values" />
        <ol className="values values--grid">
          {values.map((v) => (
            <li key={v.title}>
              <div>
                <strong>{v.title}</strong>
                <span>{v.description}</span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. Leadership: the full message lives here; full profile on the specialist page */}
      <Section className="section--alt" id="leadership">
        <div className="glass profile-card">
          <div className="portrait">
            <SmartImage src={ceo.photo} alt={ceo.name} />
          </div>
          <div>
            <span className="eyebrow">Leadership</span>
            <h2>A Message from Our CEO</h2>
            <blockquote className="ceo-quote">
              <p>{leadershipMessage}</p>
            </blockquote>
            <div className="signature">
              <strong>{ceo.name}</strong>
              <span>Chief Executive Officer, Gastro Plus Medical Complex</span>
              <span>{ceo.qualifications?.join(", ")}</span>
            </div>
            <Link href={`/specialists/${ceo.slug}/`} className="btn btn--primary" style={{ marginTop: 22 }}>
              View Full Profile
            </Link>
          </div>
        </div>
      </Section>

      {/* 6. Facilities & care environment */}
      <Section id="facilities">
        <SectionHeading
          eyebrow="Facilities"
          title="Facilities & Care Environment"
          description="These facilities are in-house at GPMC. Where a test is sent to a partner laboratory or a patient needs care elsewhere, our team tells you."
        />
        <ul className="facility-list">
          {facilityDepts.map((d) => (
            <li key={d.slug}>
              <IconTile name={d.icon} soft />
              <div>
                <Link href={`/departments/${d.slug}/`}>
                  <strong>{d.title}</strong>
                </Link>
                <span>{d.summary}</span>
              </div>
              <span className="tag">In-house</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Quality & patient safety */}
      <Section className="section--alt" id="quality">
        <SectionHeading
          eyebrow="Quality"
          title="Quality & Patient Safety"
          description="The everyday practices we follow to keep patients safe."
        />
        <ul className="icon-grid">
          {qualityPractices.map((q) => (
            <li key={q.title} className="icon-item">
              <Icon name={q.icon} size={36} strokeWidth={1.4} className="icon-item__icon" />
              <div>
                <h3>{q.title}</h3>
                <p>{q.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Gallery & updates: curated photos when approved; social link instead of a heavy feed */}
      <Section id="gallery">
        <SectionHeading eyebrow="Gallery & updates" title="GPMC News and Photos" />
        {galleryImages.length > 0 && <Gallery images={galleryImages} facebookPosts={[]} />}
        {facebook && (
          <p className="text-center" style={{ marginTop: galleryImages.length ? 24 : 0 }}>
            <a href={facebook.href} target="_blank" rel="noopener noreferrer" className="btn btn--glass">
              <Icon name="facebook" size={18} />
              Follow GPMC on Facebook
            </a>
          </p>
        )}
      </Section>

      <CtaBanner />
    </>
  );
}
