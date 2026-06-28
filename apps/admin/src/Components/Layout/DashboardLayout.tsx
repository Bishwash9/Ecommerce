import { useState } from "react";
import { Sidebar } from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { useAuth } from "../../Context/AuthContext";
import { Outlet } from "react-router-dom";


export function DashboardLayout() {
    const[isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className='flex h-screen overflow-hidden relative bg-slate-50'>
            {isSidebarOpen && (
                <div className='fixed insert-0 bg-black/60 backdrop-blur-sm z-45 lg:hidden transition-opacity duration-300' onClick={() => setIsSidebarOpen(false)} />
            )}

            <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
                <DashboardHeader
                  initials={user?.name?.substring(0, 2).toUpperCase() || ''}
                />
                <main className='flex-1 overflow-auto scroll-smooth px-4 md:px-6 py-6 md:py-8'>
                    <Outlet/>
                </main>

            </div>
        </div>
    )
}