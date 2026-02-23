import React, { useState } from 'react';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Save, 
  Shield, 
  AlertTriangle,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  lastUsed?: string;
}

const AdminAI: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'API Key Principal',
      key: 'sk-proj-************************************************************k4A1',
      isActive: true,
      lastUsed: '23/02/2026'
    },
    {
      id: '2',
      name: 'API Key Secundária',
      key: 'sk-proj-************************************************************k9B3',
      isActive: true,
      lastUsed: '20/02/2026'
    }
  ]);

  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleKeyActive = (id: string) => {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, isActive: !k.isActive } : k));
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Uso de IA</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Gerencie chaves de API e monitore o uso de análises por IA</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">APIs Ativas</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {apiKeys.filter(k => k.isActive).length}
          </p>
        </div>
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Análises (7 dias)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
        </div>
        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Análises (Total)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
        </div>
      </div>

      {/* API Keys Configuration */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Configuração de API Keys</h2>
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden">
              <div className="p-5">
                {/* Key Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Key className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    apiKey.isActive
                      ? 'bg-primary/10 text-primary'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {apiKey.isActive ? '● ATIVA' : '● INATIVA'}
                  </span>
                </div>

                {/* Key Value */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 dark:text-gray-300 truncate">
                    {showKey[apiKey.id] 
                      ? 'sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789aBcDeFgHiJkLmNoPqRsTuVwXyZ'
                      : apiKey.key
                    }
                  </div>
                  <button 
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    title={showKey[apiKey.id] ? 'Ocultar chave' : 'Mostrar chave'}
                  >
                    {showKey[apiKey.id] ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                  </button>
                  <button 
                    className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    title="Copiar chave"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="px-4 py-2.5 bg-card-light dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                </div>

                {/* Toggle & Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleKeyActive(apiKey.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        apiKey.isActive ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          apiKey.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      API Key {apiKey.isActive ? 'ativa e pronta para uso' : 'desativada'}
                    </span>
                  </div>
                  {apiKey.lastUsed && (
                    <span className="text-xs text-gray-400">Último uso: {apiKey.lastUsed}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Segurança das API Keys</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              As API Keys são armazenadas de forma segura no banco de dados e são usadas apenas pelas Edge Functions do Supabase. 
              Nunca compartilhe suas chaves publicamente. Apenas usuários master podem visualizar e gerenciar as configurações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAI;
