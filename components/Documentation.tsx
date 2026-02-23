
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-20">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Documentação do Sistema</h1>
        <p className="text-label-light dark:text-label-dark text-lg">Fluxo completo de cadastro e atualização de produtos</p>
      </header>

      {/* Visão Geral */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-4 flex items-center gap-2">
          <span className="material-icons-round">info</span>
          Visão Geral
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          O <strong>Hub de Produto Vilanova</strong> é uma plataforma completa para gestão de cadastro de produtos que integra fornecedores, 
          compradores e equipe fiscal em um fluxo automatizado e eficiente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Para Fornecedores</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Cadastro individual ou em massa</li>
              <li>• Atualização de produtos existentes</li>
              <li>• Acompanhamento de aprovações</li>
              <li>• Gestão de produtos cadastrados</li>
            </ul>
          </div>
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
            <h3 className="font-bold text-primary dark:text-secondary mb-2">Para Compradores</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Aprovação de produtos</li>
              <li>• Gestão de fornecedores</li>
              <li>• Controle de limites de cadastro</li>
              <li>• Tracking de fluxo de aprovação</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Módulos do Sistema */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6 flex items-center gap-2">
          <span className="material-icons-round">apps</span>
          Módulos do Sistema
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-border-light dark:border-border-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary">add_circle</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Novo Produto</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Cadastro individual com integração GS1 e Legisweb</p>
          </div>

          <div className="border border-border-light dark:border-border-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary">cloud_upload</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Importação em Massa</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upload de lotes com análise prévia</p>
          </div>

          <div className="border border-border-light dark:border-border-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary">inventory_2</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Meus Produtos</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Visualização e gestão de produtos cadastrados</p>
          </div>

          <div className="border border-border-light dark:border-border-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary">local_shipping</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Fornecedores</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lista completa de fornecedores cadastrados</p>
          </div>

          <div className="border border-border-light dark:border-border-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary">admin_panel_settings</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Admin Fornecedores</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Gestão de limites de cadastro por fornecedor</p>
          </div>

          <div className="border border-border-light dark:border-border-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons-round text-primary">track_changes</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Tracking de Itens</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Acompanhamento do fluxo de aprovação</p>
          </div>
        </div>
      </section>

      {/* Fluxograma Visual */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6 flex items-center gap-2">
          <span className="material-icons-round">account_tree</span>
          Fluxograma do Processo
        </h2>
        
        <div className="space-y-4">
          {/* Etapa 1 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-lg">storefront</span>
                Código do Fornecedor
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                O fornecedor digita o <strong>código interno do fornecedor</strong>.
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400">
                <span className="material-icons-round text-sm">api</span>
                <span className="font-semibold">Consulta ERP → Retorna Razão Social</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="material-icons-round text-gray-400 text-3xl">arrow_downward</span>
          </div>

          {/* Etapa 2 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div className="flex-1 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
              <h3 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-lg">qr_code_scanner</span>
                Código EAN
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                O fornecedor informa o <strong>código EAN</strong> do produto.
              </p>
              <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-400">
                <span className="material-icons-round text-sm">api</span>
                <span className="font-semibold">Consulta ERP → Verifica se produto existe</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="material-icons-round text-gray-400 text-3xl">arrow_downward</span>
          </div>

          {/* Decisão: Produto Existe? */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4">
            <h3 className="font-bold text-yellow-900 dark:text-yellow-300 mb-3 flex items-center gap-2">
              <span className="material-icons-round text-lg">help</span>
              Produto já cadastrado no ERP?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SIM - Produto Existe */}
              <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons-round text-primary dark:text-secondary">check_circle</span>
                  <h4 className="font-bold text-primary dark:text-secondary">SIM - Produto Existe</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Sistema preenche todos os dados do produto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Fornecedor valida as informações</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Se OK → clica em Cancela que nada acontece</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Se precisa atualizar → Clica no ícone <strong>"Modo Atualização"</strong></span>
                  </li>
                </ul>
              </div>

              {/* NÃO - Produto Novo */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons-round text-purple-600 dark:text-purple-400">add_circle</span>
                  <h4 className="font-bold text-purple-900 dark:text-purple-300">NÃO - Produto Novo</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span><strong>API GS1</strong> é acionada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Preenche dados do produto (EAN, descrição, dimensões, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Com o <strong>NCM</strong> obtido, aciona <strong>API Legisweb</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-icons-round text-xs mt-0.5">arrow_right</span>
                    <span>Complementa dados fiscais (CEST, IPI, ICMS, etc.)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="material-icons-round text-gray-400 text-3xl">arrow_downward</span>
          </div>

          {/* Etapa 3 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div className="flex-1 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-lg p-4">
              <h3 className="font-bold text-primary dark:text-secondary mb-2 flex items-center gap-2">
                <span className="material-icons-round text-lg">save</span>
                Salvar Cadastro
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Fornecedor revisa todos os dados e clica em <strong>"Salvar Cadastro"</strong>.
              </p>
              <div className="flex items-center gap-2 text-xs text-primary dark:text-secondary">
                <span className="material-icons-round text-sm">check</span>
                <span className="font-semibold">Dados salvos no sistema</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="material-icons-round text-gray-400 text-3xl">arrow_downward</span>
          </div>

          {/* Etapa 4 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-lg">task</span>
                Atividade para o Comprador
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Sistema cria uma <strong>atividade</strong> para o comprador.
              </p>
              <ul className="space-y-1 text-xs text-purple-700 dark:text-purple-400">
                <li className="flex items-center gap-2">
                  <span className="material-icons-round text-sm">arrow_right</span>
                  <span>Comprador faz complemento de informações</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-icons-round text-sm">arrow_right</span>
                  <span>Comprador aprova ou solicita correções</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detalhamento das Etapas */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6 flex items-center gap-2">
          <span className="material-icons-round">description</span>
          Detalhamento das Etapas
        </h2>

        <div className="space-y-6">
          {/* Etapa 1 Detalhada */}
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">1. Identificação do Fornecedor</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Ação:</strong> Fornecedor digita o código interno do fornecedor</p>
              <p><strong>Sistema:</strong> Realiza consulta no ERP</p>
              <p><strong>Retorno:</strong> Razão Social do fornecedor</p>
              <p><strong>Validação:</strong> Se código não encontrado, exibe mensagem de erro</p>
            </div>
          </div>

          {/* Etapa 2 Detalhada */}
          <div className="border-l-4 border-secondary pl-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">2. Identificação do Produto (EAN)</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Ação:</strong> Fornecedor informa o código EAN/GTIN</p>
              <p><strong>Sistema:</strong> Consulta ERP para verificar se produto já existe</p>
              <p><strong>Cenário A - Produto Existe:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Carrega todos os dados do produto</li>
                <li>Exibe badge "Modo Atualização"</li>
                <li>Fornecedor pode validar e salvar ou atualizar informações</li>
              </ul>
              <p><strong>Cenário B - Produto Novo:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Aciona API GS1 para buscar dados do produto</li>
                <li>Preenche: EAN, DUN, Descrição, Dimensões, Peso, Imagem, NCM</li>
                <li>Com NCM obtido, aciona API Legisweb</li>
                <li>Complementa: CEST, IPI, ICMS, Origem, dados fiscais</li>
              </ul>
            </div>
          </div>

          {/* Etapa 3 Detalhada */}
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">3. Revisão e Salvamento</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Ação:</strong> Fornecedor revisa todos os campos preenchidos</p>
              <p><strong>Campos Editáveis:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Dados do Produto Fornecedor</li>
                <li>Tipo de Embalagem e Quantidade</li>
                <li>Dimensões do Produto e Caixa</li>
                <li>Dados Logísticos Pallet</li>
                <li>Upload de até 5 imagens</li>
              </ul>
              <p><strong>Sistema:</strong> Valida campos obrigatórios antes de salvar</p>
              <p><strong>Ação Final:</strong> Clique em "Salvar Cadastro"</p>
            </div>
          </div>

          {/* Etapa 4 Detalhada */}
          <div className="border-l-4 border-purple-600 pl-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">4. Aprovação do Comprador</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Sistema:</strong> Cria atividade para o comprador responsável</p>
              <p><strong>Comprador:</strong> Acessa seção "Preenchimento Interno"</p>
              <p><strong>Ações do Comprador:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Seleciona empresa(s) para cadastro (Atacado MG, Atacado SP, Focomix SP, Focomix MG, V2 804)</li>
                <li>Preenche Descrição Família e Complemento</li>
                <li>Define Classificação A-B-C</li>
                <li>Indica Produto Similar (se houver)</li>
                <li>Configura Embalagem Fracionada</li>
                <li>Define se deve Incluir na Família</li>
              </ul>
              <p><strong>Resultado:</strong> Aprovação ou solicitação de correções ao fornecedor</p>
            </div>
          </div>
        </div>
      </section>

      {/* APIs Integradas */}
      <section className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
        <h2 className="text-xl font-bold text-primary dark:text-secondary mb-6 flex items-center gap-2">
          <span className="material-icons-round">cloud</span>
          APIs Integradas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ERP */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons-round text-blue-600 dark:text-blue-400 text-2xl">storage</span>
              <h3 className="font-bold text-blue-900 dark:text-blue-300">ERP Interno</h3>
            </div>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Consulta Fornecedor</li>
              <li>• Verifica Produto Existente</li>
              <li>• Retorna Dados Cadastrados</li>
            </ul>
          </div>

          {/* GS1 */}
          <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons-round text-primary dark:text-secondary text-2xl">verified</span>
              <h3 className="font-bold text-primary dark:text-secondary">GS1 Verified</h3>
            </div>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Dados do Produto por EAN</li>
              <li>• Descrição Comercial</li>
              <li>• Dimensões e Peso</li>
              <li>• Imagem do Produto</li>
            </ul>
          </div>

          {/* Legisweb */}
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons-round text-orange-600 dark:text-orange-400 text-2xl">gavel</span>
              <h3 className="font-bold text-orange-900 dark:text-orange-300">Legisweb</h3>
            </div>
            <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
              <li>• Consulta Fiscal por NCM</li>
              <li>• CEST</li>
              <li>• IPI, ICMS</li>
              <li>• Dados Tributários</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Observações Importantes */}
      <section className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h2 className="text-lg font-bold text-yellow-900 dark:text-yellow-300 mb-4 flex items-center gap-2">
          <span className="material-icons-round">warning</span>
          Observações Importantes
        </h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-yellow-600 text-sm mt-0.5">arrow_right</span>
            <span>O fluxo é o mesmo para <strong>cadastro de novos produtos</strong> e <strong>atualização de produtos existentes</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-yellow-600 text-sm mt-0.5">arrow_right</span>
            <span>Quando um produto existe, o badge <strong>"Modo Atualização"</strong> é exibido automaticamente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-yellow-600 text-sm mt-0.5">arrow_right</span>
            <span>Fornecedor pode adicionar até <strong>5 imagens</strong> do produto</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-yellow-600 text-sm mt-0.5">arrow_right</span>
            <span>Comprador pode selecionar <strong>múltiplas empresas</strong> para cadastro simultâneo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-icons-round text-yellow-600 text-sm mt-0.5">arrow_right</span>
            <span>Todas as consultas de API são <strong>automáticas</strong> e transparentes para o usuário</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Documentation;
