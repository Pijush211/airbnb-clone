import React, { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Left: Airbnb Logo */}
        <div className="flex items-center cursor-pointer">
          <a href="#" className="flex items-center gap-1.5 text-airbnb-red">
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Airbnb"
              role="img"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.734-3.699 8.806-8.5 8.806-3.155 0-5.46-1.637-6.994-3.791l-.006-.009-.006.009C12.46 31.363 10.155 33 7 33 2.199 33-1.5 28.928-1.5 24.194c0-.987.243-1.892.937-3.567l.179-.422c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.537 1.963 9.992 1 12 1h4zm0 2.2c-1.396 0-2.387.65-3.328 2.378l-.513.987C10.23 10.354 6.09 19.02 5.12 21.28l-.161.378c-.593 1.433-.759 2.13-.759 2.536 0 3.654 2.825 6.606 6.3 6.606 2.651 0 4.542-1.545 5.86-3.864l.64-1.127.64 1.127c1.318 2.319 3.209 3.864 5.86 3.864 3.475 0 6.3-2.952 6.3-6.606 0-.406-.166-1.103-.759-2.536l-.161-.378c-.97-2.26-5.11-10.926-7.039-14.715l-.513-.987C20.387 3.85 19.396 3.2 18 3.2h-2zm0 15c2.32 0 4.2 1.88 4.2 4.2 0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2c0-2.32 1.88-4.2 4.2-4.2zm0 2.2c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2s2-.895 2-2c0-1.105-.895-2-2-2z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-airbnb-red hidden sm:inline">
              airbnb
            </span>
          </a>
        </div>

        {/* Center: Search pill */}
        <div className="flex items-center border border-neutral-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm font-medium text-neutral-800">
          <button className="px-3 hover:text-neutral-900 border-r border-neutral-200">
            Anywhere
          </button>
          <button className="px-3 hover:text-neutral-900 border-r border-neutral-200">
            Anytime
          </button>
          <button className="px-3 text-neutral-500 hover:text-neutral-900">
            Add guests
          </button>
          <div className="bg-airbnb-red p-2 rounded-full text-white ml-2">
            <svg
              className="w-3.5 h-3.5 stroke-current stroke-[3]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        {/* Right: User navigation menu */}
        <div className="flex items-center gap-1 relative">
          <button className="text-sm font-semibold px-3.5 py-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800">
            Become a host
          </button>
          <button
            aria-label="Language & currency"
            className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700"
          >
            <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>

          {/* Profile Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 border border-neutral-300 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow focus:outline-none"
              aria-expanded={menuOpen}
              aria-label="User navigation menu"
            >
              <svg className="w-4 h-4 stroke-neutral-700 stroke-2" fill="none" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <div className="w-7 h-7 bg-neutral-500 rounded-full flex items-center justify-center text-white overflow-hidden">
                <svg className="w-5 h-5 fill-current translate-y-1" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-airbnb border border-neutral-200 py-2 text-sm z-50 text-neutral-800 animate-in fade-in zoom-in-95 duration-100">
                <a href="#signup" className="block px-4 py-2.5 font-semibold hover:bg-neutral-100">Sign up</a>
                <a href="#login" className="block px-4 py-2.5 hover:bg-neutral-100">Log in</a>
                <div className="my-1 border-t border-neutral-200"></div>
                <a href="#gift" className="block px-4 py-2.5 hover:bg-neutral-100">Gift cards</a>
                <a href="#host" className="block px-4 py-2.5 hover:bg-neutral-100">Airbnb your home</a>
                <a href="#help" className="block px-4 py-2.5 hover:bg-neutral-100">Help Centre</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
