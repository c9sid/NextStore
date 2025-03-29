import React from "react";
import Sidebar from "../_components/Sidebar";

const Layout = ({ children }) => {
    return (
        <main className="bg-neutral-100 h-[90vh] flex">
            {/* Fixed Sidebar */}
            <aside className="hidden md:flex md:w-72 h-[90vh] bg-white fixed p-5 border-r border-neutral-300">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-0 md:ml-72 p-5 overflow-y-auto h-[90vh]">
                {children}
            </div>
        </main>
    );
};

export default Layout;
