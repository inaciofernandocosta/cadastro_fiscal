
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.NEW_PRODUCT, label: 'Novo Produto', icon: 'add_circle' },
    { id: AppView.IMPORT, label: 'Importação', icon: 'cloud_upload' },
    { id: AppView.PRODUCTS, label: 'Meus Produtos', icon: 'inventory_2' },
    { id: AppView.SUPPLIERS, label: 'Fornecedores', icon: 'local_shipping' },
    { id: AppView.REPORTS, label: 'Relatórios Fiscais', icon: 'assessment' },
    { id: AppView.CHATS, label: 'Fiscal Mentor', icon: 'smart_toy' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-primary text-white flex flex-col justify-between shrink-0 h-full transition-all duration-300 z-20 shadow-xl">
      <div>
        <div className="h-24 flex items-center justify-center lg:justify-start lg:px-8 border-b border-cyan-800/50">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center shadow-lg text-primary font-bold text-xl">
            H
          </div>
          <span className="ml-3 font-bold text-lg hidden lg:block tracking-wide">Hub B2B</span>
        </div>
        
        <nav className="mt-8 space-y-2 px-2 lg:px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 rounded-xl transition-all group ${
                currentView === item.id 
                  ? 'bg-cyan-800/50 text-white shadow-sm' 
                  : 'hover:bg-cyan-800/30 text-cyan-100'
              }`}
            >
              <span className="material-icons-round text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="ml-3 font-medium hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-cyan-800/50">
        <div className="flex items-center justify-center lg:justify-start space-x-3 p-2 rounded-xl hover:bg-cyan-800/30 cursor-pointer transition-colors">
          <img 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full border-2 border-cyan-500" 
            src="https://picsum.photos/seed/admin/40/40" 
          />
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-semibold truncate">Administrador</p>
            <p className="text-xs text-cyan-200 truncate">admin@hubb2b.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
