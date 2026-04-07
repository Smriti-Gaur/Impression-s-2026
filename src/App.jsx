import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Mousewheel } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// IMPORT YOUR CLUB PAGE HERE
import ClubDetails from "./pages/ClubDetails.jsx"; 

// --- CLUB DATA ARRAY ---
const eventsData = [
  { id: 1, name: "JYC", event1: "Bridge Wars", event2: "Human Bingo", image: "/images/logo3.png" ,extraEventsCount: 5},
  { id: 2, name: "IEEE", event1: "Carnival Chroniacles 2.0", event2: "The Great College Heist 2.0", image: "images/IEEE.png" },
  { id: 3, name: "Crescendo", event1: "Battle of Bands", event2: "Solo Singing Competition" , image: "images/crescendo.png"},
  { id: 4, name: "Jhankaar", event1: "Group Dance Competition", event2: "Solo (On The Spot)", image: "images/Jhankaar.png",extraEventsCount: 2 },
  { id: 5, name: "The Thespian Circle", event1: "Group Act Competition", event2: "Talent Con" , image: "images/Thespian.png"},
  { id: 6, name: "Finanza", event1: "Island Escape", image: "images/FINANZA.jpg" },
  { id: 7, name: "Radiance", event1: "Mr. & Miss Impressions" , image: "images/Radiace.png"},
  { id: 8, name: "RIBOSE", event1: "The Island Helix", event2: "Tropical Trail", image: "images/RIBOSE.png" },
  { id: 9, name: "Kalakriti", event1: "Design by Heart", image: "images/Kalakriti.png" },
  { id: 10, name: "JPEG", event1: "Wall Of Frames",event2: "Tasveer" , image: "images/JPEG.png"},
  { id: 11, name: "SILICA", event1: "Pitch Up", event2: "MindStorm" , image: "images/Silica.png"},
  { id: 12, name: "GIWM", event1: "QuestX" , image: "images/GIWM.png"},
  { id: 13, name: "DICE", event1: "Reverse Reality", event2: "Tropicrypt" , image: "images/dice.png"},
  { id: 14, name: "Econonics & Business", event1: "Travelogue" , image: "images/E&B.png"},
  { id: 15, name: "Game Dev", event1: "The Hollow Escape", event2: "PS Game Fest", image: "images/gameDev.jpg" },
  { id: 16, name: "Consultancy Club", event1: "Brandscript Ai", image: "images/ConsultingClub.jpg" },
  { id: 17, name: "Expressions", event1: "Canvas Conclave", event2: "Trivia Tints", image: "images/expressions.jpeg" },
  { id: 18, name: "KPH ", event1: "Knuth Cup", event2: "Code Ne Bana Di Jodi" , image: "images/Knuth.png"},
  { id: 19, name: "DSC", event1: "Glitchy You or System?", event2: "Decode The Drama" , image: "images/DSC.png"},
  { id: 20, name: "CICE", event1: "Escape Room", event2: "Electric Tambola" , image: "images/CICE.png"},
  { id: 21, name: "UCR", event1: "Grip N' Groove", event2: "RoboSoccer", image: "images/UCR.png" },
  { id: 22, name: "Zencoders", event1: "Build-Chella", event2: "Hack a Match" , image: "images/Zencoders.png"},

  { id: 23, name: "Yoga, Health and Prahari", event1: "Yoga se hi Hoga", event2: "Tote-ally Zen" , image: "images/Yoga.png"},
  { id: 24, name: "HRUDAY", event1: "The Pirate's Curse" , image: "images/HRUDAY.jpeg"},
  { id: 25, name: "AI/ML", event1: "Mind Escape 2.0", event2: "Zodiac of Dammed", image: "images/Aiml.jpg" },
  { id: 26, name: "Ai Tronics", event1: "Digital Escape City", event2: "Think & Blink" , image: "images/ai_tronics.jpeg"},
  { id: 27, name: "Page Turner Society", event1: "Jimmy Jab Games", event2: "Family Feud" , image: "images/PTS.png"},
  { id: 28, name: "Marketing Minds", event1: "BrandVerse", image: "images/MM_Black.png" },
  { id: 29, name: "Umang", event1: "Dimag Ka Dangal" , image: "images/Umang.png"},
  { id: 30, name: "Parola X Debsoc", event1: "Press Conference", event2: "Survival Strategy Challenge",image: "images/Parola.png" },
];


const galleryImages = [
  "images/a.webp",
  "images/b.webp",
  "images/c.webp",
  "images/d.webp",
  "images/eight.webp",
  "images/five.webp",
  "images/four.webp",
  "images/i.webp",
  "images/seven.webp",
  "images/m.webp",
  "images/n.webp",
  
];

const repeatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

// --- CORE TEAM DATA ARRAY ---
const teamData = [
  { id: 1, name: "Prof.Manish Kumar Thakur", role: "Faculty Advisor ", image: "images/Manish_sir.jpeg" },
  { id: 2, name: "Dr.Taj Alam", role: "Faculty Coordinator", image: "images/taj_alam.png" },
  { id: 3, name: "Dr.Neetima Agrawal", role: "Faculty Coordinator", image: "images/Neetima_mam.jpeg" },
  { id: 4, name: "Ankur kumar Bharadwaj", role: "Faculty Coordinator", image: "images/Ankur.jpeg" },
  { id: 5, name: "Mr.Ritesh Kumar", role: "Faculty Coordinator", image: "images/Riteshh.jpeg" },
  { id: 6, name: "Sh.Amit Mishra", role: "Faculty Coordinator", image: "images/Amit.jpeg" },
  { id: 7, name: "Shubhanjali Singh", role: "Senior Advisor", image: "images/Shubhanjali.jpeg" },
  { id: 8, name: "Shivanshu Mishra ", role: "Senior Advisor", image: "images/Shivanshu.jpeg" },
  { id: 9, name: "Vibhu Chaudhary", role: "Senior Advisor", image: "images/Vibhu Chaudhary.jpg" },
  { id: 10, name: "Aditya Pandey", role: "Internal Affairs Head", image: "images/Aditya.jpg" },
  { id: 11, name: "Krishna Gupta", role: "Finance Head", image: "images/KrishnaGupta.JPG" },
  { id: 12, name: "Shubham Rai", role: "Management Head", image: "images/SHUBHAM RAI.jpg" },
  { id: 13, name: "Vaibhav Suryavanshi", role: "Management Head", image: "images/vaibhav.jpg" },
  { id: 14, name: "Ritish Jaiswal", role: "Digital Head", image: "images/Ritish_j.jpeg" },
  { id: 15, name: "Deepi Chaudhary", role: "Creative Head", image: "images/Deepi.jpg" },
  { id: 16, name: "Ramanshi Singhal", role: "Creative Head", image: "images/ramanshi.jpeg" },
  { id: 17, name: "Yuvraj Chabra", role: "Strategic Head", image: "images/Yuvraj_Chhabra.jpg" },
  { id: 18, name: "Mayank Varshney", role: "Strategic Head", image: "images/Mayank.jpg" },
  { id: 19, name: "Vijaya Singh", role: "Content Head", image: "images/Vijaya.jpeg" },
  { id: 20, name: "Eshita Singh", role: "Content Head", image: "images/eshita.jpg" },
  { id: 21, name: "Akarsh Jain", role: "PR Head", image: "images/Akarsh.jpeg" },
  { id: 22, name: "Harshit Yadav", role: "BBA Head", image: "images/Harshit.jpg" },
  { id: 23, name: "Madhav Agrawal", role: "Hospitality Head", image: "images/madhav.png" }
];

// ==========================================
// 1. THIS IS YOUR MAIN LANDING PAGE
// ==========================================
function LandingPage() {
  const navigate = useNavigate(); 
  const pageRef = useRef(null);
  const ringRef = useRef(null);
  const [activeTeamBg, setActiveTeamBg] = useState(teamData[0].image);
  
  // State to toggle Mobile Navigation Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Calculate dynamic 3D radius based on screen size so it fits on mobile
  const getDynamicRadius = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 200 : 400; // Shrink circle on mobile
    }
    return 400;
  };
  const [ringRadius, setRingRadius] = useState(getDynamicRadius());

  useEffect(() => {
    const handleResize = () => setRingRadius(getDynamicRadius());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // --- GSAP 3D INTRO ANIMATION & NAVBAR DROP ANIMATION ---
  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set('.intro-card', { opacity: 1 });
    gsap.set('.reveal-after-intro', { opacity: 0 });
    gsap.set('.hero-letter', { opacity: 0, y: -1000, scale: 1.2, rotateX: 90 });

    gsap.fromTo('.nav-box-left', 
      { y: -150, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.6)", delay: 0.2 }
    );
    gsap.fromTo('.nav-box-right', 
      { y: -150, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.6)", delay: 0.4 }
    );

    tl.fromTo(ringRef.current,
      { rotateY: 0, rotateX: 5 }, 
      { rotateY: -360, duration: 2.5, ease: "power2.inOut" } 
    )
    .to('.intro-card', {
      z: 1200, 
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "power3.in"
    }, "-=0.5") 
    .to('.hero-letter', {
      y: 0, 
      scale: 1, 
      rotateX: 0, 
      opacity: 1, 
      duration: 1.5, 
      stagger: 0.08, 
      ease: "bounce.out" 
    })
    .to('.reveal-after-intro', {
      opacity: 1, 
      y: 0, 
      duration: 1, 
      stagger: 0.2, 
      ease: "power2.out"
    }, "-=0.2");

  }, { scope: pageRef });

  // Helper to close menu when clicking a mobile link
  const handleMobileNavClick = () => setIsMobileMenuOpen(false);

  return (
    // Updated background text selection to Red
    <div ref={pageRef} className="relative text-white min-h-screen font-sans selection:bg-red-500/30 overflow-x-hidden">
      
      {/* GLOBAL FIXED BACKGROUND VIDEO */}
      <div className="fixed inset-0 z-[-2] w-full h-full pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/bg2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050508]/60" />
      </div>

      {/* 🌟 GOOGLE FONT INJECTION 🌟 */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          
          .font-bebas { font-family: 'Bebas Neue', sans-serif; }
          .perspective-container { perspective: 1200px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .pause-on-hover:hover > div { animation-play-state: paused !important; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          
          @keyframes frontFall {
            0% { transform: translate3d(0, -80%, -1200px); opacity: 0; }
            15% { opacity: 1; }
            75% { transform: translate3d(0, 0%, 0px); opacity: 1; }
            100% { transform: translate3d(0, 100%, 600px); opacity: 0; }
          }
          .animate-front-fall { animation: frontFall 14s linear infinite; }
        `}
      </style>

      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-[99999] pointer-events-none">
        
        {/* Left Side: Logos */}
        <div className="nav-box-left flex items-center gap-2 md:gap-6 bg-black/60 backdrop-blur-xl px-3 md:px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl pointer-events-auto">
          <img src="/images/logo1.png" alt="Logo 1" className="h-8 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
          <img src="/images/logo2.png" alt="Logo 2" className="h-8 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
          <img src="/images/logo3.png" alt="Logo 3" className="h-8 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
          <img src="/images/logo4.png" alt="Logo 4" className="h-8 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Right Side: Desktop Links (Color changed to amber-400 for hover) */}
        <div className="nav-box-right hidden md:flex gap-8 lg:gap-10 text-xs font-bold tracking-[0.2em] uppercase text-zinc-200 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/20 shadow-2xl pointer-events-auto">
          <a href="#home" className="hover:text-amber-400 transition-all duration-300">Home</a>
          <a href="#schedule" className="hover:text-amber-400 transition-all duration-300">Schedule</a>
          <a href="#events" className="hover:text-amber-400 transition-all duration-300">Events</a>
          <a href="#gallery" className="hover:text-amber-400 transition-all duration-300">Gallery</a>
          <a href="#team" className="hover:text-amber-400 transition-all duration-300">Team</a>
        </div>

        {/* Right Side: Mobile Hamburger Button */}
        <div className="nav-box-right md:hidden pointer-events-auto">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-black/60 backdrop-blur-xl p-3 rounded-xl border border-white/20 shadow-2xl flex flex-col justify-center items-center gap-1.5 w-12 h-12"
          >
            <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2 bg-amber-400' : 'w-6'}`}></span>
            <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
            <span className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2 bg-amber-400' : 'w-6'}`}></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99998] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden pointer-events-auto">
          <a href="#home" onClick={handleMobileNavClick} className="text-2xl font-black tracking-widest uppercase text-white hover:text-amber-400 transition-colors">Home</a>
          <a href="#schedule" onClick={handleMobileNavClick} className="text-2xl font-black tracking-widest uppercase text-white hover:text-amber-400 transition-colors">Schedule</a>
          <a href="#events" onClick={handleMobileNavClick} className="text-2xl font-black tracking-widest uppercase text-white hover:text-amber-400 transition-colors">Events</a>
          <a href="#gallery" onClick={handleMobileNavClick} className="text-2xl font-black tracking-widest uppercase text-white hover:text-amber-400 transition-colors">Gallery</a>
          <a href="#team" onClick={handleMobileNavClick} className="text-2xl font-black tracking-widest uppercase text-white hover:text-amber-400 transition-colors">Team</a>
        </div>
      )}

      {/* HERO SECTION */}
      <section 
        id="home" 
        className="h-screen w-full flex flex-col items-center justify-center relative border-b border-white/5 perspective-container overflow-hidden bg-transparent z-0"
      >
        <div ref={ringRef} className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none z-20">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              // 🌟 NEW: Red background and border for the 3D rotating cards
              className="intro-card absolute w-32 md:w-48 h-48 md:h-64 bg-red-950/80 rounded-2xl border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.4)] flex items-center justify-center overflow-hidden backdrop-blur-sm"
              style={{ transform: `rotateY(${i * 45}deg) translateZ(${ringRadius}px)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-transparent" />
              {/* 🌟 NEW: Golden text inside the cards */}
              <span className="font-black text-amber-400 text-lg md:text-2xl rotate-90 tracking-widest whitespace-nowrap drop-shadow-md">JYC PRESENTS</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center overflow-hidden p-4 mt-20 md:mt-0">
          {/* 🌟 NEW: Bebas Neue Font, Golden Text, and updated to "IMPRESSIONS'26" 🌟 */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas font-normal text-amber-400 tracking-wider text-center flex flex-wrap justify-center leading-none">
            {"IMPRESSIONS'26".split('').map((char, index) => (
              <span key={index} className="hero-letter inline-block drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" style={{ minWidth: char === ' ' ? '1rem' : 'auto' }}>
                {char}
              </span>
            ))}
          </h1>
          <p className="reveal-after-intro mt-4 text-lg md:text-3xl text-zinc-300 font-light tracking-[0.3em] uppercase text-center translate-y-[20px] drop-shadow-md">
            A 2 Day Techno-Cultural Fest – <span className="text-amber-400 font-bold">Tropical Beats</span>
          </p>

          {/* Changed button hover colors to Amber/Red */}
          <a href="#events" className="reveal-after-intro mt-10 px-8 py-4 rounded-full border border-red-500/50 bg-black/50 backdrop-blur-md text-amber-400 font-bold tracking-widest uppercase text-sm hover:bg-red-900/40 hover:scale-105 hover:border-red-400 hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all duration-300 translate-y-[20px]">
            Explore Events
          </a>
        </div>
      </section>

      {/* "COMING SOON" SCHEDULE SECTION */}
      <section 
        id="schedule" 
        className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden border-b border-white/5 z-0 bg-transparent"
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Bebas Font applied to section title */}
          <h2 className="text-6xl md:text-9xl font-bebas tracking-wide text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            Schedule
          </h2>
          
          <div className="mt-8 px-8 py-6 md:py-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.15)] flex flex-col items-center">
            {/* Golden Amber text for Coming Soon */}
            <h3 className="text-5xl md:text-7xl font-bebas text-amber-400 tracking-wider animate-pulse drop-shadow-md">
              Coming Soon
            </h3>
            <p className="mt-2 text-zinc-300 tracking-[0.2em] uppercase text-xs md:text-sm font-medium">
              The Tropical Beats timeline is being finalized.
            </p>
          </div>
        </div>
      </section>

      {/* DYNAMIC EVENTS SLIDER */}
      <section id="events" className="min-h-screen w-full flex flex-col justify-center bg-black/40 backdrop-blur-sm py-24 relative overflow-hidden border-b border-white/5">
        <div className="px-6 md:px-12 z-10 mb-12 text-center md:text-left">
          {/* Bebas Font */}
          <h2 className="text-5xl md:text-7xl font-bebas text-amber-400 tracking-wide drop-shadow-md">Participating Clubs</h2>
          <p className="text-zinc-300 mt-2 tracking-widest uppercase text-sm drop-shadow-md">Swipe, Click, and Explore</p>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          mousewheel={{ forceToAxis: true }}
          coverflowEffect={{ rotate: 40, stretch: 0, depth: 300, modifier: 1, slideShadows: false }}
          modules={[EffectCoverflow, Autoplay, Mousewheel]}
          className="w-full h-[400px] md:h-[500px]"
        >
          {eventsData.map((item) => (
            <SwiperSlide key={item.id} className="!w-[300px] md:!w-[600px] !h-[350px] md:!h-[450px]">
              <div 
                onClick={() => navigate(`/club/${item.id}`)}
                // Changed hover border to Red
                className="w-full h-full rounded-3xl bg-[#121214] border border-red-900/50 flex overflow-hidden shadow-2xl cursor-pointer hover:border-red-500/80 transition-colors"
              >
                <div className="w-1/2 h-full bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
                  <LazyLoadImage
                      src={item.image || "/images/logo1.png"}
                      alt={item.name}
                      effect="blur"
                      className="w-full h-full object-contain"
                  />
                </div>

                <div className="w-1/2 h-full flex flex-col">
                  <div className="h-1/2 w-full p-4 md:p-6 flex flex-col justify-center bg-black/80 border-b border-red-900/40 relative">
                    {/* Changed category to red */}
                    <span className="text-red-500 font-bold mb-1 text-[9px] md:text-[10px] uppercase tracking-widest">{item.category || 'EVENT'}</span>
                    <h3 className="text-lg md:text-2xl font-black text-amber-400 leading-tight">{item.name}</h3>
                  </div>

                  <div className="flex-1 w-full flex relative">
                    {!item.event2 ? (
                      <div className="w-full h-full p-2 md:p-4 flex flex-col justify-center items-center bg-[#0a0a0a]">
                        <span className="text-[8px] md:text-[9px] text-zinc-500 mb-1 tracking-widest uppercase">Event</span>
                        <span className="text-[9px] md:text-xs font-bold text-zinc-200 text-center line-clamp-3">
                          {item.event1 || 'TBA'}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-1/2 h-full p-2 md:p-4 flex flex-col justify-center items-center bg-[#0a0a0a] border-r border-red-900/40">
                          <span className="text-[8px] md:text-[9px] text-zinc-500 mb-1 tracking-widest uppercase">Event 1</span>
                          <span className="text-[9px] md:text-xs font-bold text-zinc-200 text-center line-clamp-3">
                            {item.event1}
                          </span>
                        </div>
                        <div className="w-1/2 h-full p-2 md:p-4 flex flex-col justify-center items-center bg-[#0a0a0a]">
                          <span className="text-[8px] md:text-[9px] text-zinc-500 mb-1 tracking-widest uppercase">Event 2</span>
                          <span className="text-[9px] md:text-xs font-bold text-zinc-200 text-center line-clamp-3">
                            {item.event2}
                          </span>
                        </div>
                      </>
                    )}

                    {item.extraEventsCount && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] text-amber-400 font-bold uppercase tracking-widest bg-red-950 px-2 md:px-3 py-1 rounded-full border border-red-500/50 shadow-lg whitespace-nowrap">
                        + {item.extraEventsCount} More
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="h-screen w-full relative bg-[#050508] border-b border-white/5 overflow-hidden flex justify-center perspective-container">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-[#050508]/40 backdrop-blur-md px-12 py-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase drop-shadow-lg m-0">
              Past Echoes
            </h2>
          </div>
        </div>

        <div className="w-full max-w-7xl h-full flex gap-8 md:gap-24 px-4 md:px-12 pt-16 z-10 perspective-container">
         {[0, 1, 2].map((colIndex) => {
  const colImages = repeatedImages.filter((_, i) => i % 3 === colIndex);

  return (
    <div key={colIndex} className="flex-1 h-full relative pause-on-hover transform-style-3d cursor-pointer">
      {colImages.map((img, imgIndex) => {
        const delay = (imgIndex * 2) + colIndex * 0.7;

        return (
          <div
            key={imgIndex}
            className="absolute top-[10%] w-full aspect-[4/5] bg-[#121214] rounded-2xl border border-white/10 shadow-2xl animate-front-fall"
            style={{ animationDelay: `-${delay}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-2xl" />

            <LazyLoadImage
                src={img}
                alt="gallery"
                effect="blur"
                className="w-full h-full object-cover rounded-2xl"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-2xl" />
          </div>
        );
      })}
    </div>
  );
})}
        </div>
      </section>

      {/* CORE TEAM */}
      <section id="team" className="min-h-screen w-full relative flex flex-col justify-center items-center py-24 overflow-hidden border-b border-white/5 transition-all duration-700 ease-in-out" style={{ backgroundImage: `url(${activeTeamBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-all duration-700" />

        <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center px-4 md:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-6xl md:text-9xl font-bebas text-white tracking-wide drop-shadow-lg">Core Team</h2>
            <p className="text-amber-400 mt-2 tracking-widest uppercase text-sm">Best People For Your Work</p>
          </div>

          <div className="w-full flex gap-4 md:gap-6 overflow-x-auto pb-10 pt-4 px-4 snap-x snap-mandatory scrollbar-hide items-center">
            {teamData.map((member) => (
              <div key={member.id} onMouseEnter={() => setActiveTeamBg(member.image)} className="group relative shrink-0 w-[240px] h-[340px] md:w-[300px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer snap-center border border-white/10 hover:border-red-500 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(220,38,38,0.4)]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl md:text-2xl font-black text-amber-400 mb-1 drop-shadow-md leading-tight">{member.name}</h3>
                  <p className="text-[10px] md:text-xs font-bold tracking-widest text-red-400 uppercase drop-shadow-md">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-black/80 backdrop-blur-lg pt-24 pb-12 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-12 text-center md:text-left">
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="font-bebas text-5xl md:text-8xl tracking-wide text-white drop-shadow-md">IMPRESSIONS<span className="text-red-500">'26</span></h2>
            <p className="text-zinc-400 tracking-[0.2em] uppercase text-xs md:text-sm font-medium drop-shadow-md">Tropical Beats. Endless Memories.</p>
          </div>
          <div className="flex flex-col gap-8 md:items-end">
            <a href="https://www.instagram.com/jiit.impressions/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-zinc-400 hover:text-amber-400 transition-colors w-max mx-auto md:mx-0">
              <span className="font-mono tracking-widest text-sm drop-shadow-md">@impressions_26</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/club/:id" element={<ClubDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
