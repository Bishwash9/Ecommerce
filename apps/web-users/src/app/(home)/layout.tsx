import {cookies} from 'next/headers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default async function RootLayout({ children}: {children: React.ReactNode}) {
    const cookieStore = await cookies(); 
    const isLoggedIn = cookieStore.get('accessToken')?.value ? true : false;

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar isLoggedIn={isLoggedIn}/>
            <main className='grow container mx-auto px-4 py-8'>
                {children}
            </main>
            <Footer/>
        </div>
    )
}