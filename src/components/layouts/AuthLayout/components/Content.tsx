import { Check } from 'lucide-react'

const FEATURES = [
  "Effortlessly spider and map targets to uncover hidden security flaws",
  "Deliver high-quality, validated findings in hours, not weeks.",
  "Generate professional, enterprise-grade security reports automatically."
]

const Content = () => {
  return (
    <aside className="hidden lg:flex w-[55%]">

      <div className="w-full px-8 py-8 flex flex-col justify-between">

        <div>
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white mb-8">
            Expert level Cybersecurity <br />
            in <span className="text-primary">hours</span> not weeks.
          </h1>

          <p className="text-sm font-semibold text-white/60 mb-4">What's included</p>

          <div className="space-y-4">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="mt-1 bg-primary/20 p-0.5 shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                </div>
                <span className="text-sm text-white/80 font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg text-primary">★</span>
            <span className="text-base font-bold text-white">Trustpilot</span>
          </div>
          <p className="text-sm font-bold text-white">
            Rated 4.5/5.0 <span className="text-white/50 font-normal">(100k+ reviews)</span>
          </p>
        </div>

      </div>

    </aside>
  )
}

export default Content