import { PageHero, Section } from "@/components/primitives";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Gastro Plus Medical Complex Multan website.",
  path: "/terms-and-conditions/",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" crumbs={[{ name: "Terms & Conditions", path: "/terms-and-conditions/" }]} />
      <Section>
        <div className="glass glass-pad prose">
          <p>
            The information on this website is provided for general education and to help you contact {site.name}. It
            is not a substitute for a consultation with a qualified doctor.
          </p>
          <h2>Appointments</h2>
          <p>Booking requests are confirmed by our team. Timings may change based on specialty and clinic schedules.</p>
          <h2>Accuracy</h2>
          <p>We work to keep information current, but it may change. Please confirm details with the clinic before visiting.</p>
          <div className="notice">Final wording to be reviewed by the clinic and its legal adviser before publication.</div>
        </div>
      </Section>
    </>
  );
}
