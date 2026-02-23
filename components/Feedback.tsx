import React, { useEffect, useMemo, useState } from 'react';
import {
  MessageSquare,
  Bug,
  CreditCard,
  Database,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Send,
  Paperclip,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  LifeBuoy,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';
import {
  FeedbackCategory,
  FeedbackCategoryConfig,
  FeedbackFormData,
  UserFeedback,
  FeedbackStatus
} from '../types';
import { supabase, getCurrentUser } from '../services/supabaseClient';

type ViewState = 'menu' | 'form' | 'success' | 'myFeedbacks';

type FeedbackCardConfig = FeedbackCategoryConfig & {
  description: string;
  context: string;
  highlight?: string;
};

const CATEGORY_CONFIGS: FeedbackCardConfig[] = [
  {
    id: 'sugestao_melhoria',
    label: 'Sugestão de Melhoria no Cadastro',
    icon: 'Sparkles',
    color: 'from-[#12B4AD] to-[#008F88]',
    defaultSubject: 'Sugestão de melhoria no cadastro: ',
    description: 'Ideias para simplificar etapas, campos e validações do cadastro de produtos.',
    context: 'Fluxo, usabilidade e produtividade do time.'
  },
  {
    id: 'bug_report',
    label: 'Erro no Cadastro de Produto',
    icon: 'Bug',
    color: 'from-[#00A79D] to-[#007872]',
    defaultSubject: 'Erro no cadastro: ',
    description: 'Falhas ao salvar, travamento de tela, campos quebrados ou validações incorretas.',
    context: 'Tela de cadastro, validações, botões, imagens e anexos.',
    highlight: 'Mais comum'
  },
  {
    id: 'assinatura',
    label: 'Acesso e Assinatura',
    icon: 'CreditCard',
    color: 'from-[#0EA6A0] to-[#0B7E78]',
    defaultSubject: 'Assinatura/acesso: ',
    description: 'Problemas de plano, bloqueio de funcionalidades ou limitações inesperadas.',
    context: 'Permissões, acesso à conta e recursos contratados.'
  },
  {
    id: 'dados_desaparecidos',
    label: 'Dados do Produto Sumiram',
    icon: 'Database',
    color: 'from-[#19B7B0] to-[#0F8A84]',
    defaultSubject: 'Dados desaparecidos no cadastro: ',
    description: 'Campos apagados, informações não persistidas ou cadastros que desapareceram.',
    context: 'SKU, EAN, tributação, embalagem e histórico.'
  },
  {
    id: 'sincronizacao',
    label: 'Sincronização de Cadastro',
    icon: 'RefreshCw',
    color: 'from-[#0FA8A1] to-[#0B7C76]',
    defaultSubject: 'Sincronização do cadastro: ',
    description: 'Diferença de dados entre telas, atraso de atualização ou integração inconsistente.',
    context: 'Atualização entre módulos e refletir dados na base.'
  },
  {
    id: 'outros_bugs',
    label: 'Outros Problemas Técnicos',
    icon: 'AlertTriangle',
    color: 'from-[#0D93A7] to-[#0A6F83]',
    defaultSubject: 'Problema técnico: ',
    description: 'Erros gerais do sistema não cobertos pelas categorias principais.',
    context: 'Performance, layout, permissões ou comportamento inesperado.'
  },
  {
    id: 'outro',
    label: 'Outro Assunto',
    icon: 'HelpCircle',
    color: 'from-[#6FB7B3] to-[#4C9994]',
    defaultSubject: '',
    description: 'Solicitações gerais e dúvidas operacionais sobre o uso do sistema.',
    context: 'Orientação funcional, processo e boas práticas.'
  }
];

const ICON_MAP: { [key: string]: React.FC<{ className?: string }> } = {
  Sparkles,
  Bug,
  CreditCard,
  Database,
  RefreshCw,
  AlertTriangle,
  HelpCircle,
  MessageSquare
};

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; color: string; icon: React.FC<{ className?: string }> }> = {
  pending: { label: 'Pendente', color: 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-900/30', icon: Clock },
  in_progress: { label: 'Em Análise', color: 'text-sky-700 bg-sky-50 dark:text-sky-300 dark:bg-sky-900/30', icon: RefreshCw },
  awaiting_user: { label: 'Aguardando Resposta', color: 'text-orange-700 bg-orange-50 dark:text-orange-300 dark:bg-orange-900/30', icon: AlertCircle },
  resolved: { label: 'Resolvido', color: 'text-primary bg-primary/10 dark:text-secondary dark:bg-primary/20', icon: CheckCircle2 },
  closed: { label: 'Fechado', color: 'text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-700/50', icon: X }
};

const CATEGORY_TIPS: Record<FeedbackCategory, string[]> = {
  sugestao_melhoria: [
    'Explique qual etapa do cadastro está lenta ou confusa.',
    'Descreva o ganho esperado para o time de cadastro.',
    'Se possível, envie proposta de fluxo ideal.'
  ],
  bug_report: [
    'Informe em qual etapa do cadastro o erro acontece.',
    'Inclua SKU/EAN de teste e mensagem exibida na tela.',
    'Anexe print ou vídeo curto para agilizar o diagnóstico.'
  ],
  assinatura: [
    'Descreva qual funcionalidade deveria estar disponível.',
    'Informe o perfil/usuário impactado.',
    'Se houver mensagem de bloqueio, copie no chamado.'
  ],
  dados_desaparecidos: [
    'Liste quais campos desapareceram (ex.: NCM, CEST, GTIN).',
    'Informe data/hora aproximada da última edição.',
    'Se possível, cite o produto/ID impactado.'
  ],
  sincronizacao: [
    'Explique entre quais telas/módulos a diferença ocorre.',
    'Informe o intervalo de tempo até refletir a atualização.',
    'Anexe exemplo antes/depois para validação rápida.'
  ],
  nova_versao: [
    'Descreva o que mudou após atualização.',
    'Informe se o comportamento anterior era esperado.',
    'Compartilhe prints comparando antes e depois.'
  ],
  outros_bugs: [
    'Detalhe o comportamento esperado vs. atual.',
    'Inclua ambiente e horário em que ocorreu.',
    'Anexe evidências para reduzir tempo de análise.'
  ],
  outro: [
    'Descreva sua solicitação da forma mais objetiva possível.',
    'Informe contexto de uso para entendermos o cenário.',
    'Se houver impacto no cadastro, explique qual.'
  ]
};

const Feedback: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('menu');
  const [selectedCategory, setSelectedCategory] = useState<FeedbackCategory | null>(null);
  const [formData, setFormData] = useState<FeedbackFormData>({
    category: 'sugestao_melhoria',
    subject: '',
    description: '',
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [myFeedbacks, setMyFeedbacks] = useState<UserFeedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<UserFeedback | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const stats = useMemo(() => {
    const openStatuses: FeedbackStatus[] = ['pending', 'in_progress', 'awaiting_user'];
    const open = myFeedbacks.filter((feedback) => openStatuses.includes(feedback.status)).length;
    const resolved = myFeedbacks.filter((feedback) => ['resolved', 'closed'].includes(feedback.status)).length;

    return {
      total: myFeedbacks.length,
      open,
      resolved
    };
  }, [myFeedbacks]);

  const selectedCategoryTips = useMemo(() => {
    if (!selectedCategory) return CATEGORY_TIPS.sugestao_melhoria;
    return CATEGORY_TIPS[selectedCategory] || CATEGORY_TIPS.outro;
  }, [selectedCategory]);

  const getCategoryConfig = (category: FeedbackCategory) =>
    CATEGORY_CONFIGS.find((config) => config.id === category);

  useEffect(() => {
    loadMyFeedbacks();
  }, []);

  const loadMyFeedbacks = async () => {
    try {
      if (!supabase) return;

      const user = await getCurrentUser();
      if (!user) return;

      const { data, error } = await (supabase as any)
        .from('user_feedback')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setMyFeedbacks((data as UserFeedback[]) || []);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }
  };

  const handleCategorySelect = (category: FeedbackCategory) => {
    const config = CATEGORY_CONFIGS.find(c => c.id === category);
    setSelectedCategory(category);
    setFormData({
      category,
      subject: config?.defaultSubject || '',
      description: ''
    });
    setViewState('form');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validação de tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Arquivo muito grande! O tamanho máximo é 5MB.');
        return;
      }
      setAttachment(file);
    }
  };

  const uploadAttachment = async (file: File, userId: string): Promise<string | null> => {
    try {
      if (!supabase) return null;

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('feedback-attachments')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('feedback-attachments')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await getCurrentUser();
      if (!user) {
        alert('Você precisa estar logado para enviar feedback.');
        return;
      }

      if (!supabase) {
        alert('Integração de suporte indisponível no momento.');
        return;
      }

      // Upload do anexo se existir
      let attachmentUrl: string | null = null;
      if (attachment) {
        attachmentUrl = await uploadAttachment(attachment, user.id);
      }

      // Criar feedback no banco
      const feedbackData = {
        user_id: user.id,
        user_email: user.email || '',
        user_name: user.user_metadata?.name || user.email || 'Usuário',
        category: formData.category,
        subject: formData.subject,
        description: formData.description,
        status: 'pending' as FeedbackStatus,
        attachment_url: attachmentUrl,
        thread_messages: []
      };

      const { error } = await (supabase as any)
        .from('user_feedback')
        .insert([feedbackData])
        .select()
        .single();

      if (error) throw error;

      // Resetar formulário
      setFormData({
        category: 'sugestao_melhoria',
        subject: '',
        description: ''
      });
      setAttachment(null);
      setViewState('success');

      // Recarregar lista
      loadMyFeedbacks();

    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Erro ao enviar feedback. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!selectedFeedback || !replyMessage.trim()) return;

    try {
      if (!supabase) {
        alert('Integração de suporte indisponível no momento.');
        return;
      }

      const user = await getCurrentUser();
      if (!user) return;

      const newMessage = {
        id: Date.now().toString(),
        from: 'user' as const,
        content: replyMessage,
        timestamp: new Date().toISOString(),
        author_name: user.user_metadata?.name || user.email || 'Você'
      };

      const updatedMessages = [...selectedFeedback.thread_messages, newMessage];

      const { error } = await (supabase as any)
        .from('user_feedback')
        .update({
          thread_messages: updatedMessages,
          last_message_at: new Date().toISOString(),
          last_message_from: 'user',
          status: 'in_progress'
        })
        .eq('id', selectedFeedback.id);

      if (error) throw error;

      setSelectedFeedback({
        ...selectedFeedback,
        thread_messages: updatedMessages,
        last_message_from: 'user',
        status: 'in_progress'
      });

      setReplyMessage('');
      loadMyFeedbacks();

    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Erro ao enviar resposta.');
    }
  };

  const renderMenu = () => (
    <div className="space-y-6 lg:space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary-light p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -top-16 right-0 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              <LifeBuoy className="h-4 w-4" />
              Central de suporte do Cadastro de Produtos
            </p>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
              Suporte & Feedback
            </h2>
            <p className="mt-3 text-sm text-cyan-50 md:text-base">
              Abra chamados com contexto do cadastro (SKU, validação, sincronização e performance) para acelerar a resolução.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <button
              onClick={() => handleCategorySelect('bug_report')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-primary shadow-lg shadow-primary-dark/20 transition-all hover:scale-[1.01]"
            >
              <Bug className="h-4 w-4" />
              Reportar problema
            </button>
            <button
              onClick={() => setViewState('myFeedbacks')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <ClipboardList className="h-4 w-4" />
              Meus chamados
            </button>
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-cyan-50/90">Total de chamados</p>
            <p className="mt-1 text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-cyan-50/90">Em aberto</p>
            <p className="mt-1 text-2xl font-bold">{stats.open}</p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wide text-cyan-50/90">Resolvidos</p>
            <p className="mt-1 text-2xl font-bold">{stats.resolved}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Escolha o tipo de atendimento</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Selecione a categoria mais próxima do seu problema no fluxo de cadastro de produtos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {CATEGORY_CONFIGS.filter((config) => config.id !== 'assinatura').map((config) => {
            const Icon = ICON_MAP[config.icon];

            return (
              <button
                key={config.id}
                onClick={() => handleCategorySelect(config.id)}
                className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:border-slate-700 dark:bg-card-dark"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color} shadow-md`}>
                      {Icon && <Icon className="h-7 w-7 text-white" />}
                    </span>
                    {config.highlight && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary dark:bg-primary/25 dark:text-secondary">
                        {config.highlight}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-semibold text-gray-800 dark:text-white">{config.label}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{config.description}</p>

                  <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {config.context}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-primary dark:text-cyan-300">
                    <span>Abrir chamado</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {myFeedbacks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Chamados recentes</h3>
            <button
              onClick={() => setViewState('myFeedbacks')}
              className="text-sm font-semibold text-primary hover:text-primary-dark dark:text-cyan-300"
            >
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {myFeedbacks.slice(0, 4).map((feedback) => {
              const statusInfo = STATUS_CONFIG[feedback.status];
              const StatusIcon = statusInfo.icon;
              const categoryConfig = getCategoryConfig(feedback.category);

              return (
                <button
                  key={feedback.id}
                  onClick={() => setSelectedFeedback(feedback)}
                  className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-primary/40 dark:border-slate-700 dark:bg-card-dark"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-semibold text-gray-800 dark:text-white">{feedback.subject}</h4>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">{categoryConfig?.label || 'Categoria não encontrada'}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium ${statusInfo.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{feedback.description}</p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Atualizado em {new Date(feedback.updated_at).toLocaleString('pt-BR')}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );

  const renderForm = () => {
    const config = CATEGORY_CONFIGS.find(c => c.id === selectedCategory);
    const Icon = config ? ICON_MAP[config.icon] : MessageSquare;

    return (
      <div className="space-y-4">
        <button
          onClick={() => setViewState('menu')}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <span className="material-icons-round text-base">arrow_back</span>
          Voltar para categorias
        </button>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-card-dark md:p-6 xl:col-span-9">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${config?.color} shadow-md`}>
                {Icon && <Icon className="h-7 w-7 text-white" />}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{config?.label}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Envie contexto completo do problema para reduzir o tempo de análise do suporte.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assunto *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Ex.: Erro ao salvar NCM na etapa fiscal"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={9}
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Descreva passo a passo: o que tentou fazer, em qual tela, qual era o resultado esperado e qual erro ocorreu..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Anexo (opcional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="attachment"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.txt,.log"
                    className="hidden"
                  />
                  <label
                    htmlFor="attachment"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 transition-colors hover:border-primary dark:border-gray-600 dark:hover:border-primary"
                  >
                    <Paperclip className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {attachment ? attachment.name : 'Clique para anexar (print, PDF, LOG) — até 5MB'}
                    </span>
                  </label>
                  {attachment && (
                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setViewState('menu')}
                  className="w-full rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-primary-dark hover:to-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar chamado
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-4 xl:col-span-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-card-dark">
              <h4 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white">
                <ShieldCheck className="h-4 w-4 text-primary dark:text-cyan-300" />
                Dicas para acelerar o suporte
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {selectedCategoryTips.map((tip) => (
                  <li key={tip} className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-card-dark">
              <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-white">Antes de enviar</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quanto mais contexto do cadastro de produto você informar, mais rápido o time consegue reproduzir e corrigir.
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white dark:bg-card-dark rounded-2xl shadow-lg p-8 md:p-12">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Feedback Enviado!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Recebemos sua mensagem e nossa equipe irá analisar em breve.
          Você pode acompanhar o status na seção "Meus Envios".
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setViewState('menu')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold shadow-lg transition-all"
          >
            Voltar ao Menu
          </button>
          <button
            onClick={() => {
              setViewState('menu');
              setTimeout(() => handleCategorySelect(formData.category), 100);
            }}
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-colors"
          >
            Enviar Outro
          </button>
        </div>
      </div>
    </div>
  );

  const renderMyFeedbacks = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Meus chamados</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Acompanhe o andamento das solicitações relacionadas ao cadastro de produtos.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewState('menu')}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-card-dark dark:text-gray-200 dark:hover:bg-slate-800"
          >
            Voltar
          </button>
          <button
            onClick={loadMyFeedbacks}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        </div>
      </div>

      {myFeedbacks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-card-dark">
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-gray-400" />
          <p className="text-base font-semibold text-gray-800 dark:text-white">Você ainda não abriu chamados</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Quando abrir, eles aparecerão aqui para acompanhamento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {myFeedbacks.map((feedback) => {
            const statusInfo = STATUS_CONFIG[feedback.status];
            const StatusIcon = statusInfo.icon;
            const categoryConfig = getCategoryConfig(feedback.category);

            return (
              <button
                key={feedback.id}
                onClick={() => setSelectedFeedback(feedback)}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-slate-700 dark:bg-card-dark"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium ${statusInfo.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {statusInfo.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(feedback.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <h4 className="line-clamp-2 font-semibold text-gray-800 dark:text-white">{feedback.subject}</h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{categoryConfig?.label || 'Categoria não encontrada'}</p>
                <p className="mt-3 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{feedback.description}</p>

                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-cyan-300">
                  Abrir detalhes
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderFeedbackDetail = () => {
    if (!selectedFeedback) return null;

    const statusInfo = STATUS_CONFIG[selectedFeedback.status];
    const StatusIcon = statusInfo.icon;
    const config = CATEGORY_CONFIGS.find(c => c.id === selectedFeedback.category);
    const CategoryIcon = config ? ICON_MAP[config.icon] : MessageSquare;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div className="bg-white dark:bg-card-dark w-full md:max-w-3xl md:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col rounded-t-2xl md:rounded-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {CategoryIcon && (
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config?.color} flex items-center justify-center flex-shrink-0`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
                    {selectedFeedback.subject}
                  </h3>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusInfo.color} mt-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedFeedback(null)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Original Message */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                  {selectedFeedback.user_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-sm">
                    {selectedFeedback.user_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(selectedFeedback.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {selectedFeedback.description}
              </p>
              {selectedFeedback.attachment_url && (
                <a
                  href={selectedFeedback.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm"
                >
                  <Paperclip className="w-4 h-4" />
                  Ver anexo
                </a>
              )}
            </div>

            {/* Thread Messages */}
            {selectedFeedback.thread_messages.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                  Conversação
                </h4>
                {selectedFeedback.thread_messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-xl p-4 ${
                      message.from === 'admin'
                        ? 'bg-primary/10 dark:bg-primary/20 ml-4'
                        : 'bg-gray-50 dark:bg-gray-800 mr-4'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                        message.from === 'admin' ? 'bg-primary' : 'bg-gray-600'
                      }`}>
                        {message.from === 'admin' ? 'A' : 'V'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white text-sm">
                          {message.author_name || (message.from === 'admin' ? 'Suporte' : 'Você')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(message.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Awaiting User Notice */}
            {selectedFeedback.status === 'awaiting_user' && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-300 text-sm">
                    Aguardando sua resposta
                  </p>
                  <p className="text-orange-700 dark:text-orange-400 text-sm mt-1">
                    Nossa equipe respondeu sua solicitação. Por favor, responda abaixo.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Reply Form */}
          {selectedFeedback.status !== 'resolved' && selectedFeedback.status !== 'closed' && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Escreva sua resposta..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                />
                <button
                  onClick={handleReply}
                  disabled={!replyMessage.trim()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold shadow-lg flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-[1800px] mx-auto space-y-4 pb-20">
        {viewState === 'menu' && renderMenu()}
        {viewState === 'form' && renderForm()}
        {viewState === 'success' && renderSuccess()}
        {viewState === 'myFeedbacks' && renderMyFeedbacks()}
        {selectedFeedback && renderFeedbackDetail()}
      </div>
    </div>
  );
};

export default Feedback;
