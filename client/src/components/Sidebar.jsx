import React from 'react'
import SidebarItems from './SidebarItems';
const Sidebar = () => {
  return (
      <div className="fixed flex-col w-64 min-h-screen bg-white items-center hidden sm:flex">
          <div className="flex flex-row w-full justify-center items-center mt-8">
              <h3 className="text-[black]  items-center font-bold text-2xl">PharmaSentry</h3>
          </div>
          <SidebarItems/>
      </div>
  );
}

export default Sidebar;