import { PageHero, Section, SectionHeading } from "@/components/primitives";
import { CareerForm } from "@/components/career-form";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { careerRoles, vacancies } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Careers at Gastro Plus Medical Complex Multan: current vacancies, roles we recruit for and how to apply.",
  path: "/careers/",
});

export default function CareersPage() {
  const linkedin = site.social.find((s) => s.name === "LinkedIn");
  return (
    <>
      <PageHero
        title="Careers at GPMC"
        description="Join a specialist-led team providing digestive and liver care in Multan."
        crumbs={[{ name: "Careers", path: "/careers/" }]}
      />

      <Section>
        <div className="split" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Working at GPMC</span>
            <h2>Our Team</h2>
            <p>
              GPMC brings together doctors, nurses, technicians, pharmacy and front desk staff around one aim: safe,
              respectful care for every patient. We expect professional conduct, clear communication with patients
              and careful adherence to safety procedures.
            </p>
            <h3 style={{ marginTop: 24 }}>Roles we recruit for</h3>
            <ul className="card__points">
              {careerRoles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p style={{ marginTop: 12, fontSize: "0.9rem" }}>We advertise these roles only when we are recruiting.</p>
            {linkedin && (
              <p>
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                  Follow GPMC on LinkedIn
                </a>
              </p>
            )}
          </div>

          <div id="vacancies">
            <h2>Current Vacancies</h2>
            {vacancies.length === 0 ? (
              <div className="notice">There are no open positions at the moment. Please check this page again later.</div>
            ) : (
              <div className="stack">
                {vacancies.map((v) => (
                  <article key={v.title} className="glass card">
                    <h3>{v.title}</h3>
                    <p>
                      {v.department} · {v.type} · {site.address.locality} · Closing date: {v.closingDate}
                    </p>
                    <h4>Responsibilities</h4>
                    <ul className="card__points">
                      {v.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <h4>Qualifications and experience</h4>
                    <ul className="card__points">
                      {v.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section className="section--alt" id="apply">
        <div className="split" style={{ alignItems: "start" }}>
          <div>
            <SectionHeading eyebrow="Apply" title="Application Form" align="left" />
            <p>
              The form prepares a WhatsApp message to GPMC with your details. Attach your CV (PDF) in the WhatsApp
              chat before sending. Nothing is stored on this website.
            </p>
            <section id="cv-privacy" className="glass card" style={{ marginTop: 20 }}>
              <h3>CV privacy notice</h3>
              <ul className="card__points">
                <li>Purpose: your details and CV are used only to assess your application for work at GPMC.</li>
                <li>Access: only GPMC management and the staff involved in recruitment can see them.</li>
                <li>Retention: CVs are kept only as long as needed for recruitment, then deleted.</li>
                <li>
                  Your rights: to correct or delete your details, call{" "}
                  <a href={`tel:${site.phones[0].href}`}>{site.phones[0].display}</a>.
                </li>
              </ul>
            </section>
          </div>
          <CareerForm hasVacancies={vacancies.length > 0} positions={vacancies.map((v) => v.title)} />
        </div>
      </Section>
    </>
  );
}
