"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Produto1Page() {
  /* =========================
     ESTADOS EXISTENTES
  ========================= */
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  /* =========================
     FIT FINDER (NOVO)
  ========================= */
  const [openFitFinder, setOpenFitFinder] = useState(false);
  const [fitStep, setFitStep] = useState(1);

  const [altura, setAltura] = useState(170);
  const [peso, setPeso] = useState(70);
  const [sexo, setSexo] = useState<"m" | "f" | null>(null);
  const [fit, setFit] = useState<"justo" | "regular" | "oversize" | null>(null);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* =========================
           GALERIA
        ========================= */}
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
                <Image src={img} alt={`Imagem ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* =========================
           INFORMAÇÕES
        ========================= */}
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

          {/* =========================
             TAMANHOS
          ========================= */}
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Tamanho</div>
            <div className="flex gap-2">
              {["PP", "P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md text-sm border transition ${
                    selectedSize === size
                      ? "border-[#2e3091] text-[#2e3091]"
                      : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* ===== NOVO BOTÃO ===== */}
            <button
              onClick={() => setOpenFitFinder(true)}
              className="mt-4 text-sm text-[#2e3091] underline underline-offset-4 hover:opacity-80 transition"
            >
              Encontrar minha medida ideal
            </button>
          </div>

          {/* =========================
             AÇÕES
          ========================= */}
          <div className="mt-8 flex gap-3">
            <button className="flex-1 bg-[#2e3091] text-white py-3 rounded-md text-sm hover:opacity-95 transition">
              Selecionar tamanho
            </button>

            <button className="flex-1 border border-neutral-300 py-3 rounded-md text-sm hover:bg-neutral-50 transition">
              Adicionar ao carrinho
            </button>
          </div>

          <div className="mt-6 text-sm text-neutral-500">
            Frete grátis a partir de R$ 200 · Troca ou devolução grátis
          </div>
        </div>
      </div>

      {/* =========================
         FIT FINDER (PAINEL)
      ========================= */}
      <AnimatePresence>
        {openFitFinder && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpenFitFinder(false)}
            />

            {/* painel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 p-6 flex flex-col"
            >
              {/* progresso */}
              <div className="h-1 w-full bg-neutral-100 rounded mb-6 overflow-hidden">
                <div
                  className="h-full bg-[#2e3091] transition-all"
                  style={{ width: `${(fitStep / 3) * 100}%` }}
                />
              </div>

              {/* ===== ETAPA 1 ===== */}
              {fitStep === 1 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg font-medium">Seu perfil</h2>

                  <div>
                    <label className="text-sm">Altura: {altura} cm</label>
                    <input type="range" min={150} max={200} value={altura}
                      onChange={(e) => setAltura(Number(e.target.value))}
                      className="w-full" />
                  </div>

                  <div>
                    <label className="text-sm">Peso: {peso} kg</label>
                    <input type="range" min={45} max={120} value={peso}
                      onChange={(e) => setPeso(Number(e.target.value))}
                      className="w-full" />
                  </div>

                  <div className="flex gap-3">
                    {["m", "f"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSexo(s as any)}
                        className={`flex-1 py-3 border rounded-md text-sm ${
                          sexo === s ? "border-[#2e3091] text-[#2e3091]" : "border-neutral-200"
                        }`}
                      >
                        {s === "m" ? "Masculino" : "Feminino"}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setFitStep(2)}
                    disabled={!sexo}
                    className="mt-auto bg-[#2e3091] text-white py-3 rounded-md disabled:opacity-50"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* ===== ETAPA 2 ===== */}
              {fitStep === 2 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg font-medium">Como você usa suas roupas?</h2>

                  <div className="grid grid-cols-3 gap-3">
                    {["justo", "regular", "oversize"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFit(f as any)}
                        className={`h-24 border rounded-xl flex items-center justify-center ${
                          fit === f ? "border-[#2e3091]" : "border-neutral-200"
                        }`}
                      >
                        <div className="w-6 h-10 bg-neutral-300 rounded-full" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setFitStep(3)}
                    disabled={!fit}
                    className="mt-auto bg-[#2e3091] text-white py-3 rounded-md disabled:opacity-50"
                  >
                    Ver resultado
                  </button>
                </div>
              )}

              {/* ===== ETAPA 3 ===== */}
              {fitStep === 3 && (
                <div className="flex flex-col gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-green-800">
                      Caimento ideal identificado
                    </h3>

                    <p className="mt-2 text-lg font-medium">
                      Tamanho recomendado: <span className="text-green-700">M</span>
                    </p>

                    <p className="mt-2 text-sm text-neutral-600">
                      Desenvolvido para sua altura e proporção corporal.
                    </p>

                    <p className="mt-3 text-sm text-orange-600">
                      ⚠️ O tamanho G pode ficar desajustado ao seu corpo.
                    </p>
                  </div>

                  <button
                    onClick={() => setOpenFitFinder(false)}
                    className="mt-auto bg-[#2e3091] text-white py-3 rounded-md"
                  >
                    Usar tamanho recomendado
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
