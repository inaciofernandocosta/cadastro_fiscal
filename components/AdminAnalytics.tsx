import React, { useState } from 'react';
import { 
  RefreshCw, 
  Users, 
  Clock, 
  MousePointer, 
  TrendingUp,
  TrendingDown,
  Monitor,
  Smartphone,
  Globe,
  Calendar
} from 'lucide-react';

interface UserActivity {
  date: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  lastAccess: string;
  status: 'Online' | 'Offline';
}

const mockActivity: UserActivity[] = [
  { date: '10/01', name: 'ROSEMILDA DA CRUZ OLIVEIRA COSTA', email: 'rosemi.cruz@gmail.com', phone: '-', device: 'desktop', lastAccess: '14/02', status: 'Offline' },
  { date: '10/01', name: 'ROSEMILDA DA CRUZ OLIVEIRA COSTA', email: 'rosemi.cruz@gmail.com', phone: '-', device: 'desktop', lastAccess: '14/02', status: 'Offline' },
  { date: '10/01', name: 'ROSEMILDA DA CRUZ OLIVEIRA COSTA', email: 'rosemi.cruz@gmail.com', phone: '-', device: 'desktop', lastAccess: '14/02', status: 'Offline' },
  { date: '10/01', name: 'ROSEMILDA DA CRUZ OLIVEIRA COSTA', email: 'rosemi.cruz@gmail.com', phone: '-', device: 'desktop', lastAccess: '14/02', status: 'Offline' },
  { date: '10/01', name: 'Fernando Inacio da Costa', email: 'inacio.fernando@gmail.com', phone: '-', device: 'desktop', lastAccess: '23/02', status: 'Online' },
  { date: '10/01', name: 'Fernando Inacio da Costa', email: 'inacio.fernando@gmail.com', phone: '-', device: 'desktop', lastAccess: '23/02', status: 'Online' },
];

const AdminAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
          <p className="text-label-light dark:text-label-dark text-lg">Última atualização: 23/02/2026, 10:03:06</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border-light dark:border-border-dark">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Histórico de Usuários
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Online Users Banner */}
          <div className="bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-white animate-pulse"></span>
                  <span className="text-sm font-medium text-white/80">Usuários Online Agora</span>
                </div>
                <p className="text-5xl font-bold">5</p>
                <p className="text-sm text-white/60 mt-1">de 11 usuários cadastrados</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/70">Taxa de Engajamento</p>
                <p className="text-4xl font-bold">45.5%</p>
              </div>
            </div>
          </div>

          {/* Active Users Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">Usuários Ativos (24h)</span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">-65.7% do MAU</span>
              </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">Usuários Ativos (7 dias)</span>
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500 font-medium">-67.5% do MAU</span>
              </div>
            </div>

            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">Usuários Ativos (30 dias)</span>
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>

          {/* Session Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Sessões (24h)</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Tempo Médio</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">16h 35m</p>
            </div>
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Sessões/Usuário</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">78</p>
            </div>
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Taxa Conversão</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18.2%</p>
            </div>
          </div>

          {/* Distribution & Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plan Distribution */}
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Distribuição de Planos</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Free</span>
                    <span className="text-sm text-gray-500">9 (81.8%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '81.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
                    <span className="text-sm text-gray-500">0 (0.0%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                    <div className="bg-blue-400 h-3 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Premium</span>
                    <span className="text-sm text-gray-500">0 (0.0%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Business</span>
                    <span className="text-sm text-gray-500">2 (18.2%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: '18.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Devices & Browsers */}
            <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Dispositivos & Browsers</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Dispositivos</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">mobile</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">1225</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">desktop</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">1101</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Browsers</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Other</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Safari</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">1249</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Chrome</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">1068</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Activity Table */}
          <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-light dark:border-border-dark">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Usuários por Dia (últimos 30 dias)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Usuário</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3">Dispositivo</th>
                    <th className="px-6 py-3">Último Acesso</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {mockActivity.map((activity, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.date}</td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">{activity.name}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.email}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.phone}</td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1.5">
                          {activity.device === 'mobile' ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                          {activity.device}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.lastAccess}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          activity.status === 'Online'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'history' && (
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Usuário</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Telefone</th>
                  <th className="px-6 py-3">Dispositivo</th>
                  <th className="px-6 py-3">Último Acesso</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light dark:divide-border-dark">
                {mockActivity.map((activity, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.date}</td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">{activity.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.email}</td>
                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.phone}</td>
                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        {activity.device === 'mobile' ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                        {activity.device}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600 dark:text-gray-300">{activity.lastAccess}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        activity.status === 'Online'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
