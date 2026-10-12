import { useEffect, useState } from 'react'
import { FORM_URL, CONTACT } from './config.js'
import {
  NAV, SKILLS, PILLARS, WE_WANT, NOT_FOR, DEPARTMENTS, STEPS, WORKS,
  PRINCIPLES, FAQ, STATUS_OPTIONS, DEPT_OPTIONS,
} from './data.js'

// This file holds every section of the page. Each section is one function below.

function Header() {
  const [open, setOpen] = useState(false)

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('lock', open)
    return () => document.body.classList.remove('lock')
  }, [open])

  // close on Escape, or when the screen grows to desktop size
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width:981px)')
    const onMq = (e) => e.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  return (
    <header className="site">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="NAM home">
          <i>N</i>NAM
        </a>
        <button
          className={'burger' + (open ? ' on' : '')}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
        <nav className={open ? 'open' : ''} aria-label="Main" onClick={(e) => e.target.closest('a') && setOpen(false)}>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
            <li><a className="join" href="#apply">Show your skill</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="badge"><b />Now gathering our first makers</div>
        <h1>Africa's young makers, <em>under one roof.</em></h1>
        <p className="sub">
          NAM is Networking African Makers. We bring together students and fresh graduates who can actually do things,
          organise them into departments, and build real products together.
        </p>
        <div className="actions">
          <a className="btn btn-fire" href="#apply">Show your skill</a>
          <a className="btn btn-ghost" href="#about">What is NAM?</a>
        </div>
        <div className="hero-stats">
          <div><b>Skills first</b><span>A degree is welcome, not required</span></div>
          <div><b>Fresh minds</b><span>Students and graduates within 2 years of campus</span></div>
          <div><b>Built here</b><span>Products made in Africa by Africans</span></div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...SKILLS, ...SKILLS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {items.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="what" id="about">
      <div className="wrap">
        <div>
          <div className="kicker">WHAT WE ARE</div>
          <h2>Talent is everywhere. Connection is not.</h2>
          <p className="big" style={{ marginTop: 28 }}>
            Every campus has people who build apps, design brands, repair electronics, edit films and automate boring work,
            and most of them <b>work alone</b>. Graduates wait for jobs that never come. NAM puts them in one room,
            gives them structure, and lets their ideas combine into something bigger.
          </p>
        </div>
        <div className="pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.n}>
              <span className="n">{p.n}</span>
              <div><h3>{p.t}</h3><p>{p.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Tick = () => <svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10" /></svg>
const Cross = () => <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>

function Who() {
  return (
    <section className="who" id="who">
      <div className="wrap">
        <div className="kicker">WHO JOINS</div>
        <h2>If you can show it, you belong.</h2>
        <p className="lead">We care about what you can make, not what is printed on your certificate.</p>
        <div className="who-grid">
          <div className="box yes">
            <h3>We are looking for</h3>
            <ul>{WE_WANT.map((t) => <li key={t}><Tick />{t}</li>)}</ul>
          </div>
          <div className="box no">
            <h3>This is not for</h3>
            <ul>{NOT_FOR.map((t) => <li key={t}><Cross />{t}</li>)}</ul>
          </div>
        </div>
        <p className="note">Our aim is simple: a community of fresh, hungry minds who prove themselves through work.</p>
      </div>
    </section>
  )
}

function Departments() {
  return (
    <section id="departments">
      <div className="wrap">
        <div className="kicker">DEPARTMENTS</div>
        <h2>One network, many workshops.</h2>
        <p className="lead">Every member joins a department, and every department can pull in the others when a project needs it.</p>
        <div className="dept-grid">
          {DEPARTMENTS.map((d) => (
            <div className="dept" key={d.t} style={{ '--c': d.c }}>
              <div className="tagline">{d.tag}</div>
              <h3>{d.t}</h3>
              <p>{d.d}</p>
              <ul>{d.chips.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function How() {
  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="kicker">HOW IT WORKS</div>
        <h2>From showing off to shipping.</h2>
        <div className="flow">
          {STEPS.map((s) => (
            <div className="fstep" key={s.t}><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  return (
    <section id="showcase">
      <div className="wrap">
        <div className="kicker">SHOWCASE</div>
        <h2>The wall where work speaks.</h2>
        <p className="lead">This is where member projects will live. These tiles are placeholders until our first builds go up.</p>
        <div className="show-grid">
          {WORKS.map((w) => (
            <div className="work" key={w.t}>
              <span className="ph">Placeholder</span>
              <small>{w.k}</small>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Vision() {
  return (
    <section className="vision">
      <div className="wrap">
        <div className="kicker">THE BIGGER PICTURE</div>
        <h2>We want to build things the world buys from Africa.</h2>
        <p className="lead">Software first, then devices, then goods. Each step funded by the one before it, and every step made by young Africans.</p>
        <div className="principles">{PRINCIPLES.map((p) => <span key={p}>{p}</span>)}</div>
      </div>
    </section>
  )
}

const EMPTY = { name: '', phone: '', email: '', status: '', campus: '', department: '', link: '', idea: '' }

function Apply() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (FORM_URL) {
        const res = await fetch(FORM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Request failed')
      }
      setSent(true)
      setForm(EMPTY)
    } catch {
      setError('Something went wrong sending your application. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="apply" id="apply">
      <div className="wrap">
        <div>
          <div className="kicker">JOIN NAM</div>
          <h2>Show us what you can do.</h2>
          <p className="lead">No CV needed. Send us your best work and tell us what you want to build.</p>
          <ul className="tips">
            <li>Link to a project, GitHub, portfolio, video or social page</li>
            <li>Tell us which department you think you fit</li>
            <li>We reply to every application</li>
          </ul>
        </div>

        <form className="f" onSubmit={submit}>
          <div className="two">
            <label>Full name<input required value={form.name} onChange={set('name')} /></label>
            <label>Phone or WhatsApp<input type="tel" required value={form.phone} onChange={set('phone')} /></label>
          </div>
          <label>Email<input type="email" required value={form.email} onChange={set('email')} /></label>
          <div className="two">
            <label>Where are you?
              <select required value={form.status} onChange={set('status')}>
                <option value="">Choose one</option>
                {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label>Campus or school<input placeholder="Optional" value={form.campus} onChange={set('campus')} /></label>
          </div>
          <label>Your department
            <select required value={form.department} onChange={set('department')}>
              <option value="">Choose one</option>
              {DEPT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label>Link to your work
            <input type="url" placeholder="https://" required value={form.link} onChange={set('link')} />
            <small>GitHub, Behance, YouTube, Instagram, website, Google Drive, anything that shows it.</small>
          </label>
          <label>What would you love to build?
            <textarea rows="4" required value={form.idea} onChange={set('idea')} />
          </label>
          <button className="btn btn-fire" type="submit" disabled={busy}>{busy ? 'Sending...' : 'Send my application'}</button>
          {sent && <div className="ok" style={{ display: 'block' }} role="status">Thank you. We have your application and the NAM team will be in touch soon.</div>}
          {error && <div className="ok" style={{ display: 'block', background: '#fde7e2', color: '#8a2a10' }} role="alert">{error}</div>}
        </form>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <div className="kicker">QUESTIONS</div>
        <h2>Good to know.</h2>
        <div className="faq-wrap">
          {FAQ.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <a className="logo" href="#top"><i>N</i>NAM</a>
            <p style={{ marginTop: 16, maxWidth: '36ch' }}>Networking African Makers. A community of young builders turning skill into products.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#who">Who joins</a></li>
              <li><a href="#departments">Departments</a></li>
              <li><a href="#showcase">Showcase</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>{CONTACT.email}</li>
              <li>{CONTACT.phone}</li>
              <li><a href="#apply">Apply to join</a></li>
            </ul>
          </div>
        </div>
        <div className="big-word" aria-hidden="true">NAM</div>
        <div className="copyr">Copyright {new Date().getFullYear()} NAM, Networking African Makers. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <div className="pattern" aria-hidden="true" />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Who />
        <Departments />
        <How />
        <Showcase />
        <Vision />
        <Apply />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
