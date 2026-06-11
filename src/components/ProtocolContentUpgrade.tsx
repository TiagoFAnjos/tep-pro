import { useMemo, useState } from 'react'
import type { Question } from '../types/question'
import { buildTepContentUpgrade, type TepContentSection } from '../utils/tepContentUpgrade'

const toneClasses = {
  neutral: 'border-slate-200 bg-white text-slate-900',
  danger: 'border-red-200 bg-red-50 text-red-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  blue: 'border-blue-200 bg-blue-50 text-blue-900',
  green: 'border-emerald-200 bg-emerald-50 text-emerald-900',
}

export default function ProtocolContentUpgrade({
  protocol,
}: {
  protocol: Question
}) {
  const upgrade = useMemo(() => buildTepContentUpgrade(protocol), [protocol])
  const [activeSectionId, setActiveSectionId] = useState(upgrade.sections[0]?.id || 'visao-geral')
  const activeSection = upgrade.sections.find((section) => section.id === activeSectionId) || upgrade.sections[0]

  return (
    <div className="grid gap-5">
      <section className="rounded-lg border bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              TEP PRO Content Upgrade
            </p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              Revisão estruturada do tema
            </h3>
          </div>

          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
            Camada não destrutiva
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {upgrade.quickReview.map((item) => (
            <div
              key={item.label}
              className={`rounded-lg border p-4 ${toneClasses[item.tone]}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed">
                {item.value || 'Não cadastrado'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-white shadow-sm">
        <div className="flex gap-2 overflow-x-auto border-b p-3">
          {upgrade.sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSectionId(section.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeSection.id === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {activeSection && <StructuredSection section={activeSection} />}
      </section>

      {(upgrade.flashcards.length > 0 || upgrade.questions.length > 0) && (
        <section className="grid gap-5 lg:grid-cols-2">
          {upgrade.flashcards.length > 0 && (
            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Flashcards do tema
              </h3>
              <div className="mt-4 grid gap-3">
                {upgrade.flashcards.slice(0, 6).map((card, index) => (
                  <details key={`${card.pergunta}-${index}`} className="rounded-lg border bg-slate-50 p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      {card.pergunta}
                    </summary>
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                      {card.resposta}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {upgrade.questions.length > 0 && (
            <div className="rounded-lg border bg-white p-5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Questões estilo TEP
              </h3>
              <div className="mt-4 grid gap-3">
                {upgrade.questions.slice(0, 3).map((question, index) => (
                  <details key={`${question.enunciado}-${index}`} className="rounded-lg border bg-slate-50 p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      {question.enunciado || `Questão ${index + 1}`}
                    </summary>

                    <div className="mt-3 grid gap-2 text-sm text-slate-700">
                      {question.alternativas.map((alternative) => (
                        <p key={alternative}>{alternative}</p>
                      ))}
                    </div>

                    {(question.resposta || question.explicacao) && (
                      <div className="mt-4 rounded-lg border bg-white p-3 text-sm text-slate-700">
                        {question.resposta && (
                          <p className="font-bold text-blue-700">
                            Resposta: {question.resposta}
                          </p>
                        )}
                        {question.explicacao && (
                          <p className="mt-2 whitespace-pre-line leading-relaxed">
                            {question.explicacao}
                          </p>
                        )}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

function StructuredSection({
  section,
}: {
  section: TepContentSection
}) {
  const visibleBlocks = section.blocks.filter((block) => block.content?.trim())

  return (
    <div className="p-5 sm:p-6">
      <div className={`rounded-lg border p-4 ${toneClasses[section.tone]}`}>
        <h3 className="text-2xl font-bold">
          {section.title}
        </h3>
        <p className="mt-1 text-sm opacity-80">
          {section.subtitle}
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        {visibleBlocks.length > 0 ? (
          visibleBlocks.map((block) => (
            <article
              key={block.label}
              className={`rounded-lg border p-4 ${
                block.highlight ? toneClasses[section.tone] : 'border-slate-200 bg-slate-50'
              }`}
            >
              <h4 className="font-bold text-slate-900">
                {block.label}
              </h4>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700">
                {block.content}
              </p>
            </article>
          ))
        ) : (
          <p className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-600">
            Ainda não há conteúdo estruturado para esta seção. O conteúdo original permanece preservado abaixo.
          </p>
        )}
      </div>
    </div>
  )
}
