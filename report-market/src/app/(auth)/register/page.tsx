import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Card } from "@/shared/components/ui/Card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-4">
      {/* Back button */}
      <div className="mx-auto w-full max-w-md pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center pb-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              Report Market
            </Link>
            <h1 className="mt-6 text-2xl font-bold text-slate-800">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Register as a carrier or dispatcher to start filing reports
            </p>
          </div>
          <Card className="!p-8">
            <RegisterForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
