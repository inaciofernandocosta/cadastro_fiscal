import React, { useState } from 'react';
import { 
  MessageSquare, 
  Clock, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  List, 
  Kanban, 
  BarChart2, 
  Search,
  Filter,
  Sparkles,
  Trash2
} from 'lucide-react';

interface Ticket {
  id: string;
  category: 'ASSINATURA' | 'MELHORIA' | 'BUG';
  status: 'PENDENTE' | 'EM_ANALISE' | 'RESOLVIDA';
  priority: 'NORMAL' | 'ALTA' | 'CRITICA';
  sla_hours: number;
  subject: string;
  user_name: string;
  user_email: string;
  date: string;
}

const mockTickets: Ticket[] = [
  {
    id: '#c7a927ca',
    category: 'ASSINATURA',
    status: 'PENDENTE',
    priority: 'NORMAL',
    sla_hours: 13,
    subject: 'Assinatura',
    user_name: 'Fernando Inacio da Costa',
    user_email: 'inacio.fernando@gmail.com',
    date: '21 de fev. de 2026, 20:48'
  }
];

const AdminSupport: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'analytics'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Sistema de Suporte</h1>
          <p className="text-label-light dark:text-label-dark text-lg">Gestão profissional de tickets com SLA</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </header>

      {/* SLA Dashboards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Total Tickets</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Pendentes</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 dark:text-orange-300">1</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Em Análise</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">0</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">SLA Violado</span>
          </div>
          <p className="text-2xl font-bold text-red-900 dark:text-red-300">0</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Tempo Médio</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">0h</p>
        </div>

        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-primary dark:text-secondary mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Taxa Resolução</span>
          </div>
          <p className="text-2xl font-bold text-primary dark:text-white">0%</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">SLA Compliance</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">0%</p>
        </div>
      </div>

      {/* View Toggles */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-full md:w-auto">
        <button 
          onClick={() => setViewMode('list')}
          className={`flex-1 md:w-32 py-2 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'list' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <List className="w-4 h-4" />
          Lista
        </button>
        <button 
          onClick={() => setViewMode('kanban')}
          className={`flex-1 md:w-32 py-2 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'kanban' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Kanban className="w-4 h-4" />
          Kanban
        </button>
        <button 
          onClick={() => setViewMode('analytics')}
          className={`flex-1 md:w-32 py-2 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${
            viewMode === 'analytics' 
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Analytics
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar por assunto, descrição, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
          />
        </div>
        <button className="px-6 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtros Avançados
        </button>
      </div>

      {/* Active Ticket Detail View */}
      {mockTickets.map(ticket => (
        <div key={ticket.id} className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
          {/* Ticket Header */}
          <div className="p-6 border-b border-border-light dark:border-border-dark">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {ticket.id}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30 px-2 py-1 rounded">
                {ticket.category}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 px-2 py-1 rounded">
                {ticket.status}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 px-2 py-1 rounded">
                {ticket.priority}
              </span>
              <span className="text-xs font-medium text-gray-500 flex items-center gap-1 ml-2">
                <Clock className="w-3 h-3" />
                {ticket.sla_hours}H RESTANTES
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ticket.subject}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {ticket.user_name} • {ticket.user_email} • {ticket.date}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Ticket Content Area */}
            <div className="lg:col-span-2 p-6 border-r border-border-light dark:border-border-dark">
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Descrição</h4>
                <div className="bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-xl p-4">
                  <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap">
                    Quanto custa
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Enviar Mensagem ao Usuário</h4>
                <textarea 
                  className="w-full h-32 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none mb-3"
                  placeholder="Digite sua mensagem... O usuário receberá por email e poderá responder."
                />
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Enviar e Aguardar Resposta
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-border-light dark:border-border-dark">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Ações Rápidas:</span>
                <button className="px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  <Sparkles className="w-3 h-3" /> Analisar com IA
                </button>
                <button className="px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  <RefreshCw className="w-3 h-3" /> Em Análise
                </button>
                <button className="px-3 py-1.5 bg-primary/10 text-primary dark:text-secondary text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-primary/20 transition-colors">
                  <CheckCircle2 className="w-3 h-3" /> Resolvida
                </button>
                
                <div className="flex-1"></div>
                <button className="px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800">
                  <Trash2 className="w-3 h-3" /> Excluir
                </button>
              </div>
            </div>

            {/* Ticket Sidebar / Meta Data */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/30">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Status</label>
                  <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Pendente</option>
                    <option>Em Análise</option>
                    <option>Aguardando Usuário</option>
                    <option>Resolvida</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Prioridade</label>
                  <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Normal</option>
                    <option>Alta</option>
                    <option>Crítica</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Agente Atribuído</label>
                  <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Não atribuído</option>
                    <option>Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Tags</label>
                  <button className="px-3 py-1.5 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-blue-500 transition-colors flex items-center gap-1">
                    <span className="text-lg leading-none">+</span> Tag
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Notas do Admin</label>
                  <textarea 
                    className="w-full h-24 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Adicione notas internas sobre este feedback..."
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-400 italic text-center">Sem atividades registradas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSupport;
