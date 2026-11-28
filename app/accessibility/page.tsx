import { PageHero, Section } from "@/components/primitives";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Accessibility",
  description: "How the Gastro Plus Medical Complex Multan website is built to be usable by everyone, and how to report a problem.",
  path: "/accessibility/",
});

/** Optional footer page (Roadmap §3 footer column 4). Covers the website, not the building. */
export default function AccessibilityPage() {
  return (
    <>
      <PageHero title="Accessibility" crumbs={[{ name: "Accessibility", path: "/accessibility/" }]} />
      <Section>
        <div className="glass glass-pad prose">
          <p>
            We want every patient and family member to be able to use this website, including people who use a screen
            reader, keyboard, screen magnifier or a slow mobile connection.
          </p>
          <h2>What we have done</h2>
          <ul>
            <li>Pages use clear headings, landmarks and labels so they work with screen readers.</li>
            <li>Every link, menu and form can be used with a keyboard, with a visible focus outline.</li>
            <li>Text and buttons are designed for readable contrast and large touch targets on phones.</li>
            <li>Form errors are written in words and announced to assistive technology, not shown by colour alone.</li>
            <li>Images have text alternatives, and decorative images are hidden from screen readers.</li>
            <li>Animations are reduced when your device asks for reduced motion.</li>
            <li>Key information (phone, WhatsApp, address and OPD hours) is plain text, not an image.</li>
          </ul>
          <h2>Known limitations</h2>
          <ul>
            <li>The embedded Google Map is provided by Google; use the &ldquo;Get directions&rdquo; link if it is hard to use.</li>
            <li>Some medical terms cannot be avoided. Our team is happy to explain anything by phone.</li>
          </ul>
          <h2>Need help or found a problem?</h2>
          <p>
            If any part of this website is difficult to use, please call{" "}
            <a href={`tel:${site.phones[0].href}`}>{site.phones[0].display}</a>
            {site.email && (
              <>
                {" "}or email <a href={`mailto:${site.email}`}>{site.email}</a>
              </>
            )}{" "}
            and our team will give you the information in another way and arrange your appointment by phone.
          </p>
          <p>
            For help reaching or moving around the building, please call before your visit so the front desk can
            prepare.
          </p>
        </div>
      </Section>
    </>
  );
}
