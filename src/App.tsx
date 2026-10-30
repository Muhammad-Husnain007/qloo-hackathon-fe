import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, Heart, Menu, Plus, RotateCcw, Send, Sparkles, X } from './icons'
import { categories, imageUrl, type Category, type ChatMessage, type Recommendation } from './data'
import { requestChat, toChatMessage, type HistoryMessage } from './services/api'

type PendingChat = { category: Category; answers: string[]; history: HistoryMessage[] }

function App() {
  const [category, setCategory] = useState<Category>('Movies')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [history, setHistory] = useState<HistoryMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState<string[]>([])
  const [mobileMenu, setMobileMenu] = useState(false)
  const chatEnd = useRef<HTMLDivElement>(null)
  const requestId = useRef(0)

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages])

  const fetchChat = async (pending: PendingChat) => {
    const currentRequest = ++requestId.current
    setIsLoading(true)
    try {
      const response = await requestChat(pending.category, pending.answers, pending.history)
      if (currentRequest !== requestId.current) return
      const assistantMessage = toChatMessage(pending.category, response)
      setMessages((current) => [...current, assistantMessage])
      setHistory([...pending.history, { role: 'assistant', content: assistantMessage.text }])
    } catch (error) {
      if (currentRequest !== requestId.current) return
      const message = error instanceof Error ? error.message : 'Could not reach the TasteMate API.'
      setMessages((current) => [...current, { id: Date.now(), from: 'mate', text: `${message} Check that the backend is running, then choose a category to try again.` }])
    } finally {
      if (currentRequest === requestId.current) setIsLoading(false)
    }
  }

  const startChat = (nextCategory: Category) => {
    requestId.current += 1
    setCategory(nextCategory)
    setAnswers([])
    setHistory([])
    setInput('')
    setMessages([{ id: Date.now(), from: 'mate', text: 'Hey there! What are we finding for you today?' }])
    void fetchChat({ category: nextCategory, answers: [], history: [] })
    setMobileMenu(false)
  }

  const answer = (text: string) => {
    if (!text.trim() || isLoading || messages.length === 0) return
    if (category === 'Hotels' && answers.length === 2 && text === 'Enter My Destination') {
      setMessages((current) => [...current, { id: Date.now(), from: 'mate', text: 'Type your city or destination below.' }])
      setHistory((current) => [...current, { role: 'assistant', content: 'Please enter a city or destination name.' }])
      setInput('')
      return
    }
    const cleanAnswer = text.trim()
    const nextAnswers = [...answers, cleanAnswer]
    const nextHistory = [...history, { role: 'user' as const, content: cleanAnswer }]
    setAnswers(nextAnswers)
    setHistory(nextHistory)
    setMessages((current) => [...current, { id: Date.now(), from: 'you', text: cleanAnswer }])
    setInput('')
    void fetchChat({ category, answers: nextAnswers, history: nextHistory })
  }

  const reset = () => {
    requestId.current += 1
    setMessages([])
    setAnswers([])
    setHistory([])
    setInput('')
    setIsLoading(false)
  }
  const toggleSaved = (title: string) => setSaved((list) => list.includes(title) ? list.filter((item) => item !== title) : [...list, title])

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={reset} aria-label="TasteMate home"><span className="brand-mark"><Sparkles size={17} /></span><span>taste<span className="brand-accent">mate</span><sup>AI</sup></span></button>
        <nav className="top-nav"><a href="#how-it-works">How it works</a><a href="#about">Our little secret</a></nav>
        <button className="saved-button" onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}><Heart size={16} /> <span>Saved</span>{saved.length > 0 && <b>{saved.length}</b>}</button>
        <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="intro-section" id="about">
          <div className="intro-copy"><div className="eyebrow"><span className="tiny-sparkle">✳</span> YOUR TASTE, UNDERSTOOD</div><h1>Your next favorite,<br /><span>found.</span></h1><p>Good recommendations just feel like a friend<br className="desktop-break" /> who gets you. Let’s find your next <em>“that was perfect.”</em></p></div>
          <div className="intro-aside"><div className="avatar-stack"><span>☺</span><span>◉</span><span>✿</span></div><div><strong>Made for your kind of good</strong><small>Not just what’s popular. What’s <i>you.</i></small></div></div>
        </section>

        <section className="workspace" aria-label="TasteMate recommendation workspace">
          <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
            <div className="sidebar-label">LET’S FIND YOUR NEXT…</div>
            <div className="category-list">{categories.map((item) => <button key={item.name} onClick={() => startChat(item.name)} className={`category-item ${category === item.name ? 'active' : ''}`}><span className="category-icon">{item.icon}</span><span className="category-copy"><strong>{item.name}</strong><small>{item.description}</small></span><ArrowRight className="category-arrow" size={16} /></button>)}</div>
            <div className="sidebar-bottom"><div className="tip-mark"><Sparkles size={16} /></div><p>Think of me as that friend who <b>always knows a place.</b></p><span>NO SCROLLING REQUIRED ✦</span></div>
          </aside>

          <section className="chat-panel" aria-label="Chat with TasteMate">
            <div className="chat-header"><div className="chat-person"><div className="mate-avatar"><Sparkles size={18} /></div><div><strong>Your TasteMate</strong><span><i className="online-dot" /> HERE FOR YOUR NEXT FAVORITE</span></div></div><button className="reset-button" onClick={reset}><RotateCcw size={14} /><span>Start fresh</span></button></div>
            <div className={`chat-body ${messages.length === 0 ? 'chat-empty' : ''}`}>
              {messages.length === 0 ? <div className="welcome-card"><div className="welcome-art"><span className="art-sun"/><span className="art-orbit orbit-one"/><span className="art-orbit orbit-two"/><Sparkles className="art-star star-one" size={18}/><Sparkles className="art-star star-two" size={12}/><span className="art-smile">☺</span></div><div className="welcome-kicker"><span/> A GOOD THING STARTS HERE</div><h2>Well, hello<br />there <span>you.</span></h2><p>Tell me what you’re in the mood for,<br className="desktop-break" /> and I’ll handle the good part.</p><div className="welcome-hint"><ArrowDown size={14} /> Pick a vibe to get started</div></div> : <div className="message-list">{messages.map((message) => <Message key={message.id} message={message} onAnswer={answer} saved={saved} toggleSaved={toggleSaved} />)}{isLoading && <div className="loading-indicator"><span className="loading-dots"><i/><i/><i/></span><span>Your TasteMate is thinking…</span></div>}<div ref={chatEnd}/></div>}
            </div>
            <form className="composer" onSubmit={(event) => { event.preventDefault(); answer(input) }}><button className="composer-plus" type="button" onClick={reset} aria-label="Start a new chat"><Plus size={18}/></button><input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && input.trim()) { event.preventDefault(); answer(input) } }} placeholder={isLoading ? 'Thinking about your picks…' : 'Tell me a little more…'} aria-label="Your answer" disabled={messages.length === 0 || isLoading} /><button className="send-button" type="submit" disabled={!input.trim() || isLoading || messages.length === 0} aria-label="Send message"><Send size={16} /></button></form>
            <div className="chat-footer"><span>✦ &nbsp; GOOD TASTE, NO GUESSWORK</span><span>JUST BETWEEN US <span className="footer-heart">♥</span></span></div>
          </section>
        </section>

        <section className="below-fold" id="how-it-works"><div className="eyebrow"><span className="tiny-sparkle">✳</span> A LITTLE LESS SEARCHING</div><div className="below-content"><div><h2>More “just right.”<br /><em>Less “maybe?”</em></h2><p>A few good questions. A short list that feels like you. That’s the whole idea.</p></div><div className="steps"><div><b>01</b><span><strong>Pick your thing</strong><small>Movies, meals, or a place to stay.</small></span></div><div><b>02</b><span><strong>Tell me your mood</strong><small>There are no wrong answers here.</small></span></div><div><b>03</b><span><strong>Find your next favorite</strong><small>Thoughtful picks, made just for you.</small></span></div></div></div></section>
        <section id="results" className="results-anchor" aria-label="Your saved recommendations" />
      </main>
      <footer className="site-footer"><span className="footer-brand">taste<span>mate</span><sup>AI</sup></span><span>MADE WITH A LITTLE ✳ AND A LOT OF GOOD TASTE</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Compass size={14}/> BACK TO THE GOOD PART <ChevronDown size={12} className="footer-up" /></button></footer>
    </div>
  )
}

function Message({ message, onAnswer, saved, toggleSaved }: { message: ChatMessage; onAnswer: (text: string) => void; saved: string[]; toggleSaved: (title: string) => void }) {
  return <div className={`message-row ${message.from === 'you' ? 'message-you' : ''}`}>{message.from === 'mate' && <div className="mini-avatar"><Sparkles size={12}/></div>}<div className="message-content"><div className="bubble">{message.text}</div>{message.options && <div className="quick-replies">{message.options.map((option) => <button key={option} onClick={() => onAnswer(option)}>{option}<ArrowUpRight size={12}/></button>)}</div>}{message.recommendations && <div className="recommendation-block"><div className="recommendation-heading"><span>YOUR SHORTLIST</span><span>THOUGHTFULLY PICKED ✳</span></div><div className="recommendation-grid">{message.recommendations.map((item) => <RecommendationCard key={item.title} item={item} saved={saved.includes(item.title)} toggleSaved={toggleSaved}/>)}</div></div>}</div></div>
}

function RecommendationCard({ item, saved, toggleSaved }: { item: Recommendation; saved: boolean; toggleSaved: (title: string) => void }) {
  return <article className="recommendation-card"><div className="card-image-wrap"><img src={item.imageSource === 'url' ? item.image : imageUrl(item.image)} alt={item.title} loading="lazy"/><span className="match-score">{item.score !== undefined ? <>{item.score}% <small>{item.isMock ? 'MOCK' : 'MATCH'}</small></> : <>#{item.rank ?? '—'} <small>QLOO ORDER</small></>}</span><button className={`heart-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleSaved(item.title)} aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}><Heart size={15} fill={saved ? 'currentColor' : 'none'}/></button></div><div className="card-copy"><span className="card-tag">✳ &nbsp;{item.tag}</span><h3>{item.title}</h3><span className="card-subtitle">{item.subtitle}</span><p>{item.reason}</p><button className="details-button" onClick={() => toggleSaved(item.title)}>I like this <Check size={13}/></button></div></article>
}

export default App
