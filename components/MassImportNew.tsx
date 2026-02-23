
import React, { useState } from 'react';

interface ImportedProduct {
  id: string;
  ean: string;
  vendorCode: string;
  name: string;
  ncm: string;
  status: 'pending' | 'validated' | 'error';
  errorMessage?: string;
  imageUrl?: string;
}

interface ImportBatch {
  id: string;
  fileName: string;
  uploadDate: string;
  totalItems: number;
  validatedItems: number;
  errorItems: number;
  status: 'uploaded' | 'processing' | 'ready' | 'sent';
  products: ImportedProduct[];
}

const MassImportNew: React.FC = () => {
  const [batches, setBatches] = useState<ImportBatch[]>([
    {
      id: '1',
      fileName: 'lote_produtos_janeiro_2026.xlsx',
      uploadDate: '16/02/2026 10:30',
      totalItems: 150,
      validatedItems: 145,
      errorItems: 5,
      status: 'ready',
      products: [
        {
          id: '1',
          ean: '7893218003986',
          vendorCode: '114044',
          name: 'Bebida Mista Alcoólica Gaseificada Limão Clássico Smirnoff Ice Original Garrafa 275ml',
          ncm: '22060090',
          status: 'validated',
          imageUrl: 'https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x'
        },
        {
          id: '2',
          ean: '7891234567890',
          vendorCode: '114045',
          name: 'Produto Exemplo 2',
          ncm: '22021000',
          status: 'validated'
        },
        {
          id: '3',
          ean: '7891234567891',
          vendorCode: '114046',
          name: 'Produto com Erro',
          ncm: '',
          status: 'error',
          errorMessage: 'NCM não encontrado na base GS1'
        }
      ]
    }
  ]);

  const [selectedBatch, setSelectedBatch] = useState<ImportBatch | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ImportedProduct | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulação de upload e processamento
    setTimeout(() => {
      const newBatch: ImportBatch = {
        id: Date.now().toString(),
        fileName: file.name,
        uploadDate: new Date().toLocaleString('pt-BR'),
        totalItems: 0,
        validatedItems: 0,
        errorItems: 0,
        status: 'processing',
        products: []
      };
      
      setBatches([newBatch, ...batches]);
      setIsUploading(false);
      
      // Simular processamento
      setTimeout(() => {
        setBatches(prev => prev.map(b => 
          b.id === newBatch.id 
            ? { ...b, status: 'ready', totalItems: 50, validatedItems: 48, errorItems: 2 }
            : b
        ));
      }, 3000);
    }, 1500);
  };

  const handleViewBatch = (batch: ImportBatch) => {
    setSelectedBatch(batch);
  };

  const handleSendToApproval = (batchId: string) => {
    setBatches(prev => prev.map(b => 
      b.id === batchId ? { ...b, status: 'sent' } : b
    ));
    setSelectedBatch(null);
    alert('Lote enviado para aprovação do comprador!');
  };

  const handleViewProductDetails = (product: ImportedProduct) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleExportJson = (product: ImportedProduct) => {
    const productData = {
      id: product.id,
      ean: product.ean,
      vendorCode: product.vendorCode,
      name: product.name,
      ncm: product.ncm,
      status: product.status,
      errorMessage: product.errorMessage,
      imageUrl: product.imageUrl,
      exportDate: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(productData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `produto_${product.ean}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShowJson = (product: ImportedProduct) => {
    setSelectedProduct(product);
    setShowJsonModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-primary/10 text-primary';
      case 'sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'uploaded': return 'Enviado';
      case 'processing': return 'Processando';
      case 'ready': return 'Pronto';
      case 'sent': return 'Enviado p/ Aprovação';
      default: return status;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      {/* Header */}
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Importação em Massa</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Envie múltiplos produtos de uma vez e analise antes de enviar para aprovação</p>
      </header>

      {/* Upload Section */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8">
        <div className="w-full flex justify-center px-6 pt-10 pb-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all cursor-pointer group relative">
          <input 
            type="file" 
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <div className="space-y-3 text-center pointer-events-none">
            <div className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform">
              {isUploading ? (
                <span className="material-icons-round animate-spin text-4xl">refresh</span>
              ) : (
                <span className="material-icons-round text-4xl">cloud_upload</span>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isUploading ? (
                <p className="font-medium text-primary">Processando arquivo...</p>
              ) : (
                <>
                  <p className="font-medium text-primary">Clique para fazer upload</p>
                  <p className="text-xs mt-1">ou arraste e solte o arquivo aqui</p>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500">XLSX, XLS, CSV até 50MB</p>
          </div>
        </div>
      </section>

      {/* Batches List */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons-round">folder_open</span>
            Lotes Importados
          </h2>
        </div>

        <div className="divide-y divide-border-light dark:divide-border-dark">
          {batches.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-icons-round text-gray-300 dark:text-gray-600 text-6xl">inbox</span>
              <p className="text-gray-500 dark:text-gray-400 mt-4">Nenhum lote importado ainda</p>
            </div>
          ) : (
            batches.map((batch) => (
              <div key={batch.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-icons-round text-blue-600 dark:text-blue-400">description</span>
                      <h3 className="font-bold text-gray-900 dark:text-white">{batch.fileName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(batch.status)}`}>
                        {getStatusLabel(batch.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-round text-sm">schedule</span>
                        {batch.uploadDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-icons-round text-sm">inventory</span>
                        {batch.totalItems} itens
                      </span>
                      {batch.status !== 'processing' && (
                        <>
                          <span className="flex items-center gap-1 text-primary">
                            <span className="material-icons-round text-sm">check_circle</span>
                            {batch.validatedItems} validados
                          </span>
                          {batch.errorItems > 0 && (
                            <span className="flex items-center gap-1 text-red-600">
                              <span className="material-icons-round text-sm">error</span>
                              {batch.errorItems} com erro
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {batch.status === 'processing' && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {batch.status === 'ready' && (
                      <>
                        <button
                          onClick={() => handleViewBatch(batch)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <span className="material-icons-round text-lg">visibility</span>
                          Analisar Itens
                        </button>
                        <button
                          onClick={() => handleSendToApproval(batch.id)}
                          className="px-4 py-2 bg-primary hover:bg-cyan-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <span className="material-icons-round text-lg">send</span>
                          Enviar para Aprovação
                        </button>
                      </>
                    )}
                    {batch.status === 'sent' && (
                      <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-bold flex items-center gap-2">
                        <span className="material-icons-round text-lg">check</span>
                        Enviado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal de Análise de Itens */}
      {selectedBatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
            {/* Header do Modal */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Análise de Itens</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedBatch.fileName}</p>
              </div>
              <button
                onClick={() => setSelectedBatch(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-round text-3xl">close</span>
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {selectedBatch.products.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-xl p-4 transition-all ${
                      product.status === 'error'
                        ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secondary'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Imagem */}
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-icons-round text-gray-400">image</span>
                          </div>
                        )}
                      </div>

                      {/* Informações */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</h4>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                              <span>EAN: <strong>{product.ean}</strong></span>
                              <span>Fornecedor: <strong>{product.vendorCode}</strong></span>
                              {product.ncm && <span>NCM: <strong>{product.ncm}</strong></span>}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.status === 'validated' && (
                              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1">
                                <span className="material-icons-round text-sm">check_circle</span>
                                Validado
                              </span>
                            )}
                            {product.status === 'error' && (
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold flex items-center gap-1">
                                <span className="material-icons-round text-sm">error</span>
                                Erro
                              </span>
                            )}
                            <button
                              onClick={() => handleViewProductDetails(product)}
                              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                              title="Ver todos os dados"
                            >
                              <span className="material-icons-round text-sm">visibility</span>
                              Ver Detalhes
                            </button>
                            <button
                              onClick={() => handleShowJson(product)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                              title="Ver JSON do produto"
                            >
                              <span className="material-icons-round text-sm">code</span>
                              JSON
                            </button>
                          </div>
                        </div>

                        {product.errorMessage && (
                          <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-xs text-red-800 dark:text-red-400">
                            <strong>Erro:</strong> {product.errorMessage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setSelectedBatch(null)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleSendToApproval(selectedBatch.id);
                  setSelectedBatch(null);
                }}
                className="px-6 py-2 bg-primary hover:bg-cyan-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span className="material-icons-round">send</span>
                Enviar para Aprovação
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Visualização Detalhada do Produto */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detalhes do Produto</h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-round text-3xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Imagem */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                    {selectedProduct.imageUrl ? (
                      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-icons-round text-gray-400 text-6xl">image</span>
                      </div>
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-xl ${
                    selectedProduct.status === 'validated'
                      ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-round">
                        {selectedProduct.status === 'validated' ? 'check_circle' : 'error'}
                      </span>
                      <span className="font-bold">
                        {selectedProduct.status === 'validated' ? 'Produto Validado' : 'Produto com Erro'}
                      </span>
                    </div>
                    {selectedProduct.errorMessage && (
                      <p className="text-sm mt-2">{selectedProduct.errorMessage}</p>
                    )}
                  </div>
                </div>

                {/* Informações */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Nome do Produto</label>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedProduct.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Código EAN</label>
                      <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">{selectedProduct.ean}</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Código Fornecedor</label>
                      <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">{selectedProduct.vendorCode}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">NCM</label>
                    <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">{selectedProduct.ncm || 'Não informado'}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">ID do Produto</label>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400">{selectedProduct.id}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleExportJson(selectedProduct)}
                      className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-icons-round">download</span>
                      Baixar JSON para Ticket TI
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setShowProductModal(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Visualização JSON */}
      {showJsonModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">JSON do Produto</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">EAN: {selectedProduct.ean}</p>
              </div>
              <button
                onClick={() => setShowJsonModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-round text-3xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <pre className="bg-gray-900 text-primary-light p-4 rounded-xl overflow-x-auto text-xs font-mono">
{JSON.stringify({
  id: selectedProduct.id,
  ean: selectedProduct.ean,
  vendorCode: selectedProduct.vendorCode,
  name: selectedProduct.name,
  ncm: selectedProduct.ncm,
  status: selectedProduct.status,
  errorMessage: selectedProduct.errorMessage,
  imageUrl: selectedProduct.imageUrl,
  exportDate: new Date().toISOString()
}, null, 2)}
              </pre>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-3">
              <button
                onClick={() => {
                  const jsonString = JSON.stringify({
                    id: selectedProduct.id,
                    ean: selectedProduct.ean,
                    vendorCode: selectedProduct.vendorCode,
                    name: selectedProduct.name,
                    ncm: selectedProduct.ncm,
                    status: selectedProduct.status,
                    errorMessage: selectedProduct.errorMessage,
                    imageUrl: selectedProduct.imageUrl,
                    exportDate: new Date().toISOString()
                  }, null, 2);
                  navigator.clipboard.writeText(jsonString);
                  alert('JSON copiado para a área de transferência!');
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span className="material-icons-round">content_copy</span>
                Copiar JSON
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => handleExportJson(selectedProduct)}
                  className="px-6 py-2 bg-primary hover:bg-cyan-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span className="material-icons-round">download</span>
                  Baixar JSON
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MassImportNew;
