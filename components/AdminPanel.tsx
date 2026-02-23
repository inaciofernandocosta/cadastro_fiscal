import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Bot, 
  Settings,
  ArrowLeft
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminAnalytics from './AdminAnalytics';
import AdminSupport from './AdminSupport';
import AdminAI from './AdminAI';

type AdminPage = 'dashboard' | 'users' | 'analytics' | 'logs' | 'feedback' | 'ai' | 'config';

interface AdminNavItem {
  id: AdminPage;
  label: string;
  icon: React.ReactNode;
}

interface AdminPanelProps {
  onBack: () => void;
}

const adminNav: AdminNavItem[] = [
  { id: 'dashboard', label: 'Dashboard',        icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
  { id: 'users',     label: 'Usuários',         icon: <Users className="w-[18px] h-[18px]" /> },
  { id: 'analytics', label: 'Analytics',        icon: <BarChart3 className="w-[18px] h-[18px]" /> },
  { id: 'logs',      label: 'Logs & Auditoria', icon: <FileText className="w-[18px] h-[18px]" /> },
  { id: 'feedback',  label: 'Feedback',         icon: <MessageSquare className="w-[18px] h-[18px]" /> },
  { id: 'ai',        label: 'Uso de IA',        icon: <Bot className="w-[18px] h-[18px]" /> },
  { id: 'config',    label: 'Configurações',    icon: <Settings className="w-[18px] h-[18px]" /> },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleNavigate = (page: AdminPage) => {
    setCurrentPage(page);
    setIsMobileSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case 'users':
        return <AdminUsers />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'feedback':
        return <AdminSupport />;
      case 'ai':
        return <AdminAI />;
      case 'logs':
      case 'config':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <Settings className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg font-medium">Esta página está em desenvolvimento</p>
            <p className="text-sm mt-1">Em breve estará disponível</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0
          w-64 lg:w-60
          bg-white dark:bg-slate-900
          flex flex-col h-full
          transition-transform duration-300
          z-50
          border-r border-slate-100 dark:border-slate-800
          shadow-[1px_0_8px_rgba(0,0,0,0.06)] dark:shadow-none
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex flex-col items-start gap-1">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Admin</span>
          <span className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Hub de Produto
          </span>
        </div>

        <div className="mx-5 h-px bg-slate-100 dark:bg-slate-800" />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {adminNav.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-2 py-2.5 rounded-lg
                  text-sm font-medium text-left
                  transition-all duration-150
                  ${isActive
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }
                `}
              >
                <span
                  className={`
                    w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0
                    transition-colors duration-150
                    ${isActive
                      ? 'bg-white/15'
                      : 'bg-slate-100 dark:bg-slate-800'
                    }
                  `}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                    {item.icon}
                  </span>
                </span>
                <span className={isActive ? 'font-semibold' : ''}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Back Button */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onBack}
            className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <span className="w-8 h-8 rounded-md flex items-center justify-center bg-red-50 dark:bg-red-900/20">
              <ArrowLeft className="w-[18px] h-[18px]" />
            </span>
            Sair do Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark lg:border-0 lg:bg-transparent">
          <div className="flex items-center justify-between p-4 lg:p-0 lg:absolute lg:top-8 lg:right-8 lg:left-auto">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="material-icons-round text-gray-700 dark:text-gray-300">
                {isMobileSidebarOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Admin Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full hidden lg:block">
                ⚙ Painel Administrativo
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Fernando Inacio da Costa</span>
                <img
                  src="https://picsum.photos/seed/admin/44/44"
                  alt="Avatar"
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
