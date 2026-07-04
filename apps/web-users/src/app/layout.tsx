import './globals.css'
import { cookies } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  //if cookies exist user is logged in 
  const isLoggedIn = !!token;
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}