import Link from "next/link";

const quickLinks = [
  { href: "/#top", label: "首頁" },
  { href: "/#fruits", label: "精選品種" },
  { href: "/#why", label: "我們的堅持" },
  { href: "/blog", label: "芒果誌" },
  { href: "/#contact", label: "聯絡我們" },
];

const socials = [
  { href: "#", label: "Facebook", mark: "FB" },
  { href: "#", label: "Instagram", mark: "IG" },
  { href: "#", label: "LINE", mark: "LN" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* 品牌介紹 */}
          <div>
            <Link href="/#top" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-ink font-serif text-base text-paper">
                芒
              </span>
              <span className="font-serif text-lg font-medium tracking-tight text-ink">
                台灣芒果
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              來自台南玉井、屏東枋山的台灣芒果，果園直採、當日分級、冷藏配送到您手中。
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center border border-line text-[10px] font-semibold tracking-wide text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {s.mark}
                </a>
              ))}
            </div>
          </div>

          {/* 快速連結 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">
              快速連結
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-soft">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-rust">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink">
              聯絡資訊
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-ink-soft">
              <li>
                <a href="mailto:hello@taiwanmango.tw" className="transition-colors hover:text-rust">
                  hello@taiwanmango.tw
                </a>
              </li>
              <li>06-123-4567</li>
              <li>台南市玉井區芒果路 1 號</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} 台灣芒果 Taiwan Mango. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-rust">
              隱私權政策
            </a>
            <a href="#" className="transition-colors hover:text-rust">
              服務條款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
