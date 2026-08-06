import Image from "next/image";
import about1 from "../../app/assets/about1.jpeg"; 
import about2 from "../../app/assets/about2.jpeg";


export default function Info() {

    return ( 
        <section className='px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 bg-stone-50'>
            <div className='mx-auto max-w-7xl'>

                <div className='text-center mx-auto max-w-2xl'>
                    <h2 className='max-w-2xl text-3xl leading-tight text-stone-900 sm:text-4xl '>
                        Our <span className='text-amber-700'>Journey</span>
                    </h2>   
                </div>

                <div className="grid items-center gap-8  py-10 md:grid-cols-12 md:gap-12 lg:py-16">
                    <div className="relative aspect-square overflow-hidden bg-stone-100 md:col-span-5">
                        <Image
                            src={about1}
                            alt="The beginning of Eazy stationery"
                            fill
                            sizes="(max-width: 768px) 100vw, 42vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="md:col-span-7 md:px-6 lg:px-12">
                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-stone-400 underline underline-offset-3">
                            Established in 2024
                        </p>

                        <h3 className="mt-4 font-serif text-2xl text-stone-900 sm:text-3xl">
                            Started with a love for writing
                        </h3>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
                            Eazy began with a simple belief: everyday stationery
                            should feel useful, thoughtful and enjoyable. We select
                            products that help students, professionals and creators
                            turn their ideas into something real.
                        </p>

                       
                        <dl className="mt-8 grid grid-cols-3 border-y border-stone-200 py-6">
                            <div>
                                <dd className="text-xl font-medium text-stone-900">
                                    2024
                                </dd>
                                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-stone-400">
                                    Established
                                </dt>
                            </div>

                            <div className="border-x border-stone-200 px-5">
                                <dd className="text-xl font-medium text-stone-900">
                                    100+
                                </dd>
                                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-stone-400">
                                    Clients
                                </dt>
                            </div>

                            <div className="pl-5">
                                <dd className="text-xl font-medium text-stone-900">
                                    50+
                                </dd>
                                <dt className="mt-1 text-[9px] uppercase tracking-[0.2em] text-stone-400">
                                    Products
                                </dt>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className='grid items-center gap-8 pt-10 md:grid-cols-12 md:gap-12 lg:pt-16'>
                    <div className='md:col-span-5 md:pr-16 lg:pr-12'>
                        <p className='text-xs font-medium uppercase tracking-[0.25em] text-stone-400 underline underline-offset-3'>
                            Made for everyday life
                        </p>
                        <h3 className="mt-4  text-2xl text-stone-900 sm:text-3xl">
                            Simple products, carefully selected
                        </h3>
                        <p className="mt-5 text-sm leading-7 text-stone-600 sm:text-base">
                            From notebooks and fountain pens to planners and desk
                            essentials, our collection focuses on practical design,
                            lasting quality and a clean aesthetic that fits naturally
                            into your everyday routine.
                        </p>
                    </div>

                    <div className="relative aspect-video overflow-hidden bg-stone-100 md:col-span-7">
                        <Image
                            src={about2}
                            alt="Eazy stationery collection"
                            fill
                            sizes="(max-width: 768px) 100vw, 58vw"
                            className="object-cover"
                        />
                    </div>

                </div>

            </div>
        </section>
    )
}