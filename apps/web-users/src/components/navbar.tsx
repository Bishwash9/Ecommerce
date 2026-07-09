"use client";

import { useRouter } from "next/navigation";
import link from "next/link";
import { authService } from "@/app/services/authService";
import Link from "next/link";

interface NavbarProps {
    isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authService.logout();
            router.refresh(); //Refresh the page to update the server side cookies
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className='flex items-center justify-between px-10 py-5 border-b border-neutral-100'>
            <Link href='/' className="text-xl font-medium tracking-[0.25em] text-neutral-900">
                EAZY
            </Link>

            <div className='hidden md:flex items-center gap-8'>
                {["Shop", "About", "Home"].map((link) => (
                    <Link
                        key={link}
                        href={`/${link.toLowerCase()}`}
                        className='text-sm font-medium tracking-[0.25em] text-neutral-500 hover:text-neutral-900 transition-colors'
                    >
                        {link}
                    </Link>
                ))}
            </div>

            <div className='flex items-center gap-5'>
                {isLoggedIn ? (
                    <>
                        <Link href='/profile' className='text-neutral-500 hover:text-neutral-900 transition-colors'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="8" r="4" />
                                <path d="M20 21a8 8 0 1 0-16 0" />
                            </svg>
                        </Link>
                        <Link href='/cart' className='relative text-neutral-500 hover:text-neutral-900 transition-colors'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" x2="21" y1="6" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                        </Link>

                        <button onClick={handleLogout}
                            className="text-neutral-500 hover:text-red-500 transition-colors">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                    <Link href='/login' className='text-neutral-500 hover:text-neutral-900 transition-colors'>
                        Login
                    </Link>
                    </>
                
                )}
            </div>

        </nav>
    )
}