import { useEffect, useRef, useState } from 'react'
import { CONTACT } from './config.js'

/* ---------- What the bot knows. Edit the answers here. ---------- */
const KB = [
  {
    k: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'habari', 'sasa'],
    a: 'Hello! Welcome to NAM, Networking African Makers. Ask me about who can join, departments, how to apply, or how to contact us.',
  },
  {
    k: ['what is nam', 'about nam', 'what do you do', 'who are you', 'what is this', 'tell me about', 'networking african makers'],
    a: 'NAM is a community of young African makers. We bring together students, fresh graduates and self-taught people with real skills, group them into departments, and build real products and projects together.',
  },
  {
    k: ['who can join', 'eligible', 'eligibility', 'qualify', 'requirements', 'can i join', 'am i', 'student', 'graduate', 'graduated'],
    a: 'We welcome students in campus, graduates within 2 years of leaving campus, and self-taught people with real, visible skills. What matters is the work you can show.',
    link: { label: 'Who joins', href: '#who' },
  },
  {
    k: ['degree', 'certificate', 'diploma', 'no degree', 'dropout', 'self taught', 'self-taught', 'qualification'],
    a: 'You do not need a degree. If you can show something you have made, a project, a portfolio, a prototype or a demo, you are welcome.',
  },
  {
    k: ['age', 'how old', 'old', 'young', 'years old'],
    a: 'We focus on students and graduates within 2 years of campus, plus skilled self-taught people. There is no certificate test, we look at what you can build.',
  },
  {
    k: ['department', 'departments', 'skills', 'fields', 'which skills', 'categories', 'teams', 'what skills'],
    a: 'Our departments are Software and Apps, AI and Automation, Design and Brand, Electronics and Robotics, Content and Media, Business and Growth, Fabrication and Craft, and Learning and Training. If your skill is not listed, tell us and we can open a new one.',
    link: { label: 'See departments', href: '#departments' },
  },
  {
    k: ['apply', 'application', 'join', 'sign up', 'signup', 'register', 'how do i', 'get in', 'become a member', 'membership'],
    a: 'To apply, fill in the short form at the bottom of the page. Add a link to your work (GitHub, portfolio, video, social page), choose your department and tell us what you would love to build. No CV is needed.',
    link: { label: 'Open the application form', href: '#apply' },
  },
  {
    k: ['how it works', 'process', 'steps', 'what happens after', 'after applying', 'next step'],
    a: 'Four steps: show your skill, get placed in a department, join a project with a cross-department team, then ship the work and share the credit.',
    link: { label: 'How it works', href: '#how' },
  },
  {
    k: ['cost', 'fee', 'fees', 'price', 'pay', 'free', 'charge', 'money to join', 'how much'],
    a: 'Applying is free. If any costs come up in the future, they will be explained openly before you commit to anything.',
  },
  {
    k: ['job', 'salary', 'earn', 'paid', 'income', 'employment', 'work for you', 'hire', 'hiring'],
    a: 'NAM is a place to build, not just a place to wait for a job. Members work on real projects, and when those projects earn, contributors are rewarded. The exact terms are shared clearly with every member.',
  },
  {
    k: ['own', 'ownership', 'profit', 'equity', 'share', 'credit', 'intellectual property', 'idea stolen', 'my idea'],
    a: 'Ownership and profit-sharing are agreed in writing before a project starts, so everyone knows their role and their share.',
  },
  {
    k: ['showcase', 'portfolio', 'what to send', 'proof', 'work samples', 'what should i send', 'projects'],
    a: 'Send any link that shows what you can do: GitHub, Behance, YouTube, Instagram, a website or a Google Drive folder. Finished member projects will appear on our Showcase wall.',
    link: { label: 'Showcase', href: '#showcase' },
  },
  {
    k: ['contact', 'email', 'phone', 'call', 'whatsapp', 'reach', 'talk to someone', 'number'],
    a: `You can reach the team on ${CONTACT.phone} or at ${CONTACT.email}. You can also send the application form and we will reply.`,
  },
  {
    k: ['where', 'location', 'based', 'remote', 'online', 'outside', 'city', 'country', 'campus'],
    a: 'Much of our collaboration happens online, so you can join from any campus or city. We add meet-ups and build sessions as we grow.',
  },
  {
    k: ['vision', 'goal', 'china', 'made in africa', 'manufacture', 'products', 'future', 'mission'],
    a: 'Our aim is to grow from software and services into devices and goods, built by young Africans for Africa and the world. Each step is funded by the one before it.',
  },
  {
    k: ['thank', 'thanks', 'asante', 'cool', 'great', 'nice'],
    a: 'You are welcome! Anything else you would like to know?',
  },
  {
    k: ['bye', 'goodbye', 'see you', 'later'],
    a: 'Goodbye! We hope to see your work soon.',
  },
]

const FALLBACK = `I am not sure about that one. You can reach the team on ${CONTACT.phone} or ${CONTACT.email}, or try asking about who can join, departments or how to apply.`
const QUICK = ['Who can join?', 'Departments', 'How to apply', 'Is it free?', 'Contact']

function answer(text) {
  const s = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const e of KB) {
    const score = e.k.reduce((n, w) => n + (s.includes(w) ? 1 : 0), 0)
    if (score > bestScore) {
      best = e
      bestScore = score
    }
  }
  return best ? { text: best.a, link: best.link } : { text: FALLBACK }
}

/* ---------- Component ---------- */
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([
    { who: 'bot', text: 'Hi, I am the NAM assistant. Ask me about who can join, departments, how to apply, or how to contact us.' },
  ])
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [msgs, typing, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function send(text) {
    const t = (text ?? input).trim()
    if (!t || typing) return
    setMsgs((m) => [...m, { who: 'me', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const r = answer(t)
      setMsgs((m) => [...m, { who: 'bot', ...r }])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      <style>{CSS}</style>

      <button className="nb-btn" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Chat with NAM assistant'} aria-expanded={open}>
        {open ? (
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
        )}
      </button>

      {open && (
        <div className="nb-panel" role="dialog" aria-label="NAM assistant">
          <div className="nb-head">
            <div className="nb-av">N</div>
            <div>
              <b>NAM Assistant</b>
              <small>Ask about joining, departments or contact</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">&times;</button>
          </div>

          <div className="nb-msgs" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={'nb-m ' + (m.who === 'me' ? 'nb-me' : 'nb-bot')}>
                {m.text}
                {m.link && (
                  <a className="nb-link" href={m.link.href} onClick={() => setOpen(false)}>
                    {m.link.label}
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div className="nb-m nb-bot nb-typing" aria-label="Assistant is typing">
                <i /><i /><i />
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="nb-quick">
            {QUICK.map((q) => (
              <button key={q} onClick={() => send(q)}>{q}</button>
            ))}
          </div>

          <form className="nb-in" onSubmit={(e) => { e.preventDefault(); send() }}>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question" aria-label="Your question" />
            <button type="submit" disabled={typing}>Send</button>
          </form>
        </div>
      )}
    </>
  )
}

/* ---------- Styles (kept here so this is the only file you add) ---------- */
const CSS = `
.nb-btn{position:fixed;right:20px;bottom:20px;z-index:70;width:60px;height:60px;border-radius:50%;border:0;background:var(--fire);cursor:pointer;display:grid;place-items:center;box-shadow:0 10px 28px rgba(0,0,0,.55);transition:transform .15s}
.nb-btn:hover{transform:scale(1.07)}
.nb-btn svg{width:27px;height:27px;stroke:#fff;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.nb-panel{position:fixed;right:20px;bottom:92px;z-index:70;width:370px;max-width:calc(100vw - 24px);height:540px;max-height:calc(100vh - 120px);max-height:calc(100dvh - 120px);background:var(--card);border:1px solid var(--line);border-radius:22px;box-shadow:0 26px 70px rgba(0,0,0,.65);display:flex;flex-direction:column;overflow:hidden;animation:nbrise .25s ease both}
@keyframes nbrise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.nb-head{display:flex;gap:12px;align-items:center;padding:16px 18px;background:var(--bg2);border-bottom:1px solid var(--line)}
.nb-av{width:40px;height:40px;border-radius:12px;background:var(--fire);display:grid;place-items:center;font:900 1rem var(--head);color:#fff;transform:rotate(-6deg);flex:none}
.nb-head b{display:block;font:700 .98rem var(--head);color:#fff}
.nb-head small{display:block;color:var(--muted);font-size:.8rem;line-height:1.3;margin-top:2px}
.nb-head button{margin-left:auto;background:none;border:0;color:var(--muted);font-size:1.7rem;line-height:1;cursor:pointer;padding:4px 8px}
.nb-head button:hover{color:#fff}
.nb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:var(--bg)}
.nb-m{padding:11px 15px;border-radius:16px;max-width:88%;font-size:.95rem;line-height:1.55}
.nb-bot{background:var(--bg2);border:1px solid var(--line);align-self:flex-start;border-bottom-left-radius:4px;color:var(--text)}
.nb-me{background:var(--fire);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.nb-link{display:inline-block;margin-top:10px;padding:7px 14px;border-radius:999px;background:var(--sun);color:#0e0f0d;font-weight:700;font-size:.85rem;text-decoration:none}
.nb-link:hover{background:#ffcb4d}
.nb-typing{display:flex;gap:5px;padding:15px}
.nb-typing i{width:7px;height:7px;border-radius:50%;background:var(--muted);animation:nbb 1s infinite}
.nb-typing i:nth-child(2){animation-delay:.15s}
.nb-typing i:nth-child(3){animation-delay:.3s}
@keyframes nbb{50%{transform:translateY(-4px);background:var(--sun)}}
.nb-quick{display:flex;gap:7px;flex-wrap:wrap;padding:10px 14px 0;background:var(--card)}
.nb-quick button{background:transparent;border:1px solid var(--line);color:var(--text);padding:6px 13px;border-radius:999px;font:500 .83rem var(--body);cursor:pointer}
.nb-quick button:hover{border-color:var(--sun);color:var(--sun)}
.nb-in{display:flex;gap:8px;padding:12px 14px 14px;background:var(--card)}
.nb-in input{flex:1;min-width:0;padding:12px 16px;border:1.5px solid var(--line);border-radius:999px;background:var(--bg);color:var(--text);font:inherit}
.nb-in input:focus{outline:none;border-color:var(--fire)}
.nb-in button{background:var(--fire);color:#fff;border:0;border-radius:999px;padding:0 20px;font:700 .95rem var(--body);cursor:pointer}
.nb-in button:disabled{opacity:.5;cursor:default}
@media(max-width:480px){.nb-btn{right:14px;bottom:14px}.nb-panel{right:12px;bottom:84px;height:calc(100dvh - 108px)}}
@media(prefers-reduced-motion:reduce){.nb-panel,.nb-typing i{animation:none}}
`
