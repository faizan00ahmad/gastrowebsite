import { IconTile, PageHero, Section } from "@/components/primitives";
import { BookingForm } from "@/components/booking-form";
import { MapEmbed } from "@/components/map-embed";
import { WhatsAppGlyph } from "@/components/icons";
import { buildMetadata } from "@/lib/seo";
import { directionsUrl, opdHoursLabel, site } from "@/lib/site";
import { BOOKING_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact & Appointment",
  description:
    "Contact Gastro Plus Medical Complex, Chowk Rasheedabad, Khanewal Road, Multan. Phone numbers, WhatsApp, OPD hours, map and the online Appointment Request form.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact & Appointment"
        description="Send an appointment request, call or WhatsApp us. Our team contacts you to confirm the date and time."
        crumbs={[{ name: "Contact & Appointment", path: "/contact/" }]}
      />

      <Section id="book">
        <div className="with-aside">
          <div>
            <h2>Appointment Request</h2>
            <p>Fill in the form and press send. It opens WhatsApp with your request ready to send to GPMC.</p>
            <BookingForm />
          </div>

          <aside className="aside">
            <ul className="glass glass-pad info-list">
              <li className="info-item">
                <IconTile name="phone" soft />
                <div>
                  <strong>Phone</strong>
                  {site.phones.map((p) => (
                    <p key={p.href}>
                      <a href={`tel:${p.href}`}>{p.display}</a>
                      <br />
                      <span className="info-item__label">{p.label}</span>
                    </p>
                  ))}
                </div>
              </li>
              <li className="info-item">
                <span className="tile-icon tile-icon--soft" aria-hidden="true">
                  <WhatsAppGlyph size={24} />
                </span>
                <div>
                  <strong>WhatsApp</strong>
                  {site.phones
                    .filter((p) => p.whatsapp)
                    .map((p) => (
                      <p key={p.href}>
                        <a href={whatsappLink(BOOKING_MESSAGE)} target="_blank" rel="noopener noreferrer">
                          {p.display}
                        </a>
                      </p>
                    ))}
                </div>
              </li>
              <li className="info-item" id="hours">
                <IconTile name="clock" soft />
                <div>
                  <strong>OPD hours</strong>
                  <p>{opdHoursLabel()}</p>
                  <p className="info-item__label">
                    Specialist and department timings, including the dental clinic, may differ. Please call to confirm.
                  </p>
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
              <li className="info-item">
                <IconTile name="message" soft />
                <div>
                  <strong>General enquiries &amp; complaints</strong>
                  <p className="info-item__label">
                    Call the main number or speak to the front desk. Concerns are reviewed by GPMC management.
                  </p>
                </div>
              </li>
            </ul>
            <div className="notice notice--urgent">
              <strong>Emergency?</strong> Call Rescue 1122 or go to the nearest emergency department. Do not use this
              form or WhatsApp for emergencies.
            </div>
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
