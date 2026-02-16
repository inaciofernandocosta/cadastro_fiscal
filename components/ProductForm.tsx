
import React, { useState } from 'react';

const ProductForm: React.FC = () => {
  const [eanInput, setEanInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [productData, setProductData] = useState<any>(null);

  const handleSearch = () => {
    if (!eanInput.trim()) return;

    setIsSearching(true);
    // Simulação da chamada de API "Verified by GS1 R1.2"
    setTimeout(() => {
      // Se for o EAN da Smirnoff ou qualquer um para teste
      if (eanInput === '7893218003986' || eanInput.length >= 8) {
        setProductData({
          gtin: eanInput === '7893218003986' ? '7893218003986' : eanInput,
          dun: "17893218003983",
          name: eanInput === '7893218003986' 
            ? "BEBIDA MISTA ALCOÓLICA GASEIFICADA GREEN APPLE SMIRNOFF ICE LATA 269ML" 
            : "PRODUTO IDENTIFICADO VIA GS1",
          vendor: "DIAGEO BRASIL LTDA.",
          vendorCode: "114044",
          ncm: "2208.90.00",
          cest: "03.007.00",
          origin: "0 - Nacional",
          imageUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x",
          dimensions: {
            length: "5.8",
            width: "5.8",
            height: "12.3",
            weight: "0.285"
          }
        });
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ficha de Produto</h1>
          <p className="text-label-light dark:text-label-dark mt-2 text-lg">Inicie o fluxo consultando o EAN do produto.</p>
        </div>
      </header>

      {/* Seção de Pesquisa - Ponto de Entrada */}
      <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-xl border-2 border-primary/10 overflow-hidden transition-all">
        <div className="p-8 lg:p-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-sm font-black text-primary dark:text-secondary uppercase tracking-[0.3em]">Consulta Global GS1 Verified</h3>
            <div className="relative group">
              <input 
                type="text"
                placeholder="Insira o EAN/GTIN para carregar os dados..."
                className="w-full pl-8 pr-20 py-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-[2rem] text-xl font-bold text-gray-800 dark:text-white placeholder-gray-400 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
                value={eanInput}
                onChange={(e) => setEanInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching || !eanInput}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-primary hover:bg-cyan-800 disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
              >
                {isSearching ? (
                  <span className="material-icons-round animate-spin">refresh</span>
                ) : (
                  <span className="material-icons-round text-3xl">search</span>
                )}
              </button>
            </div>
            <p className="text-xs font-semibold text-gray-400">
              Exemplo: <span className="cursor-pointer text-primary underline" onClick={() => setEanInput('7893218003986')}>7893218003986</span>
            </p>
          </div>
        </div>
      </section>

      {productData ? (
        <div className="grid grid-cols-1 2xl:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
          {/* Coluna Esquerda: Fornecedor e Atributos */}
          <div className="2xl:col-span-8 space-y-8">
            <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-xl font-bold text-danger flex items-center gap-3">
                  <span className="material-icons-round">storefront</span>
                  DADOS DO FORNECEDOR
                </h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-label-light dark:text-label-dark uppercase tracking-widest mb-3">Cód. Interno</label>
                  <input 
                    className="w-full bg-input-light dark:bg-input-dark border-border-light dark:border-border-dark rounded-2xl px-5 py-4 font-medium outline-none" 
                    defaultValue={productData.vendorCode} 
                  />
                </div>
                <div className="md:col-span-9">
                  <label className="block text-xs font-bold text-label-light dark:text-label-dark uppercase tracking-widest mb-3">Fornecedor</label>
                  <input 
                    className="w-full bg-input-light dark:bg-input-dark border-border-light dark:border-border-dark rounded-2xl px-5 py-4 outline-none" 
                    defaultValue={productData.vendor} 
                  />
                </div>
              </div>
            </section>

            <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 flex items-center gap-3">
                  <span className="material-icons-round text-secondary">inventory</span>
                  DADOS DO PRODUTO (GS1 VERIFIED)
                </h2>
                <div className="flex items-center gap-3 text-sm font-bold text-gs1-blue bg-blue-50 dark:bg-blue-900/30 dark:text-blue-200 px-5 py-2 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <span className="material-icons-round text-lg">cloud_sync</span>
                  Dados Sincronizados
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-label-light dark:text-label-dark uppercase tracking-widest mb-3">Código EAN (GTIN-13)</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-input-light dark:bg-input-dark border-border-light dark:border-border-dark rounded-2xl px-5 py-4 pr-12 outline-none font-bold text-primary dark:text-secondary" 
                        defaultValue={productData.gtin} 
                        readOnly
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 material-icons-round text-2xl">check_circle</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-label-light dark:text-label-dark uppercase tracking-widest mb-3">Código DUN-14</label>
                    <input 
                      className="w-full bg-input-light dark:bg-input-dark border-border-light dark:border-border-dark rounded-2xl px-5 py-4 outline-none" 
                      defaultValue={productData.dun} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-label-light dark:text-label-dark uppercase tracking-widest mb-3">Descrição Comercial</label>
                  <input 
                    className="w-full bg-input-light dark:bg-input-dark border-border-light dark:border-border-dark rounded-2xl px-5 py-4 outline-none text-lg font-medium" 
                    defaultValue={productData.name} 
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-8 border border-border-light dark:border-border-dark">
                  <h3 className="text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <span className="material-icons-round text-lg">straighten</span> DIMENSÕES & PESOS
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Comp (cm)', val: productData.dimensions.length },
                      { label: 'Larg (cm)', val: productData.dimensions.width },
                      { label: 'Alt (cm)', val: productData.dimensions.height },
                      { label: 'Peso (kg)', val: productData.dimensions.weight }
                    ].map((dim) => (
                      <div key={dim.label}>
                        <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase mb-2">{dim.label}</label>
                        <input 
                          className="w-full bg-white dark:bg-gray-800 border-border-light dark:border-border-dark rounded-xl px-4 py-3 text-center text-sm font-semibold" 
                          defaultValue={dim.val} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Coluna Direita: Imagem e Dados Fiscais */}
          <div className="2xl:col-span-4 space-y-8">
            <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 flex items-center gap-3">
                  <span className="material-icons-round text-secondary">image</span>
                  IMAGEM DO ATIVO
                </h2>
              </div>
              <div className="p-8">
                <div className="relative group bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-600 aspect-square flex items-center justify-center overflow-hidden">
                  <div className="absolute top-5 left-5 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-extrabold text-gs1-blue dark:text-blue-300 uppercase tracking-widest">GS1 Verified</span>
                  </div>
                  <img 
                    alt="Product Preview" 
                    className="object-contain w-full h-full p-8 transition-transform duration-500 group-hover:scale-110" 
                    src={productData.imageUrl} 
                  />
                </div>
              </div>
            </section>

            <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-secondary/30 dark:border-secondary/20 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
              <div className="px-8 py-5 border-b border-secondary/20 bg-secondary/10 dark:bg-secondary/5">
                <h2 className="text-xl font-bold text-primary dark:text-secondary flex items-center gap-3">
                  <span className="material-icons-round">account_balance</span>
                  DADOS FISCAIS
                </h2>
              </div>
              <div className="p-8 space-y-6">
                {[
                  { label: 'NCM', val: productData.ncm, desc: 'Bebidas alcoólicas mista' },
                  { label: 'CEST', val: productData.cest, desc: 'Refrigerantes e mistas' },
                  { label: 'Origem', val: productData.origin, desc: 'Origem do produto' }
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold text-label-light dark:text-label-dark uppercase tracking-widest mb-3">{field.label}</label>
                    <input 
                      className="w-full bg-input-light dark:bg-input-dark border-border-light dark:border-border-dark rounded-2xl px-5 py-4 text-base font-bold text-primary dark:text-secondary outline-none" 
                      defaultValue={field.val} 
                    />
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium px-2 mt-2 italic">{field.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center