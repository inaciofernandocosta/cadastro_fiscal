
import React, { useState } from 'react';

interface Supplier {
  id: string;
  code: string;
  name: string;
  cnpj: string;
  itemLimit: number;
  itemsUsed: number;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

const AdminSuppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      code: '114044',
      name: 'DIAGEO BRASIL LTDA.',
      cnpj: '00.000.000/0001-91',
      itemLimit: 100,
      itemsUsed: 45,
      status: 'active',
      lastUpdate: '15/02/2026'
    },
    {
      id: '2',
      code: '114045',
      name: 'AMBEV S.A.',
      cnpj: '00.000.000/0001-92',
      itemLimit: 200,
      itemsUsed: 180,
      status: 'active',
      lastUpdate: '14/02/2026'
    },
    {
      id: '3',
      code: '114046',
      name: 'COCA-COLA BRASIL LTDA.',
      cnpj: '00.000.000/0001-93',
      itemLimit: 150,
      itemsUsed: 75,
      status: 'active',
      lastUpdate: '13/02/2026'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [newLimit, setNewLimit] = useState('');

  const handleEditLimit = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setNewLimit(supplier.itemLimit.toString());
    setShowModal(true);
  };

  const handleSaveLimit = () => {
    if (selectedSupplier && newLimit) {
      setSuppliers(suppliers.map(s => 
        s.id === selectedSupplier.id 
          ? { ...s, itemLimit: parseInt(newLimit), lastUpdate: new Date().toLocaleDateString('pt-BR') }
          : s
      ));
      setShowModal(false);
      setSelectedSupplier(null);
      setNewLimit('');
    }
  };

  const handleToggleStatus = (id: string) => {
    setSuppliers(suppliers.map(s => 
      s.id === id 
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
    ));
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Administração de Fornecedores</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Gerencie limites de cadastro de produtos por fornecedor</p>
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

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">Ativos</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-300 mt-1">
                {suppliers.filter(s => s.status === 'active').length}
              </p>
            </div>
            <span className="material-icons-round text-green-600 dark:text-green-400 text-3xl">check_circle</span>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">Limite Total</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-300 mt-1">
                {suppliers.reduce((acc, s) => acc + s.itemLimit, 0)}
              </p>
            </div>
            <span className="material-icons-round text-orange-600 dark:text-orange-400 text-3xl">inventory</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Itens Cadastrados</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-300 mt-1">
                {suppliers.reduce((acc, s) => acc + s.itemsUsed, 0)}
              </p>
            </div>
            <span className="material-icons-round text-purple-600 dark:text-purple-400 text-3xl">shopping_cart</span>
          </div>
        </div>
      </div>

      {/* Suppliers Table */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons-round">list</span>
            Lista de Fornecedores
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">CNPJ</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Limite de Itens</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Uso</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Última Atualização</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {suppliers.map((supplier) => {
                const usagePercentage = getUsagePercentage(supplier.itemsUsed, supplier.itemLimit);
                return (
                  <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-primary dark:text-secondary">{supplier.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{supplier.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{supplier.cnpj}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{supplier.itemLimit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {supplier.itemsUsed} / {supplier.itemLimit}
                          </span>
                          <span className={`text-xs font-bold ${usagePercentage >= 90 ? 'text-red-600' : usagePercentage >= 70 ? 'text-yellow-600' : 'text-green-600'}`}>
                            ({usagePercentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${getUsageColor(usagePercentage)}`}
                            style={{ width: `${usagePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(supplier.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          supplier.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{supplier.lastUpdate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleEditLimit(supplier)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-cyan-800 text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <span className="material-icons-round text-sm">edit</span>
                        Editar Limite
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal de Edição */}
      {showModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Editar Limite de Itens</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Fornecedor</label>
                <p className="text-base font-medium text-gray-900 dark:text-white">{selectedSupplier.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Código: {selectedSupplier.code}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Uso Atual</label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedSupplier.itemsUsed} itens cadastrados de {selectedSupplier.itemLimit} permitidos
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Novo Limite de Itens</label>
                <input
                  type="number"
                  min="0"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Digite o novo limite"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveLimit}
                  className="flex-1 px-4 py-3 bg-primary hover:bg-cyan-800 text-white rounded-lg font-medium transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSuppliers;
