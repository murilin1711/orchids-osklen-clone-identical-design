"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const slides = [
{
  url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/Venha-nos-fazer-uma-visita-a-equipe-Goias-Minas-esta-pronta-para-te-atender-1-1765241617616.mp4',
  title: "",
  link: ""
}];


const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const bgVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Apply mute state to all videos
    videoRefs.current.forEach((video) => {
      if (video) video.muted = !isMuted;
    });
    bgVideoRefs.current.forEach((video) => {
      if (video) video.muted = !isMuted;
    });
  };

  const handleVideoEnd = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    // Play current video and pause others, keep them synchronized
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.currentTime = 0;
          video.muted = isMuted;
          video.play();
        } else {
          video.pause();
        }
      }
    });
    
    bgVideoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.currentTime = 0;
          video.muted = isMuted;
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide, isMuted]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video (Blurred, only in hero section) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) =>
        <div
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
          }>

            <video
            ref={(el) => {bgVideoRefs.current[index] = el;}}
            className="h-full w-full object-cover blur-md"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            aria-hidden="true">

              <source src={slide.url} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Hero Banner Content with Floating Shadow */}
      <div id="hero-banner" className="relative z-10 h-full w-full pt-24 lg:pt-32 pb-8 lg:pb-12 px-4 lg:px-8">
        <div className="relative h-full w-full max-w-[95%] lg:max-w-[90%] mx-auto overflow-hidden rounded-2xl lg:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-shadow duration-300">
          {slides.map((slide, index) =>
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
            }>

              <video
              ref={(el) => {videoRefs.current[index] = el;}}
              className="h-full w-full object-cover rounded-2xl lg:rounded-3xl"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnd}
              aria-label={`${slide.title} campaign video background`}>

                <source src={slide.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 z-10 bg-white/10 rounded-2xl lg:rounded-3xl" aria-hidden="true" />

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center gap-4">
                  {/* Text Title */}
                  <h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-black !whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <a href="#" className="text-sm font-medium tracking-tight underline underline-offset-4 text-black !whitespace-pre-line">
                    {slide.link}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Compre Agora Button */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
            <button className="bg-white px-8 py-3 rounded-lg font-bold text-blue-#2e3092 hover:bg-white/90 transition-colors duration-200 shadow-lg">
              Compre Agora
            </button>
          </div>

          {/* Sound Control Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-8 right-8 z-30 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-black" />
            ) : (
              <Volume2 className="w-5 h-5 text-black" />
            )}
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-black w-6' : 'bg-black/30'}`
              }
              aria-label={`Go to slide ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

};

export default HeroBanner;