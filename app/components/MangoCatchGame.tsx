"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAME_DURATION = 15; // seconds
const GAME_WIDTH = 300;
const GAME_HEIGHT = 400;
const BASKET_WIDTH = 84;
const BASKET_HEIGHT = 26;
const MANGO_SIZE = 38;
const FALL_SPEED = 110; // px per second
const SPAWN_INTERVAL = 480; // ms
const KEYBOARD_SPEED = 300; // px per second
const WIN_SCORE = 30;

type ItemKind = "mango-common" | "mango-rare" | "bomb" | "knife";

const ITEM_TYPES: Record<
  ItemKind,
  {
    label: string;
    points: number;
    weight: number;
    group: "mango" | "hazard";
    skin: string;
  }
> = {
  "mango-common": {
    label: "愛文",
    points: 1,
    weight: 55,
    group: "mango",
    skin: "radial-gradient(circle at 32% 28%, #e7d27a 0%, #c1932f 45%, #b5502d 78%, #7a3b3b 100%)",
  },
  "mango-rare": {
    label: "金煌",
    points: 3,
    weight: 20,
    group: "mango",
    skin: "radial-gradient(circle at 32% 28%, #fff3b0 0%, #ffd873 40%, #e8a93c 75%, #c1932f 100%)",
  },
  bomb: {
    label: "炸彈",
    points: -4,
    weight: 15,
    group: "hazard",
    skin: "radial-gradient(circle at 35% 30%, #5c5c5c 0%, #2a2a2a 55%, #101010 100%)",
  },
  knife: {
    label: "小刀",
    points: -2,
    weight: 10,
    group: "hazard",
    skin: "linear-gradient(135deg, #eee6d3 0%, #d9cfb8 45%, #5c5646 100%)",
  },
};

const TOTAL_WEIGHT = Object.values(ITEM_TYPES).reduce((sum, t) => sum + t.weight, 0);

function pickItemKind(): ItemKind {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const [kind, info] of Object.entries(ITEM_TYPES) as [ItemKind, (typeof ITEM_TYPES)[ItemKind]][]) {
    if (r < info.weight) return kind;
    r -= info.weight;
  }
  return "mango-common";
}

type FallingItem = {
  id: number;
  x: number;
  y: number;
  kind: ItemKind;
};

type Status = "idle" | "playing" | "result";

export default function MangoCatchGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [mangoes, setMangoes] = useState<FallingItem[]>([]);
  const [basketX, setBasketX] = useState((GAME_WIDTH - BASKET_WIDTH) / 2);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const basketXRef = useRef(basketX);
  const keysRef = useRef({ left: false, right: false });
  const nextIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopLoops = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    rafRef.current = null;
    spawnTimerRef.current = null;
    countdownRef.current = null;
    lastTsRef.current = null;
  }, []);

  const startGame = () => {
    const startX = (GAME_WIDTH - BASKET_WIDTH) / 2;
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMangoes([]);
    setBasketX(startX);
    basketXRef.current = startX;
    nextIdRef.current = 0;
    setStatus("playing");
  };

  // Spawn mangoes + countdown timer while playing
  useEffect(() => {
    if (status !== "playing") return;

    spawnTimerRef.current = setInterval(() => {
      setMangoes((prev) => [
        ...prev,
        {
          id: nextIdRef.current++,
          x: Math.random() * (GAME_WIDTH - MANGO_SIZE),
          y: -MANGO_SIZE,
          kind: pickItemKind(),
        },
      ]);
    }, SPAWN_INTERVAL);

    countdownRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [status]);

  // Main animation loop: move basket + falling mangoes, detect catches
  useEffect(() => {
    if (status !== "playing") return;

    const step = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (keysRef.current.left) {
        basketXRef.current = Math.max(0, basketXRef.current - KEYBOARD_SPEED * dt);
        setBasketX(basketXRef.current);
      }
      if (keysRef.current.right) {
        basketXRef.current = Math.min(
          GAME_WIDTH - BASKET_WIDTH,
          basketXRef.current + KEYBOARD_SPEED * dt,
        );
        setBasketX(basketXRef.current);
      }

      const basketTop = GAME_HEIGHT - BASKET_HEIGHT - 8;

      setMangoes((prev) => {
        const next: FallingItem[] = [];
        let delta = 0;
        for (const m of prev) {
          const y = m.y + FALL_SPEED * dt;
          const withinBasketX =
            m.x + MANGO_SIZE > basketXRef.current &&
            m.x < basketXRef.current + BASKET_WIDTH;
          const withinBasketY = y + MANGO_SIZE >= basketTop && y <= basketTop + BASKET_HEIGHT;

          if (withinBasketX && withinBasketY) {
            delta += ITEM_TYPES[m.kind].points;
            continue;
          }
          if (y > GAME_HEIGHT) continue;
          next.push({ ...m, y });
        }
        if (delta !== 0) setScore((s) => Math.max(0, s + delta));
        return next;
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [status]);

  // End game when the countdown reaches 0
  useEffect(() => {
    if (status === "playing" && timeLeft === 0) {
      stopLoops();
      setStatus("result");
    }
  }, [timeLeft, status, stopLoops]);

  // Reset everything once the modal is closed
  useEffect(() => {
    if (!isOpen) {
      stopLoops();
      setStatus("idle");
    }
  }, [isOpen, stopLoops]);

  // Keyboard controls
  useEffect(() => {
    if (status !== "playing") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keysRef.current.left = true;
      if (e.key === "ArrowRight") keysRef.current.right = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keysRef.current.left = false;
      if (e.key === "ArrowRight") keysRef.current.right = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      keysRef.current = { left: false, right: false };
    };
  }, [status]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (status !== "playing" || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - BASKET_WIDTH / 2;
    const clamped = Math.max(0, Math.min(GAME_WIDTH - BASKET_WIDTH, x));
    basketXRef.current = clamped;
    setBasketX(clamped);
  };

  const won = score > WIN_SCORE;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          startGame();
        }}
        className="bg-mustard px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-paper"
      >
        接芒果小遊戲
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/70 px-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-sm border border-line bg-paper p-6 text-center shadow-xl"
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

            <h3 className="font-serif text-xl text-ink">接芒果大挑戰</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              15 秒內用籃子接住芒果，得分超過 {WIN_SCORE} 分即可獲得九折優惠券！
              <br />
              圓潤果實是芒果（金煌 +3、愛文 +1），菱形是危險物（炸彈 -4、小刀 -2），小心別接到！
            </p>

            {status !== "idle" && (
              <div className="mt-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
                <span>分數：{score}</span>
                <span>剩餘時間：{timeLeft}s</span>
              </div>
            )}

            {status === "playing" && (
              <div
                ref={gameAreaRef}
                onPointerMove={handlePointerMove}
                className="relative mx-auto mt-4 touch-none overflow-hidden border border-line bg-paper-soft"
                style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
              >
                {mangoes.map((m) => {
                  const info = ITEM_TYPES[m.kind];
                  const isMango = info.group === "mango";
                  return (
                    <div
                      key={m.id}
                      className="absolute"
                      style={{ width: MANGO_SIZE, height: MANGO_SIZE, left: m.x, top: m.y }}
                    >
                      {isMango ? (
                        <>
                          <div
                            className="absolute inset-0 shadow-md"
                            style={{
                              background: info.skin,
                              borderRadius: "58% 42% 55% 45% / 55% 65% 35% 45%",
                              boxShadow:
                                "inset -5px -5px 9px rgba(0,0,0,0.3), inset 3px 3px 6px rgba(255,255,255,0.4)",
                            }}
                          />
                          <div
                            className="absolute h-2.5 w-1.5 rounded-sm bg-olive"
                            style={{ top: -3, left: "48%", transform: "rotate(18deg)" }}
                          />
                        </>
                      ) : (
                        <div
                          className="absolute inset-0 rotate-45 rounded-md shadow-md"
                          style={{
                            background: info.skin,
                            boxShadow:
                              "inset -4px -4px 8px rgba(0,0,0,0.35), inset 3px 3px 5px rgba(255,255,255,0.2)",
                          }}
                        />
                      )}
                      <span className="absolute -right-1 -top-1 rounded-full bg-paper px-1 text-[9px] font-bold leading-tight text-ink shadow">
                        {info.points > 0 ? `+${info.points}` : info.points}
                      </span>
                    </div>
                  );
                })}
                <div
                  className="absolute rounded-t-full bg-rust"
                  style={{
                    width: BASKET_WIDTH,
                    height: BASKET_HEIGHT,
                    left: basketX,
                    top: GAME_HEIGHT - BASKET_HEIGHT - 8,
                  }}
                />
                <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-ink-soft/70">
                  移動滑鼠或用方向鍵控制籃子
                </p>
              </div>
            )}

            {status === "result" && (
              <div className="mt-6">
                {won ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
                      恭喜過關
                    </p>
                    <h4 className="mt-2 font-serif text-2xl text-ink">芒果九折優惠券</h4>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      得分 {score} 分！結帳時出示此畫面，即可享全站芒果商品九折優惠。
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
                      再接再厲
                    </p>
                    <h4 className="mt-2 font-serif text-2xl text-ink">得分 {score} 分</h4>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      超過 {WIN_SCORE} 分才能獲得優惠券，再玩一次試試看！
                    </p>
                  </>
                )}
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={startGame}
                    className="bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-rust"
                  >
                    再玩一次
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="border border-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-ink"
                  >
                    關閉
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
