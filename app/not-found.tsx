import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  path: "/404/",
});

export default function NotFound() {
  return (
    <section className="container not-found">
      <div className="glass glass-pad" style={{ maxWidth: 560 }}>
        <p className="not-found__code">404</p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>Page not found</h1>
        <p>The page may have moved. You can return home or book an appointment.</p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: 20 }}>
          <Link href="/" className="btn btn--primary">
            Back to Home
          </Link>
          <Link href="/contact/" className="btn btn--glass">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
