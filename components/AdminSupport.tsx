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
  Trash2,
  Monitor,
  Code,
  Wifi,
  Key,
  HelpCircle,
  Users,
  Send
} from 'lucide-react';

type TicketCategory = 'HARDWARE' | 'SOFTWARE' | 'REDE' | 'ACESSO' | 'OUTRO';
type TicketStatus = 'NOVO' | 'ATRIBUIDO' | 'EM_ANDAMENTO' | 'PENDENTE' | 'RESOLVIDO' | 'FECHADO';
type TicketPriority = 'BAIXA' | 'NORMAL' | 'ALTA' | 'URGENTE' | 'CRITICA';

interface Ticket {
  id: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  sla_hours: number;
  subject: string;
  description: string;
  user_name: string;
  user_email: string;
  assigned_to?: string;
  date: string;
  updated_at: string;
}

const mockTickets: Ticket[] = [
  {
    id: '#TK001',
    category: 'HARDWARE',
    status: 'NOVO',
    priority: 'ALTA',
    sla_hours: 4,
    subject: 'Impressora não funciona',
    description: 'A impressora do setor fiscal não está imprimindo. Já tentei reiniciar mas o problema persiste.',
    user_name: 'Fernando Inacio da Costa',
    user_email: 'inacio.fernando@gmail.com',
    date: '23 de fev. de 2026, 09:15',
    updated_at: '23 de fev. de 2026, 09:15'
  },
  {
    id: '#TK002',
    category: 'SOFTWARE',
    status: 'EM_ANDAMENTO',
    priority: 'NORMAL',
    sla_hours: 16,
    subject: 'Erro ao gerar relatório',
    description: 'Sistema apresenta erro ao tentar gerar relatório mensal de produtos.',
    user_name: 'Maria Silva',
    user_email: 'maria.silva@vilanova.com',
    assigned_to: 'Suporte TI',
    date: '22 de fev. de 2026, 14:30',
    updated_at: '23 de fev. de 2026, 08:45'
  },
  {
    id: '#TK003',
    category: 'REDE',
    status: 'ATRIBUIDO',
    priority: 'URGENTE',
    sla_hours: 2,
    subject: 'Internet lenta no setor',
    description: 'Conexão muito lenta impossibilitando trabalho. Afetando toda equipe.',
    user_name: 'João Santos',
    user_email: 'joao.santos@vilanova.com',
    assigned_to: 'Infraestrutura',
    date: '23 de fev. de 2026, 08:00',
    updated_at: '23 de fev. de 2026, 08:30'
  },
  {
    id: '#TK004',
    category: 'ACESSO',
    status: 'PENDENTE',
    priority: 'NORMAL',
    sla_hours: 8,
    subject: 'Solicitar acesso ao módulo fiscal',
    description: 'Preciso de acesso ao módulo de cadastro fiscal para realizar minhas atividades.',
    user_name: 'Ana Paula',
    user_email: 'ana.paula@vilanova.com',
    date: '22 de fev. de 2026, 16:00',
    updated_at: '23 de fev. de 2026, 09:00'
  },
  {
    id: '#TK005',
    category: 'OUTRO',
    status: 'RESOLVIDO',
    priority: 'BAIXA',
    sla_hours: 48,
    subject: 'Dúvida sobre processo',
    description: 'Como faço para cadastrar um novo fornecedor no sistema?',
    user_name: 'Carlos Oliveira',
    user_email: 'carlos.oliveira@vilanova.com',
    assigned_to: 'Suporte',
    date: '20 de fev. de 2026, 10:00',
    updated_at: '21 de fev. de 2026, 11:30'
  }
];

const AdminSupport: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'analytics'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TicketCategory | 'TODOS'>('TODOS');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | 'TODOS'>('TODOS');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(mockTickets[0]);

  const getCategoryIcon = (category: TicketCategory) => {
    switch (category) {
      case 'HARDWARE': return Monitor;
      case 'SOFTWARE': return Code;
      case 'REDE': return Wifi;
      case 'ACESSO': return Key;
      case 'OUTRO': return HelpCircle;
    }
  };

  const getCategoryColor = (category: TicketCategory) => {
    switch (category) {
      case 'HARDWARE': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
      case 'SOFTWARE': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800/50';
      case 'REDE': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50';
      case 'ACESSO': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800/50';
      case 'OUTRO': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800/50';
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'NOVO': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ATRIBUIDO': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'EM_ANDAMENTO': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'PENDENTE': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'RESOLVIDO': return 'bg-primary/10 text-primary dark:text-secondary';
      case 'FECHADO': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'BAIXA': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      case 'NORMAL': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ALTA': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'URGENTE': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'CRITICA': return 'bg-red-600 text-white dark:bg-red-700';
    }
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'TODOS' || ticket.category === selectedCategory;
    const matchesStatus = selectedStatus === 'TODOS' || ticket.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categoryStats = {
    HARDWARE: mockTickets.filter(t => t.category === 'HARDWARE').length,
    SOFTWARE: mockTickets.filter(t => t.category === 'SOFTWARE').length,
    REDE: mockTickets.filter(t => t.category === 'REDE').length,
    ACESSO: mockTickets.filter(t => t.category === 'ACESSO').length,
    OUTRO: mockTickets.filter(t => t.category === 'OUTRO').length,
  };

  const statusStats = {
    total: mockTickets.length,
    novo: mockTickets.filter(t => t.status === 'NOVO').length,
    em_andamento: mockTickets.filter(t => t.status === 'EM_ANDAMENTO').length,
    pendente: mockTickets.filter(t => t.status === 'PENDENTE').length,
    resolvido: mockTickets.filter(t => t.status === 'RESOLVIDO').length,
    sla_violado: mockTickets.filter(t => t.sla_hours < 0).length,
  };

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

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{statusStats.total}</p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Novos</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{statusStats.novo}</p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Em Andamento</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">{statusStats.em_andamento}</p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Pendentes</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 dark:text-orange-300">{statusStats.pendente}</p>
        </div>

        <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-primary dark:text-secondary mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Resolvidos</span>
          </div>
          <p className="text-2xl font-bold text-primary dark:text-white">{statusStats.resolvido}</p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">SLA Violado</span>
          </div>
          <p className="text-2xl font-bold text-red-900 dark:text-red-300">{statusStats.sla_violado}</p>
        </div>
      </div>

      {/* Categorias GLPI */}
      <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Categorias de Suporte
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setSelectedCategory('TODOS')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedCategory === 'TODOS'
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-border-light dark:border-border-dark hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <List className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Todos</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{mockTickets.length}</span>
            </div>
          </button>
          {(['HARDWARE', 'SOFTWARE', 'REDE', 'ACESSO', 'OUTRO'] as TicketCategory[]).map((cat) => {
            const Icon = getCategoryIcon(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === cat
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-border-light dark:border-border-dark hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{cat}</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{categoryStats[cat]}</span>
                </div>
              </button>
            );
          })}
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

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Buscar por assunto, descrição, email, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none transition-shadow"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as TicketStatus | 'TODOS')}
          className="px-4 py-3 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="NOVO">Novo</option>
          <option value="ATRIBUIDO">Atribuído</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="PENDENTE">Pendente</option>
          <option value="RESOLVIDO">Resolvido</option>
          <option value="FECHADO">Fechado</option>
        </select>
      </div>

      {/* Tickets List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {filteredTickets.length} Ticket{filteredTickets.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <div className="space-y-2 max-h-[800px] overflow-y-auto pr-2">
            {filteredTickets.map(ticket => {
              const CategoryIcon = getCategoryIcon(ticket.category);
              return (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedTicket?.id === ticket.id
                      ? 'border-primary bg-primary/10 dark:bg-primary/20'
                      : 'border-border-light dark:border-border-dark hover:border-gray-300 dark:hover:border-gray-600 bg-card-light dark:bg-card-dark'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border ${getCategoryColor(ticket.category)}`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{ticket.id}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 truncate">
                        {ticket.subject}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                        {ticket.sla_hours > 0 && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {ticket.sla_hours}h
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredTickets.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Nenhum ticket encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Ticket Detail */}
        {selectedTicket && (
          <div className="lg:col-span-2">
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm">
              {/* Ticket Header */}
              <div className="p-6 border-b border-border-light dark:border-border-dark">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-gray-500 font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {selectedTicket.id}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border ${getCategoryColor(selectedTicket.category)}`}>
                    {selectedTicket.category}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.replace('_', ' ')}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                  {selectedTicket.sla_hours > 0 && (
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1 ml-2">
                      <Clock className="w-3 h-3" />
                      {selectedTicket.sla_hours}H RESTANTES
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedTicket.subject}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{selectedTicket.user_name}</span>
                  <span>•</span>
                  <span>{selectedTicket.user_email}</span>
                  <span>•</span>
                  <span>{selectedTicket.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Ticket Content Area */}
                <div className="lg:col-span-2 p-6 border-r border-border-light dark:border-border-dark">
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Descrição</h4>
                    <div className="bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-xl p-4">
                      <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap">
                        {selectedTicket.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Responder ao Usuário</h4>
                    <textarea 
                      className="w-full h-32 bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none resize-none mb-3"
                      placeholder="Digite sua resposta... O usuário receberá por email."
                    />
                    <button className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <Send className="w-4 h-4" />
                      Enviar Resposta
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-border-light dark:border-border-dark">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">Ações Rápidas:</span>
                    <button className="px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                      <Sparkles className="w-3 h-3" /> Analisar com IA
                    </button>
                    <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
                      <RefreshCw className="w-3 h-3" /> Em Andamento
                    </button>
                    <button className="px-3 py-1.5 bg-primary/10 text-primary dark:text-secondary text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-primary/20 transition-colors">
                      <CheckCircle2 className="w-3 h-3" /> Resolver
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
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Categoria</label>
                      <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none">
                        <option>Hardware</option>
                        <option>Software</option>
                        <option>Rede</option>
                        <option>Acesso</option>
                        <option>Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Status</label>
                      <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none">
                        <option>Novo</option>
                        <option>Atribuído</option>
                        <option>Em Andamento</option>
                        <option>Pendente</option>
                        <option>Resolvido</option>
                        <option>Fechado</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Prioridade</label>
                      <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none">
                        <option>Baixa</option>
                        <option>Normal</option>
                        <option>Alta</option>
                        <option>Urgente</option>
                        <option>Crítica</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Técnico Responsável</label>
                      <select className="w-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none">
                        <option>Não atribuído</option>
                        <option>Suporte TI</option>
                        <option>Infraestrutura</option>
                        <option>Desenvolvimento</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">SLA</label>
                      <div className="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {selectedTicket.sla_hours > 0 ? `${selectedTicket.sla_hours}h restantes` : 'SLA violado'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Criado: {selectedTicket.date}</p>
                        <p className="text-xs text-gray-500">Atualizado: {selectedTicket.updated_at}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Notas Internas</label>
                      <textarea 
                        className="w-full h-24 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                        placeholder="Adicione notas internas sobre este ticket..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
