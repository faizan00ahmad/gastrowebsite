import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { SmartImage } from "./smart-image";
import type { Article, Department, Procedure, Specialist, Testimonial } from "@/lib/content";

/**
 * Cyan-bordered photo tile (reference "Our Specialties" style); the title sits below it.
 * Shows the brand pattern and a watermark icon until a photo is supplied.
 */
function MediaHeader({ icon, image, kicker }: { icon: IconName; image?: string; kicker?: string }) {
  return (
    <div className="media-card__media">
      <Icon name={icon} size={140} strokeWidth={0.9} />
      {image && <SmartImage src={image} alt="" fallback="none" />}
      {kicker && <span className="media-card__kicker">{kicker}</span>}
    </div>
  );
}

/** Whole card is one link: a single, large tap target and no repeated "Learn more" text. */
export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link href={`/departments/${dept.slug}/`} className="glass glass--interactive media-card">
      <MediaHeader icon={dept.icon} image={dept.image} />
      <div className="media-card__body">
        <h3>{dept.title}</h3>
        <p>{dept.summary}</p>
        <ul className="card__points">
          {dept.points.slice(0, 2).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {/* Blueprint Section 7: "Each card contains: Learn More →" */}
        <span className="link-arrow media-card__more">
          Learn More <Icon name="arrow" size={16} />
        </span>
      </div>
    </Link>
  );
}

export function ProcedureCard({ proc }: { proc: Procedure }) {
  return (
    <Link href={`/procedures/${proc.slug}/`} className="glass glass--interactive media-card">
      <MediaHeader icon={proc.icon} image={proc.image} />
      <div className="media-card__body">
        <h3>{proc.title}</h3>
        <p>{proc.summary}</p>
        <p className="media-card__meta">Preparation, what to expect and booking</p>
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.published).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <Link href={`/blog/${article.slug}/`} className="glass glass--interactive media-card">
      <MediaHeader icon="book" image={article.image} kicker={article.category} />
      <div className="media-card__body">
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <p className="media-card__meta">
          <time dateTime={article.published}>{date}</time> · {article.readingMinutes} min read
        </p>
      </div>
    </Link>
  );
}

export function SpecialistCard({ doc }: { doc: Specialist }) {
  return (
    <article className="glass media-card">
      <div className="portrait" style={{ borderRadius: 0, boxShadow: "none" }}>
        <SmartImage src={`/images/${doc.slug}.jpg`} alt={doc.name} />
      </div>
      <div className="media-card__body">
        <h3 style={{ marginBottom: 2 }}>{doc.name}</h3>
        <p style={{ marginBottom: 10 }}>{doc.roles.join(" | ")}</p>
        {(doc.title || doc.qualifications?.length) && (
          <div className="profile-role" style={{ margin: 0 }}>
            {doc.title && <span className="pill">{doc.title}</span>}
            {doc.qualifications?.map((q) => (
              <span key={q} className="pill">
                {q}
              </span>
            ))}
          </div>
        )}
        {/* Blueprint Section 10: photo, name, qualification, speciality, experience, Book Appointment */}
        <dl className="doc-facts">
          <dt>Speciality</dt>
          <dd>{doc.specialty}</dd>
          <dt>Position</dt>
          <dd>
            {doc.positions.map((p) => (
              <span key={p.role + p.place} style={{ display: "block" }}>
                {p.role}, {p.place}
              </span>
            ))}
          </dd>
          {doc.experience && (
            <>
              <dt>Experience</dt>
              <dd>{doc.experience}</dd>
            </>
          )}
        </dl>
        <div className="card__footer btn-row">
          <Link href="/contact/#book" className="btn btn--primary btn--sm">
            Book Appointment
          </Link>
          <Link href={`/specialists/${doc.slug}/`} className="link-arrow">
            Full profile
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="testimonial">
      <div className="stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Icon key={i} name="star" size={16} fill="currentColor" />
        ))}
      </div>
      <blockquote style={{ margin: 0 }}>
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>
      <figcaption>
        {t.author ?? "Patient"}
        {t.source && (
          <>
            {" · "}
            <a href={t.source.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand-600)" }}>
              {t.source.label}
            </a>
          </>
        )}
      </figcaption>
    </figure>
  );
}
