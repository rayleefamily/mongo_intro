import Image from "next/image";
import Parallax from "./components/Parallax";
import LuckyDraw from "./components/LuckyDraw";
import Greeting from "./components/Greeting";
import MangoCatchGame from "./components/MangoCatchGame";
import NewsletterSignup from "./components/NewsletterSignup";

type Mango = {
  name: string;
  enName: string;
  season: string;
  desc: string;
  image: string;
};

const mangoes: Mango[] = [
  {
    name: "愛文芒果",
    enName: "Irwin Mango",
    season: "4 – 8 月",
    desc: "台南玉井經典品種，果肉細緻多汁、香氣濃郁，是台灣芒果的代表門面。",
    image: "/images/mango-1.jpg",
  },
  {
    name: "金煌芒果",
    enName: "Jinhwang Mango",
    season: "6 – 8 月",
    desc: "果實碩大金黃、纖維細滑幾乎無渣，甜度高，是送禮首選大果品種。",
    image: "/images/mango-5.jpg",
  },
  {
    name: "台農一號 紅龍芒果",
    enName: "Tainung No.1",
    season: "5 – 9 月",
    desc: "外皮豔紅、香氣奔放，甜中帶微酸的層次風味，果農市集人氣款。",
    image: "/images/mango-3.jpg",
  },
  {
    name: "玉文芒果",
    enName: "Yuwen Mango",
    season: "7 – 9 月",
    desc: "夏末壓軸登場，果肉綿密如凍、入口即化，產量稀少格外珍貴。",
    image: "/images/mango-2.jpg",
  },
  {
    name: "冰鎮芒果切盤禮盒",
    enName: "Chilled Mango Box",
    season: "全年皆有",
    desc: "產地現切分裝急速冷藏，開箱即食，是消暑甜點與宴客的最佳選擇。",
    image: "/images/mango-4.jpg",
  },
];

const inSeason = mangoes.slice(0, 4);

const highlights = [
  {
    num: "01",
    title: "晨光採收 666",
    text: "趁著露水未乾，台南玉井、屏東枋山的老欉果園，一顆顆手工摘下枝頭。",
  },
  {
    num: "02",
    title: "靜候熟成 777",
    text: "不催熟、不搶快，沿用老欉工法靜待果香甦醒，直到甜度綻放的那一刻。",
  },
  {
    num: "03",
    title: "鮮甜直送",
    text: "採收後立即低溫鎖鮮，隔日直送到府，讓每一口都還留著果園的溫度。",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <Parallax speed={0.15} max={50} className="absolute inset-0">
            <Image
              src="/images/mango-1.jpg"
              alt="枝頭上熟成的台灣芒果"
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16 lg:py-32">
          <div>
            <Greeting />
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
              南台灣芒果直送
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.15] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              一口咬下<span className="italic text-mustard">台灣芒果</span>
              <br />
              的盛夏滋味
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/75">
              從台南玉井到屏東枋山，果農世代照顧的老欉果園，
              孕育出愛文、金煌、玉文等經典品種。我們只在最佳產季採收，直送到您家餐桌。
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#fruits"
                className="bg-paper px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-mustard"
              >
                查看精選芒果
              </a>
              <a
                href="#why"
                className="border border-paper/60 px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-paper"
              >
                了解我們
              </a>
              <LuckyDraw />
              <MangoCatchGame />
            </div>
          </div>

          <Parallax
            speed={0.08}
            max={16}
            className="border border-paper/30 bg-ink/40 p-6 backdrop-blur-sm sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/70">
              In Season · 本季精選
            </p>
            <ul className="mt-5 flex flex-col divide-y divide-paper/20">
              {inSeason.map((mango, i) => (
                <li key={mango.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xs text-paper/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-lg text-paper">{mango.name}</span>
                  </div>
                  <span className="text-xs tracking-wide text-paper/70">{mango.season}</span>
                </li>
              ))}
            </ul>
          </Parallax>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* Highlights */}
        <section
          id="why"
          className="grid gap-10 border-b border-line py-16 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-line md:gap-10"
        >
          {highlights.map((h) => (
            <div key={h.title} className="sm:px-5 sm:first:pl-0 sm:last:pr-0 md:px-8">
              <Parallax speed={0.1} max={10}>
                <span className="font-serif text-sm text-rust">{h.num}</span>
              </Parallax>
              <h3 className="mt-2 font-serif text-xl text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{h.text}</p>
            </div>
          ))}
        </section>

        {/* Mango grid */}
        <section id="fruits" className="py-20">
          <div className="flex flex-col items-baseline justify-between gap-3 sm:flex-row">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rust">
                Selection
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">精選芒果品種</h2>
            </div>
            <p className="text-sm text-ink-soft">五種台灣經典芒果，一次品味夏季的甜蜜層次</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {mangoes.map((mango, i) => (
              <div key={mango.name} className="group flex flex-col bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Parallax speed={i % 2 === 0 ? 0.1 : -0.1} max={9} className="absolute inset-0">
                    <Image
                      src={mango.image}
                      alt={mango.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                      className="scale-110 object-cover transition-transform duration-500 group-hover:scale-[1.2]"
                    />
                  </Parallax>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-ink">{mango.name}</h3>
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-ink-soft">
                    {mango.enName}
                  </p>
                  <p className="mt-3 text-xs font-medium tracking-wide text-ink-soft">
                    產季　{mango.season}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{mango.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="pb-24">
          <div className="relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="absolute inset-0 bg-linear-to-br from-ink via-rust to-mustard" />
            <div className="absolute inset-0 bg-radial from-transparent via-ink/10 to-ink/60" />

            <h2 className="relative font-serif text-2xl text-paper sm:text-3xl lg:text-4xl">
              品嚐最新鮮的台灣芒果
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-sm leading-relaxed text-paper/85">
              想了解當季芒果箱或大宗採購？歡迎與我們聯繫，我們將為您送上最新鮮的台灣芒果。
            </p>
            <a
              href="mailto:hello@taiwanmango.tw"
              className="relative mt-8 inline-block border border-paper/60 px-8 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              hello@taiwanmango.tw
            </a>

            <NewsletterSignup />
          </div>
        </section>
      </div>
    </div>
  );
}
