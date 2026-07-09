import Link from 'next/link';

const footerLinks = {
    Shop: ["Notebooks", "Pens", "Accessories"],
    About: ["Our Story", "Careers", "Sustainability"],
    Support: ["Contact Us", "FAQs", "Shipping & Returns"]
}

export default function Footer() {
    return (
        <footer className='border-t border-neutral-100 px-10 pt-12 pb-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-12'>
                <div className='flex flex-col gap-4'>
                    <span className='text-lg font-medium tracking-[0.25em]'>EAZY</span>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-45">
                        Minimal stationery for everyday focus. Made to last, designed to
                        inspire.
                    </p>
                </div>

                {Object.entries(footerLinks).map(([group, links]) => (
                    <div key={group}>
                        <p className='text-xs font-medium tracking-widest text-neutral-900 mb-4 uppercase'>{group}</p>
                        <ul className='flex flex-col gap-2.5'>
                            {links.map((link) => (
                                <li key={link}>
                                    <Link href='#' className='text-sm text-neutral-900 mb-4 font-medium tracking-widest uppercase'>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                ))}

            </div>
            <div className='border-t border-neutral-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-3'>
                <p className='text-xs text-neutral-400'>
                    © 2026 EAZY. All rights reserved.
                </p>
                <div className='flex gap-6'>
                    {["Privacy Policy", "Terms", "Cookies"].map((link) => (
                        <Link key={link} 
                         href='#'
                         className='text-xs text-neutral-400 hover:text-neutral-900 transition-colors'>
                            {link}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}