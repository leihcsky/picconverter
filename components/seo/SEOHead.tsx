/** Visible SEO heading block (meta tags via `generateMetadata` on pages). */
export function SEOHead({
  title,
  description,
  centered = false,
}: {
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <header className={`mb-8 ${centered ? "text-center" : ""}`}>
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">{title}</h1>
      <p className={`mt-3 text-xl text-zinc-600 dark:text-zinc-400 ${centered ? "mx-auto max-w-3xl" : "max-w-2xl"}`}>
        {description}
      </p>
    </header>
  );
}
