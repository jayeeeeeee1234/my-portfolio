import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './style.css'
import heroImage from './images/ai-design-system-hero.jpg'

const companies = [
  { year: '2024', name: 'Shanghai Artificial Intelligence Research Institute', role: 'Product Designer' },
  { year: '2024', name: 'Knowhow Consulting', role: 'Freelance User Researcher' },
  { year: '2023', name: 'Bank of China', role: 'User Experience Designer' },
  { year: '2022', name: 'Accenture Song', role: 'Service Design Intern' },
]

const projects = [
  { title: 'Building a 0→1 AI Design System', meta: 'SAIRI · 2025', url: '/projects/ai-design-system' },
  { title: 'AI-Driven Nanoparticle Research Platform', meta: 'SAIRI · 2024' },
  { title: 'IT Asset Platform Redesign', meta: 'Bank of China · 2023' },
  { title: 'BE: Holiday Booking Intelligence', meta: 'Accenture Song · 2022' },
  { title: 'NatWest Community Service Platform', meta: 'NatWest · 2021' },
]

const navItems = [
  { label: 'WORK', active: true },
  { label: 'FUN', active: false },
  { label: 'ABOUT', active: false },
  { label: 'RESUME', active: false },
]

// 简历上下文：仅供 LLM 在回答中使用，不要改动含义，只做了排版和轻微纠错
const RESUME_CONTEXT = `
You are the personal assistant for this portfolio site.
Use ONLY the information in the resume below to answer questions about experience, projects and skills.
If you are not sure, say you are not sure instead of inventing details.

---
To C | Web 端 · NanoSafari 科研平台
产品设计师 · 2024.10 - 至今
项目概括：
- 负责产品的设计规范、设计组件库从 0 到 1 的搭建，确保设计语言的一致性、规范性及可扩展性。
- 负责 Chatbot 以及 Knowledge Base 模块迭代与优化。
- 主导 Chatbot 模块和 Knowledge Base 模块的高保真原型设计，参与产品需求的调研，基于用户研究和反馈，持续优化用户体验，提升交互效率。
- 设计组件库搭建：从 0 开始搭建 UI 组件库，制定设计规范，与产品经理和开发团队紧密合作，确保平台设计一致性并加速开发迭代。

---
To B | Web 端 · IT 资产管理平台
UI / UX 设计师 · 2023.10 - 2023.11
项目概括：
- 参与企业内部 IT 资产管理平台的改版设计，完成用户调研并负责首页、资产管理、系统管理、工程管理等共 27 个模块的交互设计、视觉规范及落地跟进。
- 负责 IT 资产管理平台的首页重构。通过对首页进行信息架构和体验流程的优化，实现体验投诉工单减少 20%，简化操作流程，降低用户学习成本。
- 通过对产品业务逻辑的梳理，重新设计系统管理流程和用户管理操作路径。新的用户管理流程降低了约 90% 的用户等待响应时间，大大提高了用户工作效率。

---
To C | Web & 移动端 · 全链路旅游产品服务
产品 / 服务设计师 · 2022.07 - 2022.10
项目概括：
- 项目旨在重新定义用户购买度假套餐的体验，推动英航子品牌度假产品的差异化，扩大用户规模并提高「机票 + 酒店 / 租车 / 度假套餐」组合的购买率。
- 智能旅行助手 BE 设计方案：总结用户研究结果，提出并设计智能旅行助手 BE，优化用户在度假套餐选择过程中的体验。
- Holiday Pathfinder 模块设计：根据对用户购买「度假套餐」需求的分析，设计并优化 Holiday Pathfinder 模块，提升用户浏览的沉浸感与趣味性，成功提高产品的购买率。
- 产品服务蓝图交付：通过与英航内部 IT、数据、客服等团队的跨部门协作，明确各系统的能力和限制，独立交付前后端可执行的产品服务蓝图，确保产品顺利落地并实施。
`

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatbotPanelProps = {
  onClose: () => void
}

const TITLE_FADE_DISTANCE = 340
const TITLE_MOVE_UP_PX = 140
const HERO_IMAGE_PARALLAX = 0.45

function getScrollParent(el: HTMLElement | null): Window | HTMLElement {
  if (!el) return typeof window !== 'undefined' ? window : (null as unknown as Window)
  let parent: HTMLElement | null = el.parentElement
  while (parent) {
    const overflowY = window.getComputedStyle(parent).overflowY
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') return parent
    parent = parent.parentElement
  }
  return typeof window !== 'undefined' ? window : (null as unknown as Window)
}

function AiDesignSystemContent() {
  const [indexVisible, setIndexVisible] = useState(false)
  const [titleStyle, setTitleStyle] = useState({ opacity: 1, y: 0, imageY: 0 })
  const heroImageRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const titleEl = heroTitleRef.current
    if (!titleEl || typeof window === 'undefined') return

    const container = getScrollParent(titleEl)
    const isWindow = container === window
    let rafId = 0

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const rect = titleEl.getBoundingClientRect()
        const scrollY = isWindow ? window.scrollY : (container as HTMLElement).scrollTop
        const containerRect = isWindow ? null : (container as HTMLElement).getBoundingClientRect()

        const start =
          isWindow
            ? scrollY + rect.top
            : scrollY + (rect.top - (containerRect!.top))

        const scrollOffset = Math.max(0, scrollY - start)
        const progress = Math.max(
          0,
          Math.min(1, scrollOffset / TITLE_FADE_DISTANCE)
        )
        const opacity = Math.max(0, Math.min(1, 1 - progress))
        const imageY = scrollOffset * HERO_IMAGE_PARALLAX
        setTitleStyle({
          opacity,
          y: -progress * TITLE_MOVE_UP_PX,
          imageY,
        })
      })
    }

    if (isWindow) {
      window.addEventListener('scroll', onScroll, { passive: true })
    } else {
      (container as HTMLElement).addEventListener('scroll', onScroll, { passive: true })
    }
    onScroll()
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (isWindow) window.removeEventListener('scroll', onScroll)
      else (container as HTMLElement).removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const el = heroImageRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIndexVisible(!entry?.isIntersecting),
      { threshold: 0, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {/* 页头：标题在顶部，仅向下滚动时标题渐隐（被头图遮住的感觉） */}
      <header className="flex flex-col">
        {/* 标题区：整块（背景+内容）随滚动上移，仅文字渐隐 */}
        <motion.div
          ref={heroTitleRef}
          className="relative z-10 w-screen max-w-none ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] bg-white px-4 pb-8 pt-8 md:px-8 md:pb-12 md:pt-12"
          style={{ y: titleStyle.y }}
          transition={{ duration: 0.42, ease: [0.33, 0, 0.2, 1] }}
        >
          <motion.div
            className="mx-auto max-w-[1800px] flex flex-col gap-6 md:gap-8 md:flex-row md:items-end md:justify-start text-left"
            style={{ opacity: titleStyle.opacity }}
            transition={{ duration: 0.42, ease: [0.33, 0, 0.2, 1] }}
          >
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400 nav-mono">01</p>
              <h1 className="text-[32px] leading-tight text-slate-900 md:text-[48px] lg:text-[56px] project-title max-w-2xl">
                Building a 0→1 AI Design System
              </h1>
            </div>
            <div className="flex flex-col gap-4 md:items-start">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 nav-mono mb-1.5">Responsibilities</p>
                <p className="text-[13px] text-slate-600 md:text-sm">Product design · Design system · AI interaction</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 nav-mono mb-1.5">Deliverables</p>
                <p className="text-[13px] text-slate-600 md:text-sm">Web · Internal tools</p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 nav-mono mt-2">{' { SCROLL } '} →</p>
            </div>
          </motion.div>
        </motion.div>
        {/* 全宽缩略图：外层固定布局，内层做视差（不破坏位置、不影响 index 判断） */}
        <div
          ref={heroImageRef}
          className="relative left-1/2 z-0 w-screen -translate-x-1/2 -mt-20 md:-mt-28 max-w-none h-[80vh] overflow-hidden bg-white"
        >
          <motion.div
            className="h-full w-full"
            style={{ y: titleStyle.imageY }}
            transition={{ duration: 0.42, ease: [0.33, 0, 0.2, 1] }}
          >
            <img
              src={heroImage}
              alt="AI Design System"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </div>
      </header>
      <div className="space-y-10 md:max-w-[800px] md:mx-auto">
        <section id="overview" className="space-y-4">
          <h2 className="text-sm font-normal uppercase tracking-[0.18em] text-slate-400 nav-mono">Intro</h2>
          <p className="text-[15px] leading-relaxed text-slate-600">
            Designing and shipping an AI-native design system from zero to one — aligning product, engineering, and
            design teams around a shared language for interaction, motion, and AI behaviors.
          </p>
          <p className="text-[15px] leading-relaxed text-slate-600">
            This page is a dedicated deep dive into how the AI design system was defined, structured, and rolled out —
            from token architecture and component patterns to how the system captures AI-specific behaviors like
            uncertainty, latency, and conversational flows.
          </p>
        </section>

        <section id="at-a-glance" className="space-y-3">
          <h3 className="text-sm font-normal uppercase tracking-[0.18em] text-slate-400 nav-mono">At a glance</h3>
          <ul className="space-y-2 text-[13px] leading-relaxed text-slate-400">
            <li>— Platform: Web · Internal tools</li>
            <li>— Focus: System thinking, AI interaction, design tokens</li>
            <li>— Role: End-to-end product design</li>
          </ul>
        </section>

        <section id="wip" className="space-y-4">
          <h2 className="text-sm font-normal uppercase tracking-[0.18em] text-slate-400 nav-mono">Work in progress</h2>
          <p className="text-[13px] leading-relaxed text-slate-500">
            I&apos;m still translating the full case study into this page. If you&apos;re curious about this work, feel
            free to reach out — I&apos;d be happy to walk you through the system live.
          </p>
        </section>
      </div>

      <nav className={`case-index hidden text-xs text-slate-500 ${indexVisible ? 'lg:block' : ''}`}>
        <ul className="space-y-1.5">
          <li>
            <a href="#overview" className="text-slate-400 hover:text-slate-800">
              Overview
            </a>
          </li>
          <li>
            <a href="#at-a-glance" className="text-slate-400 hover:text-slate-800">
              At a glance
            </a>
          </li>
          <li>
            <a href="#wip" className="text-slate-400 hover:text-slate-800">
              Work in progress
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

function ChatbotPanel({ onClose }: ChatbotPanelProps) {
  const defaultFollowups: string[] = [
    "What's the story behind your NanoSafari work?",
    'How do you balance design and engineering across your roles?',
    'What projects are you most proud of?',
  ]

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [followups, setFollowups] = useState<string[]>(defaultFollowups)
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null)
  const [displayedAnswer, setDisplayedAnswer] = useState('')

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!pendingAnswer) return

    const full = pendingAnswer
    setDisplayedAnswer('')
    let index = 0
    const step = 1

    const interval = window.setInterval(() => {
      index += step
      setDisplayedAnswer(full.slice(0, index))
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
      if (index >= full.length) {
        window.clearInterval(interval)
        setDisplayedAnswer(full)
        setMessages((prev: ChatMessage[]) => {
          const next: ChatMessage[] = [...prev, { role: 'assistant', content: full }]
          void (async () => {
            await refreshFollowups(next)
            setPendingAnswer(null)
          })()
          return next
        })
      }
    }, 35)

    return () => window.clearInterval(interval)
  }, [pendingAnswer])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages.length, displayedAnswer, isLoading])

  async function handleSend() {
    const question = input.trim()
    if (!question || isLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question }]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_SILICONFLOW_API_KEY
      if (!apiKey) {
        throw new Error('Missing SiliconFlow API key')
      }

      const historyForModel = [
        {
          role: 'system',
          content: `You are a portfolio Q&A assistant.\n\nAlways answer in plain text only: no markdown, no bullet points, no headings. Use at most three short sentences per answer.\n\nHere is the resume context:\n${RESUME_CONTEXT}`,
        },
        ...nextMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ]

      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-ai/DeepSeek-R1',
          messages: historyForModel,
          temperature: 0.2,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`SiliconFlow API error: ${response.status} ${text}`)
      }

      const data: any = await response.json()
      let answerText: string =
        data?.choices?.[0]?.message?.content && typeof data.choices[0].message.content === 'string'
          ? data.choices[0].message.content
          : ''

      if (!answerText) {
        answerText = 'Sorry, I could not generate a reply from the model. Please try again.'
      }

      setPendingAnswer(answerText)
    } catch (err) {
      console.error(err)
      setError('Chat service is temporarily unavailable. Please check your API key or try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void handleSend()
    }
  }

  function handleReset() {
    setMessages([])
    setInput('')
    setError(null)
    setFollowups(defaultFollowups)
  }

  async function refreshFollowups(nextMessages: ChatMessage[]) {
    try {
      const apiKey = import.meta.env.VITE_SILICONFLOW_API_KEY
      if (!apiKey) {
        return
      }

      const historyForModel = [
        {
          role: 'system',
          content:
            'You are helping suggest follow-up questions for a portfolio Q&A chatbot.\n' +
            'Given the conversation so far, generate 3 concise follow-up questions the user might ask next.\n' +
            'Return ONLY a valid JSON string of the form {"suggestions":["q1","q2","q3"]} with no extra text.',
        },
        ...nextMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ]

      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-ai/DeepSeek-R1',
          messages: historyForModel,
          temperature: 0.5,
        }),
      })

      if (!response.ok) {
        return
      }

      const data: any = await response.json()
      let raw: string =
        data?.choices?.[0]?.message?.content && typeof data.choices[0].message.content === 'string'
          ? data.choices[0].message.content
          : ''

      if (!raw) return

      // 如果模型在 JSON 外面包了额外文本，尽量截出第一个 {...} 再解析
      const firstBrace = raw.indexOf('{')
      const lastBrace = raw.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        raw = raw.slice(firstBrace, lastBrace + 1)
      }

      let parsed: any
      try {
        parsed = JSON.parse(raw)
      } catch {
        return
      }

      if (!parsed || !Array.isArray(parsed.suggestions)) return

      const clean = parsed.suggestions
        .map((s: any) => (typeof s === 'string' ? s.trim() : ''))
        .filter((s: string) => s.length > 0)
        .slice(0, 3)

      if (clean.length === 0) return

      setFollowups(clean)
    } catch (err) {
      console.error('Failed to refresh followups', err)
    }
  }

  async function handleSuggestionClick(prompt: string) {
    if (!prompt || isLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: prompt }]
    setMessages(nextMessages)
    setIsLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_SILICONFLOW_API_KEY
      if (!apiKey) {
        throw new Error('Missing SiliconFlow API key')
      }

      const historyForModel = [
        {
          role: 'system',
          content: `You are a portfolio Q&A assistant.\n\nAlways answer in plain text only: no markdown, no bullet points, no headings. Use at most three short sentences per answer.\n\nHere is the resume context:\n${RESUME_CONTEXT}`,
        },
        ...nextMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ]

      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-ai/DeepSeek-R1',
          messages: historyForModel,
          temperature: 0.2,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`SiliconFlow API error: ${response.status} ${text}`)
      }

      const data: any = await response.json()
      let answerText: string =
        data?.choices?.[0]?.message?.content && typeof data.choices[0].message.content === 'string'
          ? data.choices[0].message.content
          : ''

      if (!answerText) {
        answerText = 'Sorry, I could not generate a reply from the model. Please try again.'
      }

      setPendingAnswer(answerText)
    } catch (err) {
      console.error(err)
      setError('Chat service is temporarily unavailable. Please check your API key or try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col chatbot-panel">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          <span>+1 LLM</span>
          <button
            type="button"
            className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px]"
            aria-label="About this assistant"
          >
            i
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Reset conversation"
          >
            ↻
          </button>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close chatbot"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col min-h-0 bg-slate-50">
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length > 0 && (
            <div className="space-y-4 text-sm leading-relaxed">
              {messages.map((message, index) => {
                const isLastAssistantPending =
                  pendingAnswer !== null &&
                  index === messages.length - 1 &&
                  message.role === 'assistant'

                if (isLastAssistantPending) {
                  // 这一条正在用打字机展示，不再重复渲染完整文本
                  return null
                }

                return (
                  <div
                    key={index}
                    className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                  >
                    {message.role === 'user' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-900 px-4 py-2.5 text-slate-50"
                      >
                        {message.content}
                      </motion.div>
                    )}
                    {message.role === 'assistant' && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="max-w-[85%] text-slate-800 whitespace-pre-line"
                      >
                        {message.content}
                      </motion.div>
                    )}
                  </div>
                )
              })}

              {pendingAnswer && (
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="max-w-[85%] text-slate-800 whitespace-pre-line"
                  >
                    {displayedAnswer}
                  </motion.div>
                </div>
              )}

              {!isLoading && !pendingAnswer && lastMessage?.role === 'assistant' && followups.length > 0 && (
                <div className="mt-2 border-t border-slate-100 pt-3 text-[13px] text-slate-600">
                  <div className="space-y-2">
                    {followups.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void handleSuggestionClick(prompt)}
                        className="group flex w-full items-baseline gap-2 text-left hover:text-slate-800"
                      >
                        <span className="mt-[2px] text-slate-400 group-hover:text-slate-500">↳</span>
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3"
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-slate-500"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
                      className="h-2 w-2 rounded-full bg-slate-500"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                      className="h-2 w-2 rounded-full bg-slate-500"
                    />
                  </motion.div>
                </div>
              )}
            </div>
          )}
          <div ref={bottomRef} className="h-px" />
          {error && (
            <div className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-[11px] text-rose-600">{error}</div>
          )}
        </div>

        {messages.length === 0 && (
          <div className="shrink-0 bg-slate-50 px-6 pb-6 pt-4">
            <h2 className="text-xl font-medium tracking-tight text-slate-800">Welcome to +1 LLM.</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
              Ask about projects, experience, or how I think about building products.
            </p>
            <div className="mt-6 space-y-3 text-[13px] text-slate-600">
              {defaultFollowups.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void handleSuggestionClick(prompt)}
                  className="group flex w-full items-baseline gap-2 text-left hover:text-slate-800"
                >
                  <span className="mt-[2px] text-slate-400 group-hover:text-slate-500">↳</span>
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-3">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
            <input
              type="text"
              placeholder="Ask about +1..."
              className="flex-1 border-none bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={isLoading}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] text-slate-50 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-700/70"
              aria-label="Send message"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(true)

  const isAiDesignSystem =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/projects/ai-design-system')

  const rootClassName = `min-h-screen bg-white text-slate-900${
    chatbotOpen ? ' overflow-hidden' : ''
  }`

  useEffect(() => {
    const update = () => {
      if (typeof window !== 'undefined') {
        setIsDesktop(window.innerWidth >= 768)
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY })
      if (!cursorVisible) {
        setCursorVisible(true)
      }
    }

    const handleLeave = () => {
      setCursorVisible(false)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [cursorVisible])

  useEffect(() => {
    if (typeof window === 'undefined') return
    document.title = isAiDesignSystem ? 'AI Design System' : "Jiayi Zhu's Website"
  }, [isAiDesignSystem])

  return (
    <div className={rootClassName}>
      <div
        className={`w-full ${
          chatbotOpen ? 'flex flex-col main-with-drawer md:h-screen md:flex-row md:flex-nowrap' : ''
        }`}
      >
        <div className={chatbotOpen ? 'main-content-col min-w-0 flex-1 md:h-screen md:overflow-y-auto' : ''}>
          <div className="mx-auto w-full max-w-[1800px] px-4 md:px-8">
            <header className="relative border-b border-slate-100">
              <div className="flex items-center justify-between py-4 font-light md:py-5">
                <a
                  href="/"
                  className="flex items-center gap-2 text-[14px] font-normal uppercase tracking-[0.14em] text-slate-400 nav-mono"
                >
                  <span className="text-slate-900 tracking-normal">JIAYI</span>
                  <span className="tracking-normal">ZHU</span>
                  <span className="hidden h-3 w-px bg-slate-200 md:block" />
                  <span className="hidden md:inline tracking-normal">Product Designer + Engineer</span>
                </a>
                <div className="flex items-center gap-3 md:gap-6">
                  <nav className="hidden md:flex md:items-center md:gap-8 text-[14px] font-normal uppercase tracking-normal nav-mono">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        className={item.active ? 'text-slate-900' : 'text-slate-300 hover:text-slate-500'}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  {/* Mobile chatbot button: icon + text */}
                  <button
                    onClick={() => setChatbotOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[14px] font-normal uppercase tracking-[0.14em] text-slate-500 hover:text-slate-700 md:hidden nav-mono"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[9px] text-slate-50">
                      ?
                    </span>
                    <span>+1LLM</span>
                  </button>
                  {/* Desktop chatbot button: closed = icon + label, open = icon-only orange */}
                  <button
                    onClick={() => setChatbotOpen((prev) => !prev)}
                    className={`hidden md:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] nav-mono ${
                      chatbotOpen
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-white text-slate-500 hover:text-slate-700'
                    }`}
                    aria-pressed={chatbotOpen}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                        chatbotOpen ? 'bg-white text-orange-500' : 'bg-slate-900 text-slate-50'
                      }`}
                    >
                      ?
                    </span>
                    {!chatbotOpen && <span className="text-[14px] font-normal tracking-normal">+1LLM</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 md:hidden transition-colors duration-200"
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                  >
                    <svg
                      className={`h-5 w-5 transition-transform duration-200 ${menuOpen ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {menuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    key="mobile-nav"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute inset-x-0 top-full z-30 border-y border-slate-100 bg-white py-4 md:hidden"
                  >
                    <nav className="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-[0.16em] nav-mono">
                      {navItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setMenuOpen(false)}
                          className={`px-3 py-2 text-left ${
                            item.active ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            <main className="pb-24 pt-12 md:pt-20">
              {!isAiDesignSystem && (
                <div className="flex flex-col gap-6">
                  <section className="flex flex-col gap-8 hero-row md:items-start md:justify-start md:gap-16">
                  <div className="max-w-xl md:max-w-none md:flex-1">
                    <h1 className="text-[36px] leading-tight tracking-normal text-slate-900 md:text-[48px] xl:text-[52px]">
                      I&apos;m Jiayi, a product designer who <span className="italic">engineers.</span>
                    </h1>
                  </div>
                  <div className="text-[15px] text-slate-400 md:flex-1">
                    {/* <1200px（这里用接近的 xl 断点）采用「年份 + 公司 + 职位」纵向结构 */}
                    <div className="space-y-4 font-light xl:hidden">
                      {companies.map((c) => (
                        <div key={c.year + c.name} className="flex gap-6">
                          <div className="w-14 shrink-0 text-slate-400">{c.year}</div>
                          <div>
                            <div className="font-normal text-slate-900">{c.name}</div>
                            <div className="text-slate-400">{c.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ≥1200px 保持原来的三列布局 */}
                    <div className="hidden gap-8 font-light tracking-normal md:gap-16 xl:flex">
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
                      <div className="space-y-1 text-right text-[15px]">
                        {companies.map((c) => (
                          <div key={c.year + c.role}>{c.role}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </section>

                  <section className="project-grid grid gap-5 pt-0 md:grid-cols-2 md:gap-10 md:pt-0">
                    {projects.map((project) => (
                      <article key={project.title} className="flex flex-1 flex-col bg-white">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex h-full flex-col"
                          >
                            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                              {/* 预览媒体：后续可替换成 <video> 或 <img src="..." /> */}
                            </div>
                            <div className="project-footer flex items-center justify-between px-0 py-4 text-sm text-slate-700 md:px-0 md:py-4">
                              <div className="text-slate-900 project-title">{project.title}</div>
                              <div className="project-meta text-slate-500">{project.meta}</div>
                            </div>
                          </a>
                        ) : (
                          <>
                            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                              {/* 预览媒体：后续可替换成 <video> 或 <img src="..." /> */}
                            </div>
                            <div className="project-footer flex items-center justify-between px-0 py-4 text-sm text-slate-700 md:px-0 md:py-4">
                              <div className="text-slate-900 project-title">{project.title}</div>
                              <div className="project-meta text-slate-500">{project.meta}</div>
                            </div>
                          </>
                        )}
                      </article>
                    ))}
                  </section>
                </div>
              )}

              {isAiDesignSystem && <AiDesignSystemContent />}
            </main>
          </div>
        </div>

        {/* Chatbot drawer: shared instance for desktop and mobile, with smooth open/close animation */}
        <AnimatePresence>
          {chatbotOpen && (
            <motion.aside
              initial={isDesktop ? { opacity: 0, x: 24 } : { opacity: 0, y: 24 }}
              animate={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
              exit={isDesktop ? { opacity: 0, x: 24 } : { opacity: 0, y: 24 }}
              transition={{
                type: 'tween',
                duration: 0.24,
                ease: [0.33, 0, 0.2, 1], // 缓进缓出，无弹簧
              }}
              className="drawer-col fixed inset-x-0 bottom-0 top-auto z-40 flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_-16px_40px_rgba(15,23,42,0.18)] md:relative md:inset-auto md:z-auto md:h-screen md:w-[360px] md:min-w-[360px] md:max-w-[360px] md:grow-0 md:shrink-0 md:border-l md:border-slate-200 md:shadow-[-8px_0_32px_rgba(15,23,42,0.08)]"
              aria-label="Chatbot"
            >
              <ChatbotPanel onClose={() => setChatbotOpen(false)} />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
      {cursorVisible && (
        <div
          className="custom-cursor"
          style={{ transform: `translate3d(${cursorPos.x - 8}px, ${cursorPos.y - 8}px, 0)` }}
        />
      )}
    </div>
  )
}

export default App
