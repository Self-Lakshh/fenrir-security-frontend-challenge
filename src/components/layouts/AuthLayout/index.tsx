import { Outlet } from 'react-router-dom'
import { Check } from 'lucide-react'

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full aurora-gradient text-foreground relative flex flex-col overflow-hidden">

            {/* Grain */}
            <div className="grain-overlay pointer-events-none absolute inset-0 z-0"></div>

            {/* Logo - Always fixed */}
            <div className="absolute top-6 left-6 lg:top-10 lg:left-10 z-20 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary border-[3px] border-background shadow-[0_0_0_2px_rgba(0,0,0,0.1)]"></div>
                <span className="font-bold text-2xl tracking-tight text-white">aps</span>
            </div>

            {/* Centered Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-2 lg:px-2">

                {/* 75% height main block */}
                <div className="w-full max-w-7xl h-[85%] lg:h-[75%] flex rounded-[40px] overflow-hidden">

                    {/* Left Panel */}
                    <div className="hidden lg:flex w-[55%] p-6 xl:p-8 flex-col justify-center">
                        <div className="max-w-xl">
                            <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-6 tracking-tight leading-[1.15] text-white">
                                Expert level Cybersecurity <br />
                                in <span className="text-primary">hours</span> not weeks.
                            </h1>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold mb-6 text-white">
                                    What's included
                                </h3>

                                <ul className="space-y-5">
                                    <li className="flex items-start gap-4">
                                        <Check className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={3} />
                                        <span className="text-white text-md font-medium leading-relaxed">
                                            Effortlessly spider and map targets to uncover hidden security flaws
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-4">
                                        <Check className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={3} />
                                        <span className="text-white text-md font-medium leading-relaxed">
                                            Deliver high-quality, validated findings in hours, not weeks.
                                        </span>
                                    </li>

                                    <li className="flex items-start gap-4">
                                        <Check className="w-5 h-5 text-primary mt-1 shrink-0" strokeWidth={3} />
                                        <span className="text-white text-md font-medium leading-relaxed">
                                            Generate professional, enterprise-grade security reports automatically.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-12">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[#00b67a] text-2xl leading-none">★</span>
                                    <span className="font-bold text-xl text-white tracking-tight">
                                        Trustpilot
                                    </span>
                                </div>
                                <p className="text-muted-foreground">
                                    <span className="font-bold text-white">
                                        Rated 4.5/5.0
                                    </span>
                                    <span className="text-sm opacity-80"> (100k+ reviews)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="w-full lg:w-[45%] flex items-center justify-center p-4 md:p-8">
                        <div className="w-full max-w-[480px]">
                            <Outlet />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthLayout