"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, ChevronDown, Check, Shield, Truck, RotateCcw, Star } from 'lucide-react';

// Tipos
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
};

// Dados dos produtos
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Camisa Polo Oficial",
    description: "Camisa polo em algodão penteado com detalhes bordados do colégio. Tecido respirável e duradouro.",
    price: 89.90,
    originalPrice: 109.90,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800",
    category: "Camisas",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Branco", "Azul", "Cinza"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    features: ["100% algodão", "Bordado personalizado", "Lavagem fácil", "Resistente"]
  },
  {
    id: 2,
    name: "Calça Social",
    description: "Calça social em tecido tecnológico com excelente caimento e conforto para o dia a dia escolar.",
    price: 129.90,
    originalPrice: 149.90,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800",
    category: "Calças",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul Marinho", "Preto", "Cinza Escuro"],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    features: ["Tecido tecnológico", "Elasticidade", "Não amassa", "Bolsos seguros"]
  },
  {
    id: 3,
    name: "Jaqueta Colegial",
    description: "Jaqueta impermeável com forro térmico e capuz. Ideal para dias frios e chuvosos.",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800",
    category: "Jaquetas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul Escuro", "Vermelho", "Verde Militar"],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    features: ["Impermeável", "Forro térmico", "Capuz removível", "Bolsos internos"]
  },
  {
    id: 4,
    name: "Bermuda Tactel",
    description: "Bermuda em tactel com secagem rápida e costuras reforçadas para atividades físicas.",
    price: 79.90,
    originalPrice: 99.90,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800",
    category: "Bermudas",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Azul Marinho", "Preto", "Verde"],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    features: ["Tactel leve", "Secagem rápida", "Costuras reforçadas", "Elástico ajustável"]
  },
  {
    id: 5,
    name: "Kit Completo",
    description: "Kit com 2 camisetas, 1 calça e 1 jaqueta. Economize comprando o conjunto completo.",
    price: 349.90,
    originalPrice: 429.90,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800",
    category: "Kits",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["Branco/Azul", "Cinza/Azul", "Completo"],
    rating: 4.9,
    reviews: 203,
    inStock: true,
    features: ["Kit completo", "Economia de 20%", "Tamanhos combinados", "Entrega especial"]
  }
];

type SortOption = "default" | "price-low" | "price-high";

const ColegioMilitarProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Extrair categorias únicas
  const categories = ["all", ...new Set(initialProducts.map(p => p.category))];
  
  // Extrair tamanhos únicos
  const allSizes = Array.from(new Set(initialProducts.flatMap(p => p.sizes)));
  
  // Extrair cores únicas
  const allColors = Array.from(new Set(initialProducts.flatMap(p => p.colors)));

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...initialProducts];

    // Filtrar por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filtrar por tamanhos
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Filtrar por cores
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => selectedColors.includes(color))
      );
    }

    // Ordenar
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [sortBy, selectedCategory, selectedSizes, selectedColors]);

  // Toggle de tamanhos
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Toggle de cores
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setSortBy("default");
    setSelectedCategory("all");
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Cabeçalho da Página */}
      <div className="bg-[#2e3091] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Coleção Oficial</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Uniformes Colégio Militar
              </h1>
              <p className="text-gray-200 text-lg max-w-2xl">
                Uniformes oficiais com qualidade premium, desenvolvidos especialmente para o conforto e durabilidade dos estudantes.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Itens disponíveis</span>
                <span className="text-xl font-bold">5</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Preço médio</span>
                <span className="text-xl font-bold">R$ 159,90</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Avaliação</span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-bold">4.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barra Lateral de Filtros */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#2e3091] hover:text-[#252a7a] flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Limpar tudo
                </button>
              </div>

              {/* Ordenação */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Ordenar por</h3>
                <div className="space-y-2">
                  {[
                    { value: "default", label: "Recomendado" },
                    { value: "price-low", label: "Menor preço" },
                    { value: "price-high", label: "Maior preço" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value as SortOption)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-[#2e3091] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{option.label}</span>
                      {sortBy === option.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#2e3091] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category === "all" ? "Todas as categorias" : category}</span>
                      {selectedCategory === category && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanhos */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Tamanhos</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedSizes.includes(size)
                          ? 'bg-[#2e3091] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Cores</h3>
                <div className="space-y-2">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedColors.includes(color)
                          ? 'bg-[#2e3091] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: 
                              color === "Branco" ? "#ffffff" :
                              color === "Azul" ? "#2563eb" :
                              color === "Azul Marinho" ? "#1e3a8a" :
                              color === "Cinza" ? "#6b7280" :
                              color === "Preto" ? "#000000" :
                              color === "Vermelho" ? "#dc2626" :
                              color === "Verde Militar" ? "#166534" :
                              color === "Verde" ? "#16a34a" :
                              color === "Branco/Azul" ? "linear-gradient(45deg, #ffffff 50%, #2563eb 50%)" :
                              color === "Cinza/Azul" ? "linear-gradient(45deg, #6b7280 50%, #2563eb 50%)" :
                              color === "Completo" ? "linear-gradient(45deg, #ffffff 33%, #2563eb 33%, #2563eb 66%, #1e3a8a 66%)" :
                              "#e5e7eb"
                          }}
                        />
                        <span>{color}</span>
                      </div>
                      {selectedColors.includes(color) && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estatísticas dos filtros */}
              <div className="pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {products.length} de {initialProducts.length} produtos
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedCategory !== "all" && `Categoria: ${selectedCategory} • `}
                    {selectedSizes.length > 0 && `Tamanhos: ${selectedSizes.length} • `}
                    {selectedColors.length > 0 && `Cores: ${selectedColors.length}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Informações de Entrega */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Entrega e Devolução</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#2e3091] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Entrega Rápida</p>
                    <p className="text-sm text-gray-600">2-3 dias úteis para Goiânia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-[#2e3091] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Trocas Fáceis</p>
                    <p className="text-sm text-gray-600">30 dias para troca de tamanho</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#2e3091] mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Garantia de Qualidade</p>
                    <p className="text-sm text-gray-600">6 meses contra defeitos de fabricação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Produtos */}
          <div className="lg:w-3/4">
            {/* Contador e Info */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Produtos
                  <span className="text-[#2e3091] ml-2">({products.length})</span>
                </h2>
                <div className="text-sm text-gray-600">
                  Ordenado por: {sortBy === "default" ? "Recomendado" : sortBy === "price-low" ? "Menor preço" : "Maior preço"}
                </div>
              </div>
              
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
                  <button
                    onClick={clearFilters}
                    className="text-[#2e3091] hover:text-[#252a7a] font-medium"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                    >
                      {/* Imagem do Produto */}
                      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Esgotado
                          </div>
                        )}
                      </div>

                      {/* Informações do Produto */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                ({product.reviews} avaliações)
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  R$ {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="text-2xl font-bold text-[#2e3091]">
                                R$ {product.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              ou 3x de R$ {(product.price / 3).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 text-sm">
                          {product.description}
                        </p>

                        {/* Características */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {product.features.slice(0, 2).map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">Cores: {product.colors.join(", ")}</p>
                            <p className="mt-1">Tamanhos: {product.sizes.join(", ")}</p>
                          </div>
                          <button
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                              product.inStock
                                ? 'bg-[#2e3091] text-white hover:bg-[#252a7a] hover:scale-105'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {product.inStock ? 'Adicionar' : 'Esgotado'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Resumo da Coleção */}
              {products.length > 0 && (
                <div className="mt-12 bg-gradient-to-r from-[#2e3091]/5 to-blue-50/50 rounded-2xl p-8 border border-gray-200">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Coleção Completa do Colégio Militar
                      </h3>
                      <p className="text-gray-600 max-w-2xl">
                        Todos os uniformes são desenvolvidos com materiais de alta qualidade seguindo
                        as especificações oficiais da instituição. Garantimos durabilidade, conforto
                        e o padrão de excelência que sua família merece.
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm min-w-[200px]">
                      <p className="text-sm text-gray-600 mb-2">Valor total da coleção</p>
                      <div className="flex items-end gap-2">
                        <span className="text-gray-500 line-through">R$ 799,50</span>
                        <span className="text-2xl font-bold text-[#2e3091]">R$ 689,90</span>
                      </div>
                      <p className="text-green-600 text-sm font-medium mt-2">
                        Economize R$ 109,60
                      </p>
                      <button className="w-full mt-4 bg-[#2e3091] text-white py-3 rounded-lg font-medium hover:bg-[#252a7a] transition-colors">
                        Comprar Coleção Completa
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColegioMilitarProducts;