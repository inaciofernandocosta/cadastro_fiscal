
import React from 'react';
import { ImportJob } from '../types';

const MassImport: React.FC = () => {
  const history: ImportJob[] = [
    { id: '1', fileName: 'lote_outubro_2023_v2.xlsx', totalSkus: 1240, date: '24 Out 2023, 10:45', progress: 45, status: 'Processing', statusText: 'Validando NCMs... (45%)' },
    { id: '2', fileName: 'fornecedor_abc_update.xlsx', totalSkus: 856, date: '23 Out 2023, 14:20', progress: 100, status: 'Synced' },
    { id: '3', fileName: 'estoque_reposicao_q4.csv', totalSkus: 5000, date: '23 Out 2023, 09:15', progress: 0, status: 'Queued' },
    { id: '4', fileName: 'novos_produtos_erro.xlsx', totalSkus: 42, date: '22 Out 2023, 18:30', progress: 0, status: 'Error', statusText: 'Falha na estrutura' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Importação em Massa</h1>
        <p className="text-label-light dark:text-label-dark mt-1">Centro de Comando para upload e processamento de SKUs.</p>
      </header>

      <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden p-8">
        <div className="w-full flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all cursor-pointer group bg-background-light/50 dark:bg-background-dark/50">
          <div className="space-y-2 text-center">
            <div className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-4xl">folder_open</span>
            </div>
            <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
              <label className="relative cursor-pointer rounded-md font-medium text-primary dark:text-secondary hover:underline">
                <span>Faça upload do arquivo</span>
                <input className="sr-only" type="file" />
              </label>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs text-gray-500">XLSX, CSV até 50MB</p>
          </div>
        </div>
      </section>

      <section className="bg-card-light dark:bg-card-dark rounded-3xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">toc</span> HISTÓRICO DE PROCESSAMENTO
          </h2>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Online
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-label-light dark:text-label-dark uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Arquivo</th>
                <th className="px-6 py-4">SKUs</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Progresso</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark text-sm">
              {history.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-500">description</span>
                    {job.fileName}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{job.totalSkus}</td>
                  <td className="px-6 py-4 text-gray-500">{job.date}</td>
                  <td className="px-6 py-4 min-w-[200px]">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-500 ${job.status === 'Synced' ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${job.progress}%` }}></div>
                    </div>
                    {job.statusText && <span className={`text-[10px] mt-1 block ${job.status === 'Error' ? 'text-red-500' : 'text-blue-500'}`}>{job.statusText}</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.status === 'Synced' ? 'bg-green-100 text-green-800' : 
                      job.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                      job.status === 'Queued' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MassImport;
