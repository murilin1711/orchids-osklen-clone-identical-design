export default function Produto1Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex gap-3">
        <button className="bg-[#2e3091] text-white px-6 py-3 rounded-md hover:opacity-95">
          Selecionar
        </button>

        <button className="border px-6 py-3 rounded-md hover:bg-neutral-50">
          Adicionar ao carrinho
        </button>
      </div>

      <div className="mt-6 text-sm text-neutral-500">
        Frete grátis a partir de R$ 200. Troca ou devolução grátis.
      </div>
    </main>
  );
}
