import Link from "next/link";
import { Hero } from "@/components/hero";
import { Icon } from "@/components/icons";
import { IconTile, Section, SectionHeading, BookingButtons } from "@/components/primitives";
import { DepartmentCard, ProcedureCard, ArticleCard } from "@/components/cards";
import { SmartImage } from "@/components/smart-image";
import { MapEmbed } from "@/components/map-embed";
import { buildMetadata } from "@/lib/seo";
import { directionsUrl, opdHoursLabel, site } from "@/lib/site";
import { articles, departments, journey, procedures, specialists, whyChoose } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Gastroenterologist, Liver & Endoscopy Centre in Multan",
  description: site.description,
  path: "/",
});

/** Home page: the ten sections of the GPMC Final Website Roadmap (§4, Page 1), in order. */
export default function HomePage() {
  const lead = specialists[0];
  const focus = departments.filter((d) => d.focus);
  const keyDepartments = departments.filter((d) => !d.focus);
  const latest = [...articles].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Core clinical focus */}
      <Section>
        <SectionHeading
          eyebrow="Our specialty"
          title="Core Clinical Focus"
          description="GPMC is a specialist-led centre for digestive and liver conditions."
        />
        <div className="grid grid--3">
          {focus.map((d) => (
            <Link key={d.slug} href={`/departments/${d.slug}/`} className="focus-card">
              <IconTile name={d.icon} />
              <h3>{d.title === "Endoscopy Unit" ? "Diagnostic & Therapeutic Endoscopy" : d.title}</h3>
              <p>{d.summary}</p>
              <span className="link-arrow">
                Learn more <Icon name="arrow" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. Lead consultant (short; full profile on the specialist page) */}
      <Section className="section--alt">
        <div className="lead-card">
          <div className="lead-card__photo">
            <SmartImage src={lead.photo} alt={lead.name} />
          </div>
          <div>
            <span className="eyebrow">Lead Consultant</span>
            <h2>{lead.name}</h2>
            <p className="doc-roles">{lead.roles.join(" | ")}</p>
            <p className="lead-card__quals">{lead.qualifications?.join(", ")}</p>
            <ul className="lead-card__roles">
              <li>Chief Executive Officer, Gastro Plus Medical Complex</li>
              <li>{lead.title}</li>
            </ul>
            <div className="btn-row">
              <Link href={`/specialists/${lead.slug}/`} className="btn btn--primary">
                View Profile
              </Link>
              <Link href="/specialists/" className="link-arrow">
                All specialists <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Key departments (support units; focus areas are above) */}
      <Section>
        <div className="section-row">
          <div>
            <span className="eyebrow">Under one roof</span>
            <h2>Key Departments</h2>
          </div>
          <Link href="/departments/" className="link-arrow">
            All departments <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="grid grid--5">
          {keyDepartments.map((d) => (
            <DepartmentCard key={d.slug} dept={d} />
          ))}
        </div>
        <p className="scope-note">
          <Icon name="check" size={16} />
          These services are provided at GPMC. If you need a test or treatment that is not available here, your
          specialist refers you and explains where to go.
        </p>
      </Section>

      {/* 5. Featured procedures */}
      <Section className="section--alt">
        <div className="section-row">
          <div>
            <span className="eyebrow">Procedures</span>
            <h2>Featured Procedures</h2>
          </div>
          <Link href="/procedures/" className="link-arrow">
            All procedures <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="grid grid--3">
          {procedures.map((p) => (
            <ProcedureCard key={p.slug} proc={p} />
          ))}
        </div>
      </Section>

      {/* 6. Why GPMC */}
      <Section>
        <SectionHeading eyebrow="Why GPMC" title="Why Patients Choose GPMC" />
        <ul className="icon-grid">
          {whyChoose.map((item) => (
            <li key={item.title} className="icon-item">
              <Icon name={item.icon} size={40} strokeWidth={1.4} className="icon-item__icon" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. Patient journey */}
      <Section className="section--alt">
        <SectionHeading eyebrow="Patient journey" title="How Your Visit Works" />
        <ol className="journey">
          {journey.map((step, i) => (
            <li key={step.title} className="glass journey__step">
              <span className="journey__num">{i + 1}</span>
              <p className="journey__title">{step.title}</p>
              <p className="journey__text">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="notice text-center" style={{ marginTop: 24 }}>
          An appointment request is not a confirmed booking. Your appointment is confirmed only when our team contacts
          you.
        </p>
      </Section>

      {/* 8. Patient education */}
      <Section>
        <div className="section-row">
          <div>
            <span className="eyebrow">Health Blog</span>
            <h2>Patient Education</h2>
          </div>
          <Link href="/blog/" className="link-arrow">
            All articles <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="grid grid--3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>

      {/* 9. Patient feedback: genuine reviews only, on Google */}
      <Section tight className="section--alt">
        <div className="feedback-row">
          <IconTile name="star" />
          <div>
            <h2>Patient Feedback</h2>
            <p>We publish only genuine, consented reviews. Read and leave reviews for GPMC on Google.</p>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--glass">
            Reviews on Google
          </a>
        </div>
      </Section>

      {/* 10. Location & final CTA */}
      <Section id="location">
        <div className="split">
          <div className="glass" style={{ padding: 8, minHeight: 380 }}>
            <MapEmbed />
          </div>
          <div className="stack">
            <span className="eyebrow">Find us</span>
            <h2>Visit GPMC</h2>
            <ul className="info-list">
              <li className="info-item">
                <IconTile name="pin" soft />
                <div>
                  <strong>Address</strong>
                  <p>{site.address.full}</p>
                  <a className="link-arrow" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    Get directions
                  </a>
                </div>
              </li>
              <li className="info-item">
                <IconTile name="phone" soft />
                <div>
                  <strong>Call or WhatsApp</strong>
                  <p>
                    <a href={`tel:${site.phones[0].href}`}>{site.phones[0].display}</a>
                  </p>
                </div>
              </li>
              <li className="info-item">
                <IconTile name="clock" soft />
                <div>
                  <strong>OPD hours</strong>
                  <p>{opdHoursLabel()}</p>
                  <Link className="link-arrow" href="/contact/#hours">
                    Specialist timings
                  </Link>
                </div>
              </li>
            </ul>
            <BookingButtons />
          </div>
        </div>
      </Section>
    </>
  );
}
