"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CdlLookupForm() {
  const [cdl, setCdl] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = cdl.toUpperCase().trim().replace(/\s+/g, "");
    if (normalized) {
      setIsSearching(true);
      router.push(`/drivers/${encodeURIComponent(normalized)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group flex items-center w-full p-2 bg-white/95 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/60 transition-all duration-300 focus-within:shadow-[0_8px_40px_rgba(59,130,246,0.12)] focus-within:border-blue-400 focus-within:bg-white backdrop-blur-md">
        <div className="pl-5 pr-3 text-blue-500 transition-colors group-focus-within:text-blue-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          name="cdl"
          value={cdl}
          onChange={(e) => setCdl(e.target.value)}
          placeholder="Enter CDL Number (e.g. TX12345678)"
          required
          className="flex-1 w-full bg-transparent border-none py-3 text-lg font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="ml-2 flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 sm:px-8 py-3.5 font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-70 whitespace-nowrap"
        >
          {isSearching ? (
            <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Search Driver"
          )}
        </button>
      </div>

      <p className="mt-5 text-center text-sm font-medium text-slate-500/80 flex items-center justify-center gap-1.5">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Look up reputation score and incident reports history
      </p>
    </form>
  );
}
