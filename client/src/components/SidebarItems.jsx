import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import { Settings } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const SidebarItems = ({ toggleSidebar }) => { // Accept toggleSidebar as a prop
    const navItems = [
        { name: "Dashboard", icon: <HomeIcon />, link: "/dashboard" },
        { name: "Inventory", icon: <CategoryIcon />, link: "/inventory" },
       
    ];

    const profileItems = [
        { name: "Profile", icon: <AccountCircleIcon />, link: "/profile" },
        { name: "Settings", icon: <Settings />, link: "/settings" },
        { name: "Logout", icon: <LogoutIcon />, link: "/" },
    ];

    return (
        <>
            <ul className='mt-8 md:mt-2 w-52'>
                {navItems.map((item) => (
                    <li key={item.name} className="flex items-center py-2 px-4 hover:bg-gray-200 rounded-lg">
                        <Link to={item.link} className="flex items-center w-full" onClick={toggleSidebar}> {/* Call toggleSidebar on click */}
                            <span className="mr-2">{item.icon}</span>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="log-out sm:fixed bottom-16 md:bottom-12 ">
                <ul className='mt-8 w-52'>
                    {profileItems.map((item) => (
                        <li key={item.name} className="flex items-start py-2 px-4 hover:bg-gray-200 rounded-lg">
                            <Link to={item.link} className="flex items-center w-full" onClick={toggleSidebar}> {/* Call toggleSidebar on click */}
                                <span className="mr-2">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SidebarItems;