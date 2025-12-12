"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Filter, ChevronDown, Star, ShoppingBag } from 'lucide-react';

// Tipos
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
};

// Dados dos produtos
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Tênis Esportivo",
    price: 299.90,
    originalPrice: 349.90,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800",
    category: "Corrida",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Tênis Casual",
    price: 249.90,
    originalPrice: 289.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800",
    category: "Todos",
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: "Tênis Academia",
    price: 279.90,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800",
    category: "Treino & academia",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "Tênis Performance",
    price: 399.90,
    originalPrice: 459.90,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800",
    category: "Corrida",
    rating: 4.9,
    inStock: true
  },
  {
    id: 5,
    name: "Tênis Leve",
    price: 229.90,
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800",
    category: "Tênis",
    rating: 4.4,
    inStock: true
  },
  {
    id: 6,
    name: "Tênis Pro",
    price: 459.90,
    originalPrice: 499.90,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800",
    category: "Corrida",
    rating: 4.9,
    inStock: true
  }
];

type SortOption = "default" | "price-low" | "price-high";

const TennisStore = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [showFilters, setShowFilters] = useState(false);
  
  // Categorias (baseado na imagem)
  const categories = ["Todos", "Tênis", "Corrida", "Treino & academia", "Para prática de tênis", "Tilícias", "Literário"];

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...initialProducts];

    // Filtrar por categoria
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Ordenar
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [sortBy, selectedCategory]);

  // Limpar filtro
  const clearFilter = () => {
    setSelectedCategory("Todos");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho Minimalista */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tênis</h1>
              <p className="text-sm text-gray-600 mt-1">187 RESULTADOS</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Botão de filtros para mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
              >
                <Filter className="w-4 h-4" />
                Mostrar filtros
              </button>
              
              {/* Ordenação */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pl-10 pr-8 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="default">Ordenar por</option>
                  <option value="price-low">Menor preço</option>
                  <option value="price-high">Maior preço</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Categorias */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filtros (Desktop - Escondido por padrão) */}
          <div className={`hidden md:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filtros</h2>
                <button
                  onClick={clearFilter}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Limpar
                </button>
              </div>
              
              {/* Filtros disponíveis */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center justify-between w-full text-left px-2 py-1 rounded text-sm ${
                          selectedCategory === category
                            ? 'text-black font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span>{category}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Preço</h3>
                  <div className="space-y-2">
                    {["Até R$ 200", "R$ 200 - R$ 400", "R$ 400 - R$ 600", "Acima de R$ 600"].map((range) => (
                      <button
                        key={range}
                        className="flex items-center justify-between w-full text-left px-2 py-1 rounded text-sm text-gray-600 hover:text-gray-900"
                      >
                        <span>{range}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Produtos */}
          <div className="flex-1">
            {/* Filtro ativo */}
            {selectedCategory !== "Todos" && (
              <div className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-gray-600">Filtro ativo:</span>
                <span className="font-medium">{selectedCategory}</span>
                <button
                  onClick={clearFilter}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                >
                  {/* Imagem do Produto */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badge de desconto */}
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                    
                    {/* Botão de compra */}
                    <button className="absolute bottom-3 right-3 bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Informações do Produto */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
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
                      <span className="text-xs text-gray-600">({product.rating})</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensagem se não houver produtos */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
                <button
                  onClick={clearFilter}
                  className="text-black hover:text-gray-700 font-medium"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros Mobile (Modal) */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowFilters(false);
                      }}
                      className={`flex items-center justify-between w-full text-left px-2 py-3 rounded-lg ${
                        selectedCategory === category
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Preço</h3>
                <div className="space-y-2">
                  {["Até R$ 200", "R$ 200 - R$ 400", "R$ 400 - R$ 600", "Acima de R$ 600"].map((range) => (
                    <button
                      key={range}
                      className="flex items-center justify-between w-full text-left px-2 py-3 rounded-lg text-gray-600 hover:text-gray-900"
                    >
                      <span>{range}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={clearFilter}
                className="w-full py-3 border border-gray-300 rounded-lg text-sm font-medium mb-3"
              >
                Limpar todos os filtros
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-black text-white rounded-lg text-sm font-medium"
              >
                Ver produtos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TennisStore;