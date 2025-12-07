"use client";

import { useState } from "react";
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';

const OsklenBrandLogo = () => {
  // The SVG path data was missing in the scrape. As per instructions,
  // this is a fallback that renders the brand name as SVG text,
  // which behaves correctly with scaling and blend modes.
  return (
    <svg role="img" className="w-full h-full" viewBox="0 0 88 10">
      <title>Osklen</title>
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontFamily="var(--font-suisse, sans-serif)" fontSize="10" fontWeight="500" letterSpacing="1" fill="currentColor">
        OSKLEN
      </text>
    </svg>
  );
};

const Header = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navItems = ["Réveillon", "Men", "Women", "Shoes", "Gifts", "Outlet"];

  return (
    <div onMouseLeave={() => setActiveSubmenu(null)}>
      {/* Desktop Center Logo */}
      <div className="fixed z-[9990] left-1/2 top-[calc(1.85rem+4px)] -translate-x-1/2 scale-[1.2] hidden lg:flex items-center justify-center h-[27px]">
        <Link href="/" aria-label="Ir para a página inicial/home">
          <div className="w-[87.49px] h-[9.99px] text-white mix-blend-difference">
            <OsklenBrandLogo />
          </div>
        </Link>
      </div>

      <header className="fixed w-full z-50 overscroll-contain">
        <div className="sticky z-50 top-0 h-0">
          <div
            data-expanded={activeSubmenu !== null}
            className="absolute w-full h-screen bg-[#555555]/40 opacity-0 pointer-events-none data-[expanded=true]:pointer-events-auto data-[expanded=true]:opacity-100 backdrop-blur-md md:backdrop-blur-0 transition-opacity"
          />
          <div className="relative z-50 top-0 h-0">
            {/* Mobile Logo */}
            <div className="absolute top-0 left-0 mt-5 ml-1 z-20 lg:hidden">
              <Link href="/" aria-label="Ir para a página inicial/home">
                <div className="w-[43px] h-[43px] bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center p-2.5">
                  <OsklenBrandLogo />
                </div>
              </Link>
            </div>

            {/* Navigation Bar */}
            <div
              id="navigationContainer"
              className="absolute right-0 lg:left-0 w-[calc(100%-3.625rem)] lg:w-[calc(100%-1.9rem)] xll:w-[calc(100%-3.75rem)] 5xl:w-[calc(100%-4rem)] h-[43px] 4xl:h-[30px] my-5 mr-1.5 lg:mx-[15px] xll:mx-[30px] flex items-center justify-between bg-white/50 lg:bg-transparent rounded-full lg:rounded-xl backdrop-blur-[15px] lg:backdrop-filter-none"
            >
              <button className="font-suisse pr-2 py-1 lg:hidden text-[13px] text-black ml-10">Menu</button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex z-10">
                <nav className="flex bg-white/50 backdrop-blur-[12px] rounded-lg px-1 h-7 4xl:h-[30px] items-center">
                  <ul className="flex flex-row items-center gap-1.5">
                    {navItems.map((item) => (
                      <li key={item} className="flex">
                        <button
                          onMouseEnter={() => setActiveSubmenu(item)}
                          className="font-suisse font-normal text-[15px] -tracking-[0.02em] text-black hover:bg-white/70 h-[25px] 4xl:h-[26px] px-1.5 xll:px-2.5 rounded-lg transition-colors duration-200"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Action Buttons */}
              <div id="actionGroup" className="flex items-center ml-auto gap-5 lg:gap-1 h-[43px] lg:h-auto">
                <button className="font-suisse text-[13px] -tracking-0.02 text-black flex items-center gap-1 lg:hidden">
                  <span>Buscar</span>
                  <Search size={16} />
                </button>
                <a href="/my-account" aria-label="Log in" className="font-suisse hidden lg:flex items-center justify-center w-[32px] h-7 1xl:h-[28px] p-[4px_6px] 4xl:px-[7px] text-black bg-white/50 backdrop-blur-md rounded-lg">
                  <User className="w-5 h-5 4xl:w-[18px] 4xl:h-[18px]" />
                </a>
                <a href="/wishlist" aria-label="Wishlist" className="font-suisse hidden lg:flex items-center justify-center w-[32px] h-7 1xl:h-[28px] p-[4px_6px] text-black bg-white/50 backdrop-blur-md rounded-lg">
                  <Heart className="w-5 h-5 4xl:w-[18px] 4xl:h-[18px]" />
                </a>
                <button aria-label="open cart" className="font-suisse z-10 flex items-center justify-center gap-1 w-12 lm:w-[67px] h-7 4xl:h-[28px] text-[13px] lg:text-[15px] lg:bg-white/50 lg:backdrop-blur-[12px] rounded-lg text-black -tracking-0.02 lg:px-2">
                  <span className="hidden lg:block">Bag</span>
                  <ShoppingBag className="w-5 h-5 -mt-px" />
                </button>
              </div>
            </div>

            {/* Submenu Overlay */}
            <div
              id="submenu"
              data-menu-open={activeSubmenu !== null}
              className="absolute top-5 left-[5.5px] right-[5.5px] lg:left-[15px] lg:right-[15px] xll:left-[30px] xll:right-[30px] lg:w-[calc(100vw_-_1.9rem)] xll:w-[calc(100vw_-_3.75rem)] 5xl:w-[calc(100vw_-_4rem)] rounded-3xl md:rounded-xl bg-white/[0.7] opacity-0 max-h-0 data-[menu-open=true]:opacity-100 data-[menu-open=true]:lg:max-h-96 data-[menu-open=true]:backdrop-blur-[20px] overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(.16,1,.3,1)] h-auto"
              style={{
                transition: activeSubmenu !== null
                  ? 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0s'
                  : 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.03s 0.27s',
              }}
            >
              <div className="grid h-full grid-cols-1 grid-rows-1">
                {navItems.map((item) => (
                  <div
                    key={item}
                    data-active={activeSubmenu === item}
                    className="col-start-1 row-start-1 h-full min-h-[384px] p-8 transition-opacity duration-200 opacity-0 pointer-events-none data-[active=true]:opacity-100 data-[active=true]:pointer-events-auto"
                  >
                    {/* Placeholder for submenu content */}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop search Menu */}
            <div id="searchMenu" className="hidden lg:block sticky z-[60] h-0">
                <div id="containerMenuSearchInput" className="absolute w-[calc(100%_-_1.9rem)] xll:w-[calc(100%_-_3.75rem)] mx-[15px] xll:mx-[30px] my-5 flex justify-end">
                    <div id="menuSearchInput" className="relative h-7 1xl:h-[30px] bg-white/50 backdrop-blur-xl rounded-lg w-[94px] xl:w-[180px] hover:w-[220px] transition-all duration-300">
                        <button className="w-full h-full flex items-center justify-between px-2">
                           <span className="font-suisse font-normal text-[15px] tracking-[-0.02em]">Buscar</span>
                           <Search className="w-[18px] h-[18px]" size={16} />
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;