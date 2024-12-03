import React from 'react'
import SidebarItems from './SidebarItems';
const Sidebar = () => {
    return (
        <div className="fixed flex-col w-64 min-h-screen bg-white items-center hidden sm:flex">
            <div className="flex flex-row w-full justify-center items-center mt-8 mb-8">
                <img width="48" height="48" src="https://img.icons8.com/emoji/48/hospital-emoji.png" alt="hospital-emoji" />
                <h3 className="text-[#663399]  items-center font-bold text-2xl">PharmaSentry</h3>
            </div>
            <SidebarItems />
        </div>
    );
}

export default Sidebar;