"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  LogOut,
  User,
  Menu,
  Home,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } bg-white shadow-md transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          {open && <h2 className="font-bold text-xl text-gray-700">Admin</h2>}
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {[
            { icon: <Home size={20} />, label: "Dashboard" },
            { icon: <Users size={20} />, label: "Users" },
            { icon: <BarChart2 size={20} />, label: "Reports" },
            { icon: <Settings size={20} />, label: "Settings" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex items-center w-full text-left hover:bg-gray-200 px-3 py-2 rounded-lg font-medium text-gray-700 transition"
            >
              <span className="mr-3">{item.icon}</span>
              {open && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
          <div
            className="flex items-center space-x-4 relative"
            ref={dropdownRef}
          >
            {/* Notification */}
            <button className="relative">
              <Bell className="text-gray-600" />
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-white border rounded-md px-2 py-1 hover:bg-gray-100 transition"
              >
                <User className="text-gray-600" />
                <span className="text-gray-700 font-medium hidden sm:block">
                  Admin
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-800">Admin</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                        <LogOut size={16} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
            <p className="text-2xl font-semibold mt-2">1,245</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">
              Active Projects
            </h3>
            <p className="text-2xl font-semibold mt-2">32</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium">Pending Tasks</h3>
            <p className="text-2xl font-semibold mt-2">18</p>
          </div>
        </section>
      </main>
    </div>
  );
}
