"use client";

import Image from "next/image";

const StoreLocator = () => {
  return (
    <section className="bg-background-secondary py-10 lg:py-[75px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Column: Content */}
            <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-center">
              <div className="bg-background-secondary rounded-lg p-6 lg:p-8 mb-8">
                <h2 className="text-3xl lg:text-[40px] font-medium text-text-primary mb-6 leading-none tracking-[-0.02em] !whitespace-pre-line">Nossa loja

                </h2>
                <p className="text-base text-text-secondary leading-tight mb-5 tracking-[-0.02em]">
                  Digite seu CEP e descubra a loja Osklen mais próxima de você:
                </p>
              </div>

              <div>
                <p className="text-base text-text-secondary tracking-[-0.02em]">
                  82 lojas, 41 Cidades
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-3 relative min-h-[300px] md:min-h-[400px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1582298539250-e65863215a7a?q=80&w=1974&auto=format&fit=crop"
                alt="Interior de uma loja Osklen com design minimalista, paredes de concreto, roupas brancas e móveis de madeira."
                fill
                sizes="(max-width: 1023px) 100vw, 60vw"
                className="object-cover" />

            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default StoreLocator;