"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import GlobalButton from "../utils/GlobalButton";
import { Reel, reelsData } from "@/utils/reelsData";
import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";
import Image from "next/image";

// Modal component with smooth transitions
const ReelModal = ({
  isOpen,
  onClose,
  initialIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<
    "up" | "down" | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(
    new Set([initialIndex])
  );

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Memoize reel data
  const currentReel = useMemo(() => reelsData[currentIndex], [currentIndex]);
  const nextReel = useMemo(
    () => (nextIndex !== null ? reelsData[nextIndex] : null),
    [nextIndex]
  );

  // Video configuration
  const videoConfig = useMemo(
    () => ({
      loop: true,
      playsInline: true,
      disablePictureInPicture: true,
      controlsList: "nodownload noremoteplayback" as const,
    }),
    []
  );

  // Preload adjacent videos
  useEffect(() => {
    if (isOpen) {
      const preloadIndices = [
        currentIndex,
        Math.min(currentIndex + 1, reelsData.length - 1),
        Math.max(currentIndex - 1, 0),
      ];

      const newLoaded = new Set(loadedVideos);
      preloadIndices.forEach((index) => {
        if (!newLoaded.has(index)) {
          const video = document.createElement("video");
          video.src = reelsData[index].videoUrl;
          video.preload = "metadata";
          newLoaded.add(index);
        }
      });
      setLoadedVideos(newLoaded);
    }
  }, [isOpen, currentIndex]);

  // Handle video play/pause
  useEffect(() => {
    if (isOpen && currentVideoRef.current) {
      if (isPlaying) {
        currentVideoRef.current.play().catch(() => {
          // Auto-play might fail, that's okay
        });
      } else {
        currentVideoRef.current.pause();
      }
    }
  }, [isOpen, isPlaying, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsPlaying(true);
      setLoadedVideos(new Set([initialIndex]));
    }
  }, [isOpen, initialIndex]);

  // Handle next video during transition
  useEffect(() => {
    if (nextIndex !== null && nextVideoRef.current && isTransitioning) {
      if (isPlaying) {
        nextVideoRef.current.play().catch(() => {
          // Auto-play might fail
        });
      } else {
        nextVideoRef.current.pause();
      }
    }
  }, [nextIndex, isTransitioning, isPlaying]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToPrevious();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, onClose, isTransitioning]);

  const scrollToNext = useCallback(() => {
    if (currentIndex < reelsData.length - 1 && !isTransitioning) {
      const next = currentIndex + 1;
      setNextIndex(next);
      setTransitionDirection("up");
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(next);
        setNextIndex(null);
        setTransitionDirection(null);
        setIsTransitioning(false);
        setIsPlaying(true);

        // Add to loaded videos
        setLoadedVideos((prev) => new Set([...prev, next]));
      }, 500);
    }
  }, [currentIndex, isTransitioning]);

  const scrollToPrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      const prev = currentIndex - 1;
      setNextIndex(prev);
      setTransitionDirection("down");
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(prev);
        setNextIndex(null);
        setTransitionDirection(null);
        setIsTransitioning(false);
        setIsPlaying(true);

        // Add to loaded videos
        setLoadedVideos((prevLoaded) => new Set([...prevLoaded, prev]));
      }, 500);
    }
  }, [currentIndex, isTransitioning]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white text-2xl bg-black/60 p-3 rounded-full hover:bg-black/80 transition-all backdrop-blur-sm border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close modal"
      >
        ✕
      </button>

      {/* Main Container */}
      <div className="relative flex items-center gap-8">
        {/* Video Container */}
        <div className="relative">
          {/* Current Video */}
          <div
            className={`relative transition-all duration-500 ${
              transitionDirection === "up"
                ? "-translate-y-full opacity-0"
                : transitionDirection === "down"
                ? "translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={currentVideoRef}
                src={
                  loadedVideos.has(currentIndex)
                    ? currentReel.videoUrl
                    : undefined
                }
                {...videoConfig}
                preload="none"
                className="w-[300px] h-[533px] object-cover font-system"
                aria-label={`Video: ${currentReel.title}`}
              />

              {/* Play/Pause Overlay */}
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {!isPlaying && (
                  <div className="bg-black/60 backdrop-blur-sm p-5 rounded-full border border-white/20">
                    <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-white border-b-[20px] border-b-transparent ml-1" />
                  </div>
                )}
              </button>

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                <div className="text-center">
                  <h3 className="text-white text-xl font-system font-system mb-2">
                    {currentReel.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-system">
                    {currentReel.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Video (for transition) */}
          {nextIndex !== null && nextReel && (
            <div
              className={`absolute top-0 left-0 transition-all duration-500 ${
                transitionDirection === "up"
                  ? "translate-y-0 opacity-100"
                  : transitionDirection === "down"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  ref={nextVideoRef}
                  src={
                    loadedVideos.has(nextIndex) ? nextReel.videoUrl : undefined
                  }
                  {...videoConfig}
                  muted
                  preload="none"
                  className="w-[300px] h-[533px] object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <div className="text-center">
                    <h3 className="text-white text-xl font-system  mb-2">
                      {nextReel.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-system">
                      {nextReel.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons - Right Side */}
        <div className="flex flex-col gap-6">
          {/* Previous Button */}
          <button
            onClick={scrollToPrevious}
            disabled={currentIndex === 0 || isTransitioning}
            className={`relative group flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white p-5 rounded-2xl border border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              currentIndex === 0 || isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-black/80 hover:scale-105 cursor-pointer"
            }`}
            aria-label="Previous reel"
          >
            <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium font-system">
              Previous
            </span>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-white border-b-[10px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Current Position */}
          <div className="text-center py-2">
            {/* <div className="text-white text-2xl font-bold font-system">
              {currentIndex + 1}
            </div> */}
            {/* <div className="text-gray-400 text-sm mt-1 font-system">
              of {reelsData.length}
            </div> */}
          </div>

          {/* Next Button */}
          <button
            onClick={scrollToNext}
            disabled={currentIndex === reelsData.length - 1 || isTransitioning}
            className={`relative group flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white p-5 rounded-2xl border border-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              currentIndex === reelsData.length - 1 || isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-black/80 hover:scale-105 cursor-pointer"
            }`}
            aria-label="Next reel"
          >
            <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <span className="mt-2 text-sm font-medium font-system">Next</span>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[15px] border-r-white border-b-[10px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="flex items-center gap-4 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-black/50 rounded text-xs">↑</kbd>
            <span className="font-system">Previous</span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-black/50 rounded text-xs">↓</kbd>
            <span className="font-system">Next</span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            {/* <kbd className="px-2 py-1 bg-black/50 rounded text-xs">Space</kbd> */}
            <span className="font-system">Play/Pause</span>
          </div>
          <div className="h-4 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            {/* <kbd className="px-2 py-1 bg-black/50 rounded text-xs"></kbd> */}
            <span className="font-system"> ESC TO Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Reel Card Component
const ReelCard = ({ reel, onView }: { reel: Reel; onView: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Debounce mouse events for better performance
  const handleMouseEnter = useDebouncedCallback(() => {
    setIsActive(true);
  }, 100);

  const handleMouseLeave = useDebouncedCallback(() => {
    setIsActive(false);
  }, 300);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    if (isActive && !isLoaded) {
      // Only load when needed
      video.src = reel.videoUrl;
      video.load();
      video
        .play()
        .catch(() => {
          // Auto-play might fail, that's okay
        })
        .finally(() => {
          if (isMounted) setIsLoaded(true);
        });
    } else if (!isActive && isLoaded) {
      // Pause but don't unload
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      isMounted = false;
    };
  }, [isActive, isLoaded, reel.videoUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative min-w-[320px] h-[500px] rounded-2xl overflow-hidden cursor-pointer reel-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onView}
      role="button"
      tabIndex={0}
      aria-label={`View ${reel.title} reel`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView();
        }
      }}
    >
      <video
        ref={videoRef}
        poster={reel.thumbnail}
        preload="none"
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload"
        className="w-full h-full object-cover"
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}

      {/* Fallback image */}
      <Image
        src={reel.thumbnail}
        alt={reel.title}
        className={`absolute font-system inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        width={300}
        height={300}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/30 via-black/20 to-transparent">
        <h3 className="text-lg font-system">{reel.title}</h3>
        <p className="text-white font-semibold text-sm mt-1 line-clamp-1 font-system">
          {reel.description}
        </p>  
      </div>

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/60 backdrop-blur-sm p-4 rounded-full border border-white/20">
          <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-1" />
        </div>
      </div>
    </div>
  );
};

const Reels = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Throttled scroll handler
  const handleScroll = useCallback(
    (dir: "left" | "right") => {
      if (isScrolling || !scrollRef.current) return;

      setIsScrolling(true);
      const cardWidth = 350;

      scrollRef.current.scrollBy({
        left: dir === "right" ? cardWidth : -cardWidth,
        behavior: "smooth",
      });

      // Reset scrolling state
      setTimeout(() => setIsScrolling(false), 300);
    },
    [isScrolling]
  );

  // Memoize click handler
  const handleViewClick = useCallback((index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  }, []);

  // Memoize reels to prevent unnecessary re-renders
  const reelCards = useMemo(() => {
    return reelsData.map((reel, index) => (
      <ReelCard
        key={`reel-${reel.id}`}
        reel={reel}
        onView={() => handleViewClick(index)}
      />
    ));
  }, [handleViewClick]);

  // Initialize scroll position
  useEffect(() => {
    if (scrollRef.current) {
      // Start at a reasonable position
      scrollRef.current.scrollLeft = 100;
    }
  }, []);

  // Handle touch events for mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isScrollingHorizontal = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isScrollingHorizontal = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrollingHorizontal) {
        const touchMoveX = e.touches[0].clientX;
        const touchMoveY = e.touches[0].clientY;
        const diffX = Math.abs(touchMoveX - touchStartX);
        const diffY = Math.abs(touchMoveY - touchStartY);

        // Determine if horizontal scroll
        if (diffX > diffY && diffX > 10) {
          isScrollingHorizontal = true;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingHorizontal) {
        e.preventDefault();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="py-16 px-4 sm:px-8 min-h-screen relative overflow-hidden"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Background pattern for performance */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 relative z-10 px-2">
          <div className="mb-6 sm:mb-0">
            <h2 className="text-3xl md:text-4xl text-gray-800 uppercase tracking-wide ">
              CLIENT REVIEWS
            </h2>
            <p className="font-system text-gray-400 mt-2 text-sm sm:text-base ">
              Hover to preview • Click to view fullscreen
            </p>
          </div>
          <GlobalButton
            text="View All"
            className="mt-4 px-6 py-1 border border-gray-800 text-gray-800 h-[48px] hover:bg-gray-300"
          />
        </div>

        {/* Scroll Buttons - Desktop only */}
        <button
          onClick={() => handleScroll("left")}
          disabled={isScrolling}
          className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 left-5 z-20 bg-black/70 text-white p-4 rounded-full h-14 w-14 shadow-2xl transition-all duration-300 items-center justify-center ${
            showButtons ? "opacity-100" : "opacity-0"
          } ${
            isScrolling
              ? "cursor-not-allowed"
              : "hover:bg-black hover:scale-110"
          } border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50`}
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => handleScroll("right")}
          disabled={isScrolling}
          className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 right-5 z-20 bg-black/70 text-white p-4 rounded-full h-14 w-14 shadow-2xl transition-all duration-300 items-center justify-center ${
            showButtons ? "opacity-100" : "opacity-0"
          } ${
            isScrolling
              ? "cursor-not-allowed"
              : "hover:bg-black hover:scale-110"
          } border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50`}
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 py-6 scroll-smooth scrollbar-none will-change-transform"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          <style jsx>{`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Add some padding for better scroll experience */}
          <div className="min-w-[20px] sm:min-w-[40px]" />

          {reelCards}

          <div className="min-w-[20px] sm:min-w-[40px]" />
        </div>

        {/* Mobile Instructions */}
        <div className="font-system block sm:hidden text-center text-gray-400 text-sm mt-8 px-4">
          <p>Swipe horizontally to browse • Tap to view</p>
        </div>

        {/* Desktop Instructions */}
        <div className="hidden sm:block text-center text-gray-500 text-sm mt-10">
          <div className="inline-flex items-center gap-6  px-6 py-3 rounded-full border border-gray-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span className="text-gray-800 font-system">
                Hover to preview
              </span>
            </div>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-gray-800 font-system">
                Click for fullscreen

              </span>
            </div>
            <div className="h-4 w-px bg-gray-600" />
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-800 font-system">
                Autoplay on hover
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for fullscreen view */}
      <ReelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIndex={modalIndex}
      />
    </>
  );
};

export default Reels;
