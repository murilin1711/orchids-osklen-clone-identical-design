"use client";

import Image from "next/image";

export default function Produto1Page() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ===== GALERIA ===== */}
        <div className="space-y-4">
          <div className="relative w-full aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=80"
              alt="Camisa Nature Jacquard Atoalhado"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80",
            ].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square bg-neutral-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition"
              >
                <Image
                  src={img}
                  alt={`Imagem ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===== INFORMAÇÕES ===== */}
        <div className="flex flex-col">
          <span className="uppercase text-xs tracking-widest text-[#2e3091] mb-2">
            Colégio Militar
          </span>

          <h1 className="text-2xl font-medium text-neutral-900 leading-tight">
            Camisa Nature Jacquard Atoalhado
          </h1>

          <p className="mt-4 text-xl font-medium text-neutral-900">
            R$ 697,00
          </p>

          <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
            Camisa confeccionada em jacquard atoalhado de algodão com textura
            exclusiva. Modelagem confortável e acabamento premium.
          </p>

          {/* ===== TAMANHOS ===== */}
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Tamanho</div>
            <div className="flex gap-2">
              {["PP", "P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border border-neutral-200 rounded-md text-sm hover:border-neutral-400 transition cursor-pointer"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ===== AÇÕES ===== */}
          <div className="mt-8 flex gap-3">
            <button className="flex-1 bg-[#2e3091] text-white py-3 rounded-md text-sm hover:opacity-95 transition">
              Selecionar tamanho
            </button>

            <button className="flex-1 border border-neutral-300 py-3 rounded-md text-sm hover:bg-neutral-50 transition">
              Adicionar ao carrinho
            </button>
          </div>

          {/* ===== INFO EXTRA ===== */}
          <div className="mt-6 text-sm text-neutral-500">
            Frete grátis a partir de R$ 200 · Troca ou devolução grátis
          </div>
        </div>
      </div>
    </main>
  );
}
