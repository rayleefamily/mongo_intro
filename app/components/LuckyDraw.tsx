"use client";

import { useEffect, useState } from "react";

const WIN_CHANCE = 0.1;

export default function LuckyDraw() {
  const [isOpen, setIsOpen] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleDraw = () => {
    setWon(Math.random() < WIN_CHANCE);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDraw}
        className="bg-rust px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-wine"
      >
        抽芒果優惠券
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-sm border border-line bg-paper p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="關閉"
              className="absolute right-3 top-3 text-ink-soft transition-colors hover:text-ink"
            >
              ✕
            </button>

            {won ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
                  恭喜中獎
                </p>
                <h3 className="mt-3 font-serif text-2xl text-ink">芒果九折優惠券</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  結帳時出示此畫面，即可享全站芒果商品九折優惠。
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
                  再接再厲
                </p>
                <h3 className="mt-3 font-serif text-2xl text-ink">銘謝惠顧</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  這次沒有抽中優惠券，歡迎再試一次！
                </p>
              </>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-8 border border-ink/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </>
  );
}
