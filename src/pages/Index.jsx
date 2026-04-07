import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Lenis from 'lenis';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Mousewheel } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// --- DATA ARRAYS ---
const eventsData = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  name: `Club ${i + 1}`,
  category: i % 2 === 0 ? 'Technical' : 'Cultural',
  event1: `Event A${i + 1}`,
  event2: `Event B${i + 1}`
}));

const col1 = [1, 2, 3, 4, 5, 6, 7];
const col2 = [8, 9, 10, 11, 12, 13, 14];
const col3 = [15, 16, 17, 18, 19, 20, 21];

function Index() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const ringRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
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
useEffect(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}, []);
  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set('.intro-card', { opacity: 1 });
    gsap.set('.reveal-after-intro', { opacity: 0 });
    gsap.set('.hero-letter', { opacity: 0, y: -1000, scale: 1.2, rotateX: 90 });

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

  const today = new Date().toISOString().split('T')[0]; 

  const scheduleEvents = {
    1: [
      { id: 1, title: 'Opening Ceremony', location: 'Main Auditorium', start: new Date(`${today}T18:00:00`), end: new Date(`${today}T19:30:00`) },
      { id: 2, title: 'Pro Night: Phase 1', location: 'Open Air Theatre', start: new Date(`${today}T19:30:00`), end: new Date(`${today}T21:00:00`) },
      { id: 3, title: 'Late Night DJ Set', location: 'Main Grounds', start: new Date(`${today}T21:00:00`), end: new Date(`${today}T23:00:00`) },
    ],
    2: [
      { id: 4, title: 'Hackathon Kickoff', location: 'CS Block', start: new Date(`${today}T09:00:00`), end: new Date(`${today}T12:00:00`) },
      { id: 5, title: 'Tech Talk: AI Future', location: 'Seminar Hall', start: new Date(`${today}T13:00:00`), end: new Date(`${today}T15:00:00`) },
      { id: 6, title: 'Closing Ceremony', location: 'Open Air Theatre', start: new Date(`${today}T16:00:00`), end: new Date(`${today}T19:00:00`) },
    ]
  };

  return (
    <div ref={pageRef} className="bg-[#050508] text-white min-h-screen font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      <style>
        {`
          .perspective-container { perspective: 1200px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .pause-on-hover:hover > div { animation-play-state: paused !important; }
          
          @keyframes frontFall {
            0% { transform: translate3d(0, -80%, -1200px); opacity: 0; }
            15% { opacity: 1; }
            75% { transform: translate3d(0, 0%, 0px); opacity: 1; }
            100% { transform: translate3d(0, 100%, 600px); opacity: 0; }
          }
          .animate-front-fall { animation: frontFall 14s linear infinite; }
        `}
      </style>
{/* ========================================= */}
      {/* 🌟 FINAL NAVBAR WITH 4 PUBLIC IMAGES 🌟 */}
      {/* ========================================= */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[99999]">
        
        {/* LOGOS */}
        <div className="flex items-center gap-4 md:gap-6 bg-black/60 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/20 shadow-2xl">
          
          <img 
            src="/images/logo1.png" 
            alt="Logo 1" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img 
            src="/images/logo2.png" 
            alt="Logo 2" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img 
            src="/images/logo3.png" 
            alt="Logo 3" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" 
          />
          <img 
            src="/images/logo4.png" 
            alt="Logo 4" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" 
          />

        </div>

        {/* NAV LINKS (Inside a visible glass box!) */}
        <div className="hidden md:flex gap-8 lg:gap-10 text-xs font-bold tracking-[0.2em] uppercase text-zinc-200 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/20 shadow-2xl">
         <div className="hidden md:flex gap-8 lg:gap-10 text-xs font-bold tracking-[0.2em] uppercase text-zinc-200 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/20 shadow-2xl">

  <span onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-emerald-400">Home</span>

  <span onClick={() => scrollToSection("schedule")} className="cursor-pointer hover:text-emerald-400">Schedule</span>

  <span onClick={() => scrollToSection("events")} className="cursor-pointer hover:text-emerald-400">Events</span>

  <span onClick={() => scrollToSection("gallery")} className="cursor-pointer hover:text-emerald-400">Gallery</span>

</div>
        </div>

      </nav>

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section 
        id="home" 
        className="h-screen w-full flex flex-col items-center justify-center relative border-b border-white/5 perspective-container overflow-hidden bg-[#050508] z-0"
        style={{
          backgroundImage: "url('/images/download.jpeg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#050508]/80 z-0 pointer-events-none" />

        <div ref={ringRef} className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none z-20">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="intro-card absolute w-48 h-64 bg-[#121214]/90 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm"
              style={{ transform: `rotateY(${i * 45}deg) translateZ(400px)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
              <span className="font-black text-zinc-400 text-2xl rotate-90 tracking-widest whitespace-nowrap">JYC PRESENTS</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center overflow-hidden p-4">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-emerald-400 tracking-tighter text-center flex flex-wrap justify-center">
            {"IMPRESSIONS'26".split('').map((char, index) => (
              <span 
                key={index} 
                className="hero-letter inline-block drop-shadow-[0_0_25px_rgba(52,211,153,0.5)]"
                style={{ minWidth: char === ' ' ? '1rem' : 'auto' }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className="reveal-after-intro mt-6 text-xl md:text-3xl text-emerald-400/90 font-light tracking-[0.3em] uppercase text-center translate-y-[20px] drop-shadow-md">
            Tropical Beats
          </p>

          <a 
  onClick={() => scrollToSection("events")}
  className="cursor-pointer reveal-after-intro mt-10 px-8 py-4 rounded-full ..."
>
  Register Now
</a>
        </div>
      </section>

      {/* FUTURISTIC SCHEDULE SECTION */}
      <section id="schedule" className="min-h-screen w-full flex flex-col items-center py-24 px-6 bg-[#030305] border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl w-full relative z-10 flex flex-col items-center">
          
          <div className="relative w-full max-w-[600px] h-[340px] flex justify-center overflow-hidden mb-8">
            <div className="absolute bottom-[-300px] w-[600px] h-[600px] rounded-full border border-white/5" />
            <div className="absolute bottom-[-280px] w-[560px] h-[560px] rounded-full border border-white/5" />
            
            {[1, 2].map((day) => {
              const isActive = activeDay === day;
              const rotation = day === 1 ? -24 : 24; 
              
              return (
                <div
                  key={day}
                  className="absolute bottom-0 w-0 h-[300px] origin-bottom flex justify-center z-20"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <button
                    onClick={() => setActiveDay(day)}
                    className={`absolute top-0 w-36 h-20 flex flex-col items-center justify-center rounded-t-2xl border-t-2 border-l border-r backdrop-blur-md transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-950/90 border-t-emerald-400 border-x-emerald-500/30 text-white shadow-[0_-15px_30px_rgba(52,211,153,0.3)] scale-110 z-30' 
                        : 'bg-[#030305] border-t-white/10 border-x-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] z-10'
                    }`}
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase opacity-70 mb-1">Day</span>
                    <span className={`text-2xl font-black ${isActive ? 'text-emerald-300' : ''}`}>0{day}</span>
                  </button>
                </div>
              );
            })}
            
            <div className="absolute bottom-6 px-6 py-2 border border-emerald-500/30 bg-emerald-500/10 rounded-sm z-30">
              <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-300">Live Timeline</span>
            </div>
          </div>
          
          <div className="relative flex flex-col w-full mt-8">
            <div className="absolute left-[38px] md:left-[54px] top-0 bottom-0 w-[2px] bg-white/5 z-0" />
            {scheduleEvents[activeDay].map((item) => {
              const isPast = currentTime > item.end;
              const isActive = currentTime >= item.start && currentTime <= item.end;
              const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

              return (
                <div 
                  key={item.id} 
                  className={`relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-8 border-b border-white/5 transition-all duration-500 ${
                    isActive ? 'bg-gradient-to-r from-emerald-500/5 to-transparent' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {(isPast || isActive) && (
                     <div className={`absolute left-[38px] md:left-[54px] top-0 ${isActive ? 'bottom-1/2' : 'bottom-0'} w-[2px] bg-emerald-500/40 z-0`} />
                  )}

                  <div className="absolute left-[35px] md:left-[51px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                    {isActive ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-100"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_12px_#34d399]"></span>
                      </span>
                    ) : isPast ? (
                      <div className="h-2 w-2 rounded-full bg-emerald-800" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-zinc-800" />
                    )}
                  </div>

                  <div className={`md:col-span-3 pl-16 md:pl-24 font-mono tracking-widest text-sm ${
                    isActive ? 'text-emerald-400 font-bold' : isPast ? 'text-zinc-700' : 'text-emerald-400/30'
                  }`}>
                    {formatTime(item.start)}
                  </div>

                  <div className={`md:col-span-5 text-xl font-bold tracking-wide ${
                    isActive ? 'text-white' : isPast ? 'text-zinc-600 line-through decoration-zinc-800' : 'text-zinc-300'
                  }`}>
                    {item.title}
                  </div>

                  <div className={`md:col-span-3 text-[10px] tracking-widest uppercase ${
                    isActive ? 'text-zinc-400' : isPast ? 'text-zinc-700' : 'text-zinc-600'
                  }`}>
                    {item.location}
                  </div>

                  <div className="md:col-span-1 flex justify-end pr-6">
                    {isActive ? (
                      <div className="w-8 h-8 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-light opacity-80">
                        →
                      </div>
                    ) : isPast ? (
                      <div className="w-8 h-8 flex items-center justify-center text-zinc-800 font-light">✓</div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center text-zinc-600 font-light opacity-30">→</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENTS SLIDER */}
      <section id="events" className="min-h-screen w-full flex flex-col justify-center bg-[#0a0a0a] py-24 relative overflow-hidden border-b border-zinc-800/50">
        <div className="px-6 md:px-12 z-10 mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-emerald-400 uppercase tracking-wide">
            Events
          </h2>
          <p className="text-zinc-400 mt-2 tracking-widest uppercase text-sm">Swipe, Scroll, or Sit Back</p>
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
          className="w-full h-[500px]"
        >
          {eventsData.map((item) => (
            <SwiperSlide key={item.id} className="!w-[320px] md:!w-[600px] !h-[400px] md:!h-[450px]">
              
              <div 
                onClick={() => navigate(`/club/${item.id}`)}
                className="w-full h-full rounded-3xl bg-[#121214] border border-zinc-800/50 flex overflow-hidden shadow-2xl cursor-pointer hover:border-emerald-500/50 transition-colors"
              >
                <div className="w-1/2 h-full bg-zinc-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  <div className="w-full h-full bg-zinc-700" />
                </div>
                <div className="w-1/2 h-full flex flex-col">
                  <div className="h-1/2 w-full p-6 flex flex-col justify-center bg-[#121214] border-b border-zinc-800/50">
                    <span className="text-emerald-500 font-bold mb-1 text-xs uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white">{item.name}</h3>
                  </div>
                  <div className="h-1/2 w-full flex">
                    <div className="w-1/2 h-full p-4 flex flex-col justify-center items-center bg-[#0a0a0a] border-r border-zinc-800/50">
                      <span className="text-[10px] text-zinc-500 mb-1 tracking-widest uppercase">Event 1</span>
                      <span className="text-xs font-bold text-zinc-200 text-center">{item.event1}</span>
                    </div>
                    <div className="w-1/2 h-full p-4 flex flex-col justify-center items-center bg-[#0a0a0a]">
                      <span className="text-[10px] text-zinc-500 mb-1 tracking-widest uppercase">Event 2</span>
                      <span className="text-xs font-bold text-zinc-200 text-center">{item.event2}</span>
                    </div>
                  </div>
                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="h-screen w-full relative bg-[#050508] border-b border-white/5 overflow-hidden flex justify-center perspective-container">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-[#050508]/40 backdrop-blur-md px-12 py-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase drop-shadow-lg m-0">
              Past Echoes
            </h2>
          </div>
        </div>

        <div className="w-full max-w-7xl h-full flex gap-8 md:gap-24 px-4 md:px-12 pt-16 z-10 perspective-container">
          {[col1, col2, col3].map((col, index) => {
            const colDelayOffset = index * 0.7;
            return (
              <div key={index} className="flex-1 h-full relative pause-on-hover transform-style-3d cursor-pointer">
                {col.map((item, imgIndex) => {
                  const delay = (imgIndex * 2) + colDelayOffset; 
                  return (
                    <div
                      key={imgIndex}
                      className="absolute top-[10%] w-full aspect-[4/5] bg-[#121214] rounded-2xl border border-white/10 shadow-2xl animate-front-fall"
                      style={{ animationDelay: `-${delay}s` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-2xl" />
                      <div className="absolute bottom-6 left-6 text-zinc-500 font-bold text-2xl opacity-40">IMG_{item}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#030305] pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-black text-5xl md:text-7xl tracking-tighter text-white">IMP<span className="text-emerald-500">'26</span></h2>
            <p className="text-zinc-500 tracking-[0.2em] uppercase text-sm font-medium">Tropical Beats. Endless Memories.</p>
          </div>
          <div className="flex flex-col gap-8 md:items-end">
            <a href="https://instagram.com/your_handle_here" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-zinc-400 hover:text-emerald-400 transition-colors w-max">
              <span className="font-mono tracking-widest text-sm">@impressions_26</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Index;