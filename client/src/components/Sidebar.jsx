import React from 'react'
import SidebarItems from './SidebarItems';
import 'line-awesome/dist/line-awesome/css/line-awesome.css';

const Sidebar = () => {
    return (
        <div className="fixed flex-col w-64 min-h-screen bg-white items-center hidden sm:flex">
            <div className="flex flex-row w-full justify-center items-center mt-8 mb-8">
            <i class="las la-prescription-bottle-alt" style={{ fontSize: "36px", color: "#663399" }}></i>
                <h3 className="text-[#663399]  items-center font-bold text-2xl">Pharm Sentry</h3>
            </div>
            <SidebarItems />
        </div>
    );
}

export default Sidebar;