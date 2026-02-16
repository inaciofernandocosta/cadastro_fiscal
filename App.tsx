
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProductForm from './components/ProductForm';
import ChatInterface from './components/ChatInterface';
import MassImport from './components/MassImport';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.NEW_PRODUCT);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.NEW_PRODUCT:
        return <ProductForm />;
      case AppView.IMPORT:
        return <MassImport />;
      case AppView.CHATS:
        return <ChatInterface />;
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
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
        {/* Universal Top Actions */}
        <div className="absolute top-8 right-8 z-50 flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/80 dark:bg-card-dark/80 backdrop-blur shadow-sm hover:scale-110 transition-transform"
          >
            <span className="material-icons-round text-slate-600 dark:text-slate-300">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {renderContent()}
        </div>

        {/* Global Footer Actions for Forms */}
        {currentView === AppView.NEW_PRODUCT && (
          <div className="fixed bottom-0 right-0 left-20 lg:left-64 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-border-light dark:border-border-dark flex justify-end gap-4 z-10 transition-all duration-300">
            <button className="px-8 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200 font-bold uppercase tracking-wider text-sm shadow-sm">
              Resetar
            </button>
            <button className="px-8 py-3 rounded-2xl bg-secondary hover:bg-cyan-300 text-primary font-bold uppercase tracking-wider text-sm shadow-lg flex items-center">
              <span className="material-icons-round mr-2 text-lg">save</span>
              Salvar Cadastro
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
