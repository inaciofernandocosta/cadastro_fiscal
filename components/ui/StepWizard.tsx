import React from 'react';

export interface WizardStep {
  id: string;
  label: string;
  icon: string;
  description?: string;
}

interface StepWizardProps {
  steps: WizardStep[];
  currentStep: number;
  completedSteps: number[];
}

const StepWizard: React.FC<StepWizardProps> = ({ steps, currentStep, completedSteps }) => {
  const progressPercent = completedSteps.length === 0
    ? 0
    : completedSteps.length >= steps.length
      ? 100
      : Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-5 animate-fade-in-up">
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-label-light dark:text-label-dark uppercase tracking-wide">
            Progresso do Cadastro
          </span>
          <span className="text-xs font-bold text-primary dark:text-secondary tabular-nums">
            {progressPercent}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso: ${progressPercent}%`}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-stretch gap-0">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;
          const isPending = !isCompleted && !isCurrent;

          return (
            <React.Fragment key={step.id}>
              {/* Step node */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                {/* Circle */}
                <div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300 flex-shrink-0
                    ${isCompleted
                      ? 'bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-200 dark:shadow-emerald-900/40'
                      : isCurrent
                        ? 'bg-primary border-primary shadow-md shadow-primary/30 dark:shadow-primary/20'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }
                  `}
                  aria-label={`Passo ${index + 1}: ${step.label}${isCompleted ? ' (concluído)' : isCurrent ? ' (atual)' : ''}`}
                >
                  {isCompleted ? (
                    <span
                      className="material-icons-round text-white text-lg animate-check-bounce"
                    >
                      check
                    </span>
                  ) : isCurrent ? (
                    <span className="material-icons-round text-white text-lg">
                      {step.icon}
                    </span>
                  ) : (
                    <span className="material-icons-round text-gray-400 dark:text-gray-500 text-lg">
                      {step.icon}
                    </span>
                  )}

                  {/* Pulse ring for current step */}
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" aria-hidden="true" />
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 text-center px-1">
                  <p className={`
                    text-[10px] font-semibold leading-tight uppercase tracking-wide truncate w-full
                    ${isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : isCurrent
                        ? 'text-primary dark:text-secondary'
                        : 'text-gray-400 dark:text-gray-500'
                    }
                  `}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[9px] text-label-light dark:text-label-dark mt-0.5 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="flex-none flex items-start pt-5 w-8 mx-0.5">
                  <div
                    className={`
                      h-0.5 w-full rounded-full transition-all duration-500
                      ${completedSteps.includes(index)
                        ? 'bg-emerald-400'
                        : 'bg-gray-200 dark:bg-gray-700'
                      }
                    `}
                    aria-hidden="true"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepWizard;
