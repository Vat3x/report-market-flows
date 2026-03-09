import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            Report Market
          </Link>
        </div>
      </nav>


      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-6 pt-32 pb-32">
        {/* Animated decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[100px] animate-blob" style={{ animationDelay: "0s" }} />
          <div className="absolute top-[20%] right-[-5%] h-[400px] w-[400px] rounded-full bg-indigo-600/30 blur-[100px] animate-blob" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-sky-500/20 blur-[120px] animate-blob" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-900/30 px-5 py-2 text-sm font-medium text-blue-200 shadow-xl backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            Trusted by carriers nationwide
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Know Your Driver{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
              Before They Haul
            </span>{" "}
            Your Load
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
            The premium platform for carriers and dispatchers to verify driver
            reputation, file reports, and make data-driven hiring decisions in the
            trucking industry.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-base bg-white text-slate-900 shadow-xl shadow-white/10 hover:bg-slate-100 hover:shadow-white/20 border-none relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 block h-full w-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full opacity-0 group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </Button>
            </Link>
            <Link href="/driver-check">
              <Button variant="outline" size="lg" className="h-14 px-8 text-base border-slate-700 bg-slate-800/50 text-white backdrop-blur-md hover:border-slate-500 hover:bg-slate-700/50 hover:text-white">
                <svg className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Check a Driver
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle bottom separator fading into the next white section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* How It Works */}
      <section className="relative bg-slate-50 px-6 py-28 overflow-hidden border-t border-slate-200/50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="inline-flex items-center rounded-full bg-blue-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-sm ring-1 ring-blue-600/10">
              Simple Process
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative text-center group flex flex-col items-center px-6 py-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl shadow-blue-500/30 transform transition-transform duration-300 group-hover:scale-110 mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Search by DL</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Enter a driver&apos;s DL number to instantly see their
                reputation score and report history.
              </p>
            </div>
            {/* Step 2 */}
            <div className="relative text-center group flex flex-col items-center px-6 py-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-orange-500/30 transform transition-transform duration-300 group-hover:scale-110 mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">File Reports</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Document incidents like late deliveries, cargo damage, or
                professional conduct issues privately and securely.
              </p>
            </div>
            {/* Step 3 */}
            <div className="relative text-center group flex flex-col items-center px-6 py-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl shadow-teal-500/30 transform transition-transform duration-300 group-hover:scale-110 mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Make Better Decisions</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Use our data-driven reputation scores to hire reliable drivers and
                massively reduce operational risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200/60 bg-gradient-to-br from-slate-50 to-blue-50/30 px-6 py-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">100%</p>
            <p className="mt-2 text-sm font-medium text-slate-500">Starting driver score</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">DL</p>
            <p className="mt-2 text-sm font-medium text-slate-500">Search by DL number</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">48hr</p>
            <p className="mt-2 text-sm font-medium text-slate-500">Dispute window for drivers</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-28 text-center ring-1 ring-white/10 shadow-2xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[120px] mix-blend-screen" />
        </div>
        <div className="relative mx-auto max-w-3xl z-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Ready to Make Smarter Hiring Decisions?
          </h2>
          <p className="mt-6 text-xl text-blue-100/70 font-medium">
            Join carriers and dispatchers who trust Report Market to mitigate risk and increase reliability.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-white text-slate-900 border-none hover:bg-slate-100 shadow-xl shadow-white/10 hover:shadow-white/25 sm:w-auto h-14 px-10 text-base"
              >
                Register Now
                <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href="/driver-check">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-slate-700 bg-slate-800/40 text-slate-200 backdrop-blur-md hover:border-slate-500 hover:bg-slate-700/60 hover:text-white sm:w-auto h-14 px-10 text-base"
              >
                I&apos;m a Driver
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-slate-50/50 px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-700">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            Report Market
          </Link>
          <p className="text-sm text-slate-400">
            Driver reputation platform for the US trucking industry.
          </p>
          <div className="text-xs text-slate-300">
            &copy; {new Date().getFullYear()} Report Market. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
