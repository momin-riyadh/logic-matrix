"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { testimonials, TestimonialItem } from "./landing-data";

/* ─── Constants ─────────────────────────────────── */
const TOTAL = testimonials.length;
const GAP = 8; // 8px (gap-2 in tailwind is 0.5rem = 8px)
const INTERVAL = 3000;

/* ─── Helpers ───────────────────────────────────── */
/**
 * Wraps an index around the total number of testimonials.
 */
function wrap(i: number) {
    return ((i % TOTAL) + TOTAL) % TOTAL;
}

/**
 * Determines number of columns based on window width.
 */
function getCols(w: number) {
    if (w < 520) return 1;
    if (w < 820) return 2;
    return 3;
}

/* ─── Star Rating ────────────────────────────────── */
const STAR_PATH =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarRow() {
    return (
        <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d={STAR_PATH} />
                </svg>
            ))}
        </div>
    );
}

/* ─── Single Testimonial Card ────────────────────── */
function Card({ t, delay }: { t: TestimonialItem; delay: number }) {
    return (
        <div
            className="bg-white rounded-[20px] border border-[#daeeff] p-6 flex flex-col gap-3 min-w-0 animate-[cardIn_0.38s_ease-out_both]"
            style={{
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                animationDelay: `${delay}ms`,
            }}
        >
            <p className="text-[15px] font-bold text-slate-900 m-0">{t.title}</p>
            <p className="text-[13px] text-slate-500 leading-7 flex-1 m-0">{t.quote}</p>
            <div className="flex items-center gap-[10px] pt-3 border-t border-slate-100 mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={t.avatar}
                    alt={t.name}
                    width={38}
                    height={38}
                    loading="lazy"
                    className="w-[38px] h-[38px] rounded-full object-cover border-2 border-sky-200 flex-shrink-0"
                />
                <div>
                    <p className="text-[13px] font-bold text-slate-800 m-0">{t.name}</p>
                    <p className="text-[11px] text-slate-400 mt-[2px] mb-0">{t.role}</p>
                </div>
            </div>
        </div>
    );
}

/* ─── Arrow Button ───────────────────────────────── */
function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            aria-label={side === "left" ? "Previous" : "Next"}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-[38px] h-[38px] rounded-full bg-white border-[1.5px] border-[#daeeff] shadow-[0_2px_10px_rgba(0,0,0,0.10)] flex items-center justify-center cursor-pointer text-slate-500 transition-all p-0 hover:text-sky-400 hover:border-sky-300 hover:scale-110 ${
                side === "left" ? "-left-[19px]" : "-right-[19px]"
            }`}
        >
            <svg width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                />
            </svg>
        </button>
    );
}

/* ─── Main Component ─────────────────────────────── */
export default function TestimonialsSlider() {
    /* -- state ---------------------------------------- */
    const [current, setCurrent] = useState(0);
    const [cols, setCols] = useState(3); // default 3 for SSR / desktop
    const [renderKey, setRenderKey] = useState(0); // bumped each slide to re-trigger animation
    const [ratingH, setRatingH] = useState<number | undefined>(undefined);

    /* -- refs ----------------------------------------- */
    const currentRef = useRef(0);
    const pausedRef = useRef(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    /* -- navigation ----------------------------------- */
    function goTo(idx: number) {
        const n = wrap(idx);
        currentRef.current = n;
        setCurrent(n);
        setRenderKey((k) => k + 1);
    }

    function goNext() {
        goTo(currentRef.current + 1);
    }

    function goPrev() {
        goTo(currentRef.current - 1);
    }

    /* -- responsive cols (synchronous before paint) --- */
    useLayoutEffect(() => {
        setCols(getCols(window.innerWidth));

        const onResize = () => setCols(getCols(window.innerWidth));
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /* -- sync rating card height ---------------------- */
    useEffect(() => {
        function sync() {
            if (window.innerWidth < 680 || !trackRef.current) {
                setRatingH(undefined);
                return;
            }
            const children = Array.from(trackRef.current.children) as HTMLElement[];
            const max = children.reduce((m, el) => Math.max(m, el.offsetHeight), 0);
            if (max > 0) setRatingH(max);
        }

        const id = setTimeout(sync, 80);
        return () => clearTimeout(id);
    }, [renderKey, cols]);

    /* -- auto-slide (never stale, reads refs) --------- */
    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (!pausedRef.current) goNext();
        }, INTERVAL);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* -- current window of visible cards -------------- */
    const slides = Array.from({ length: cols }, (_, i) => testimonials[wrap(current + i)]);

    return (
        <>
            {/* Global keyframe — injected once into <head> area */}
            <style>{`
                @keyframes cardIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <section className="w-full py-16 px-8 font-inherit">
                {/* ── Row: Rating + Slider ── */}
                <div
                    className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-5 items-stretch"
                >
                    {/* ── Fixed Rating Card ── */}
                    <div
                        className="flex-shrink-0 w-full md:w-[210px] bg-white rounded-[20px] border border-[#daeeff] shadow-[0_4px_20px_rgba(56,189,248,0.08)] flex flex-row md:flex-col items-center justify-center gap-5 md:gap-3.5 p-5 md:py-9 md:px-5"
                        style={{ height: ratingH }}
                    >
                        <span className="text-[clamp(48px,5.5vw,64px)] font-black text-slate-900 leading-none tracking-[-4px]">
                            4.9
                        </span>
                        <div className="flex flex-col items-center gap-2">
                            <StarRow />
                            <div className="text-center">
                                <p className="text-[15px] font-extrabold text-slate-800 m-0">483+</p>
                                <p className="text-[12px] text-slate-400 mt-[3px] mb-0">Positive Reviews</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Slider ── */}
                    <div
                        className="flex-1 min-w-0 relative"
                        onMouseEnter={() => (pausedRef.current = true)}
                        onMouseLeave={() => (pausedRef.current = false)}
                    >
                        {/* overflow clip */}
                        <div className="overflow-hidden rounded-[20px]">
                            {/* track — CSS grid, always renders cards */}
                            <div
                                ref={trackRef}
                                key={renderKey}
                                className="grid"
                                style={{
                                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                                    gap: `${GAP}px`,
                                }}
                            >
                                {slides.map((t, i) => (
                                    <Card key={`${t.id}-${renderKey}`} t={t} delay={i * 55} />
                                ))}
                            </div>
                        </div>

                        <Arrow side="left" onClick={goPrev} />
                        <Arrow side="right" onClick={goNext} />
                    </div>
                </div>

                {/* ── Dots ── */}
                <div className="flex justify-center gap-2 mt-7">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Slide ${i + 1}`}
                            className={`h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ease-in-out ${
                                i === current ? "w-[22px] bg-sky-400" : "w-2 bg-slate-300"
                            }`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
