import { Play } from "lucide-react";

export const WATCH_URL =
  "https://millions.co/simon-marcus-mma/streams/sfl-1-mma-muay-thai-jui-jitsu-cage";

export function WatchBanner() {
  return (
    <a
      href={WATCH_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative z-50 block w-full bg-red-600 text-white transition-colors hover:bg-red-700"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-3 px-4 py-2.5 sm:gap-x-5 sm:px-6">
        {/* Pulsing live dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span
            aria-hidden="true"
            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
          Live Now
          <span className="mx-2 opacity-60">/</span>
          <span className="hidden sm:inline">SFL 1 is streaming — </span>
          Watch Now
        </p>

        <span className="flex shrink-0 items-center gap-1.5 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 transition-transform group-hover:scale-105 sm:text-xs">
          <Play className="h-3 w-3 fill-current" />
          Watch
        </span>
      </div>
    </a>
  );
}