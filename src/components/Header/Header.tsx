"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiArrowLeft,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import images from "@/utils/images";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [prevHovered, setPrevHovered] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGalleryCategory, setSelectedGalleryCategory] =
    useState("Seating");

  const { cart } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [shouldShowBg, setShouldShowBg] = useState(false);

  const menuItems = [
    {
      name: "Our Story",
      path: "/about",
      submenu: [],
    },
    {
      name: "Services",
      path: "/services",
      submenu: [
        {
          name: "Consultation",
          path: "/services/consultation",
          image: images.additional[0],
        },
        {
          name: "Design",
          path: "/services/design",
          image: images.additional[1],
        },
        {
          name: "Photography",
          path: "/services/photography",
          image: images.additional[2],
        },
        {
          name: "Installation",
          path: "/services/installation",
          image: images.additional[3],
        },
      ],
    },
    {
      name: "Projects",
      path: "/projects",
      submenu: [],
    },
    { name: "Collections", path: "/shop", submenu: [] },
    {
      name: "News",
      path: "/blog",
      submenu: [],
    },
    {
      name: "Reflections",
      path: "/reflections",
      submenu: [],
    },
    {
      name: "Connect",
      path: "/connect",
      submenu: [],
    },
  ];

  const galleryImages = {
    Seating: images.gallery.seating.map((src, index) => ({
      src,
      title: ["Modern Chair", "Lounge Chair", "Dining Chair", "Accent Chair"][
        index
      ],
    })),
    Tables: images.gallery.tables.map((src, index) => ({
      src,
      title: ["Coffee Table", "Dining Table", "Side Table", "Console Table"][
        index
      ],
    })),
    Art: images.gallery.art.map((src, index) => ({
      src,
      title: ["Abstract Painting", "Sculpture", "Wall Art", "Mixed Media"][
        index
      ],
    })),
    Lighting: images.gallery.lighting.map((src, index) => ({
      src,
      title: ["Floor Lamp", "Pendant Light", "Table Lamp", "Wall Sconce"][
        index
      ],
    })),
    Bespoke: images.gallery.bespoke.map((src, index) => ({
      src,
      title: [
        "Custom Furniture",
        "Made to Order",
        "Special Design",
        "Bespoke Piece",
      ][index],
    })),
    Objects: images.gallery.objects.map((src, index) => ({
      src,
      title: [
        "Decorative Object",
        "Art Object",
        "Collectible",
        "Sculptural Object",
      ][index],
    })),
  };

  const hoveredItem = menuItems.find((i) => i.name === hovered);
  const activeSubmenu = menuItems.find((i) => i.name === submenu);

  // Check if menu item has dropdown
  const hasDropdown = (itemName: string) => {
    const item = menuItems.find((i) => i.name === itemName);
    return item && item.submenu && item.submenu.length > 0;
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll listener to fix header after video section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.9;
      setIsFixed(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update background state based on hover
  useEffect(() => {
    if (hovered) {
      setShouldShowBg(true);
      setPrevHovered(hovered);
    } else {
      // Only hide background if the previously hovered item didn't have dropdown
      if (!prevHovered || !hasDropdown(prevHovered)) {
        const timer = setTimeout(() => {
          setShouldShowBg(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [hovered, prevHovered]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      // Clean up any pending timeouts
    };
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle profile click
  const handleProfileClick = () => {
    router.push("/profile");
    setMenuOpen(false);
  };

  // Handle cart click
  const handleCartClick = () => {
    router.push("/cart");
    setMenuOpen(false);
  };

  // Handle gallery category click
  const handleGalleryCategoryClick = (category: string) => {
    setSelectedGalleryCategory(category);
  };

  // Handle gallery image click
  const handleGalleryImageClick = (category: string) => {
    const categoryPath = `/gallery/${category.toLowerCase()}`;
    router.push(categoryPath);
    setHovered(null);
  };

  return (
    <header className="w-full bg-transparent text-white absolute top-0 left-0 z-50">
      {/* Search Dropdown Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-60"
          />
        )}
      </AnimatePresence>

      {/* Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 bg-[#eae1d1] shadow-lg z-70"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-2xl text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FiArrowLeft />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, collections, and more..."
                    className="w-full py-3 px-4 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition-colors text-gray-900 font-[family-name:var(--FONT-STACK-HEADING)]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    <FiSearch size={20} />
                  </button>
                </div>
              </form>

              {/* Search Suggestions */}
              <div className="mt-4 pb-2">
                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2 text-gray-900">
                  {["Chairs", "Tables", "Lighting", "Art", "Bespoke"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          router.push(`/search?q=${encodeURIComponent(term)}`);
                          setSearchOpen(false);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors font-[family-name:var(--FONT-STACK-HEADING)]"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header Container */}
      <div
        className={`relative z-50 transition-all duration-300 ${
          shouldShowBg && hovered
            ? hovered && hasDropdown(hovered)
              ? "bg-[#eae1d1]"
              : "bg-[#eae1d1]/80"
            : isFixed
            ? "bg-[#eae1d1]"
            : "bg-transparent"
        } ${isFixed ? "fixed top-0 left-0 border-b border-black" : ""}`}
        style={{
          position: searchOpen ? "relative" : undefined,
          zIndex: searchOpen ? 40 : 50,
        }}
      >
        {/* Top newsletter bar */}
        <div
          className="bg-[#fdfaf7] text-center py-2 border-b border-gray-200 text-[11px] text-gray-500 tracking-wide font-[family-name:var(--FONT-STACK-HEADING)]"
          style={{
            color: shouldShowBg || isFixed ? "#1f2937" : "white",
            letterSpacing: "0.08em",
            lineHeight: "1.6",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 500,
          }}
        >
          Sign up to my{" "}
          <span className="italic">monthly trade newsletter</span> for{" "}
          <Link href="/trade-offers" className="hover:text-gray-700">
            exclusive trade offers
          </Link>{" "}
          and first access to new gallery collections.
        </div>

        <div className="mx-auto py-4 md:px-6 px-2 relative z-10">
          {/* Header Row */}
          <div className="flex justify-between items-center md:justify-between">
            {/* Left (mobile) */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                aria-label="Menu"
                className="text-2xl"
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setSubmenu(null);
                }}
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>

              <button
                aria-label="Search"
                className="text-xl hover:opacity-75 transition cursor-pointer"
                onClick={() => setSearchOpen(true)}
              >
                <FiSearch />
              </button>
            </div>

            {/* Logo - USING SPRAT CONDENSED */}
            <Link
              href="/"
              className="font-[var(--FONT-STACK-ACCENT)] text-xl flex-grow text-center md:text-4xl text-2xl uppercase tracking-widest"
              style={{
                color: shouldShowBg || isFixed ? "#1f2937" : "white",
              }}
            >
              Stories With AD
            </Link>

            {/* Icons (Right section) */}
            <div className="flex space-x-4 items-center transition-colors duration-300">
              <button
                aria-label="Search"
                className="hidden md:block text-xl hover:opacity-75 transition cursor-pointer"
                style={{
                  color: shouldShowBg || isFixed ? "#1f2937" : "white",
                }}
                onClick={() => setSearchOpen(true)}
              >
                <FiSearch />
              </button>
              <button
                aria-label="User"
                className="text-xl hover:opacity-75 transition cursor-pointer"
                style={{
                  color: shouldShowBg || isFixed ? "#1f2937" : "white",
                }}
                onClick={handleProfileClick}
              >
                <FiUser />
              </button>
              {/* Cart Button with Badge */}
              <button
                aria-label="Cart"
                className="text-xl hover:opacity-75 transition cursor-pointer relative"
                style={{
                  color: shouldShowBg || isFixed ? "#1f2937" : "white",
                }}
                onClick={handleCartClick}
              >
                <FiShoppingCart />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-[family-name:var(--FONT-STACK-HEADING)]">
                    {cart.itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* HR Line under header row */}
          {/* <div
            className={`w-full h-px my-4 md:my-4 ${
              shouldShowBg || isFixed ? "bg-black" : "bg-white"
            }`}
          ></div> */}

          {/* Desktop Navigation - USING SPRAT CONDENSED */}
          <nav
            ref={navRef}
            className="mt-2 hidden md:flex justify-center space-x-6 text-sm uppercase relative z-10 tracking-wider"
          >
            {menuItems?.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => {
                  if (hovered === item.name) {
                    setTimeout(() => {
                      if (!hasDropdown(item.name)) {
                        setHovered(null);
                      }
                    }, 100);
                  }
                }}
                className="relative"
              >
                {item.path ? (
                  <Link href={item.path}>
                    <h1
                      className="block py-2 cursor-pointer transition-all duration-300 ease-out hover:opacity-80"
                      style={{
                        color: shouldShowBg || isFixed ? "#1f2937" : "white",
                        letterSpacing: "0.08em",
                        lineHeight: "1.6",
                        fontFamily: "system-ui, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {item.name}
                    </h1>
                  </Link>
                ) : (
                  <h1
                    className="block py-2 cursor-pointer transition-all duration-300 ease-out hover:opacity-80"
                    style={{
                      color: shouldShowBg || isFixed ? "#1f2937" : "white",
                      letterSpacing: "0.08em",
                      lineHeight: "1.6",
                      fontFamily: "system-ui, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </h1>
                )}

                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px]"
                  style={{
                    backgroundColor: shouldShowBg || isFixed ? "black" : "white",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: hovered === item.name ? "100%" : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            ))}
          </nav>

          

          {/* Desktop Dropdown - USING SPRAT CONDENSED */}
          <AnimatePresence>
            {hoveredItem && hoveredItem.submenu.length > 0 && (
              <motion.div
                ref={dropdownRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`absolute top-full left-0 w-full shadow-md text-black z-50 overflow-hidden hidden md:block
  bg-[#eae1d1]
  ${hasDropdown(hoveredItem.name) ? "max-h-[60vh] overflow-y-auto" : ""}
`}
                style={{
                  marginTop: "0px",
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => {
                  setHovered(hoveredItem.name);
                }}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget as HTMLElement;
                  const isMovingToNav = navRef.current?.contains(relatedTarget);

                  if (!isMovingToNav) {
                    setTimeout(() => {
                      setHovered(null);
                    }, 150);
                  }
                }}
              >
                {/* इनर कंटेनर में overflow-auto जोड़ें */}
                <div className="max-w-7xl mx-auto px-6 py-12 flex h-full overflow-y-auto">
                  <div className="w-1/4 pr-8">
                    <h3 className="text-xs uppercase tracking-wider mb-8 text-gray-600 font-[family-name:var(--FONT-STACK-HEADING)] font-light">
                      {hoveredItem.name} Categories
                    </h3>
                    <div className="space-y-6">
                      {hoveredItem.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className="block text-lg uppercase hover:opacity-75 transition-opacity py-2 font-[family-name:var(--FONT-STACK-HEADING)] font-normal tracking-wide"
                          onClick={() => setHovered(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="w-px bg-gray-300 mx-8"></div>
                  {/* कंटेंट कंटेनर में भी overflow-auto जोड़ें */}
                  <div className="flex-1 overflow-auto">
                    {/* Special handling for Gallery dropdown */}
                    {hoveredItem.name === "Gallery" ? (
                      <div className="h-full">
                        <h3 className="text-xs uppercase tracking-wider mb-8 text-gray-600 font-[family-name:var(--FONT-STACK-HEADING)] font-light">
                          Gallery Preview - {selectedGalleryCategory}
                        </h3>
                        <div className="grid grid-cols-3 gap-8">
                          {galleryImages[
                            selectedGalleryCategory as keyof typeof galleryImages
                          ]?.map((image, index) => (
                            <div key={index} className="group cursor-pointer">
                              <div
                                className="w-full h-64 relative overflow-hidden rounded-lg mb-4"
                                onClick={() =>
                                  handleGalleryImageClick(
                                    selectedGalleryCategory
                                  )
                                }
                              >
                                <Image
                                  src={image.src}
                                  alt={image.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Image title - SPRAT CONDENSED */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                                  <span className="text-xl font-normal text-white drop-shadow-lg font-[family-name:var(--FONT-STACK-HEADING)] tracking-wider">
                                    {image.title}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 mt-8 flex-wrap">
                          {hoveredItem.submenu.map((category) => (
                            <button
                              key={category.name}
                              onClick={() =>
                                handleGalleryCategoryClick(category.name)
                              }
                              className={`px-4 py-2 text-sm uppercase border-2 font-[family-name:var(--FONT-STACK-HEADING)] tracking-wider ${
                                selectedGalleryCategory === category.name
                                  ? "bg-black text-white border-black"
                                  : "bg-transparent text-black border-gray-300 hover:border-black"
                              } transition-colors`}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // Default dropdown for other menus
                      <div className="grid grid-cols-2 gap-6">
                        {hoveredItem.submenu.map((sub, index) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            className="group"
                            onClick={() => setHovered(null)}
                          >
                            <div className="w-full h-64 relative overflow-hidden rounded-lg mb-4">
                              <Image
                                src={sub.image}
                                alt={sub.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Image title - SPRAT CONDENSED */}
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                                <span className="text-xl font-normal text-white drop-shadow-lg font-[family-name:var(--FONT-STACK-HEADING)] tracking-wider">
                                  {sub.name}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE SIDE MENU - USING SPRAT CONDENSED */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 left-0 w-[85%] sm:w-[70%] h-full bg-[#f5eedf] text-black z-80 flex flex-col shadow-lg overflow-y-auto font-[family-name:var(--FONT-STACK-HEADING)]"
            >
              {/* Top Close / Back */}
              <div className="flex items-center justify-between p-5 border-b border-gray-300">
                {submenu ? (
                  <button
                    onClick={() => setSubmenu(null)}
                    className="text-xl flex items-center space-x-2"
                  >
                    <FiArrowLeft />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSubmenu(null);
                    }}
                    className="text-xl"
                  >
                    <FiX />
                  </button>
                )}
                {submenu && (
                  <h2 className="uppercase tracking-widest text-sm font-normal">
                    {submenu}
                  </h2>
                )}
              </div>

              {/* HR Line in mobile menu */}
              <div className="w-full h-px bg-gray-300"></div>

              {/* Main Menu */}
              {!submenu && (
                <motion.div
                  key="main"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  className="flex flex-col space-y-5 p-6 text-base uppercase tracking-wide"
                >
                  {menuItems.map((item) => (
                    <div key={item.name}>
                      {item.submenu.length > 0 ? (
                        <button
                          onClick={() => setSubmenu(item.name)}
                          className="w-full text-left"
                        >
                          <span className="flex justify-between items-center py-2 font-normal">
                            <span>{item.name}</span>
                            <FiChevronRight />
                          </span>
                        </button>
                      ) : item.path ? (
                        <Link
                          href={item.path}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="block py-2 font-normal">
                            {item.name}
                          </span>
                        </Link>
                      ) : (
                        <span className="block py-2 font-normal">
                          {item.name}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* HR Line before buttons */}
                  <div className="w-full h-px bg-gray-300 my-4"></div>

                  {/* Mobile Search Button */}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setSearchOpen(true);
                    }}
                    className="flex items-center space-x-2 text-left py-2 font-normal"
                  >
                    <FiSearch />
                    <span>Search</span>
                  </button>

                  {/* Mobile Profile and Cart Buttons */}
                  <div className="flex space-x-4 pt-2">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 font-normal"
                    >
                      <FiUser />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleCartClick}
                      className="flex items-center space-x-2 relative font-normal"
                    >
                      <FiShoppingCart />
                      <span>Cart</span>
                      {cart.itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                          {cart.itemCount}
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Submenu Panel */}
              {submenu && activeSubmenu && (
                <motion.div
                  key="submenu"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.4 }}
                  className="p-6 flex flex-col space-y-4 uppercase tracking-wide"
                >
                  {activeSubmenu.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.path}
                      className="block hover:opacity-70 py-2 text-lg font-normal"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* HR Line under navigation */}
          <div
            className={`w-full h-px mt-0 hidden md:block ${
              shouldShowBg || isFixed ? "bg-black" : "bg-white"
            }`}
          ></div>
    </header>
  );
}