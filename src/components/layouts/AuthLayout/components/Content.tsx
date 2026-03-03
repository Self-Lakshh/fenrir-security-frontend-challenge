import { Check } from 'lucide-react'

const FEATURES = [
  "Effortlessly spider and map targets to uncover hidden security flaws",
  "Deliver high-quality, validated findings in hours, not weeks.",
  "Generate professional, enterprise-grade security reports automatically."
]

const Content = () => {
  return (
    <aside className="hidden lg:flex w-[55%]">

      <div className="w-full rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-8 flex flex-col justify-between">

        <div>
          <h1 className="text-2xl xl:text-3xl font-bold leading-tight text-white mb-6">
            Expert level Cybersecurity <br />
            in <span className="text-primary">hours</span> not weeks.
          </h1>

          <div className="space-y-4">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="mt-1 rounded-full border border-primary/30 bg-primary/20 p-0.5">
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
            <span className="text-base font-bold text-white">
              Trustpilot
            </span>
          </div>
          <p className="text-xs text-white/70">
            Rated 4.5/5.0 (100k+ reviews)
          </p>
        </div>

      </div>

    </aside>
  )
}

export default Content