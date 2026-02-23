
import React, { useState } from 'react';

interface Supplier {
  id: string;
  code: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  totalProducts: number;
  activeProducts: number;
  status: 'active' | 'inactive';
  lastUpdate: string;
  category: string;
}

const Suppliers: React.FC = () => {
  const [suppliers] = useState<Supplier[]>([
    {
      id: '1',
      code: '114044',
      name: 'DIAGEO BRASIL LTDA.',
      cnpj: '00.000.000/0001-91',
      email: 'contato@diageo.com.br',
      phone: '(11) 3456-7890',
      totalProducts: 145,
      activeProducts: 140,
      status: 'active',
      lastUpdate: '15/02/2026',
      category: 'Bebidas'
    },
    {
      id: '2',
      code: '114045',
      name: 'AMBEV S.A.',
      cnpj: '00.000.000/0001-92',
      email: 'comercial@ambev.com.br',
      phone: '(11) 2345-6789',
      totalProducts: 320,
      activeProducts: 310,
      status: 'active',
      lastUpdate: '14/02/2026',
      category: 'Bebidas'
    },
    {
      id: '3',
      code: '114046',
      name: 'COCA-COLA BRASIL LTDA.',
      cnpj: '00.000.000/0001-93',
      email: 'vendas@cocacola.com.br',
      phone: '(11) 4567-8901',
      totalProducts: 280,
      activeProducts: 275,
      status: 'active',
      lastUpdate: '13/02/2026',
      category: 'Bebidas'
    },
    {
      id: '4',
      code: '114047',
      name: 'NESTLÉ BRASIL LTDA.',
      cnpj: '00.000.000/0001-94',
      email: 'atendimento@nestle.com.br',
      phone: '(11) 5678-9012',
      totalProducts: 450,
      activeProducts: 430,
      status: 'active',
      lastUpdate: '12/02/2026',
      category: 'Alimentos'
    },
    {
      id: '5',
      code: '114048',
      name: 'UNILEVER BRASIL LTDA.',
      cnpj: '00.000.000/0001-95',
      email: 'comercial@unilever.com.br',
      phone: '(11) 6789-0123',
      totalProducts: 180,
      activeProducts: 165,
      status: 'inactive',
      lastUpdate: '08/02/2026',
      category: 'Higiene e Limpeza'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtros
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.includes(searchTerm) ||
      supplier.cnpj.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || supplier.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Estatísticas
  const activeCount = suppliers.filter(s => s.status === 'active').length;
  const inactiveCount = suppliers.filter(s => s.status === 'inactive').length;
  const totalProducts = suppliers.reduce((acc, s) => acc + s.totalProducts, 0);
  const categories = Array.from(new Set(suppliers.map(s => s.category)));

  return (
    <div className="max-w-[1800px] mx-auto space-y-6 pb-20">
      {/* Header */}
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Fornecedores</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Visualize e gerencie todos os fornecedores cadastrados</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Total Fornecedores</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-1">{suppliers.length}</p>
            </div>
            <span className="material-icons-round text-blue-600 dark:text-blue-400 text-3xl">store</span>
          </div>
        </div>

        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-primary dark:text-secondary uppercase">Ativos</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">{activeCount}</p>
            </div>
            <span className="material-icons-round text-primary dark:text-secondary text-3xl">check_circle</span>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Inativos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-300 mt-1">{inactiveCount}</p>
            </div>
            <span className="material-icons-round text-gray-600 dark:text-gray-400 text-3xl">cancel</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Total Produtos</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-300 mt-1">{totalProducts}</p>
            </div>
            <span className="material-icons-round text-purple-600 dark:text-purple-400 text-3xl">inventory</span>
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
                placeholder="Buscar por nome, código ou CNPJ..."
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

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="all">Todos Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
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

        <div className="mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredSuppliers.length} fornecedor(es) encontrado(s)
          </span>
        </div>
      </section>

      {/* Suppliers Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => (
            <div key={supplier.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{supplier.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Código: {supplier.code}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    supplier.status === 'active'
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="material-icons-round text-sm">badge</span>
                    <span>{supplier.cnpj}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="material-icons-round text-sm">email</span>
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="material-icons-round text-sm">phone</span>
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="material-icons-round text-sm">category</span>
                    <span>{supplier.category}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Produtos</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{supplier.totalProducts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Produtos Ativos</p>
                      <p className="text-lg font-bold text-primary dark:text-secondary">{supplier.activeProducts}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-xs font-medium transition-colors">
                      Ver Produtos
                    </button>
                    <button className="flex-1 px-3 py-2 bg-primary hover:bg-cyan-800 text-white rounded-lg text-xs font-medium transition-colors">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Fornecedor</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">CNPJ</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Contato</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Produtos</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{supplier.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Cód: {supplier.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{supplier.cnpj}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p className="truncate max-w-xs">{supplier.email}</p>
                        <p>{supplier.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-medium">
                        {supplier.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <p className="font-bold text-gray-900 dark:text-white">{supplier.totalProducts} total</p>
                        <p className="text-xs text-primary dark:text-secondary">{supplier.activeProducts} ativos</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        supplier.status === 'active'
                          ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Ver produtos">
                          <span className="material-icons-round text-gray-600 dark:text-gray-400 text-lg">inventory</span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Detalhes">
                          <span className="material-icons-round text-gray-600 dark:text-gray-400 text-lg">visibility</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {filteredSuppliers.length === 0 && (
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-12 text-center">
          <span className="material-icons-round text-gray-300 dark:text-gray-600 text-6xl">search_off</span>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Nenhum fornecedor encontrado</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
