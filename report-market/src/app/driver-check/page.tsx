import { CdlLookupForm } from "@/features/drivers/components/CdlLookupForm";
import Link from "next/link";

export default function DriverCheckPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[100px] pointer-events-none"></div>

      {/* Back button */}
      <div className="relative z-10 mx-auto w-full max-w-md pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-all hover:text-slate-800 bg-white/60 px-4 py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/60 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center pb-16 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 text-2xl font-bold text-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-500/30">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              Report Market
            </Link>
            <h1 className="mt-8 text-3xl font-extrabold text-slate-900 tracking-tight">
              Check Driver Rating
            </h1>
            <p className="mt-3 text-base text-slate-500 font-medium pb-4">
              Look up any driver&apos;s reputation score by their CDL number
            </p>
          </div>

          <div className="relative w-full z-20 mt-4 max-w-2xl mx-auto">
            <CdlLookupForm />
          </div>

          <div className="space-y-6 text-center mt-6">
            <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-2 shadow-sm bg-white/60 px-3 py-1 rounded-full border border-slate-200/50">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                80-100%
              </span>
              <span className="flex items-center gap-2 shadow-sm bg-white/60 px-3 py-1 rounded-full border border-slate-200/50">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                50-79%
              </span>
              <span className="flex items-center gap-2 shadow-sm bg-white/60 px-3 py-1 rounded-full border border-slate-200/50">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                0-49%
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Drivers can check their own rating here — no registration required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
