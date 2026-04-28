type IconKey = "quality" | "speed" | "simple" | "secure" | "device" | "signup" | "seo";

type SellingPoint = {
  title: string;
  description: string;
  icon: IconKey;
};

function FeatureIcon({ icon }: { icon: IconKey }) {
  const base = "h-5 w-5 text-brand";
  switch (icon) {
    case "quality":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <path d="M4 13l4 4L20 5" />
          <path d="M14 5h6v6" />
        </svg>
      );
    case "speed":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      );
    case "simple":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9h10M7 13h10" />
        </svg>
      );
    case "secure":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
          <path d="M9.5 12.5l1.8 1.8 3.5-3.6" />
        </svg>
      );
    case "device":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <rect x="2.5" y="4" width="14" height="10" rx="1.5" />
          <rect x="18" y="7" width="3.5" height="9" rx="1" />
          <path d="M7 19h5" />
        </svg>
      );
    case "signup":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <path d="M20 12a8 8 0 1 1-2.3-5.7" />
          <path d="M16.5 4.5h4v4" />
          <path d="M20.5 4.5L12 13" />
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={base} aria-hidden="true">
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4-4" />
          <path d="M8 11h6M11 8v6" />
        </svg>
      );
    default:
      return null;
  }
}

export function SellingPoints({
  title,
  points,
}: {
  title: string;
  points: SellingPoint[];
}) {
  return (
    <section className="mt-14" aria-labelledby="selling-points">
      <h2 id="selling-points" className="text-2xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point) => (
          <article key={point.title} className="rounded-xl p-1">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
              <FeatureIcon icon={point.icon} />
            </span>
            <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-white">{point.title}</h3>
            <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">{point.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StyledSteps({ title, steps }: { title: string; steps: string[] }) {
  const icons = [
    (
      <svg key="upload" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8 text-brand">
        <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        <path d="M12 3v12" />
        <path d="m7 8 5-5 5 5" />
      </svg>
    ),
    (
      <svg key="convert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8 text-brand">
        <path d="M4 7h11" />
        <path d="m12 3 3 4-3 4" />
        <path d="M20 17H9" />
        <path d="m12 13-3 4 3 4" />
      </svg>
    ),
    (
      <svg key="download" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8 text-brand">
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M4 21h16" />
      </svg>
    ),
  ];

  const topSteps = steps.slice(0, 3);

  return (
    <section className="mt-14" aria-labelledby="conversion-steps">
      <h2 id="conversion-steps" className="text-center text-3xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {topSteps.map((step, index) => (
          <li key={step} className="text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
              {icons[index] ?? icons[1]}
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-white">
              {index + 1}. {index === 0 ? "Choose image" : index === 1 ? "Start conversion" : "Download output"}
            </h3>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function IntroCard({ title, content }: { title: string; content: string }) {
  return (
    <section className="mt-14" aria-labelledby="intro-card">
      <h2 id="intro-card" className="text-2xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 rounded-xl bg-gradient-to-br from-amber-50 to-white p-5 dark:from-zinc-900 dark:to-zinc-900">
        <p className="text-lg text-zinc-700 dark:text-zinc-300">{content}</p>
      </div>
    </section>
  );
}
