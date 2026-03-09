"use client";

import { useState, useMemo, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  maxDate?: string;
  label?: string;
  required?: boolean;
}

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmt(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function DatePicker({ value, onChange, maxDate, label, required }: DatePickerProps) {
  const today = new Date();
  const todayStr = fmt(today.getFullYear(), today.getMonth(), today.getDate());
  const max = maxDate || todayStr;

  const init = value ? new Date(value + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    let offset = first.getDay() - 1;
    if (offset < 0) offset = 6;
    const count = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevCount = new Date(viewYear, viewMonth, 0).getDate();
    const result: { day: number; month: number; year: number; cur: boolean }[] = [];

    for (let i = offset - 1; i >= 0; i--) {
      const pm = viewMonth === 0 ? 11 : viewMonth - 1;
      const py = viewMonth === 0 ? viewYear - 1 : viewYear;
      result.push({ day: prevCount - i, month: pm, year: py, cur: false });
    }
    for (let d = 1; d <= count; d++) {
      result.push({ day: d, month: viewMonth, year: viewYear, cur: true });
    }
    const rem = 42 - result.length;
    for (let d = 1; d <= rem; d++) {
      const nm = viewMonth === 11 ? 0 : viewMonth + 1;
      const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
      result.push({ day: d, month: nm, year: ny, cur: false });
    }
    return result;
  }, [viewYear, viewMonth]);

  function nav(dir: -1 | 1) {
    const m = viewMonth + dir;
    if (m < 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else if (m > 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(m);
  }

  function pick(dateStr: string) {
    if (dateStr > max) return;
    onChange(dateStr);
    const d = new Date(dateStr + "T00:00:00");
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setOpen(false);
  }

  function quick(offset: number) {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    pick(fmt(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  function isQuick(offset: number): boolean {
    if (!value) return false;
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return value === fmt(d.getFullYear(), d.getMonth(), d.getDate());
  }

  const displayValue = value
    ? `${MONTHS_SHORT[Number(value.split("-")[1]) - 1]} ${Number(value.split("-")[2])}, ${value.split("-")[0]}`
    : "";

  return (
    <div className="space-y-2" ref={ref}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      {/* Trigger input */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 text-left text-sm transition-all hover:border-slate-300 ${
          open ? "border-amber-400 ring-2 ring-amber-100" : "border-slate-200"
        }`}
      >
        <svg className="h-4 w-4 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <span className={value ? "font-medium text-slate-700" : "text-slate-400"}>
          {displayValue || "Select a date"}
        </span>
        <svg className={`ml-auto h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Popup calendar */}
      {open && (
        <div className="rounded-xl border-2 border-slate-200 bg-white p-3 shadow-lg">
          {/* Quick select */}
          <div className="mb-3 flex gap-1.5">
            {([
              { label: "Today", offset: 0 },
              { label: "Yesterday", offset: 1 },
              { label: "Last Week", offset: 7 },
            ] as const).map(({ label: l, offset: o }) => (
              <button
                key={l}
                type="button"
                onClick={() => quick(o)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                  isQuick(o)
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Month nav */}
          <div className="mb-2 flex items-center justify-between">
            <button type="button" onClick={() => nav(-1)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <span className="text-xs font-bold text-slate-700">
              {MONTHS_SHORT[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={() => nav(1)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {DAYS.map((d) => (
              <div key={d} className="pb-1 text-center text-xs font-semibold text-slate-400">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {days.map((d, i) => {
              const dateStr = fmt(d.year, d.month, d.day);
              const sel = value === dateStr;
              const dis = dateStr > max;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={dis}
                  onClick={() => pick(dateStr)}
                  className={`flex h-7 items-center justify-center rounded-md text-xs transition-all ${
                    sel
                      ? "bg-amber-500 font-bold text-white"
                      : dis
                        ? "cursor-not-allowed text-slate-200"
                        : !d.cur
                          ? "text-slate-300 hover:bg-slate-50"
                          : todayStr === dateStr
                            ? "font-semibold text-amber-600 ring-2 ring-amber-200 hover:bg-amber-50"
                            : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {d.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
