'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Gabryella Telles",
    rating: 5,
    date: "um ano atrás",
    review: "Ótimo atendimento! Os preços super acessíveis!! Já fui em várias lojas de uniforme e nunca fui tão bem atendida quanto fui nessa loja! peguei fila mas super valeu a pena! as vendedoras são super atenciosas! e mesmo não tendo algumas peças disponíveis foi a única loja que teve como fazer encomenda porque as outras se não tem a peça não tem nem outra alternativa! gastei meu cartão bolsa uniforme e estou super satisfeita!! super indico!",
    avatarColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "Simone Fernandes",
    rating: 5,
    date: "um ano atrás",
    review: "Uniforme de alta qualidade e padrão adequado, por isso a loja está sempre cheia, espero quanto tempo for preciso pra ser atendida!!! Eu recomendo!",
    avatarColor: "bg-purple-500"
  },
  {
    id: 3,
    name: "Marta Amaral",
    rating: 5,
    date: "8 meses atrás",
    review: "Atendimento de excelência, meninas super atenciosas, atendente Lorranny, gente super indico maravilhosa, uniformes de qualidade nota mil 😊 😊 😊 😊",
    avatarColor: "bg-pink-500"
  },
  {
    id: 4,
    name: "Andréi",
    rating: 5,
    date: "uma semana atrás",
    review: "Atendimento excelente, Produtos de qualidade excelente e serviço perfeito",
    avatarColor: "bg-green-500"
  },
  {
    id: 5,
    name: "Guilherme Nolasco",
    rating: 5,
    date: "3 meses atrás",
    review: "Excelente experiência de compra. A loja é organizada, os produtos têm ótima qualidade e o atendimento foi cordial e eficiente. Recomendo a todos que buscam confiança e bom serviço.",
    avatarColor: "bg-indigo-500"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2e3091]/10 rounded-full mb-4">
            <Quote className="w-8 h-8 text-[#2e3091]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#2e3091] mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Confira a experiência de quem já comprou conosco e descubra por que somos referência em uniformes
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div 
          className="relative bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tr from-purple-50 to-pink-50 rounded-full translate-x-20 translate-y-20"></div>

            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">{currentTestimonial.rating}.0</span>
              </div>

              {/* Review Text */}
              <div className="mb-8">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed italic">
                  "{currentTestimonial.review}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className={`${currentTestimonial.avatarColor} w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-xl`}>
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{currentTestimonial.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-20"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-20"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#2e3091] w-10' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para depoimento de ${testimonial.name}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#2e3091]">100%</div>
              <p className="text-gray-600 mt-2">Clientes Satisfeitos</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#2e3091]">5.0</div>
              <p className="text-gray-600 mt-2">Avaliação Média</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#2e3091]">40+</div>
              <p className="text-gray-600 mt-2">Anos de Confiança</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-[#2e3091] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#252a7a] transition-colors duration-300 shadow-lg hover:shadow-xl text-lg">
            Deixe seu Feedback
          </button>
          <p className="text-gray-500 text-sm mt-4">Ajude outros clientes com sua experiência</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;