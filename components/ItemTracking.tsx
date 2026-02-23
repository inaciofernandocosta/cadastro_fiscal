
import React, { useState } from 'react';

interface TrackedItem {
  id: string;
  ean: string;
  name: string;
  vendor: string;
  vendorCode: string;
  submittedDate: string;
  currentStatus: 'pending_approval' | 'in_purchasing' | 'fiscal_approved' | 'rejected';
  statusHistory: {
    status: string;
    date: string;
    user: string;
  }[];
  imageUrl?: string;
}

const ItemTracking: React.FC = () => {
  const [items] = useState<TrackedItem[]>([
    {
      id: '1',
      ean: '7893218003986',
      name: 'Bebida Mista Alcoólica Gaseificada Limão Clássico Smirnoff Ice Original Garrafa 275ml',
      vendor: 'DIAGEO BRASIL LTDA.',
      vendorCode: '114044',
      submittedDate: '15/02/2026 14:30',
      currentStatus: 'fiscal_approved',
      statusHistory: [
        { status: 'Enviado para Aprovação', date: '15/02/2026 14:30', user: 'Fornecedor' },
        { status: 'Em Análise - Compras', date: '15/02/2026 15:00', user: 'João Souza' },
        { status: 'Fiscal Aprovado', date: '16/02/2026 09:15', user: 'Maria Silva' }
      ],
      imageUrl: 'https://imgprd.martinsatacado.com.br/catalogoimg/550910/01_550910_01.jpg?v=241220255333&ims=1000x'
    },
    {
      id: '2',
      ean: '7891234567890',
      name: 'Cerveja Pilsen Premium Lata 350ml',
      vendor: 'AMBEV S.A.',
      vendorCode: '114045',
      submittedDate: '16/02/2026 10:00',
      currentStatus: 'in_purchasing',
      statusHistory: [
        { status: 'Enviado para Aprovação', date: '16/02/2026 10:00', user: 'Fornecedor' },
        { status: 'Em Análise - Compras', date: '16/02/2026 10:30', user: 'João Souza' }
      ]
    },
    {
      id: '3',
      ean: '7891234567891',
      name: 'Refrigerante Cola 2L',
      vendor: 'COCA-COLA BRASIL LTDA.',
      vendorCode: '114046',
      submittedDate: '16/02/2026 11:00',
      currentStatus: 'pending_approval',
      statusHistory: [
        { status: 'Enviado para Aprovação', date: '16/02/2026 11:00', user: 'Fornecedor' }
      ]
    },
    {
      id: '4',
      ean: '7891234567892',
      name: 'Suco Natural Laranja 1L',
      vendor: 'DIAGEO BRASIL LTDA.',
      vendorCode: '114044',
      submittedDate: '14/02/2026 16:00',
      currentStatus: 'rejected',
      statusHistory: [
        { status: 'Enviado para Aprovação', date: '14/02/2026 16:00', user: 'Fornecedor' },
        { status: 'Rejeitado - NCM Incorreto', date: '15/02/2026 08:00', user: 'Maria Silva' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedItem, setSelectedItem] = useState<TrackedItem | null>(null);

  // Filtros
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ean.includes(searchTerm) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || item.currentStatus === selectedStatus;
    const matchesVendor = selectedVendor === 'all' || item.vendor === selectedVendor;

    return matchesSearch && matchesStatus && matchesVendor;
  });

  // Estatísticas
  const pendingCount = items.filter(i => i.currentStatus === 'pending_approval').length;
  const purchasingCount = items.filter(i => i.currentStatus === 'in_purchasing').length;
  const approvedCount = items.filter(i => i.currentStatus === 'fiscal_approved').length;
  const rejectedCount = items.filter(i => i.currentStatus === 'rejected').length;
  const vendors = Array.from(new Set(items.map(i => i.vendor)));

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return { label: 'Aguardando Aprovação', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: 'schedule' };
      case 'in_purchasing':
        return { label: 'Em Análise - Compras', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: 'shopping_cart' };
      case 'fiscal_approved':
        return { label: 'Fiscal Aprovado', color: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary', icon: 'check_circle' };
      case 'rejected':
        return { label: 'Rejeitado', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: 'cancel' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: 'help' };
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'pending_approval': return 25;
      case 'in_purchasing': return 50;
      case 'fiscal_approved': return 100;
      case 'rejected': return 0;
      default: return 0;
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-6 pb-20">
      {/* Header */}
      <header>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Tracking de Itens</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Acompanhe o fluxo de aprovação dos produtos enviados pelos fornecedores</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase">Aguardando Aprovação</p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300 mt-1">{pendingCount}</p>
            </div>
            <span className="material-icons-round text-yellow-600 dark:text-yellow-400 text-3xl">schedule</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Em Compras</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300 mt-1">{purchasingCount}</p>
            </div>
            <span className="material-icons-round text-blue-600 dark:text-blue-400 text-3xl">shopping_cart</span>
          </div>
        </div>

        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-primary dark:text-secondary uppercase">Fiscal Aprovado</p>
              <p className="text-2xl font-bold text-primary dark:text-secondary mt-1">{approvedCount}</p>
            </div>
            <span className="material-icons-round text-primary dark:text-secondary text-3xl">check_circle</span>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">Rejeitados</p>
              <p className="text-2xl font-bold text-red-900 dark:text-red-300 mt-1">{rejectedCount}</p>
            </div>
            <span className="material-icons-round text-red-600 dark:text-red-400 text-3xl">cancel</span>
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
                placeholder="Buscar por nome, EAN ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-64">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="all">Todos os Status</option>
              <option value="pending_approval">Aguardando Aprovação</option>
              <option value="in_purchasing">Em Compras</option>
              <option value="fiscal_approved">Fiscal Aprovado</option>
              <option value="rejected">Rejeitados</option>
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
        </div>

        <div className="mt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredItems.length} item(ns) encontrado(s)
          </span>
        </div>
      </section>

      {/* Items List */}
      <section className="space-y-4">
        {filteredItems.map((item) => {
          const statusInfo = getStatusInfo(item.currentStatus);
          const progress = getProgressPercentage(item.currentStatus);
          
          return (
            <div key={item.id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-icons-round text-gray-400">image</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{item.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>EAN: <strong>{item.ean}</strong></span>
                          <span>Fornecedor: <strong>{item.vendor}</strong></span>
                          <span>Enviado em: <strong>{item.submittedDate}</strong></span>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${statusInfo.color}`}>
                        <span className="material-icons-round text-sm">{statusInfo.icon}</span>
                        {statusInfo.label}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Progresso do Fluxo</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            item.currentStatus === 'rejected' ? 'bg-red-500' : 'bg-primary'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Timeline Steps */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        ['pending_approval', 'in_purchasing', 'fiscal_approved'].includes(item.currentStatus)
                          ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <span className="material-icons-round text-sm">send</span>
                        <span className="text-xs font-bold">Enviado</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        ['in_purchasing', 'fiscal_approved'].includes(item.currentStatus)
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <span className="material-icons-round text-sm">shopping_cart</span>
                        <span className="text-xs font-bold">Compras</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        item.currentStatus === 'fiscal_approved'
                          ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <span className="material-icons-round text-sm">check_circle</span>
                        <span className="text-xs font-bold">Fiscal Aprovado</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-4 py-2 bg-primary hover:bg-cyan-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <span className="material-icons-round text-lg">timeline</span>
                        Ver Histórico Completo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {filteredItems.length === 0 && (
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-12 text-center">
          <span className="material-icons-round text-gray-300 dark:text-gray-600 text-6xl">search_off</span>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Nenhum item encontrado</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Tente ajustar os filtros de busca</p>
        </div>
      )}

      {/* Modal de Histórico */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Histórico do Item</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">EAN: {selectedItem.ean}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-round text-3xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {selectedItem.statusHistory.map((history, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                        <span className="material-icons-round text-lg">check</span>
                      </div>
                      {index < selectedItem.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className="font-bold text-gray-900 dark:text-white">{history.status}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{history.date}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Por: {history.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTracking;
