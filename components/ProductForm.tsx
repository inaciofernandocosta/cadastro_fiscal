
import React, { useState } from 'react';

const ProductForm: React.FC = () => {
  const [vendorCodeInput, setVendorCodeInput] = useState('');
  const [isSearchingVendor, setIsSearchingVendor] = useState(false);
  const [vendorData, setVendorData] = useState<any>(null);
  const [eanInput, setEanInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<'vendor' | 'ean' | 'product'>('vendor');

  const handleVendorSearch = () => {
    if (!vendorCodeInput.trim()) return;

    setIsSearchingVendor(true);
    // Simulação da busca no RIP
    setTimeout(() => {
      // Mock: qualquer código com 6+ dígitos encontra um fornecedor
      if (vendorCodeInput.length >= 6) {
        setVendorData({
          code: vendorCodeInput,
          name: "DIAGEO BRASIL LTDA.",
          cnpj: "00.000.000/0001-91"
        });
        setCurrentStep('ean');
      } else {
        setVendorData(null);
      }
      setIsSearchingVendor(false);
    }, 800);
  };

  const handleSearch = () => {
    if (!eanInput.trim()) return;

    setIsSearching(true);
    // Simulação da chamada de API "Verified by GS1 R1.2"
    setTimeout(() => {
      // Se for o EAN da Smirnoff ou qualquer um para teste
      if (eanInput === '7893218003986' || eanInput.length >= 8) {
        setProductData({
          // Dados do Produto Fornecedor
          gtin: eanInput === '7893218003986' ? '7893218003986' : eanInput,
          dun: "17893218003983",
          dunS: "",
          name: eanInput === '7893218003986' 
            ? "Bebida Mista Alcoólica Gaseificada Limão Clássico Smirnoff Ice Original Garrafa 275ml" 
            : "PRODUTO IDENTIFICADO VIA GS1",
          vendor: vendorData?.name || "DIAGEO BRASIL LTDA.",
          vendorCode: vendorData?.code || "114044",
          internalRefCode: "733367",
          
          // Tipo de Embalagem
          packagingType: "CAIXA",
          quantityPerPackage: "24",
          
          // Dimensões do Produto
          dimensions: {
            length: "6.1",
            width: "6.1",
            height: "20.8",
            netWeight: "",
            grossWeight: "0.4648",
            shelfLifeDays: "360"
          },
          
          // Dimensões da Caixa
          boxDimensions: {
            length: "35",
            width: "23",
            height: "22",
            netWeight: "11.16",
            grossWeight: "12"
          },
          
          // Dados Logísticos Pallet
          pallet: {
            boxesPerLayer: "13",
            layersPerPallet: "6",
            boxesPerPallet: "78",
            maxStacking: "",
            productsPerPallet: "78"
          },
          
          // Dados Fiscais
          fiscal: {
            ncm: "22060090",
            cest: "",
            anvisaCode: "",
            ipiPercent: "",
            origin: "0 - Nacional",
            importContent: ""
          },
          
          // CST e Impostos (MG)
          taxesMG: {
            cstPisCofins: "",
            icmsPercent: "",
            icmsReductionPercent: "",
            ivAnivaPercent: "",
            pautaRS: ""
          },
          
          // CST e Impostos (SP)
          taxesSP: {
            cstPisCofins: "",
            icmsPercent: "",
            icmsReductionPercent: "",
            ivAnivaPercent: "",
            pautaRS: ""
          },
          
          // Preenchimento Interno - Comprador
          internal: {
            registrationCompany: "",
            registrationDate1: "01/10/2014",
            registrationDate2: "11/12",
            familyDescription: "",
            complement: "",
            classificationABC: "",
            similarProduct: "",
            fractionalPackaging: "",
            includeInFamily: ""
          },
          
          imageUrl: "https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x"
        });
        setCurrentStep('product');
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Ficha de Produto</h1>
          <p className="text-label-light dark:text-label-dark mt-1 text-sm">Inicie o fluxo consultando o EAN do produto.</p>
        </div>
      </header>

      {/* Seção de Pesquisa - Ponto de Entrada (Código Interno) */}
      {currentStep === 'vendor' && (
        <section className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-primary/10 overflow-hidden">
          <div className="p-4 lg:p-6">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <h3 className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider">Passo 1: Código Interno do Fornecedor</h3>
              <div className="relative group">
                <input 
                  type="text"
                  placeholder="Insira o código interno do fornecedor..."
                  className="w-full pl-6 pr-16 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base font-medium text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={vendorCodeInput}
                  onChange={(e) => setVendorCodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVendorSearch()}
                />
                <button 
                  onClick={handleVendorSearch}
                  disabled={isSearchingVendor || !vendorCodeInput}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-cyan-800 disabled:opacity-50 text-white rounded-lg flex items-center justify-center shadow-sm transition-all active:scale-95"
                >
                  {isSearchingVendor ? (
                    <span className="material-icons-round animate-spin text-xl">refresh</span>
                  ) : (
                    <span className="material-icons-round text-xl">search</span>
                  )}
                </button>
              </div>
              <p className="text-xs font-semibold text-gray-400">
                Exemplo: <span className="cursor-pointer text-primary underline" onClick={() => setVendorCodeInput('114044')}>114044</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Seção de Pesquisa - Código IAM (EAN) */}
      {currentStep === 'ean' && (
        <section className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-primary/10 overflow-hidden">
          <div className="p-4 lg:p-6">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-primary dark:text-secondary uppercase tracking-wider">Passo 2: Código IAM (EAN)</h3>
                {vendorData && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="material-icons-round text-sm">storefront</span>
                    <span className="font-medium">{vendorData.name}</span>
                  </div>
                )}
              </div>
              <div className="relative group">
                <input 
                  type="text"
                  placeholder="Insira o EAN/GTIN para carregar os dados..."
                  className="w-full pl-6 pr-16 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base font-medium text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={eanInput}
                  onChange={(e) => setEanInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  disabled={isSearching || !eanInput}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-cyan-800 disabled:opacity-50 text-white rounded-lg flex items-center justify-center shadow-sm transition-all active:scale-95"
                >
                  {isSearching ? (
                    <span className="material-icons-round animate-spin text-xl">refresh</span>
                  ) : (
                    <span className="material-icons-round text-xl">search</span>
                  )}
                </button>
              </div>
              <p className="text-xs font-semibold text-gray-400">
                Exemplo: <span className="cursor-pointer text-primary underline" onClick={() => setEanInput('7893218003986')}>7893218003986</span>
              </p>
            </div>
          </div>
        </section>
      )}

      {productData ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 animate-in fade-in zoom-in-95 duration-500">
          {/* Coluna Esquerda: Fornecedor e Atributos */}
          <div className="xl:col-span-8 space-y-4">
            <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="px-4 py-3 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-base font-bold text-danger flex items-center gap-2">
                  <span className="material-icons-round text-lg">storefront</span>
                  DADOS DO FORNECEDOR
                </h2>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase tracking-wide mb-1.5">Cód. Interno</label>
                  <input 
                    className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-sm font-medium outline-none" 
                    defaultValue={productData.vendorCode} 
                  />
                </div>
                <div className="md:col-span-9">
                  <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase tracking-wide mb-1.5">Fornecedor</label>
                  <input 
                    className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-sm outline-none" 
                    defaultValue={productData.vendor} 
                  />
                </div>
              </div>
            </section>

            <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="px-4 py-3 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <span className="material-icons-round text-secondary text-lg">inventory</span>
                  DADOS DO PRODUTO (GS1 VERIFIED)
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold text-gs1-blue bg-blue-50 dark:bg-blue-900/30 dark:text-blue-200 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
                  <span className="material-icons-round text-sm">cloud_sync</span>
                  Sincronizado
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase tracking-wide mb-1.5">Código EAN (GTIN-13)</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 pr-10 outline-none text-sm font-bold text-primary dark:text-secondary" 
                        defaultValue={productData.gtin} 
                        readOnly
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-light material-icons-round text-lg">check_circle</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase tracking-wide mb-1.5">Código DUN-14</label>
                    <input 
                      className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-sm outline-none" 
                      defaultValue={productData.dun} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase tracking-wide mb-1.5">Descrição Comercial</label>
                  <input 
                    className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 outline-none text-sm font-medium" 
                    defaultValue={productData.name} 
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 border border-border-light dark:border-border-dark">
                  <h3 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <span className="material-icons-round text-sm">straighten</span> DIMENSÕES & PESOS
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: 'Comp (cm)', val: productData.dimensions.length },
                      { label: 'Larg (cm)', val: productData.dimensions.width },
                      { label: 'Alt (cm)', val: productData.dimensions.height },
                      { label: 'Peso (kg)', val: productData.dimensions.weight }
                    ].map((dim) => (
                      <div key={dim.label}>
                        <label className="block text-[9px] font-bold text-label-light dark:text-label-dark uppercase mb-1">{dim.label}</label>
                        <input 
                          className="w-full bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg px-2 py-1.5 text-center text-xs font-semibold" 
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
          <div className="xl:col-span-4 space-y-4">
            <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
              <div className="px-4 py-3 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <span className="material-icons-round text-secondary text-lg">image</span>
                  IMAGEM DO ATIVO
                </h2>
              </div>
              <div className="p-4">
                <div className="relative group bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 aspect-square flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gs1-blue dark:text-blue-300 uppercase tracking-wide">GS1 Verified</span>
                  </div>
                  <img 
                    alt="Product Preview" 
                    className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-110" 
                    src={productData.imageUrl} 
                  />
                </div>
              </div>
            </section>

            <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-secondary/30 dark:border-secondary/20 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
              <div className="px-4 py-3 border-b border-secondary/20 bg-secondary/10 dark:bg-secondary/5">
                <h2 className="text-base font-bold text-primary dark:text-secondary flex items-center gap-2">
                  <span className="material-icons-round text-lg">account_balance</span>
                  DADOS FISCAIS
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: 'NCM', val: productData.ncm, desc: 'Bebidas alcoólicas mista' },
                  { label: 'CEST', val: productData.cest, desc: 'Refrigerantes e mistas' },
                  { label: 'Origem', val: productData.origin, desc: 'Origem do produto' }
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase tracking-wide mb-1.5">{field.label}</label>
                    <input 
                      className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-sm font-bold text-primary dark:text-secondary outline-none" 
                      defaultValue={field.val} 
                    />
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 font-medium px-1 mt-1 italic">{field.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
          <span className="material-icons-round text-gray-300 dark:text-gray-600 text-6xl">search</span>
          <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
            {currentStep === 'vendor' ? 'Digite o código interno do fornecedor para começar' : 'Digite o código IAM (EAN) para buscar o produto'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductForm;