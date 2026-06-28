import React from 'react';
import { Building2, ShelvingUnit, ClipboardCheck  } from 'lucide-react';

const Icons =  {
    Dashboard:  <Building2 size={20}/>,
    Inventory: <ShelvingUnit size={20}/>,
    Report: <ClipboardCheck size={20}/>,
};

export type SidebarItem = {
    label: string;
    icon: React.ReactNode;
    path?: string;
};

export const SidebarItems: SidebarItem[] = [
    {label: 'Dashboard', icon: Icons.Dashboard, path: '/dashboard'},
    {label: 'Inventory', icon: Icons.Inventory, path: '/inventory'},
    {label: 'Report', icon: Icons.Report, path: '/report'},
]