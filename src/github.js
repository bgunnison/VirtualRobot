import { owner, projects } from './projects.js'

function formatDate(value) {
  if (!value) {
    return 'Unpublished'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function normalizeRepo(repo) {
  const license = repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' ? repo.license.spdx_id : 'License not listed'

  return {
    name: repo.name,
    description: repo.description || 'Public VST3 project on GitHub.',
    language: repo.language || 'Code',
    stars: repo.stargazers_count ?? 0,
    updatedAt: repo.pushed_at || repo.updated_at || '',
    updatedLabel: formatDate(repo.pushed_at || repo.updated_at || ''),
    license,
    sourceUrl: repo.html_url,
  }
}

export async function fetchRepoSnapshots() {
  try {
    const response = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) {
      return {
        status: response.status === 403 ? 'rate-limited' : 'error',
        repos: [],
      }
    }

    const allRepos = await response.json()
    const wanted = new Set(projects.map((project) => project.repo.toLowerCase()))

    const repos = allRepos
      .filter((repo) => wanted.has(repo.name.toLowerCase()))
      .map(normalizeRepo)

    return {
      status: 'ok',
      repos,
    }
  } catch {
    return {
      status: 'error',
      repos: [],
    }
  }
}
