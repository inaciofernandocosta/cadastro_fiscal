
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const navGroups = [
  {
    label: 'Produtos',
    items: [
      { id: AppView.NEW_PRODUCT,    label: 'Novo Produto',       icon: 'add_box' },
      { id: AppView.IMPORT,         label: 'Importação em Massa', icon: 'upload_file' },
      { id: AppView.PRODUCTS,       label: 'Catálogo',           icon: 'inventory' },
    ],
  },
  {
    label: 'Parceiros',
    items: [
      { id: AppView.SUPPLIERS,       label: 'Fornecedores',       icon: 'business' },
      { id: AppView.ADMIN_SUPPLIERS, label: 'Admin Fornecedores', icon: 'manage_accounts' },
      { id: AppView.TRACKING,        label: 'Tracking de Itens',  icon: 'local_shipping' },
    ],
  },
  {
    label: 'Inteligência',
    items: [
      { id: AppView.CHATS,         label: 'Fiscal Mentor',  icon: 'psychology' },
      { id: AppView.DOCUMENTATION, label: 'Documentação',   icon: 'description' },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setView,
  isMobileMenuOpen = false,
}) => {
  return (
    <aside
      id="sidebar"
      className={`
        fixed lg:static inset-y-0 left-0
        w-64 lg:w-60
        bg-white dark:bg-slate-900
        flex flex-col h-full
        transition-transform duration-300
        z-50
        border-r border-slate-100 dark:border-slate-800
        shadow-[1px_0_8px_rgba(0,0,0,0.06)] dark:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-4 flex flex-col items-start gap-1">
        <img
          src="https://vilanova.vtexassets.com/assets/vtex.file-manager-graphql/images/b928f573-7541-4334-8598-7196fdf496f7___ca39149a8a839cec81aab37b42cd56ca.png"
          alt="Vilanova"
          className="h-7 w-auto object-contain"
        />
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          Hub de Produto
        </span>
      </div>

      <div className="mx-5 h-px bg-slate-100 dark:bg-slate-800" />

      {/* ── Navigation ── */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-3 space-y-5"
        aria-label="Navegação principal"
      >
        {navGroups.map((group) => (
          <div key={group.label}>
            {/* Group label */}
            <p className="px-2 mb-1 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              {group.label}
            </p>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    aria-current={isActive ? 'page' : undefined}
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
                    {/* Icon container */}
                    <span
                      className={`
                        w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0
                        transition-colors duration-150
                        ${isActive
                          ? 'bg-white/15'
                          : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200'
                        }
                      `}
                      aria-hidden="true"
                    >
                      <span
                        className={`material-icons-round text-[18px] ${
                          isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.icon}
                      </span>
                    </span>

                    <span className={isActive ? 'font-semibold' : ''}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User Profile ── */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <button className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
          <div className="relative flex-shrink-0">
            <img
              src="https://picsum.photos/seed/admin/44/44"
              alt="Avatar do usuário"
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white dark:ring-slate-900"
              aria-label="Online"
            />
          </div>
          <div className="overflow-hidden flex-1 text-left">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              Administrador
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
              admin@hubb2b.com
            </p>
          </div>
          <span
            className="material-icons-round text-slate-300 dark:text-slate-600 text-base opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          >
            more_horiz
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
