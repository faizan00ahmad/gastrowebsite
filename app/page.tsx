import Link from "next/link";
import { Hero } from "@/components/hero";
import { Icon } from "@/components/icons";
import { IconTile, Section, SectionHeading, BookingButtons } from "@/components/primitives";
import { DepartmentCard, ProcedureCard, SpecialistCard, TestimonialCard, ArticleCard } from "@/components/cards";
import { SmartImage } from "@/components/smart-image";
import { MapEmbed } from "@/components/map-embed";
import { BookingForm } from "@/components/booking-form";
import { Gallery } from "@/components/gallery";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  articles,
  departments,
  facebookGalleryPosts,
  faqs,
  galleryImages,
  journey,
  procedures,
  specialists,
  stats,
  testimonials,
  whyChoose,
} from "@/lib/content";

export const metadata = buildMetadata({
  title: "Gastroenterologist & Endoscopy Centre in Multan",
  description: site.description,
  path: "/",
});

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

/**
 * Home page. Section numbers and wording follow the GPMC Homepage Design Blueprint;
 * visual treatment follows the approved reference layout.
 */
export default function HomePage() {
  const visibleStats = stats.filter((s) => s.value !== null);
  const ceo = specialists[0];

  return (
    <>
      {/* Sections 1-3: top bar + header (layout) and hero */}
      <Hero />

      {/* Section 4: achievements. Blueprint: "Display verified statistics only". Hidden until values are set. */}
      {visibleStats.length > 0 && (
        <Section tight>
          <SectionHeading title="Trusted By Thousands of Patients" />
          <div className="grid grid--4">
            {visibleStats.map((s) => (
              <div key={s.label} className="glass stat">
                <IconTile name={s.icon} soft />
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Section 5: message from the CEO (portrait left, message right) */}
      <Section>
        <div className="glass profile-card">
          <div className="portrait">
            <SmartImage src={`/images/${ceo.slug}.jpg`} alt={ceo.name} />
          </div>
          <div>
            <span className="eyebrow">Message from the CEO</span>
            <h2>A Message from Our CEO</h2>
            <p style={{ fontSize: "1.08rem" }}>{ceo.bio[0]}</p>
            <div className="signature">
              <strong>{ceo.name}</strong>
              <span>{ceo.title}</span>
              {ceo.roles.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
            <Link href={`/specialists/${ceo.slug}/`} className="btn btn--primary" style={{ marginTop: 22 }}>
              Read Full Profile
            </Link>
          </div>
        </div>
      </Section>

      {/* Section 6: why choose Gastro Plus (6 premium cards) */}
      <Section className="section--alt">
        <SectionHeading eyebrow="Introduction" title="Why Patients Choose Gastro Plus" />
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

      {/* Section 7: departments (six cards, each with Learn More) */}
      <Section className="section--maroon">
        <SectionHeading eyebrow="What We Offer" title="Comprehensive Healthcare Services Under One Roof" />
        <div className="grid grid--3">
          {departments.map((d) => (
            <DepartmentCard key={d.slug} dept={d} />
          ))}
        </div>
      </Section>

      {/* Section 8: procedures of excellence (large cards + Explore Procedures) */}
      <Section className="section--alt">
        <SectionHeading eyebrow="Procedures of Excellence" title="Advanced Diagnostic & Therapeutic Procedures" />
        <div className="grid grid--3">
          {procedures.map((p) => (
            <ProcedureCard key={p.slug} proc={p} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 30 }}>
          <Link href="/procedures/" className="btn btn--primary">
            Explore Procedures
          </Link>
        </div>
      </Section>

      {/* Section 9: patient journey */}
      <Section className="section--maroon">
        <SectionHeading eyebrow="Patient Journey" title="Your Journey to Better Health" />
        <ol className="journey">
          {journey.map((step, i) => (
            <li key={step.title} className="glass journey__step">
              <span className="journey__num">{i + 1}</span>
              <p className="journey__title">{step.title}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Section 10: meet our specialists */}
      <Section className="section--alt">
        <SectionHeading eyebrow="Meet Our Specialists" title="Our Healthcare Experts" />
        <div className="grid grid--3" style={{ maxWidth: 380, margin: "0 auto" }}>
          {specialists.map((doc) => (
            <SpecialistCard key={doc.slug} doc={doc} />
          ))}
        </div>
      </Section>

      {/* Section 12: patient testimonials (blueprint has no Section 11) */}
      <section className="section band-dark">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="What Our Patients Say" />
          <div className="grid grid--3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.quote} t={t} />
            ))}
          </div>
          <p className="text-center" style={{ marginTop: 26 }}>
            <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow" style={{ color: "var(--brand-300)" }}>
              Read and leave reviews on Google <Icon name="arrow" size={16} />
            </a>
          </p>
        </div>
      </section>

      {/* Section 13: health education center */}
      <Section>
        <SectionHeading eyebrow="Keeping You Well" title="Health Awareness & Patient Education" />
        <div className="grid grid--3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 30 }}>
          <Link href="/blog/" className="btn btn--glass">
            View All Articles
          </Link>
        </div>
      </Section>

      {/* Section 14: full-width appointment banner */}
      <section className="section--tight band-dark">
        <div className="container">
          <div className="cta-row" style={{ border: 0, margin: 0, padding: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gpmc-logo.png" alt="" width={64} height={64} className="cta-row__logo" />
            <div>
              <h2>Need Expert Gastroenterology Care?</h2>
              <p>Schedule your appointment today and receive personalized care from our experienced specialists.</p>
            </div>
            <BookingButtons />
          </div>
        </div>
      </section>

      {/* Section 15: location & contact (map left, details right) */}
      <Section id="location">
        <div className="split">
          <div className="glass" style={{ padding: 8, minHeight: 400 }}>
            <MapEmbed />
          </div>
          <div className="stack">
            <span className="eyebrow">Find Us</span>
            <h2>Visit Gastro Plus Medical Complex Multan</h2>
            <ul className="info-list">
              <li className="info-item">
                <IconTile name="pin" />
                <div>
                  <strong>Address</strong>
                  <p>{site.address.full}</p>
                </div>
              </li>
              <li className="info-item">
                <IconTile name="phone" />
                <div>
                  <strong>Contact Numbers</strong>
                  {site.phones.map((p) => (
                    <p key={p.href}>
                      <a href={`tel:${p.href}`}>{p.display}</a>
                    </p>
                  ))}
                </div>
              </li>
              {site.email && (
                <li className="info-item">
                  <IconTile name="mail" />
                  <div>
                    <strong>Email Address</strong>
                    <p>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </p>
                  </div>
                </li>
              )}
              <li className="info-item">
                <IconTile name="clock" />
                <div>
                  <strong>Working Hours</strong>
                  <p>{site.hours.days}</p>
                  <p style={{ fontSize: "0.88rem" }}>{site.hours.time || "Please call to confirm timings."}</p>
                </div>
              </li>
            </ul>
            <div className="btn-row">
              <a className="btn btn--glass" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" size={18} />
                Get Directions
              </a>
              <Link href="/contact/#book" className="btn btn--primary">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Additions beyond the blueprint: FAQ, online booking form, gallery (last) */}
      <Section className="section--alt">
        <div className="split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">General Query</span>
            <h2>Frequently Asked Questions</h2>
            <p>Can&apos;t find your answer? Call {site.phones[0].display} and our front desk will help.</p>
          </div>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={f.question} open={i === 0}>
                <summary>
                  <span className="faq__num">{String(i + 1).padStart(2, "0")}</span>
                  {f.question}
                </summary>
                <div className="faq__body">
                  <p>{f.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
        <JsonLd data={faqJsonLd(faqs)} />
      </Section>

      <Section id="book" className="section--maroon">
        <div className="split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Online Booking</span>
            <h2>Online Appointment Booking</h2>
            <p>Fill in the form and it opens WhatsApp with your details. Our front desk replies with a time.</p>
          </div>
          <BookingForm />
        </div>
      </Section>

      <Section id="gallery" className="section--alt">
        <SectionHeading eyebrow="From Our Facebook Page" title="Gallery" />
        <Gallery images={galleryImages} facebookPosts={facebookGalleryPosts} />
      </Section>
    </>
  );
}
