import { useNavigate } from 'react-router-dom';
import { authService } from '../../Services/authService';
import { useState } from 'react';
import { SidebarItems } from './SidebarItems';
import { LogOut } from 'lucide-react';

export function Sidebar({onClose}: {onClose?: () => void}) {

    const navigate = useNavigate();

    //handler for logout 
    const handleLogout = () => {
        authService.logout();
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    //ui states
    const [collapsed, setCollapsed] = useState(false);

    //toggle sidebar collapse
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <aside className={`h-dvh bg-[#4C3BC0] text-white flex flex-col shadow-2xl overflow-hidden justify-start ${collapsed ? 'w-16': 'w-64'} transition-all duration-300 ease-in-out rounded-r-3xl`}>

            {/**Header */}
            <div className="flex items-center justify-center border-b border-white/10 h-16 px-4 shrink-0" onClick={toggleSidebar}>
                {collapsed ? (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-400 text-[#4C3BC0] font-black text-sm shrink-0">
                        EZ
                    </div>
                ) : (
                    <div className="flex items-center  gap-1.5 select-none">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-400 text-white font-black text-base shrink-0 shadow-sm">
                            E
                        </div>
                        <span className="text-white text-base font-black tracking-wider">AZY</span>
                    </div>
                )}
               
            </div>

            <nav className='flex-1 flex flex-col min-h-0 py-4'>
                <ul className='flex flex-col gap-3'>
                    {SidebarItems.map((item) => {
                        const isActive = item.path === window.location.pathname;
                        return (
                            <li key={item.label}>
                                <div
                                onClick={() => {
                                    if(item.path){
                                        navigate(item.path);
                                        if(window.innerWidth < 1024) onClose?.();
                                    }
                                }}
                                className={`group mx-3 px-3 py-2.5 flex items-center gap-8 cursor-pointer transition-all duration-300 rounded-xl hover:bg-white hover:text-[#4C3BC0] ${isActive ? 'bg-white text-[#4C3BC0]' : 'text-white hover:bg-white'} `}
                                >
                                    <div className='flex justify-center items-center shrink-0'>
                                        <span className={`text-xl transition-transform duration-300 ${isActive ? 'text-[#4C3BC0]' : 'text-white'} group-hover:text-[#4C3BC0]`}>{item.icon}</span>
                                    </div>
                                    {!collapsed && (
                                        <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out`}>
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <button
                onClick={() => {
                    if(window.confirm('Are you sure you want to logout?')){
                        handleLogout();
                    }
                }} 
                className='mt-auto group flex items-center cursor-pointer rounded-xl transition-all duration-300 hover:bg-white hover:text-red-600 mx-3 px-3 py-2.5 '
                >
                    <div className='w-16 flex justify-center items-center shrink-0'>
                        <LogOut size={20} className='text-red-500 group-hover:text-red-600'/>
                    </div>
                    {!collapsed && <span className='text-sm text-left text-red-500 font-bold flex-1 group-hover:text-red-600'>Log Out</span>}

                </button>
            </nav>

        </aside>
    );

}