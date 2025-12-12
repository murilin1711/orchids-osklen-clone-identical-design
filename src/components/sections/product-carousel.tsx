"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: string;
  image1: string;
  image2: string;
  href?: string;
  cta?: string;
  featured?: boolean;
  badge?: string;
  accent?: string;
};

const products: Product[] = [
  {
    id: 0,
    name: "Colégio Militar",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/military-uniform-1765435113286.jpg",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/military-uniform-1765435113286.jpg",
    href: "/escolas/colegio-militar",
    cta: "Comprar Agora",
    featured: true,
    badge: "Destaque do Mês",
    accent: "#c9a04f"
  },
  {
    id: 1,
    name: "Adonai",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/goias_minas.pdf__1_-removebg-preview-1765246693154.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/goias_minas.pdf__1_-removebg-preview-1765246693154.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 2,
    name: "Colégio Delta",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/goias_minas.pdf__2_-removebg-preview-1765246749643.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/goias_minas.pdf__2_-removebg-preview-1765246749643.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 3,
    name: "Escola Modelo",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/goias_minas.pdf__3_-removebg-preview-1765246834589.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/goias_minas.pdf__3_-removebg-preview-1765246834589.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 4,
    name: "Escola Educare",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-removebg-preview-1765247533532.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-removebg-preview-1765247533532.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 5,
    name: "Escola Educar",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-removebg-preview-1765247533630.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-removebg-preview-1765247533630.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 6,
    name: "Escola Pinguinho de Gente",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-removebg-preview-1765247533847.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document/uploads/3-removebg-preview-1765247533847.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 7,
    name: "Educandário Dom Pedro II",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4-removebg-preview-1765247533750.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4-removebg-preview-1765247533750.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 8,
    name: "Villa Galileu",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-removebg-preview-1-1765249932421.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-removebg-preview-1-1765249932421.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 9,
    name: "DOM",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-removebg-preview-1-1765249932384.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1-removebg-preview-1-1765249932384.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 10,
    name: "Colégio Galileu",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-removebg-preview-1-1765249932104.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/3-removebg-preview-1-1765249932104.png?width=8000&height=8000&resize=contain"
  },
  {
    id: 11,
    name: "Colégio São Francisco de Assis",
    price: "",
    image1: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4-removebg-preview-1-1765249932417.png?width=8000&height=8000&resize=contain",
    image2: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/4-removebg-preview-1-1765249932417.png?width=8000&height=8000&resize=contain"
  }
];

// Componente para números animados
const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = end / (duration / 16); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2e3091]">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const isFeatured = product.featured;
  const accent = product.accent || "#2e3091";

  return (
    <div className={`flex-shrink-0 ${isFeatured ? "w-[340px] md:w-[400px] lg:w-[450px]" : "w-[280px] md:w-[300px] lg:w-[320px]"}`}>
      <a href={product.href || "#"} className="block group h-full">
        <div className={`relative overflow-hidden rounded-2xl aspect-[3/4] flex items-center justify-center transition-all duration-500 group-hover:scale-[1.02] ${isFeatured ? "bg-gradient-to-b from-gray-900 to-gray-800 border-2 border-[#c9a04f]/30 shadow-[0_20px_60px_-15px_rgba(201,160,79,0.4)]" : "bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 group-hover:border-[#2e3091] group-hover:shadow-lg"}`}>
          
          {/* Efeito de brilho no card em destaque */}
          {isFeatured && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a04f]/10 via-transparent to-[#c9a04f]/5" />
          )}

          {/* Badge especial para o Colégio Militar */}
          {isFeatured && (
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
              <span className="bg-gradient-to-r from-[#c9a04f] to-[#e6c072] text-gray-900 px-4 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg">
                {product.badge}
              </span>
              <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ Exclusivo
              </span>
            </div>
          )}

          {/* Imagem com efeitos diferentes */}
          <div className={`absolute inset-0 ${isFeatured ? "p-2" : "p-6"}`}>
            <Image
              src={product.image1}
              alt={product.name}
              width={isFeatured ? 450 : 320}
              height={isFeatured ? 600 : 427}
              className={`w-full h-full object-contain ${isFeatured ? "opacity-95 group-hover:opacity-100 scale-100 group-hover:scale-105" : "opacity-30 group-hover:opacity-70"} transition-all duration-700`}
            />
          </div>

          {/* Overlay gradiente para melhor legibilidade */}
          <div className={`absolute inset-0 ${isFeatured ? "bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" : "bg-gradient-to-t from-black/0 via-transparent to-transparent"}`} />

          {/* Conteúdo do card */}
          <div className={`absolute bottom-0 left-0 right-0 p-6 ${isFeatured ? "bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent" : ""}`}>
            <div className="relative z-20">
              {isFeatured ? (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">
                    Uniformes militares de alta qualidade com tecidos especiais e acabamento premium
                  </p>
                  <button className="w-full bg-gradient-to-r from-[#c9a04f] to-[#e6c072] text-gray-900 font-bold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                    {product.cta}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <button className="bg-[#2e3091] text-white px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg hover:bg-[#252a7a]">
                      Em breve
                    </button>
                  </div>
                  <h3 className="text-base lg:text-lg font-medium text-gray-900 leading-tight text-center mt-4 group-hover:text-[#2e3091] transition-colors duration-300">
                    {product.name}
                  </h3>
                </>
              )}
            </div>
          </div>

          {/* Efeito de borda dourada no hover para o card em destaque */}
          {isFeatured && (
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9a04f]/50 rounded-2xl transition-all duration-500" />
          )}
        </div>
      </a>
    </div>
  );
};

const ProductCarousel = () => {
  return (
    <section className="w-full py-10 md:py-14 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#2e3091] mb-3 md:mb-4">
            Escolas que Confiam em Nossa Qualidade
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-12">
            Nossa tradição em uniformes escolares conquistou a confiança de diversas instituições de ensino
          </p>
        </div>

        {/* Destaque especial para o Colégio Militar */}
        <div className="mb-10 p-6 bg-gradient-to-r from-[#2e3091]/5 to-[#c9a04f]/5 rounded-2xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 bg-[#2e3091] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>⭐</span>
                <span>Destaque Especial</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Colégio Militar
              </h3>
              <p className="text-gray-600 mb-4">
                Este mês, estamos com uma linha exclusiva de uniformes para o Colégio Militar. 
                Qualidade premium, tecidos resistentes e acabamento impecável.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Disponível para compra
                </span>
                <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Entrega em 7 dias
                </span>
              </div>
              <a 
                href="/escolas/colegio-militar" 
                className="inline-flex items-center gap-2 text-[#2e3091] font-semibold hover:text-[#252a7a] transition-colors"
              >
                Ver coleção completa
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/military-uniform-1765435113286.jpg"
                  alt="Uniforme do Colégio Militar"
                  width={320}
                  height={320}
                  className="object-contain w-full h-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl">
            <button className="py-2 px-6 rounded-lg text-sm font-medium transition-colors bg-[#2e3091] text-white">
              Ver Tudo
            </button>
            <button className="py-2 px-6 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-200">
              Escolas
            </button>
            <button className="py-2 px-6 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-200">
              Empresas
            </button>
          </div>
        </div>

        {/* Carrossel de produtos */}
        <div className="relative mb-10 md:mb-14">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 md:gap-8 pb-4 px-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          
          {/* Indicador visual de scroll */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Arraste para ver mais</span>
            </div>
          </div>
        </div>

        {/* Estatísticas animadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="mb-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-[#2e3091]">🏫</span>
              </div>
              <AnimatedCounter end={40} suffix="+ anos" />
            </div>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              de experiência no mercado
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="mb-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-[#2e3091]">👨‍👩‍👧‍👦</span>
              </div>
              <AnimatedCounter end={10000} prefix="+ " suffix=" clientes" />
            </div>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              atendidos com excelência
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="mb-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl text-[#2e3091]">🤝</span>
              </div>
              <AnimatedCounter end={11} prefix="+ " suffix=" escolas" />
            </div>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              parceiras satisfeitas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;