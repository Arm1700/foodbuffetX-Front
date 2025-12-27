import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // visibility для header и категорий
  const [headerVisible, setHeaderVisible] = useState(false);
  const [catsVisible, setCatsVisible] = useState(false);

  // refs для header и категорий
  const headerRef = useRef(null);
  const catsRef = useRef(null);

  // refs и visibility для карточек
  const cardsRef = useRef([]);
  const [cardsVisible, setCardsVisible] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await axios.get("http://127.0.0.1:8000/api/categories/");
        const cats = Array.isArray(catRes.data) ? catRes.data : catRes.data.results;
        setCategories(cats || []);

        const prodRes = await axios.get("http://127.0.0.1:8000/api/products/");
        const prods = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.results;
        setProducts(prods || []);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (p) => p.category === activeCategory || p.category?.id === activeCategory
        );

  cardsRef.current = filteredProducts.map(
    (el, i) => cardsRef.current[i] ?? React.createRef()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setHeaderVisible(true);
            observer.unobserve(entry.target);
          }
          if (entry.target === catsRef.current && entry.isIntersecting) {
            setCatsVisible(true);
            observer.unobserve(entry.target);
          }
          cardsRef.current.forEach((ref, i) => {
            if (entry.target === ref.current && entry.isIntersecting) {
              setCardsVisible((prev) => {
                const newArr = [...prev];
                newArr[i] = true;
                return newArr;
              });
              observer.unobserve(ref.current);
            }
          });
        });
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (catsRef.current) observer.observe(catsRef.current);
    cardsRef.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [filteredProducts]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-60 pb-20 overflow-hidden">
      {/* HEADER */}
      <div
        ref={headerRef}
        className={`text-center mb-14 transition-all duration-700 ease-out ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h1 className="text-8xl font-serif mb-4">Our menu</h1>
        <p className="text-gray-500 text-2xl max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>

      {/* CATEGORIES */}
      <div
        ref={catsRef}
        className={`flex justify-center gap-4 mb-14 flex-wrap transition-all duration-700 ease-out delay-100 ${
          catsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-10 py-4 transition-transform duration-200 text-xl shadow-lg shadow-gray-300 ${
            activeCategory === "all"
              ? "bg-[#fd3117] text-white"
              : "hover:bg-gray-100 hover:text-[#fd3117] hover:scale-95"
          }`}
        >
          ALL
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-10 py-4 transition-transform duration-200 text-xl shadow-lg shadow-gray-300 ${
              activeCategory === cat.id
                ? "bg-[#fd3117] text-white"
                : "hover:bg-gray-100 hover:text-[#fd3117] hover:scale-95"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product, i) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div
              ref={cardsRef.current[i]}
              className={`relative bg-white overflow-hidden group transition-all duration-700 ease-out ${
                cardsVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
              }`}
            >
              {/* PRICE */}
              <div className="absolute top-4 right-4 z-10 bg-[#fd3117] text-white px-4 py-2">
                <span className="text-lg font-bold">${product.price}</span>
              </div>

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[35vh] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="py-6 px-2">
                <h3 className="text-4xl font-serif mb-2 transition-colors group-hover:text-orange-600 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-lg line-clamp-3">{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* DECOR */}
      <img src="/rings/circles.png" alt="" className="hidden lg:block fixed left-0 bottom-[20%] w-[22%] z-[-10]" />
      <img src="/rings/ringg.svg" alt="" className="hidden lg:block fixed absolute right-[-9.3%] top-[-13%] max-w-[25%] z-[-10]" />
      <img src="/rings/ringg.svg" alt="" className="hidden lg:block fixed absolute right-[-9.3%] bottom-[-20%] max-w-[25%] z-[-10]" />
    </section>
  );
}
