"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";

/* -------------------- Tipos -------------------- */
type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
};

/* -------------------- Dados -------------------- */
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Camisa Nature Jacquard Atoalhado",
    price: 697,
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],
    category: "Camisas",
  },
  {
    id: 2,
    name: "Bermuda Jacquard Daisy",
    price: 597,
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543",
      "https://images.unsplash.com/photo-1503342452485-86f7b3e8c2a6",
      "https://images.unsplash.com/photo-1544441893-675973e31985",
    ],
    category: "Bermudas",
  },
];

/* -------------------- Componente -------------------- */
export default function LojaEstiloOsklen() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState<Record<number, number>>({});
  const touchStartX = useRef<Record<number, number>>({});
  const dragging = useRef(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<string | null>(null);

  /* -------------------- Carousel -------------------- */
  function nextImage(id: number, total: number) {
    setActiveIndex((s) => ({ ...s, [id]: ((s[id] ?? 0) + 1) % total }));
  }

  function prevImage(id: number, total: number) {
    setActiveIndex((s) => ({
      ...s,
      [id]: ((s[id] ?? 0) - 1 + total) % total,
    }));
  }

  function handleTouchStart(e: React.TouchEvent, id: number) {
    touchStartX.current[id] = e.touches[0].clientX;
    dragging.current = true;
  }

  function handleTouchEnd(e: React.TouchEvent, p: Product) {
    if (!dragging.current) return;
    const delta =
      e.changedTouches[0].clientX - touchStartX.current[p.id];
    if (delta > 40) prevImage(p.id, p.images.length);
    if (delta < -40) nextImage(p.id, p.images.length);
    dragging.current = false;
  }

  /* -------------------- Add carrinho -------------------- */
  function openAdd(product: Product) {
    setModalProduct(product);
    setModalSize(null);
    setOpenAddModal(true);
  }

  return (
    <div className="min-h-screen bg-white text-[15px]">
      {/* HEADER FIXO */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <span className="uppercase text-xs tracking-widest text-[#2e3091]">
            loja
          </span>
          <h1 className="text-2xl font-medium text-[#2e3091] capitalize">
            colégio militar
          </h1>
        </div>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {initialProducts.map((p) => {
          const idx = activeIndex[p.id] ?? 0;
          return (
            <article key={p.id} className="group cursor-pointer">
              <div
                className="relative aspect-[9/12] overflow-hidden rounded-2xl"
                onClick={() =>
                  p.id === 1 &&
                  router.push("/escolas/colegio-militar/produto1")
                }
                onTouchStart={(e) => handleTouchStart(e, p.id)}
                onTouchEnd={(e) => handleTouchEnd(e, p)}
              >
                <img
                  src={p.images[idx]}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                />

                {/* SETAS */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(p.id, p.images.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-[#2e3091]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(p.id, p.images.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-[#2e3091]" />
                </button>

                {/* BOTÃO + */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAdd(p);
                  }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-black" />
                </button>
              </div>

              <div className="mt-3">
                <h3 className="text-[13px] font-light text-gray-900 line-clamp-1">
                  {p.name}
                </h3>
                <span className="text-[15px] font-medium">
                  R$ {p.price.toFixed(2)}
                </span>
              </div>
            </article>
          );
        })}
      </main>

      {/* MODAL CARRINHO */}
      {openAddModal && modalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenAddModal(false)}
          />

          <div className="relative bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-[#2e3091]">
                  {modalProduct.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  R$ {modalProduct.price.toFixed(2)}
                </p>
              </div>
              <button onClick={() => setOpenAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Tamanho</p>
              <div className="flex gap-2">
                {["PP", "P", "M", "G", "GG"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setModalSize(s)}
                    className={`px-4 py-2 rounded border text-sm ${
                      modalSize === s
                        ? "border-[#2e3091] text-[#2e3091]"
                        : "border-neutral-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!modalSize}
              className="mt-6 w-full py-3 rounded bg-[#2e3091] text-white text-sm disabled:opacity-40"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
