
import React, { useState } from 'react';
import FormField from './ui/FormField';
import SectionCard from './ui/SectionCard';
import StepWizard, { WizardStep } from './ui/StepWizard';

const WIZARD_STEPS: WizardStep[] = [
  { id: 'vendor', label: 'Fornecedor', icon: 'storefront', description: 'Código interno' },
  { id: 'ean', label: 'Código IAM', icon: 'qr_code_scanner', description: 'EAN / GTIN' },
  { id: 'product', label: 'Ficha Completa', icon: 'inventory_2', description: 'Dados do produto' },
];

const STEP_INDEX = { vendor: 0, ean: 1, product: 2 } as const;

const ProductFormComplete: React.FC = () => {
  const [vendorCodeInput, setVendorCodeInput] = useState('');
  const [isSearchingVendor, setIsSearchingVendor] = useState(false);
  const [vendorData, setVendorData] = useState<any>(null);
  const [eanInput, setEanInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<'vendor' | 'ean' | 'product'>('vendor');
  const [productImages, setProductImages] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const completedSteps = currentStep === 'ean'
    ? [0]
    : currentStep === 'product'
      ? [0, 1]
      : [];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const maxImages = 5;
    const availableSlots = maxImages - productImages.length;
    const filesToProcess = Math.min(files.length, availableSlots);
    const newImages: string[] = [];
    for (let i = 0; i < filesToProcess; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (newImages.length === filesToProcess) {
            setProductImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleImageDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `produto_${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageRemove = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleVendorSearch = () => {
    if (!vendorCodeInput.trim()) return;
    setIsSearchingVendor(true);
    setTimeout(() => {
      if (vendorCodeInput.length >= 6) {
        setVendorData({ code: vendorCodeInput, name: 'DIAGEO BRASIL LTDA.', cnpj: '00.000.000/0001-91' });
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
    setTimeout(() => {
      if (eanInput === '7893218003986' || eanInput.length >= 8) {
        setProductData({
          gtin: eanInput === '7893218003986' ? '7893218003986' : eanInput,
          dun: '17893218003983',
          dunS: '',
          name: eanInput === '7893218003986'
            ? 'Bebida Mista Alcoólica Gaseificada Limão Clássico Smirnoff Ice Original Garrafa 275ml'
            : 'PRODUTO IDENTIFICADO VIA GS1',
          vendor: vendorData?.name || 'DIAGEO BRASIL LTDA.',
          vendorCode: vendorData?.code || '114044',
          internalRefCode: '733367',
          packagingType: 'CAIXA',
          quantityPerPackage: '24',
          dimensions: { length: '6.1', width: '6.1', height: '20.8', netWeight: '', grossWeight: '0.4648', shelfLifeDays: '360' },
          boxDimensions: { length: '35', width: '23', height: '22', netWeight: '11.16', grossWeight: '12' },
          pallet: { boxesPerLayer: '13', layersPerPallet: '6', boxesPerPallet: '78', maxStacking: '', productsPerPallet: '78' },
          fiscal: { ncm: '22060090', cest: '', anvisaCode: '', ipiPercent: '', origin: '0 - Nacional', importContent: '' },
          taxesMG: { cstPisCofins: '', icmsPercent: '', icmsReductionPercent: '', ivAnivaPercent: '', pautaRS: '' },
          taxesSP: { cstPisCofins: '', icmsPercent: '', icmsReductionPercent: '', ivAnivaPercent: '', pautaRS: '' },
          internal: { company: '', buyer: 'João Souza', familyDescription: '', complement: '', classificationABC: '', similarProduct: '', fractionalPackaging: '', includeInFamily: '' },
          imageUrl: 'https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x',
        });
        setProductImages(['https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x']);
        setCurrentStep('product');
      }
      setIsSearching(false);
    }, 1200);
  };

  const handleGoBack = () => {
    if (currentStep === 'product') {
      setCurrentStep('ean');
      setProductData(null);
    } else if (currentStep === 'ean') {
      setCurrentStep('vendor');
      setVendorData(null);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-4 pb-20">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Ficha de Cadastro de Novos Produtos
            </h1>
            {productData && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 px-3 py-1.5 rounded-lg">
                <span className="material-icons-round text-blue-600 dark:text-blue-400 text-base" aria-hidden="true">edit_note</span>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Modo Atualização</span>
              </span>
            )}
          </div>
          <p className="text-label-light dark:text-label-dark mt-1 text-sm">
            {productData
              ? 'Produto encontrado no ERP — Você pode atualizar as informações abaixo'
              : 'Sistema completo de cadastro — Vilanova'}
          </p>
        </div>

        {/* Back button */}
        {currentStep !== 'vendor' && (
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-label-light dark:text-label-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            aria-label="Voltar ao passo anterior"
          >
            <span className="material-icons-round text-base" aria-hidden="true">arrow_back</span>
            Voltar
          </button>
        )}
      </header>

      {/* StepWizard */}
      <StepWizard
        steps={WIZARD_STEPS}
        currentStep={STEP_INDEX[currentStep]}
        completedSteps={completedSteps}
      />

      {/* Passo 1: Código Interno do Fornecedor */}
      {currentStep === 'vendor' && (
        <SectionCard
          title="Passo 1 — Código Interno do Fornecedor"
          color="product"
          icon="storefront"
          rounded="2xl"
        >
          <div className="max-w-3xl mx-auto text-center space-y-3 py-2">
            <div className="relative group">
              <input
                type="text"
                placeholder="Insira o código interno do fornecedor..."
                className="w-full pl-6 pr-16 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base font-medium text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={vendorCodeInput}
                onChange={(e) => setVendorCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVendorSearch()}
                aria-label="Código interno do fornecedor"
              />
              <button
                onClick={handleVendorSearch}
                disabled={isSearchingVendor || !vendorCodeInput}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-lg flex items-center justify-center shadow-sm transition-all active:scale-95"
                aria-label="Buscar fornecedor"
              >
                {isSearchingVendor
                  ? <span className="material-icons-round animate-spin text-xl" aria-hidden="true">refresh</span>
                  : <span className="material-icons-round text-xl" aria-hidden="true">search</span>
                }
              </button>
            </div>
            <p className="text-xs font-semibold text-gray-400">
              Exemplo:{' '}
              <button
                className="cursor-pointer text-primary dark:text-secondary underline"
                onClick={() => setVendorCodeInput('114044')}
                aria-label="Usar código de exemplo 114044"
              >
                114044
              </button>
            </p>
          </div>
        </SectionCard>
      )}

      {/* Passo 2: Código IAM (EAN) */}
      {currentStep === 'ean' && (
        <SectionCard
          title="Passo 2 — Código IAM (EAN / GTIN)"
          color="product"
          icon="qr_code_scanner"
          rounded="2xl"
        >
          <div className="max-w-3xl mx-auto text-center space-y-3 py-2">
            {vendorData && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary dark:text-secondary bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl px-4 py-2.5 animate-fade-in-up">
                <span className="material-icons-round text-primary-light text-base" aria-hidden="true">check_circle</span>
                <span className="font-semibold">{vendorData.name}</span>
                <span className="text-primary/80 dark:text-secondary/80">— Fornecedor vinculado</span>
              </div>
            )}
            <div className="relative group">
              <input
                type="text"
                placeholder="Insira o EAN/GTIN para carregar os dados..."
                className="w-full pl-6 pr-16 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base font-medium text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={eanInput}
                onChange={(e) => setEanInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                aria-label="Código EAN ou GTIN do produto"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !eanInput}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-lg flex items-center justify-center shadow-sm transition-all active:scale-95"
                aria-label="Buscar produto pelo EAN"
              >
                {isSearching
                  ? <span className="material-icons-round animate-spin text-xl" aria-hidden="true">refresh</span>
                  : <span className="material-icons-round text-xl" aria-hidden="true">search</span>
                }
              </button>
            </div>
            <p className="text-xs font-semibold text-gray-400">
              Exemplo:{' '}
              <button
                className="cursor-pointer text-primary dark:text-secondary underline"
                onClick={() => setEanInput('7893218003986')}
                aria-label="Usar EAN de exemplo"
              >
                7893218003986
              </button>
            </p>
          </div>
        </SectionCard>
      )}

      {/* Passo 3: Ficha Completa */}
      {productData ? (
        <div className="space-y-4 animate-slide-in-right">

          {/* Success banner */}
          <div className="flex items-center gap-3 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-2xl px-5 py-4 animate-pulse-success">
            <span className="material-icons-round text-primary-light text-2xl flex-shrink-0" aria-hidden="true">task_alt</span>
            <div>
              <p className="text-sm font-bold text-primary dark:text-secondary">Produto encontrado via GS1</p>
              <p className="text-xs text-primary/80 dark:text-secondary/80 mt-0.5 line-clamp-1">{productData.name}</p>
            </div>
          </div>

          {/* DADOS DO FORNECEDOR */}
          <SectionCard title="Dados do Fornecedor" color="supplier" icon="storefront">
            <div className="grid grid-cols-12 gap-3">
              <FormField label="Fornecedor" defaultValue={productData.vendor} className="col-span-12 md:col-span-9" />
              <FormField label="Cód." defaultValue={productData.vendorCode} className="col-span-12 md:col-span-3" inputClassName="font-bold" />
            </div>
          </SectionCard>

          {/* DADOS DO PRODUTO FORNECEDOR */}
          <SectionCard title="Dados do Produto Fornecedor" color="product" icon="inventory_2">
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3">
                <FormField label="Código EAN" defaultValue={productData.gtin} className="col-span-12 md:col-span-4" inputClassName="font-bold" />
                <FormField label="Código DUN" defaultValue={productData.dun} className="col-span-12 md:col-span-4" />
                <FormField label="Código DUN (S)" defaultValue={productData.dunS} className="col-span-12 md:col-span-4" />
              </div>
              <FormField label="Descrição do Produto" defaultValue={productData.name} />
              <div className="grid grid-cols-12 gap-3">
                <FormField label="Código Interno Referência" defaultValue={productData.internalRefCode} className="col-span-12 md:col-span-6" />
                <div className="col-span-12 md:col-span-6">
                  <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase mb-1 tracking-wide">
                    Tipo de Embalagem
                  </label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {['Caixa', 'Fardo', 'Unidade', 'Pacote', 'KG'].map((opt) => (
                      <label key={opt} className="flex items-center gap-1.5 text-xs cursor-pointer text-text-light dark:text-text-dark hover:text-primary dark:hover:text-secondary transition-colors">
                        <input
                          type="radio"
                          name="packaging"
                          defaultChecked={productData.packagingType === opt.toUpperCase()}
                          className="accent-primary"
                          aria-label={opt}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3">
                <FormField label="Quantidade por Embalagem" defaultValue={productData.quantityPerPackage} className="col-span-12 md:col-span-6" />
              </div>
            </div>
          </SectionCard>

          {/* DIMENSÕES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SectionCard title="Dimensões do Produto" color="dimensions" icon="straighten">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="Comp (cm)" defaultValue={productData.dimensions.length} size="sm" textAlign="center" />
                  <FormField label="Larg (cm)" defaultValue={productData.dimensions.width} size="sm" textAlign="center" />
                  <FormField label="Alt (cm)" defaultValue={productData.dimensions.height} size="sm" textAlign="center" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="Peso Líq (kg)" defaultValue={productData.dimensions.netWeight} size="sm" textAlign="center" />
                  <FormField label="Peso Bruto (kg)" defaultValue={productData.dimensions.grossWeight} size="sm" textAlign="center" />
                  <FormField label="Validade (dias)" defaultValue={productData.dimensions.shelfLifeDays} size="sm" textAlign="center" />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Dimensões da Caixa" color="dimensions" icon="inventory">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <FormField label="Comp (cm)" defaultValue={productData.boxDimensions.length} size="sm" textAlign="center" />
                  <FormField label="Larg (cm)" defaultValue={productData.boxDimensions.width} size="sm" textAlign="center" />
                  <FormField label="Alt (cm)" defaultValue={productData.boxDimensions.height} size="sm" textAlign="center" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Peso Líq (kg)" defaultValue={productData.boxDimensions.netWeight} size="sm" textAlign="center" />
                  <FormField label="Peso Bruto (kg)" defaultValue={productData.boxDimensions.grossWeight} size="sm" textAlign="center" />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* DADOS LOGÍSTICOS PALLET */}
          <SectionCard title="Dados Logísticos — Pallet (Fornecedor)" color="logistics" icon="warehouse">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <FormField label="Caixas por Camada" defaultValue={productData.pallet.boxesPerLayer} textAlign="center" />
              <FormField label="Camadas por Pallet" defaultValue={productData.pallet.layersPerPallet} textAlign="center" />
              <FormField label="Caixas por Pallet" defaultValue={productData.pallet.boxesPerPallet} textAlign="center" />
              <FormField label="Empilhamento Máximo" defaultValue={productData.pallet.maxStacking} textAlign="center" />
              <FormField label="Produtos por Pallet" defaultValue={productData.pallet.productsPerPallet} textAlign="center" />
            </div>
          </SectionCard>

          {/* DADOS FISCAIS */}
          <SectionCard title="Dados Fiscais (Fornecedor)" color="fiscal" icon="gavel">
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3">
                <FormField label="Classificação Fiscal (NCM)" defaultValue={productData.fiscal.ncm} className="col-span-6 md:col-span-3" inputClassName="font-bold" />
                <FormField label="Código CEST" defaultValue={productData.fiscal.cest} className="col-span-6 md:col-span-3" />
                <FormField label="Cód. ANVISA" defaultValue={productData.fiscal.anvisaCode} className="col-span-6 md:col-span-3" />
                <FormField label="% IPI" defaultValue={productData.fiscal.ipiPercent} className="col-span-6 md:col-span-3" />
              </div>
              <div className="grid grid-cols-12 gap-3">
                <FormField label="Origem da Mercadoria (CST ICMS)" defaultValue={productData.fiscal.origin} className="col-span-12 md:col-span-6" />
                <FormField label="Conteúdo da Importação (F.C.I)" defaultValue={productData.fiscal.importContent} className="col-span-12 md:col-span-6" />
              </div>
            </div>
          </SectionCard>

          {/* CST PIS/COFINS — MG e SP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SectionCard title="CST de PIS e COFINS — MG" color="mg" icon="location_on">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="CST PIS/COFINS" defaultValue={productData.taxesMG.cstPisCofins} size="sm" />
                  <FormField label="% ICMS" defaultValue={productData.taxesMG.icmsPercent} size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="% Redução ICMS" defaultValue={productData.taxesMG.icmsReductionPercent} size="sm" />
                  <FormField label="% IV/ANIVA" defaultValue={productData.taxesMG.ivAnivaPercent} size="sm" />
                </div>
                <FormField label="Pauta RS" defaultValue={productData.taxesMG.pautaRS} size="sm" />
              </div>
            </SectionCard>

            <SectionCard title="CST de PIS e COFINS — SP" color="sp" icon="location_on">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="CST PIS/COFINS" defaultValue={productData.taxesSP.cstPisCofins} size="sm" />
                  <FormField label="% ICMS" defaultValue={productData.taxesSP.icmsPercent} size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="% Redução ICMS" defaultValue={productData.taxesSP.icmsReductionPercent} size="sm" />
                  <FormField label="% IV/ANIVA" defaultValue={productData.taxesSP.ivAnivaPercent} size="sm" />
                </div>
                <FormField label="Pauta RS" defaultValue={productData.taxesSP.pautaRS} size="sm" />
              </div>
            </SectionCard>
          </div>

          {/* PREENCHIMENTO INTERNO — COMPRADOR */}
          <SectionCard title="Preenchimento Interno — Comprador" color="internal" icon="person">
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-8">
                  <label className="block text-[10px] font-bold text-label-light dark:text-label-dark uppercase mb-2 tracking-wide">
                    Empresa (seleção única ou múltipla)
                  </label>
                  <div className="flex flex-wrap gap-2 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg p-2">
                    {['Atacado MG', 'Atacado SP', 'Focomix SP', 'Focomix MG', 'V2 804'].map((empresa) => (
                      <label
                        key={empresa}
                        className="flex items-center gap-1.5 text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors text-text-light dark:text-text-dark"
                      >
                        <input type="checkbox" className="rounded accent-section-internal" aria-label={empresa} />
                        <span>{empresa}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <FormField label="Comprador" defaultValue="João Souza" className="col-span-12 md:col-span-4" />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200 dark:border-blue-800/40 space-y-2">
                <FormField label="Descrição Família" defaultValue={productData.internal.familyDescription} />
                <FormField label="Complemento" defaultValue={productData.internal.complement} />
              </div>

              <div className="grid grid-cols-12 gap-3">
                <FormField label="Classificação A-B-C" defaultValue={productData.internal.classificationABC} className="col-span-6 md:col-span-3" />
                <FormField label="Produto Similar" defaultValue={productData.internal.similarProduct} className="col-span-6 md:col-span-3" />
                <FormField label="Embalagem Fracionada" defaultValue={productData.internal.fractionalPackaging} className="col-span-6 md:col-span-3" />
                <FormField label="Incluir na Família" defaultValue={productData.internal.includeInFamily} className="col-span-6 md:col-span-3" />
              </div>
            </div>
          </SectionCard>

          {/* IMAGEM DO PRODUTO */}
          <SectionCard
            title="Imagem do Produto"
            color="image"
            icon="image"
            badge={`${productImages.length}/5 imagens`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Selecionar imagens do produto"
            />

            {productImages.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full mb-4 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <span className="material-icons-round" aria-hidden="true">add_photo_alternate</span>
                Adicionar Imagem
              </button>
            )}

            {productImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {productImages.map((imageUrl, index) => (
                  <div key={index} className="relative group animate-fade-in-up">
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 aspect-square overflow-hidden">
                      <img
                        alt={`Produto imagem ${index + 1}`}
                        className="object-cover w-full h-full"
                        src={imageUrl}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleImageDownload(imageUrl, index)}
                          className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                          aria-label={`Baixar imagem ${index + 1}`}
                        >
                          <span className="material-icons-round text-gray-800 text-lg" aria-hidden="true">download</span>
                        </button>
                        <button
                          onClick={() => handleImageRemove(index)}
                          className="p-2 bg-danger hover:bg-danger-dark rounded-full transition-colors"
                          aria-label={`Remover imagem ${index + 1}`}
                        >
                          <span className="material-icons-round text-white text-lg" aria-hidden="true">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded" aria-hidden="true">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 aspect-video flex items-center justify-center overflow-hidden max-w-md mx-auto">
                <div className="text-center p-8">
                  <span className="material-icons-round text-gray-300 dark:text-gray-600 text-6xl" aria-hidden="true">image</span>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-3">Nenhuma imagem adicionada</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Clique em "Adicionar Imagem" para começar</p>
                </div>
              </div>
            )}

            {productImages.length === 5 && (
              <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400" role="status">
                Limite máximo de 5 imagens atingido. Remova uma imagem para adicionar outra.
              </p>
            )}
          </SectionCard>
        </div>
      ) : null}
    </div>
  );
};

export default ProductFormComplete;
