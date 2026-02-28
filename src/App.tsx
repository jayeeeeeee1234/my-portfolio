import { useState } from 'react'
import './style.css'

const companies = [
  { year: '2025', name: 'Bloomberg', role: 'Software Engineering Intern' },
  { year: '2025', name: '1Password', role: 'Product Design Intern' },
  { year: '2024', name: 'Royal Bank of Canada', role: 'Software Engineering Intern' },
  { year: '2023', name: 'Onova', role: 'Product Design + Engineering Intern' },
]

export function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            <span className="text-slate-900">YOUR</span>
            <span>NAME</span>
            <span className="h-3 w-px bg-slate-200" />
            <span>Product Designer + Engineer</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.16em]">
              <button className="text-slate-900">Work</button>
              <button className="text-slate-300 hover:text-slate-500">Fun</button>
              <button className="text-slate-300 hover:text-slate-500">About</button>
              <button className="text-slate-300 hover:text-slate-500">Resume</button>
            </nav>
            <button
              onClick={() => setChatbotOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 hover:text-slate-700"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-slate-50">
                ?
              </span>
              <span>Chatbot</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pb-24 pt-20">
        <div className={`mx-auto max-w-6xl px-8 ${chatbotOpen ? 'flex gap-8' : ''}`}>
          {/* ?????? */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <section className="flex items-start justify-between gap-16">
                <div className="max-w-xl">
                  <h1 className="text-[40px] leading-tight tracking-tight text-slate-900">
                    I&apos;m Your Name, a product designer who <span className="italic">engineers.</span>
                  </h1>
                </div>

                <div className="text-[13px] text-slate-400">
                  <div className="flex gap-16">
                    <div className="space-y-1">
                      {companies.map((c) => (
                        <div key={c.year}>{c.year}</div>
                      ))}
                    </div>
                    <div className="space-y-1 text-slate-900">
                      {companies.map((c) => (
                        <div key={c.year + c.name}>{c.name}</div>
                      ))}
                    </div>
                    <div className="space-y-1 text-right">
                      {companies.map((c) => (
                        <div key={c.year + c.role}>{c.role}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex gap-10 pt-12">
                <article className="flex flex-1 items-end rounded-[24px] bg-gradient-to-tr from-orange-400 via-rose-500 to-indigo-500 px-10 pb-8 pt-24 text-lg font-medium text-white shadow-[0_32px_80px_rgba(15,23,42,0.45)]">
                  <div>OpenAI x Hardware</div>
                </article>
                <article className="flex flex-1 rounded-[24px] bg-slate-50 p-8 shadow-[0_24px_60px_rgba(148,163,184,0.35)]">
                  <div className="h-40 w-full rounded-2xl bg-violet-100" />
                </article>
              </section>
            </div>
          </div>

          {/* ?? Chatbot ?????????????? */}
          {chatbotOpen && (
            <aside
              className="flex h-full min-h-[60vh] w-[380px] shrink-0 flex-col border-l border-slate-200 bg-white shadow-[-8px_0_32px_rgba(15,23,42,0.08)]"
              aria-label="Chatbot"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Chat with my portfolio</span>
                </div>
                <button
                  onClick={() => setChatbotOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Close chatbot"
                >
                  <span className="text-lg leading-none">?</span>
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-3 overflow-auto px-5 py-4">
                <p className="text-sm leading-relaxed text-slate-500">
                  This assistant can answer questions about my projects, experience, and how I think about building
                  products.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Portfolio chat assistant</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="relative inline-flex h-2 w-2 items-center justify-center">
                      <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-500/20" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span>Online</span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
                  <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-xs text-slate-900">
                    Hi, I&apos;m your digital twin. Ask me about my projects, experience, or how I think about design.
                  </div>
                  <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-xs text-slate-50">
                    What&apos;s a recent project you&apos;re proud of?
                  </div>
                  <div className="self-center pt-1 text-[10px] text-slate-400">
                    Prototype: local replies only. Will be powered by an LLM.
                  </div>
                </div>
                <div className="flex items-end gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Ask about my projects, experience, or skills?"
                    className="flex flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-300"
                  />
                  <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs text-slate-50 hover:bg-slate-800">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-50 text-[10px]">
                      ?
                    </span>
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
