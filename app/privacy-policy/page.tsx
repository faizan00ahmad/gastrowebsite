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
            This website is a static information site. It does not collect or store data on a server. When you use
            the booking form, the details you type are sent to WhatsApp by your own device, directly to the clinic.
          </p>
          <h2>Information you share</h2>
          <p>
            If you contact us by phone, WhatsApp or email, we use your information only to respond to your enquiry
            and arrange your care.
          </p>
          <h2>Cookies and analytics</h2>
          <p>This site does not set its own tracking cookies. Embedded Google Maps and Facebook posts are loaded from those services and follow their own privacy policies.</p>
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
