
import React, { useState } from 'react';

interface Product {
  id: string;
  ean: string;
  name: string;
  vendorCode: string;
  vendor: string;
  ncm: string;
  category: string;
  status: 'active' | 'inactive';
  lastUpdate: string;
  imageUrl?: string;
}

const MyProducts: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: '1',
      ean: '7893218003986',
      name: 'Bebida Mista Alcoólica Gaseificada Limão Clássico Smirnoff Ice Original Garrafa 275ml',
      vendorCode: '114044',
      vendor: 'DIAGEO BRASIL LTDA.',
      ncm: '22060090',
      category: 'Bebidas',
      status: 'active',
      lastUpdate: '15/02/2026',
      imageUrl: 'https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x'
    },
    {
      id: '2',
      ean: '7891234567890',
      name: 'Cerveja Pilsen Premium Lata 350ml',
      vendorCode: '114045',
      vendor: 'AMBEV S.A.',
      ncm: '22030000',
      category: 'Bebidas',
      status: 'active',
      lastUpdate: '14/02/2026'
    },
    {
      id: '3',
      ean: '7891234567891',
      name: 'Refrigerante Cola 2L',
      vendorCode: '114046',
      vendor: 'COCA-COLA BRASIL LTDA.',
      ncm: '22021000',
      category: 'Bebidas',
      status: 'inactive',
      lastUpdate: '10/02/2026'
    },
    {
      id: '4',
      ean: '7891234567892',
      name: 'Suco Natural Laranja 1L',
      vendorCode: '114044',
      vendor: 'DIAGEO BRASIL LTDA.',
      ncm: '20099000',
      category: 'Bebidas',
      status: 'active',
      lastUpdate: '12/02/2026'
    },
    {
      id: '5',
      ean: '7891234567893',
      name: 'Água Mineral 500ml',
      vendorCode: '114047',
      vendor: 'NESTLÉ BRASIL LTDA.',
      ncm: '22011000',
      category: 'Bebidas',
      status: 'inactive',
      lastUpdate: '08/02/2026'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [showInactive, setShowInactive] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Filtros
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ean.includes(searchTerm) ||
      product.ncm.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesVendor = selectedVendor === 'all' || product.vendor === selectedVendor;
    const matchesStatus = showInactive || product.status === 'active';

    return matchesSearch && matchesCategory && matchesVendor && matchesStatus;
  });

  // Estatísticas
  const activeCount = products.filter(p => p.status === 'active').length;
  const inactiveCount = products.filter(p => p.status === 'inactive').length;
  const categories = Array.from(new Set(products.map(p => p.category)));
  const vendors = Array.from(new Set(products.map(p => p.vendor)));

  const handleToggleStatus = (productId: string) => {
    // Implementar toggle de status
    console.log('Toggle status:', productId);
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6 pb-20">
      {/* Header */}
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Meus Produtos</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Visualize e gerencie todos os seus produtos cadastrados no ERP</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Total de Produtos</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-1">{products.length}</p>
            </div>
            <span className="material-icons-round text-blue-600 dark:text-blue-400 text-3xl">inventory</span>
          </div>
        </div>

        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-primary dark:text-secondary uppercase">Produtos Ativos</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">{activeCount}</p>
            </div>
            <span className="material-icons-round text-primary dark:text-secondary text-3xl">check_circle</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Produtos Inativos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-300 mt-1">{inactiveCount}</p>
            </div>
            <span className="material-icons-round text-gray-600 dark:text-gray-400 text-3xl">cancel</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Categorias</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-300 mt-1">{categories.length}</p>
            </div>
            <span className="material-icons-round text-purple-600 dark:text-purple-400 text-3xl">category</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                placeholder="Buscar por nome, EAN ou NCM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="all">Todas Categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Vendor Filter */}
          <div className="w-full lg:w-64">
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="all">Todos Fornecedores</option>
              {vendors.map(vendor => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="material-icons-round">view_list</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="material-icons-round">grid_view</span>
            </button>
          </div>
        </div>

        {/* Show Inactive Toggle */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setShowInactive(!showInactive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              showInactive
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="material-icons-round text-lg">
              {showInactive ? 'visibility' : 'visibility_off'}
            </span>
            <span className="text-sm font-medium">
              {showInactive ? 'Mostrando Inativos' : 'Apenas Ativos'}
            </span>
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredProducts.length} produto(s) encontrado(s)
          </span>
        </div>
      </section>

      {/* Products List/Grid */}
      {viewMode === 'list' ? (
        <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">EAN</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Fornecedor</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">NCM</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Última Atualização</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-icons-round text-gray-400 text-sm">image</span>
                            </div>
                          )}
                        </div>
                        <div className="max-w-md">
                          <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{product.ean}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{product.vendor}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Cód: {product.vendorCode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{product.ncm}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.status === 'active'
                            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {product.status === 'active' ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{product.lastUpdate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Visualizar">
                          <span className="material-icons-round text-gray-600 dark:text-gray-400 text-lg">visibility</span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Editar">
                          <span className="material-icons-round text-gray-600 dark:text-gray-400 text-lg">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-icons-round text-gray-400 text-6xl">image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    product.status === 'active'
                      ? 'bg-primary text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {product.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2">{product.name}</h3>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-3">
                  <p>EAN: <span className="font-mono">{product.ean}</span></p>
                  <p>NCM: <span className="font-mono">{product.ncm}</span></p>
                  <p className="truncate">{product.vendor}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-xs font-medium transition-colors">
                    Visualizar
                  </button>
                  <button className="flex-1 px-3 py-2 bg-primary hover:bg-cyan-800 text-white rounded-lg text-xs font-medium transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-12 text-center">
          <span className="material-icons-round text-gray-300 dark:text-gray-600 text-6xl">search_off</span>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Nenhum produto encontrado</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
