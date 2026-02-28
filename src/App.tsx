import { useState } from 'react'
import './style.css'

const companies = [
  { year: '2025', name: 'Bloomberg', role: 'Software Engineering Intern' },
  { year: '2025', name: '1Password', role: 'Product Design Intern' },
  { year: '2024', name: 'Royal Bank of Canada', role: 'Software Engineering Intern' },
  { year: '2023', name: 'Onova', role: 'Product Design + Engineering Intern' },
]

const navItems = [
  { label: 'Work', active: true },
  { label: 'Fun', active: false },
  { label: 'About', active: false },
  { label: 'Resume', active: false },
]

type ChatbotPanelProps = {
  onClose: () => void
}

function ChatbotPanel({ onClose }: ChatbotPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Chat with my portfolio</span>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close chatbot"
        >
          <span className="text-lg leading-none">&times;</span>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <p className="text-sm leading-relaxed text-slate-500">
          This assistant can answer questions about my projects, experience, and how I think about building products.
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
    </>
  )
}

export function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const rootClassName = `min-h-screen bg-white text-slate-900${
    chatbotOpen ? ' overflow-hidden' : ''
  }`

  return (
    <div className={rootClassName}>
      <div
        className={`w-full ${
          chatbotOpen ? 'flex flex-col main-with-drawer md:h-screen md:flex-row md:flex-nowrap md:gap-8' : ''
        }`}
      >
        <div className={chatbotOpen ? 'main-content-col min-w-0 flex-1 md:h-screen md:overflow-y-auto' : ''}>
          <div className="mx-auto w-full max-w-[1800px] px-4 md:px-8">
            <header className="border-b border-slate-100">
              <div className="flex items-center justify-between py-4 md:py-5">
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  <span className="text-slate-900">YOUR</span>
                  <span>NAME</span>
                  <span className="hidden h-3 w-px bg-slate-200 md:block" />
                  <span className="hidden md:inline">Product Designer + Engineer</span>
                </div>
                <div className="flex items-center gap-3 md:gap-6">
                  <nav className="hidden md:flex md:items-center md:gap-8 text-[11px] font-medium uppercase tracking-[0.16em]">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        className={item.active ? 'text-slate-900' : 'text-slate-300 hover:text-slate-500'}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  <button
                    onClick={() => setChatbotOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 hover:text-slate-700"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-slate-50">
                      ?
                    </span>
                    <span className="hidden sm:inline">Chatbot</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 md:hidden"
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              {menuOpen && (
                <div className="border-t border-slate-100 py-4 md:hidden">
                  <nav className="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-[0.16em]">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setMenuOpen(false)}
                        className={`rounded-md px-3 py-2 text-left ${item.active ? 'bg-slate-50 text-slate-900' : 'text-slate-500'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </header>

            <main className="pb-24 pt-12 md:pt-20">
              <div className="flex flex-col gap-12 md:gap-16">
                <section className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
                  <div className="max-w-xl">
                    <h1 className="text-[28px] leading-tight tracking-tight text-slate-900 md:text-[40px]">
                      I&apos;m Your Name, a product designer who <span className="italic">engineers.</span>
                    </h1>
                  </div>
                  <div className="text-[13px] text-slate-400">
                    <div className="flex gap-8 md:gap-16">
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

                <section className="flex flex-col gap-6 pt-4 md:flex-row md:gap-10 md:pt-12">
                  <article className="flex flex-1 items-end rounded-[24px] bg-gradient-to-tr from-orange-400 via-rose-500 to-indigo-500 px-8 pb-6 pt-20 text-lg font-medium text-white shadow-[0_32px_80px_rgba(15,23,42,0.45)] md:px-10 md:pb-8 md:pt-24">
                    <div>OpenAI x Hardware</div>
                  </article>
                  <article className="flex flex-1 rounded-[24px] bg-slate-50 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.35)] md:p-8">
                    <div className="h-32 w-full rounded-2xl bg-violet-100 md:h-40" />
                  </article>
                </section>
              </div>
            </main>
          </div>
        </div>

        {/* Desktop: inline right-side drawer that shrinks header + main together */}
        {chatbotOpen && (
          <aside
            className="drawer-col hidden h-full min-h-[60vh] w-full shrink-0 grow-0 flex-col border-l border-slate-200 bg-white shadow-[-8px_0_32px_rgba(15,23,42,0.08)] md:flex md:h-screen md:overflow-y-auto md:w-[360px] md:min-w-[360px] md:max-w-[360px] md:grow-0 md:shrink-0"
            aria-label="Chatbot"
          >
            <ChatbotPanel onClose={() => setChatbotOpen(false)} />
          </aside>
        )}
      </div>

      {/* Mobile: full-width bottom sheet overlay, above content */}
      {chatbotOpen && (
        <aside
          className="fixed inset-x-0 bottom-0 top-auto z-40 flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_-16px_40px_rgba(15,23,42,0.18)] md:hidden"
          aria-label="Chatbot"
        >
          <ChatbotPanel onClose={() => setChatbotOpen(false)} />
        </aside>
      )}
    </div>
  )
}

export default App
