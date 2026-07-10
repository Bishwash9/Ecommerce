import Link from 'next/link';
import Image from 'next/image';
import penImage from '../assets/FountainPen.jpeg'

export default async function HomePage() {
    return (
        <section className='grid md:grid-cols-2 min-h-105'>
            <div className='flex flex-col justify-center gap-6 px-10 py-16'>
                <span className='text-[11px] tracking-[0.25em] text-neutral-400 uppercase'>
                    New Arrivals - summer 2026
                </span>

                <h1 className='text-5xl font-medium leading-tight'>
                    Write more.
                    <br/>
                    <span className='text-neutral-400 font-normal'>Think clearer.</span>
                </h1>

                <p className='text-sm text-neutral-800 font-normal max-w-xs leading-relaxed'>
                    Minimal stationery designed for everyday focus. Notebooks, pens,
                    planners and desk essentials 
                </p>

                <div className='flex items-center gap-5 mt-2'>
                    <Link href='/shop' className=' text-white bg-neutral-900 text-xs tracking-widest px-7 py-3.5 rounded-md'>
                        Shop Now
                    </Link>
                    <Link href='/about' className='text-neutral-800 text-xs tracking-widest px-7 py-3.5 rounded-md border transition-colors hover:text-white hover:bg-neutral-900 duration-300 '>
                        Learn More
                    </Link>
                </div>

            </div>

            <div className='bg-neutral-50 flex items-center justify-center relative overflow-hidden'>
                <Image src={penImage} alt="Fountain Pen" className='relative z-10 object-contain rounded-md'/>
            </div>
        </section>
    )
}

