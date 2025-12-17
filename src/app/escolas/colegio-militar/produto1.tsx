"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Repeat,
  CheckCircle,
  X,
} from "lucide-react";

/**
 * Produto1.tsx
 * Página de produto inspirada na imagem enviada.
 * - Layout 2-colunas (imagem / painel)
 * - Swatches circulares, indicadores, hover minimalista
 * - Micro-animações e transições suaves
 * - Cursor pointer em elementos clicáveis
 */

const PRODUCT = {
  id: 1,
  name: "Jouse Série 1 (Personalize)",
  price: 149,
  images: [
    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=80",
  ],
  colors: [
    { id: "preto", label: "Preto", hex: "#111111" },
    { id: "branco", label: "Branco", hex: "#f5f5f5" },
  ],
  finishes: [
    { id: "grafite", hex: "#8b8b8b" },
    { id: "vermelho", hex: "#ef4444" },
    { id: "azul", hex: "#2563eb" },
    { id: "menta", hex: "#86efac" },
  ],
  sizes: [
    { id: "CNH", label: "CNH" },
    { id: "RG", label: "RG" },
  ],
};

export default function Produto1() {
  const router = useRouter();

  // carousel
  const [index, setIndex] = useState(0);
  const total = PRODUCT.images.length;

  // selections
  const [color, setColor] = useState(PRODUCT.colors[0].id);
  const [finish, setFinish] = useState(PRODUCT.finishes[0].id);
  const [size, setSize] = useState<string | null>(PRODUCT.sizes[0].id);

  // pointer / touch for image drag
  const pointerStart = useRef<number | null>(null);
  const wheelLastAt = useRef(0);
  const wheelAccum = useRef(0);

  useEffect(() => {
    // reset index when product changes (not needed here but safe)
    setIndex(0);
  }, []);

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }
  function next() {
    setIndex((i) => (i + 1) % total);
  }
  function goTo(i: number) {
    setIndex(i);
  }

  // pointer handlers (mouse drag)
  function onPointerDown(e: React.PointerEvent) {
    // only primary
    if ((e as any).button && (e as any).button !== 0) return;
    pointerStart.current = (e as React.PointerEvent).clientX;
    (e.target as Element).setPointerCapture?.((e as any).pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (pointerStart.current == null) return;
    const delta = (e as React.PointerEvent).clientX - pointerStart.current;
    // visual drag not necessary; only determine end
  }
  function onPointerUp(e: React.PointerEvent) {
    if (pointerStart.current == null) return;
    const delta = (e as React.PointerEvent).clientX - pointerStart.current;
    const THRESH = 50;
    if (delta > THRESH) prev();
    else if (delta < -THRESH) next();
    pointerStart.current = null;
  }

  // touch handlers
  const touchStartX = useRef<number | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const TH = 40;
    if (delta > TH) prev();
    else if (delta < -TH) next();
    touchStartX.current = null;
  }

  // wheel for trackpad: require deliberate swipe
  function onWheel(e: React.WheelEvent) {
    const now = Date.now();
    // consider horizontal delta primarily
    wheelAccum.current += e.deltaX;
    const ACCUM_THRESHOLD = 80;
    const COOLDOWN = 600; // ms
    if (Math.abs(wheelAccum.current) > ACCUM_THRESHOLD && now - wheelLastAt.current > COOLDOWN) {
      if (wheelAccum.current > 0) next();
      else prev();
      wheelAccum.current = 0;
      wheelLastAt.current = now;
    }
  }

  return (
    <div className="min-h-screen bg-white text-[15px] antialiased">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT - IMAGEM */}
          <div className="lg:w-1/2 w-full flex items-center justify-center">
            <div
              className="relative w-full max-w-[720px] rounded-3xl overflow-visible"
              // handlers for gestures
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onWheel={onWheel}
            >
              {/* Large image container with subtle tilt/shadow */}
              <div className="relative">
                <div
                  className="w-full bg-white rounded-3xl transform transition-transform duration-500 hover:scale-101"
                  style={{
                    // keep a soft perspective to mimic floating product look
                    perspective: 1000,
                  }}
                >
                  <img
                    src={PRODUCT.images[index]}
                    alt={PRODUCT.name}
                    className="w-full h-[520px] object-contain block rounded-3xl transition-all duration-500 transform hover:scale-[1.02] ease-out"
                    draggable={false}
                    style={{
                      filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.12))",
                    }}
                  />
                </div>

                {/* Prev/Next minimal icons (no circle) */}
                <button
                  onClick={prev}
                  aria-label="Anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition"
                >
                  <ChevronLeft className="w-7 h-7 text-[#2e3091]" />
                </button>

                <button
                  onClick={next}
                  aria-label="Próxima"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition"
                >
                  <ChevronRight className="w-7 h-7 text-[#2e3091]" />
                </button>

                {/* thumbnails below image */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
                  {PRODUCT.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-20 h-12 rounded-lg overflow-hidden border transition transform ${
                        i === index
                          ? "scale-105 border-[#2e3091]"
                          : "border-neutral-200 hover:scale-[1.02]"
                      }`}
                      aria-label={`Foto ${i + 1}`}
                    >
                      <img src={src} className="w-full h-full object-cover" draggable={false} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - PAINEL */}
          <aside className="lg:w-1/2 w-full">
            <div className="max-w-[420px]">
              {/* title */}
              <h1 className="text-3xl font-semibold text-[#2e3091] mb-4">
                Personalize sua <span className="font-extrabold">Jouse Série 1</span>
              </h1>

              {/* category divider (subtle) */}
              <div className="h-px bg-neutral-200 mb-6" />

              {/* Color */}
              <div className="mb-6">
                <div className="text-sm font-medium text-neutral-900">Couro</div>
                <div className="text-xs text-neutral-400 mb-3">Preto</div>

                <div className="flex items-center gap-3">
                  {PRODUCT.colors.map((c) => {
                    const selected = color === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setColor(c.id)}
                        className={`w-10 h-10 rounded-full border transition flex items-center justify-center focus:outline-none ${
                          selected ? "ring-2 ring-[#2e3091] ring-offset-2" : "border-neutral-200"
                        }`}
                        style={{ background: c.hex }}
                        aria-pressed={selected}
                        title={c.label}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Finish */}
              <div className="mb-6">
                <div className="text-sm font-medium text-neutral-900">Acabamento</div>
                <div className="text-xs text-neutral-400 mb-3">Grafite</div>

                <div className="flex items-center gap-3">
                  {PRODUCT.finishes.map((f) => {
                    const selected = finish === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFinish(f.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition border ${
                          selected ? "ring-2 ring-[#2e3091] ring-offset-2" : "border-neutral-200 hover:scale-[1.03]"
                        }`}
                        style={{ background: f.hex }}
                        aria-pressed={selected}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <div className="text-sm font-medium text-neutral-900">Tamanho</div>
                <div className="text-xs text-neutral-400 mb-3">Sob medida para CNH, cédulas e até 4 cartões</div>

                <div className="flex gap-3">
                  {PRODUCT.sizes.map((s) => {
                    const active = size === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSize(s.id)}
                        className={`px-5 py-2 rounded-full border transition text-sm ${
                          active
                            ? "bg-white border-[#2e3091] text-[#2e3091] font-medium shadow-sm"
                            : "bg-neutral-50 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="mb-6">
                <div className="text-xl font-bold mb-2">R$ {PRODUCT.price}</div>
                <div className="text-sm text-neutral-500 mb-4">em até 3x sem juros</div>

                <button
                  className={`inline-block px-8 py-3 rounded-full text-white font-medium transition-shadow ${
                    size ? "bg-black shadow-lg hover:shadow-xl" : "bg-black/80 opacity-70 pointer-events-none"
                  }`}
                  onClick={() => {
                    if (!size) return;
                    // Aqui você pode redirecionar para checkout/seleção
                    alert(`Selecionado: ${PRODUCT.name} - ${size} - ${color}/${finish}`);
                  }}
                >
                  Selecionar
                </button>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium text-emerald-600">Frete grátis</div>
                    <div className="text-xs text-neutral-400">Entrega a partir de 2 dias úteis</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Repeat className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium text-emerald-600">Troca ou devolução grátis</div>
                    <div className="text-xs text-neutral-400">Fácil, rápido e sem burocracia</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium">3 anos de garantia</div>
                    <div className="text-xs text-neutral-400">Incluída automaticamente</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* small footer hint / breadcrumb like area */}
        <div className="mt-12 text-sm text-neutral-500">
          <button onClick={() => router.back()} className="underline text-[#2e3091]">Voltar</button>
        </div>
      </div>

      {/* Extra styles to make interactions feel crisp */}
      <style>{`
        /* make interactive elements show pointer clearly */
        button { cursor: pointer; }

        /* subtle scale helper */
        .scale-101 { transform: scale(1.01); }

        /* responsive tweaks */
        @media (max-width: 1024px) {
          img { height: auto !important; }
        }
      `}</style>
    </div>
  );
}
