import { PageHero, Section } from "@/components/primitives";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Gastro Plus Medical Complex Multan handles personal and health information on this website.",
  path: "/privacy-policy/",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ name: "Privacy Policy", path: "/privacy-policy/" }]} />
      <Section>
        <div className="glass glass-pad prose">
          <p>
            This website is a static information site. It does not store the details you type into its forms on any
            server.
          </p>
          <h2>Appointment Request form</h2>
          <p>
            The form asks only for what is needed to arrange a visit: patient name, mobile number, department,
            preferred specialist, date and time, visit type and a short reason. When you press send, your own device
            opens WhatsApp with these details, addressed to the GPMC number {site.phones[0].display}. Nothing is sent
            until you press send in WhatsApp. Please do not include your full medical history.
          </p>
          <p>
            GPMC staff use these details only to contact you and arrange your appointment. A request is not a confirmed
            appointment until our team contacts you.
          </p>
          <h2>Job applications and CVs</h2>
          <p>
            The careers form prepares a WhatsApp message in the same way, and you attach your CV in WhatsApp. CVs are
            used only for recruitment, are seen only by GPMC management and staff involved in recruitment, and are kept
            only as long as needed for recruitment. To correct or delete your details, call {site.phones[0].display}.
          </p>
          <h2>Information you share</h2>
          <p>
            If you contact us by phone or WhatsApp, we use your information only to respond to your enquiry and
            arrange your care. Social media messages are not a secure channel for clinical consultation and must not be
            used for emergencies.
          </p>
          <h2>Cookies and analytics</h2>
          <p>This site does not set its own tracking cookies. The embedded Google Map is loaded from Google and follow their own privacy policies.</p>
          <h2>Contact</h2>
          <p>
            For privacy questions, contact {site.name} on{" "}
            <a href={`tel:${site.phones[0].href}`}>{site.phones[0].display}</a>
            {site.email && (
              <>
                {" "}or at <a href={`mailto:${site.email}`}>{site.email}</a>
              </>
            )}
            .
          </p>
          <div className="notice">Final wording to be reviewed by the clinic and its legal adviser before publication.</div>
        </div>
      </Section>
    </>
  );
}
