
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProductFormComplete from './components/ProductFormComplete';
import ChatInterface from './components/ChatInterface';
import MassImportNew from './components/MassImportNew';
import Documentation from './components/Documentation';
import AdminSuppliers from './components/AdminSuppliers';
import MyProducts from './components/MyProducts';
import Suppliers from './components/Suppliers';
import ItemTracking from './components/ItemTracking';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.NEW_PRODUCT);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Fecha menu ao trocar de página
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.NEW_PRODUCT:
        return <ProductFormComplete />;
      case AppView.IMPORT:
        return <MassImportNew />;
      case AppView.PRODUCTS:
        return <MyProducts />;
      case AppView.SUPPLIERS:
        return <Suppliers />;
      case AppView.TRACKING:
        return <ItemTracking />;
      case AppView.CHATS:
        return <ChatInterface />;
      case AppView.DOCUMENTATION:
        return <Documentation />;
      case AppView.ADMIN_SUPPLIERS:
        return <AdminSuppliers />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400 italic">
            Esta tela ({currentView}) ainda está em desenvolvimento.
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Overlay para mobile quando menu está aberto */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        currentView={currentView} 
        setView={handleViewChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
        {/* Top Bar Mobile + Actions */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark lg:bg-transparent lg:border-0 lg:absolute lg:top-8 lg:right-8">
          <div className="flex items-center justify-between p-4 lg:p-0">
            {/* Hamburger Menu - Apenas Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="sidebar"
            >
              <span className="material-icons-round text-gray-700 dark:text-gray-300" aria-hidden="true">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Logo Mobile */}
            <div className="lg:hidden">
              <img 
                src="https://vilanova.vtexassets.com/assets/vtex.file-manager-graphql/images/b928f573-7541-4334-8598-7196fdf496f7___ca39149a8a839cec81aab37b42cd56ca.png"
                alt="Vilanova"
                className="h-8"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-card-dark shadow-sm hover:scale-110 transition-transform"
              aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              <span className="material-icons-round text-slate-600 dark:text-slate-300" aria-hidden="true">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>

        {/* Global Footer Actions for Forms */}
        {currentView === AppView.NEW_PRODUCT && (
          <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-border-light dark:border-border-dark z-20">
            <div className="flex flex-col sm:flex-row justify-end gap-3 max-w-[1800px] mx-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200 font-bold uppercase tracking-wider text-sm shadow-sm transition-colors">
                Resetar
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-dark text-primary font-bold uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 transition-colors">
                <span className="material-icons-round text-lg" aria-hidden="true">save</span>
                Salvar Cadastro
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
