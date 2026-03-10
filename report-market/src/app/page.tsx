import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl transition-all h-[72px] flex items-center shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold text-white group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg pr-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all group-hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] group-hover:scale-105">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="tracking-tight">Report Market</span>
          </Link>
          {session ? (
            <Link href="/dashboard" className="flex items-center gap-3 rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-all pl-2 pr-5 py-1.5 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-bold text-white shadow-sm">
                {session.user?.name
                  ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                  : "U"}
              </div>
              <span className="text-sm font-semibold text-slate-200">
                {session.user?.name || "Dashboard"}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors outline-none focus-visible:text-blue-500">
                Log in
              </Link>
              <Link href="/register">
                <Button size="sm" className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all px-6 py-2 rounded-full font-medium h-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="flex flex-col">
        {/* Hero Section (Dark Variant) */}
        <section className="relative pt-[180px] pb-24 lg:pt-[240px] lg:pb-32 overflow-hidden flex items-center justify-center selection:bg-indigo-500/30">
          {/* Background Layers */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            {/* High-quality cinematic truck image */}
            <div
              className="absolute inset-0 bg-[url('/dark_truck_bg.png')] bg-cover bg-center bg-no-repeat"
              style={{ opacity: 0.75 }}
            ></div>

            {/* Dark gradient fade — preserves image in upper-center, fades edges/bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/35 to-slate-950"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40"></div>

            {/* Subtle colored atmosphere orbs */}
            <div className="absolute top-[0%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/15 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/15 blur-[120px]"></div>
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center z-20">

            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
              Know Your Driver <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 drop-shadow-sm">
                Before They Haul
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
              The premium platform for carriers and dispatchers to verify driver
              reputation, file reports, and make data-driven hiring decisions in the
              trucking industry.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link href="/register" className="w-full sm:w-auto outline-none rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <Button size="lg" className="w-full h-14 px-8 rounded-full bg-white text-slate-900 font-semibold text-[1.05rem] hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] group border-0">
                  Start Verifying Free
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/driver-check" className="w-full sm:w-auto outline-none rounded-full focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <Button variant="outline" size="lg" className="w-full h-14 px-8 rounded-full border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white backdrop-blur-md font-semibold text-[1.05rem] transition-all shadow-sm">
                  <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                  Look up a driver
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-20 px-6 pb-24 bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Starting driver score", value: "100%", icon: "⭐" },
                { label: "Search by DL number", value: "Instant", icon: "⚡" },
                { label: "Dispute window", value: "48 hours", icon: "⏱" }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-8 hover:bg-slate-900 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-extrabold text-white mb-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works (Light Variant) */}
        <section className="py-24 relative overflow-hidden bg-slate-50 border-y border-slate-200">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reliability</span></h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">An ecosystem designed to protect your freight and reward the industry&apos;s best drivers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="group relative bg-white/50 border border-slate-200/50 backdrop-blur-sm rounded-[2.5rem] p-10 hover:border-blue-300 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500"></div>
                <div className="h-16 w-16 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Instant Search</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Enter a driver&apos;s CDL number to instantly see their comprehensive reputation score and verified report history.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white/50 border border-slate-200/50 backdrop-blur-sm rounded-[2.5rem] p-10 hover:border-indigo-300 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(99,102,241,0.08)] hover:-translate-y-1 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500"></div>
                <div className="h-16 w-16 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">2. File Reports</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Document critical incidents securely. Whether it&apos;s stellar performance or cargo issues, help maintain industry standards.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white/50 border border-slate-200/50 backdrop-blur-sm rounded-[2.5rem] p-10 hover:border-cyan-300 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(6,182,212,0.08)] hover:-translate-y-1 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500"></div>
                <div className="h-16 w-16 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Better Decisions</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Mitigate massive operational risk. Hire the best and ensure your loads are in safe, proven hands every single time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section (Dark Variant) */}
        <section className="relative py-32 overflow-hidden bg-slate-950">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('/fleet_trucks.png')] bg-cover bg-center bg-no-repeat" style={{ opacity: 0.6 }}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50"></div>
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
              Ready to Upgrade Your <br className="hidden sm:block" /> Hiring Process?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Join thousands of carriers and dispatchers who trust Report Market to mitigate risk and increase operational reliability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/register" className="w-full sm:w-auto outline-none rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <Button size="lg" className="w-full h-14 px-10 rounded-full bg-blue-600 text-white border-0 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] font-semibold text-[1.05rem]">
                  Join for Free
                </Button>
              </Link>
              <Link href="/driver-check" className="w-full sm:w-auto outline-none rounded-full focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                <Button variant="outline" size="lg" className="w-full h-14 px-10 rounded-full border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white backdrop-blur-md font-semibold text-[1.05rem] transition-all shadow-sm">
                  I&apos;m a Driver
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Light Variant) */}
      <footer className="border-t border-slate-200 bg-white px-6 py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg pr-2 py-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/10">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            Report Market
          </Link>
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Report Market. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium outline-none focus-visible:text-blue-600">Privacy Policy</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium outline-none focus-visible:text-blue-600">Terms of Service</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium outline-none focus-visible:text-blue-600">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
