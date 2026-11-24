import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { SmartImage } from "./smart-image";
import { findDepartment, type Article, type Department, type Procedure, type Specialist } from "@/lib/content";
import { appointmentHref } from "@/lib/site";

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

/** Whole card is one link: a single, large tap target. */
export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link href={`/departments/${dept.slug}/`} className="glass glass--interactive media-card">
      <MediaHeader icon={dept.icon} image={dept.image} />
      <div className="media-card__body">
        <h3>{dept.title}</h3>
        <p>{dept.summary}</p>
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
        <p className="media-card__meta">{proc.group}</p>
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

/** Directory card (Roadmap §4, Page 3): name, specialty, qualification line, department, two actions. */
export function SpecialistCard({ doc }: { doc: Specialist }) {
  const dept = findDepartment(doc.department);
  return (
    <article className="glass media-card doc-card">
      <div className="portrait" style={{ borderRadius: 0, boxShadow: "none" }}>
        <SmartImage src={doc.photo} alt={doc.name} />
      </div>
      <div className="media-card__body">
        <h3 style={{ marginBottom: 2 }}>
          <Link href={`/specialists/${doc.slug}/`}>{doc.name}</Link>
        </h3>
        <p className="doc-card__roles">{doc.roles.join(" | ")}</p>
        {doc.qualifications && <p className="doc-card__quals">{doc.qualifications.join(", ")}</p>}
        <dl className="doc-facts">
          <dt>Speciality</dt>
          <dd>{doc.specialty}</dd>
          {dept && (
            <>
              <dt>Department</dt>
              <dd>
                <Link href={`/departments/${dept.slug}/`}>{dept.title}</Link>
              </dd>
            </>
          )}
          {doc.experience && (
            <>
              <dt>Experience</dt>
              <dd>{doc.experience}</dd>
            </>
          )}
        </dl>
        <div className="card__footer btn-row">
          <Link href={`/specialists/${doc.slug}/`} className="btn btn--glass btn--sm">
            View Profile
          </Link>
          <Link href={appointmentHref({ department: doc.department, specialist: doc.slug })} className="btn btn--primary btn--sm">
            Request Appointment
          </Link>
        </div>
      </div>
    </article>
  );
}
