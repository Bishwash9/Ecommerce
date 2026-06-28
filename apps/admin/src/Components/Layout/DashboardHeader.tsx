import { useEffect, useRef, useState } from "react";
import { authService } from "../../Services/authService";
import { LogOut, User } from "lucide-react";



export default function DashboardHeader({initials=''}: {initials?: string}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
             const handleClickOutside = (event: MouseEvent) => {
        if(profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
        }
    };
     document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    },[]);
   

    const handleLogout = () => {
        authService.logout();
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }

    return (
       <header className='h-16 flex items-center justify-end px-4 sm:px-6 lg:px-8 sticky top-3 mx-4 z-40 bg-white border border-slate-200 rounded-2xl shadow-sm'>
            <div className='relative flex items-center gap-2 sm:gap-4' ref={profileRef}>
                <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='group flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition-all cursor-pointer'
                >
                    <div className='h-8 w-8 flex rounded-full items-center justify-center bg-[#4C3BC0] text-white text-[11px] ring-2 font-bold ring-offset-2 ring-transparent transition-all group-hover:ring-[#4C3BC0]'>
                        {initials}
                    </div>
                </button>
                {isProfileOpen && (
                    <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 transition-all ease-in-out duration-200 z-50'>
                        <div className='px-3 py-2 mb-1 border-b border-slate-100'>
                            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wide'>Account</p>
                        </div>
                        <button type='button' className='w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#4C3BC0] transition-colors cursor-pointer'>
                            <User size={15}/>
                            <span>Profile</span>
                        </button>
                        <button type='button' onClick={handleLogout} className='w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer'>
                            <LogOut size={15}/>
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
       </header>
    )

}