import { getDriverByCdl } from "@/features/drivers/queries";
import { DriverProfile } from "@/features/drivers/components/DriverProfile";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { auth } from "@/server/auth";
import Link from "next/link";

interface DriverPageProps {
  params: Promise<{ cdl: string }>;
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { cdl } = await params;
  const decodedCdl = decodeURIComponent(cdl);
  const driver = await getDriverByCdl(decodedCdl);

  if (!driver) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-4">
        <div className="mx-auto w-full max-w-md pt-8">
          <Link
            href="/driver-check"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center pb-16">
          <div className="w-full max-w-md">
            <Card className="!p-8">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
                <h1 className="mt-5 text-xl font-bold text-slate-800">
                  Driver Not Found
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  No driver found with CDL number:
                </p>
                <p className="mx-auto mt-2 inline-block rounded-xl bg-slate-100 px-4 py-2 font-mono text-sm font-bold text-slate-700">
                  {decodedCdl}
                </p>
                <p className="mt-4 text-xs text-slate-300">
                  This means no reports have been filed for this driver yet.
                </p>
                <div className="mt-6">
                  <Link href="/driver-check">
                    <Button variant="outline" className="w-full">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Try Another Search
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/driver-check"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </Link>
        </div>
        <DriverProfile driver={driver} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
