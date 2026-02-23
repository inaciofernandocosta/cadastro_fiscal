import React from 'react';

type SectionColor =
  | 'supplier'
  | 'product'
  | 'dimensions'
  | 'logistics'
  | 'fiscal'
  | 'mg'
  | 'sp'
  | 'internal'
  | 'image'
  | 'default';

interface SectionCardProps {
  title: string;
  color?: SectionColor;
  children: React.ReactNode;
  badge?: string;
  icon?: string;
  className?: string;
  rounded?: 'xl' | '2xl';
}

const colorMap: Record<SectionColor, {
  header: string;
  title: string;
  border: string;
  dot: string;
}> = {
  supplier: {
    header: 'bg-danger/10 dark:bg-danger/15',
    title: 'text-danger',
    border: 'border-danger/20 dark:border-danger/30',
    dot: 'bg-danger',
  },
  product: {
    header: 'bg-primary/10 dark:bg-primary/20',
    title: 'text-primary dark:text-secondary',
    border: 'border-primary/15 dark:border-primary/30',
    dot: 'bg-primary',
  },
  dimensions: {
    header: 'bg-secondary/10 dark:bg-secondary/15',
    title: 'text-primary dark:text-secondary',
    border: 'border-secondary/30 dark:border-secondary/20',
    dot: 'bg-secondary',
  },
  logistics: {
    header: 'bg-orange-50 dark:bg-orange-900/20',
    title: 'text-section-logistics dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800/50',
    dot: 'bg-section-logistics',
  },
  fiscal: {
    header: 'bg-secondary/10 dark:bg-secondary/15',
    title: 'text-primary dark:text-secondary',
    border: 'border-secondary/30 dark:border-secondary/20',
    dot: 'bg-section-fiscal',
  },
  mg: {
    header: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'text-section-mg dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800/50',
    dot: 'bg-section-mg',
  },
  sp: {
    header: 'bg-primary/10 dark:bg-primary/20',
    title: 'text-section-sp dark:text-secondary',
    border: 'border-primary/20 dark:border-primary/30',
    dot: 'bg-section-sp',
  },
  internal: {
    header: 'bg-purple-50 dark:bg-purple-900/20',
    title: 'text-section-internal dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800/50',
    dot: 'bg-section-internal',
  },
  image: {
    header: 'bg-gray-50 dark:bg-gray-800/50',
    title: 'text-gray-700 dark:text-gray-200',
    border: 'border-border-light dark:border-border-dark',
    dot: 'bg-gray-400',
  },
  default: {
    header: 'bg-gray-50 dark:bg-gray-800/30',
    title: 'text-gray-700 dark:text-gray-200',
    border: 'border-border-light dark:border-border-dark',
    dot: 'bg-gray-400',
  },
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  color = 'default',
  children,
  badge,
  icon,
  className = '',
  rounded = 'xl',
}) => {
  const c = colorMap[color];
  const roundedClass = rounded === '2xl' ? 'rounded-2xl' : 'rounded-xl';

  return (
    <section
      className={`
        bg-card-light dark:bg-card-dark
        ${roundedClass}
        shadow-sm
        border ${c.border}
        overflow-hidden
        animate-fade-in-up
        ${className}
      `}
    >
      {/* Header */}
      <div className={`px-4 py-3 ${c.header} border-b border-inherit flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          {/* Color dot indicator */}
          <span className={`w-1.5 h-4 rounded-full ${c.dot} opacity-80 flex-shrink-0`} aria-hidden="true" />
          <h2 className={`text-xs font-bold ${c.title} uppercase tracking-wider`}>
            {icon && (
              <span className="material-icons-round text-sm mr-1.5 align-middle">{icon}</span>
            )}
            {title}
          </h2>
        </div>
        {badge && (
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{badge}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </section>
  );
};

export default SectionCard;
