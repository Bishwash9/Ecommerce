import Link from "next/dist/client/link";
import Image from "next/image";
import heroImage from "../../app/assets/hero.png";

export default function Hero() {
    return (
        <section className="relative isolate min-h-140 overflow-hidden ">
      <Image
        src={heroImage}
        alt="hero image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-transparent" />

      <div className="relative z-10 flex min-h-140 items-start">
        <div className="max-w-xl px-7 pt-14 sm:px-12 sm:pt-18 lg:px-16 lg:pt-20">
          <span className="text-[11px] font-medium tracking-[0.28em] text-amber-300 uppercase">
            New Arrivals - Summer 2026
          </span>

          <h1 className="mt-5 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            Write more.
            <br />
            <span className="font-normal text-amber-100/80">
              Think clearer.
            </span>
          </h1>

          <p className='mt-5 max-w-sm text-sm leading-7 text-white/70 sm:text-base'>
                Minimal stationery designed for everyday focus. Notebooks,
                pens, planners and desk essentials.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                    href="/shop"
                    className="rounded-md border border-amber-100/80 bg-amber-100/80 px-7 py-3.5 text-xs font-semibold tracking-widest text-white transition"
                >
                    SHOP NOW
                </Link>

                <Link
                    href="/about"
                    className="rounded-md border border-white/30 bg-white/5 px-7 py-3.5 text-xs tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-950 duration-300"
                >
                    LEARN MORE
                </Link>
            </div>
        </div>
      </div>
    </section>
    )
}