import './style.css'
import { fetchRepoSnapshots } from './github.js'
import { brandAssets, getSourceUrl, getZipUrl, owner, projects } from './projects.js'

const app = document.querySelector('#app')

const fallbackRepoMap = Object.fromEntries(
  projects.map((project) => [
    project.slug,
    {
      name: project.repo,
      description: project.summary,
      language: 'C++',
      stars: 0,
      updatedAt: '',
      updatedLabel: 'Public repo',
      license: 'See repository',
      sourceUrl: getSourceUrl(project),
    },
  ]),
)

render({
  status: 'loading',
  repoMap: fallbackRepoMap,
})

fetchRepoSnapshots().then((result) => {
  const repoMap = { ...fallbackRepoMap }

  result.repos.forEach((repo) => {
    const project = projects.find((entry) => entry.repo.toLowerCase() === repo.name.toLowerCase())

    if (project) {
      repoMap[project.slug] = repo
    }
  })

  render({
    status: result.status,
    repoMap,
  })
})

function render(state) {
  app.innerHTML = `
    <div class="site-shell">
      <header class="site-header">
        <div class="brand">
          <img class="brand-logo" src="${brandAssets.logoSmall}" alt="Virtual Robot logo" />
          <div>
            <h1 class="brand-title">VIRTUAL ROBOT</h1>
            <p class="brand-tag">SERIOUSLY EASY TO MAKE GREAT MUSIC</p>
          </div>
        </div>
        <nav class="site-nav" aria-label="Primary">
          <a href="#products">Products</a>
          <a href="#downloads">Downloads</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main class="site-main">
        <section class="intro">
          <div class="intro-copy">
            
            <h3>
              Open source VST3 audio and MIDI plugins.
            </h3>
           
          </div>
          
        </section>

        <section id="products" class="content-section">
          <h3 class="section-title">Products</h3>
          ${projects.map((project) => renderProduct(project, state.repoMap[project.slug])).join('')}
        </section>

        <section id="downloads" class="content-section">
          <h3 class="section-title">Downloads</h3>
          <div class="download-table">
            ${projects.map((project) => renderDownloadRow(project, state.repoMap[project.slug])).join('')}
          </div>
        </section>

        <section id="about" class="content-section">
          <h3 class="section-title">About</h3>
          <div class="simple-panel">
            <p>
              VIRTUAL ROBOT designs open source VST3 plugins. 
            </p>
            <p>
              The intent is to model the real world and set the controls for the heart of the sun
            </p>
          </div>
        </section>

        <section id="contact" class="content-section">
          <h3 class="section-title">Contact</h3>
          <div class="footer-grid">
            <p>Copyright: VIRTUAL ROBOT</p>
            <p><a href="mailto:info@virtualrobot.net">info@virtualrobot.net</a></p>
            <p class="footer-links">
              <a href="https://github.com/${escapeAttr(owner)}" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.facebook.com/Virtual-Robot-110461073894422" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.youtube.com/channel/UCZcR7So6cstHsnQ1I8tJP9Q/featured" target="_blank" rel="noreferrer">YouTube</a>
              <a href="https://soundcloud.com/user-943666067" target="_blank" rel="noreferrer">SoundCloud</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  `
}

function renderProduct(project, repo) {
  const kind = normalizeLabel(project.kind)
  const subtitle = [kind, project.heroLine].filter(Boolean).join('. ')

  return `
    <article class="product-row">
      <div class="product-copy">
        <h4>${escapeHtml(project.title)}</h4>
        <p class="product-subtitle">${escapeHtml(subtitle)}</p>
        <p>${escapeHtml(project.summary)}</p>
        <p>${escapeHtml(project.details)}</p>
        <ul class="product-points">
          ${project.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
        </ul>
        <p class="product-links">
          <a href="${escapeAttr(getZipUrl(project))}" target="_blank" rel="noreferrer">${escapeHtml(project.downloadLabel)}</a>
          <span>|</span>
          <a href="${escapeAttr(repo.sourceUrl)}" target="_blank" rel="noreferrer">GitHub source</a>
        </p>
      </div>
      <figure class="product-media">
        <img src="${project.image}" alt="${escapeAttr(project.imageAlt)}" loading="lazy" />
      </figure>
    </article>
  `
}

function renderDownloadRow(project, repo) {
  const kind = normalizeLabel(project.kind)
  const downloadText = kind ? `${kind} for Windows VST3 hosts.` : 'Windows VST3 hosts.'

  return `
    <div class="download-row">
      <div>
        <strong>${escapeHtml(project.title)}</strong>
        <p>${escapeHtml(downloadText)}</p>
      </div>
      <div class="download-actions">
        <a href="${escapeAttr(getZipUrl(project))}" target="_blank" rel="noreferrer">VST3 ZIP</a>
        <a href="${escapeAttr(repo.sourceUrl)}" target="_blank" rel="noreferrer">Source</a>
      </div>
    </div>
  `
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttr(value) {
  return escapeHtml(value ?? '')
}

function normalizeLabel(value) {
  const normalized = String(value ?? '').trim()
  return normalized === '---' ? '' : normalized
}
