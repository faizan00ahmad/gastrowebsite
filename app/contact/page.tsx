import { IconTile, PageHero, Section } from "@/components/primitives";
import { BookingForm } from "@/components/booking-form";
import { MapEmbed } from "@/components/map-embed";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact & Book Appointment",
  description:
    "Book an appointment at Gastro Plus Medical Complex, Chowk Rasheedabad, Khanewal Road, Multan. Call, WhatsApp or send a booking request online.",
  path: "/contact/",
});

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Book an Appointment"
        description="Call or WhatsApp us, or send the form and we will reply with an appointment time."
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      />

      <Section id="book">
        <div className="with-aside">
          <div>
            <h2>Send a booking request</h2>
            <p>The form opens WhatsApp with your details filled in. Nothing is stored on this website.</p>
            <BookingForm />
          </div>

          <aside className="aside">
            <ul className="glass glass-pad info-list">
              <li className="info-item">
                <IconTile name="phone" soft />
                <div>
                  <strong>Call or WhatsApp</strong>
                  {site.phones.map((p) => (
                    <p key={p.href}>
                      <a href={`tel:${p.href}`}>{p.display}</a>{" "}
                      <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{p.label}</span>
                    </p>
                  ))}
                </div>
              </li>
              <li className="info-item">
                <IconTile name="clock" soft />
                <div>
                  <strong>Clinic days</strong>
                  <p>{site.hours.days}</p>
                  <p style={{ fontSize: "0.88rem" }}>{site.hours.time || "Please call to confirm timings."}</p>
                </div>
              </li>
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
              {site.email && (
                <li className="info-item">
                  <IconTile name="mail" soft />
                  <div>
                    <strong>Email</strong>
                    <p>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tight className="section--alt">
        <div className="glass" style={{ padding: 8, height: 420 }}>
          <MapEmbed />
        </div>
      </Section>
    </>
  );
}
