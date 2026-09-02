import { useState, type FormEvent } from "react";
import { rates, ratesSectionContent as content } from "../content/rates";

export default function Stawki() {
  const [showRateForm, setShowRateForm] = useState(false);

  const handleRateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(content.form.emailSubject);
    const body = encodeURIComponent(
      `${content.form.emailBodyLabels.email}: ${data.get("email")}

${content.form.emailBodyLabels.activity}:
${data.get("activity")}

${content.form.emailBodyLabels.codes}:
${data.get("codes") || content.form.emailBodyLabels.noCodes}`
    );
    window.location.href = `mailto:${content.form.recipient}?subject=${subject}&body=${body}`;
  };



  return (
    <section id="stawki" className="border-b-2 border-ink bg-ink text-cream">
      <div className="px-5 md:px-10 pt-16 md:pt-24 pb-6 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-lime">{content.eyebrow}</div>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] mt-3">
            {content.titleLine1}<br/>{content.titleLine2}<span className="text-lime">?</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-cream/60 max-w-xs">
          {content.description}
        </div>
      </div>

      <div className="px-5 md:px-10 pb-16 overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {rates.map((r, i) => (
              <tr key={i} className="group border-b border-cream/20 hover:bg-lime hover:text-ink transition-colors">
                <td className="font-mono text-cream/40 group-hover:text-ink/60 w-10 pr-4 py-5 align-top">
                  0{i + 1}
                </td>
                <td className="font-display text-6xl md:text-8xl tracking-tighter py-5 pr-8 align-top">
                  {r.rate}
                </td>
                <td className="font-sans text-base md:text-lg py-5 pr-6 align-top max-w-md">
                  {r.cat}
                </td>
                <td className="font-mono text-xs uppercase tracking-widest py-5 align-top whitespace-nowrap">
                  <span className="border border-cream/40 group-hover:border-ink/60 px-2 py-1">{r.tag}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-12 border-2 border-cream/40 bg-cream text-ink p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <p className="font-display text-2xl md:text-4xl leading-tight max-w-3xl">
            {content.ctaText}
          </p>
          <button
            type="button"
            onClick={() => setShowRateForm(true)}
            className="btn-invert shrink-0 bg-lime border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase text-left"
          >
            {content.ctaLabel}
          </button>
        </div>
      </div>

      {showRateForm && (
        <div
          className="fixed inset-0 z-[100] bg-ink/80 p-4 md:p-8 flex items-center justify-center"
          role="presentation"
          onMouseDown={() => setShowRateForm(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rate-form-title"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-ink bg-cream text-ink p-6 md:p-10 shadow-[12px_12px_0_#D8FF3D]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowRateForm(false)}
              aria-label={content.form.closeLabel}
              className="absolute top-4 right-4 font-display text-3xl leading-none hover:text-orange"
            >
              ×
            </button>

            <div className="font-mono text-xs uppercase tracking-widest text-ink/60">{content.form.eyebrow}</div>
            <h3 id="rate-form-title" className="font-display text-4xl md:text-5xl leading-none mt-3 pr-10">
              {content.form.title}
            </h3>
            <p className="mt-4 text-base text-ink/70 max-w-xl">
              {content.form.description}
            </p>

            <form onSubmit={handleRateForm} className="mt-8 space-y-6">
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.form.emailLabel}</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-sans"
                  placeholder={content.form.emailPlaceholder}
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.form.activityLabel}</span>
                <textarea
                  name="activity"
                  required
                  rows={4}
                  className="mt-2 w-full resize-y border-2 border-ink bg-paper px-4 py-3 font-sans"
                  placeholder={content.form.activityPlaceholder}
                />
              </label>

              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest">{content.form.codesLabel}</span>
                <input
                  type="text"
                  name="codes"
                  className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-sans"
                  placeholder={content.form.codesPlaceholder}
                />
              </label>

              <button type="submit" className="btn-invert bg-lime border-2 border-ink px-6 py-4 font-mono text-sm font-bold tracking-widest uppercase">
                {content.form.submitLabel}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
