import React, { useState } from 'react';
import { 
  Users, 
  Crown, 
  Briefcase, 
  Search, 
  ChevronDown, 
  Mail, 
  MessageCircle, 
  Eye, 
  Trash2,
  MoreVertical
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'BETA' | 'MASTER' | 'PREMIUM' | 'BUSINESS';
  registeredAt: string;
  lastAccess: string;
  sessions: number;
  status: 'Online' | 'Offline';
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '3f1a06b8-b628-4bfe-ab79-3a8f1ca3e923',
    name: 'Renan Villas Boas',
    email: '-',
    plan: 'PREMIUM',
    registeredAt: '18/02/2026',
    lastAccess: 'Nunca',
    sessions: 0,
    status: 'Offline'
  },
  {
    id: '27b360f3-9b98-480b-a1b2-7c77f498cf02',
    name: 'Fernando Inacio da Costa',
    email: 'fernando.costa@vilanova.com.br',
    plan: 'MASTER',
    registeredAt: '10/02/2026',
    lastAccess: '19/02/2026 21:52',
    sessions: 881,
    status: 'Offline',
    avatar: 'https://picsum.photos/seed/admin/44/44'
  }
];

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Todos os planos');
  const [isInviteExpanded, setIsInviteExpanded] = useState(false);
  const [isWhatsappExpanded, setIsWhatsappExpanded] = useState(false);

  const filteredUsers = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlan = selectedPlan === 'Todos os planos' || u.plan === selectedPlan;
    return matchSearch && matchPlan;
  });

  const stats = {
    total: mockUsers.length,
    premium: mockUsers.filter(u => u.plan === 'PREMIUM').length,
    business: mockUsers.filter(u => u.plan === 'BUSINESS' || u.plan === 'MASTER').length
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Gestão de Usuários</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Visualize e gerencie todos os usuários do sistema</p>
      </header>

      {/* Invite Campaigns */}
      <div className="space-y-4">
        <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300">
          <button 
            onClick={() => setIsInviteExpanded(!isInviteExpanded)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Campanha de Convite
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Cole uma lista de emails para enviar o e-mail comercial com preview do app.
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isInviteExpanded ? 'rotate-180' : ''}`} />
          </button>
          {isInviteExpanded && (
            <div className="px-5 pb-5 border-t border-border-light dark:border-border-dark pt-4 animate-fade-in-up">
              <textarea 
                className="w-full h-32 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                placeholder="email1@exemplo.com, email2@exemplo.com..."
              />
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors">
                  Enviar Convites
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden transition-all duration-300">
          <button 
            onClick={() => setIsWhatsappExpanded(!isWhatsappExpanded)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                Convidar via WhatsApp
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Envie um link de convite para qualquer número — sem precisar ter o contato salvo.
              </p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isWhatsappExpanded ? 'rotate-180' : ''}`} />
          </button>
          {isWhatsappExpanded && (
            <div className="px-5 pb-5 border-t border-border-light dark:border-border-dark pt-4 animate-fade-in-up">
              <div className="flex gap-3">
                <input 
                  type="text"
                  className="flex-1 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                  placeholder="+55 (11) 99999-9999"
                />
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Gerar Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar por email ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div className="w-full sm:w-48 relative">
          <select 
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full px-4 py-2.5 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl text-sm appearance-none focus:ring-2 focus:ring-primary outline-none"
          >
            <option>Todos os planos</option>
            <option>BETA</option>
            <option>MASTER</option>
            <option>PREMIUM</option>
            <option>BUSINESS</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl p-5">
          <p className="text-sm font-medium text-primary dark:text-secondary mb-1">Total de Usuários</p>
          <p className="text-3xl font-bold text-primary dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Usuários Premium</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.premium}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-5">
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Usuários Business</p>
          <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.business}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Plano</th>
                <th className="px-6 py-4">Cadastro</th>
                <th className="px-6 py-4">Último Acesso</th>
                <th className="px-6 py-4">Sessões (30d)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Users className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {user.name}
                          {user.plan === 'MASTER' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">MASTER</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                    <div className="max-w-[120px] truncate" title={user.id}>{user.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.plan === 'BUSINESS' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      user.plan === 'MASTER' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      user.plan === 'PREMIUM' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.registeredAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.lastAccess}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {user.sessions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Online' ? 'bg-primary' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Visualizar Detalhes">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-orange-500 hover:text-orange-700 transition-colors" title="Enviar Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors" title="Excluir Usuário">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
