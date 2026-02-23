import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Crown, 
  DollarSign,
  ChevronRight,
  Shield,
  Settings,
  BarChart3,
  Mail
} from 'lucide-react';
type AdminPage = 'dashboard' | 'users' | 'analytics' | 'logs' | 'feedback' | 'ai' | 'config';

interface AdminDashboardProps {
  onNavigate?: (page: AdminPage) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Visão geral do sistema e métricas principais</p>
      </header>

      {/* Admin Banner */}
      <div className="bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Administrador Master</h2>
            <p className="text-white/70 text-sm">Acesso total ao sistema</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">Nome</span>
            </div>
            <p className="font-semibold">Fernando Inacio da Costa</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">E-mail</span>
            </div>
            <p className="font-semibold">inacio.fernando@gmail.com</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">Membro desde</span>
            </div>
            <p className="font-semibold">dez. de 2025</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +360.0%
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total de Usuários</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">11</p>
          <p className="text-xs text-gray-400 mt-1">+8 este mês</p>
        </div>

        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8.2%
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Usuários Premium</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
          <p className="text-xs text-gray-400 mt-1">Plano mensal</p>
        </div>

        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +15.1%
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Usuários Business</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
          <p className="text-xs text-gray-400 mt-1">Plano empresarial</p>
        </div>

        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Receita Mensal (MRR)</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">R$ 0.00</p>
          <p className="text-xs text-gray-400 mt-1">Receita recorrente</p>
        </div>
      </div>

      {/* Distribution & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Distribution */}
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Distribuição de Planos</h3>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">11</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Premium</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">0</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Business</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">0</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Ações Rápidas</h3>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate?.('users')}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Gerenciar Usuários</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Visualizar e editar usuários do sistema</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </button>

            <button 
              onClick={() => onNavigate?.('config')}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Configurar Planos</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Editar preços e recursos dos planos</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </button>

            <button 
              onClick={() => onNavigate?.('analytics')}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary dark:text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Ver Analytics</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Relatórios e gráficos detalhados</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
