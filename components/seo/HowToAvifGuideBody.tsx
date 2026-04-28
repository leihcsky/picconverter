import Link from "next/link";
import {
  howToConvertAvifToJpgCopy,
  howToConvertAvifToJpgHowToSteps,
} from "@/data/seo/how-to-convert-avif-jpg";

const h2 = "text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-[1.65rem]";
const body = "text-base leading-[1.75] text-zinc-600 dark:text-zinc-300";
const list = "mt-5 space-y-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className={list} role="list">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Readable layout for the AVIF→JPG how-to guide (before FAQ). */
export function HowToAvifGuideBody({ convertHref }: { convertHref: string }) {
  const copy = howToConvertAvifToJpgCopy;

  return (
    <div className="mx-auto max-w-3xl space-y-12 sm:space-y-16">
      <section
        aria-labelledby="quick-answer"
        className="rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-amber-50/90 to-white p-6 shadow-sm dark:border-zinc-700 dark:from-zinc-900/80 dark:to-zinc-950 sm:p-8"
      >
        <h2 id="quick-answer" className={h2}>
          Quick answer
        </h2>
        <p className={`mt-5 max-w-prose ${body}`}>{copy.quickAnswer}</p>
      </section>

      <section aria-labelledby="steps-heading" className="scroll-mt-8">
        <h2 id="steps-heading" className={h2}>
          Step-by-step: convert AVIF to JPG
        </h2>
        <p className={`mt-4 max-w-prose ${body}`}>
          Follow these three steps on the converter page. Each step is short; the whole flow usually takes under a minute.
        </p>
        <ol className="mt-8 space-y-0">
          {howToConvertAvifToJpgHowToSteps.map((step, index) => {
            const isLast = index === howToConvertAvifToJpgHowToSteps.length - 1;
            return (
              <li key={step.name} className="flex gap-4 sm:gap-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand dark:bg-brand/25"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div
                  className={`min-w-0 pb-8 sm:pb-10 ${isLast ? "" : "border-b border-zinc-100 dark:border-zinc-800/80"}`}
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{step.name}</h3>
                  <p className={`mt-3 ${body}`}>{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="when-heading" className="scroll-mt-8">
        <h2 id="when-heading" className={h2}>
          When should you convert AVIF to JPG?
        </h2>
        <p className={`mt-5 max-w-prose ${body}`}>{copy.whenToConvert.intro}</p>
        <BulletList items={copy.whenToConvert.bullets} />
      </section>

      <section aria-labelledby="quality-heading" className="scroll-mt-8">
        <h2 id="quality-heading" className={h2}>
          Quality and file size
        </h2>
        <p className={`mt-5 max-w-prose ${body}`}>{copy.quality.intro}</p>
        <BulletList items={copy.quality.bullets} />
      </section>

      <section aria-labelledby="paste-heading" className="scroll-mt-8">
        <h2 id="paste-heading" className={h2}>
          Paste, clipboard, and URL import
        </h2>
        <p className={`mt-5 max-w-prose ${body}`}>{copy.pasteAndUrl}</p>
      </section>

      <section aria-labelledby="issues-heading" className="scroll-mt-8">
        <h2 id="issues-heading" className={h2}>
          Common conversion issues
        </h2>
        <p className={`mt-5 max-w-prose ${body}`}>{copy.troubleshooting.intro}</p>
        <BulletList items={copy.troubleshooting.bullets} />
      </section>

      <div className="rounded-2xl bg-brand/10 px-6 py-6 dark:bg-brand/15 sm:px-8 sm:py-7">
        <p className="text-center text-base font-medium leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-left">
          Ready to try it?{" "}
          <Link href={convertHref} className="font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand">
            Open the AVIF to JPG converter
          </Link>{" "}
          and follow the steps above.
        </p>
      </div>
    </div>
  );
}
