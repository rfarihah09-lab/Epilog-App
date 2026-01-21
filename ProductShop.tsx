
import React from 'react';
import { RecommendedProduct } from '../types';

interface ProductShopProps {
  products: RecommendedProduct[];
}

const ProductShop: React.FC<ProductShopProps> = ({ products }) => {
  return (
    <div className="max-w-6xl mx-auto p-4 mt-12 mb-20 animate-in slide-in-from-bottom-10 duration-1000">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-light text-slate-800">Recommended <span className="text-rose-500 font-semibold">Regimen</span></h2>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Based on your clinical skin score, we've curated a high-performance routine featuring professional-grade brands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="glass rounded-3xl p-6 flex flex-col shadow-sm border border-rose-50 hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.947 0l-.628-.288a2 2 0 00-1.286-.172l-1.947.39a2 2 0 01-1.626-.643l-.707-.707a2 2 0 00-1.414-.586H4.828a2 2 0 01-1.414-.586L2.707 11.707a2 2 0 00-.586-1.414V9.828a2 2 0 01.586-1.414l.707-.707a2 2 0 00.586-1.414V6.172a2 2 0 01.586-1.414l.707-.707a2 2 0 00.586-1.414V1.828A2 2 0 014.828.414l.707-.707a2 2 0 00.586-1.414" />
              </svg>
            </div>

            <div className="mb-4">
              <span className="px-3 py-1 bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                {product.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{product.brand}</h3>
            <p className="text-slate-600 text-sm mb-4">{product.name}</p>
            
            <div className="mt-auto pt-6">
              <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs text-slate-500 italic border border-slate-100">
                "{product.benefit}"
              </div>
              <a 
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-white border border-slate-900 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all transform active:scale-95 shadow-sm"
              >
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShop;
