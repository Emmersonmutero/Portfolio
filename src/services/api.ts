const GITHUB_API_BASE = 'https://api.github.com'
const VERCEL_API_BASE = 'https://api.vercel.com'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  stargazers_count: number
  watchers_count: number
  forks_count: number
  archived: boolean
  disabled: boolean
}

export interface VercelDeployment {
  uid: string
  name: string
  url: string
  created: number
  source: string
  state: string
  readyState: string
  type: string
  creator: {
    uid: string
    email: string
    username: string
  }
  meta: {
    githubCommitAuthorName?: string
    githubCommitMessage?: string
    githubCommitOrg?: string
    githubCommitRef?: string
    githubCommitRepo?: string
    githubCommitSha?: string
    githubOrg?: string
    githubRepo?: string
  }
}

export interface Project {
  id: string
  title: string
  category: string
  type: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  demoUrl: string
  githubUrl: string
  status: string
  highlight: boolean
}

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=50`)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    const repos: GitHubRepo[] = await response.json()
    return repos.filter(repo => !repo.archived && !repo.disabled)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export const fetchVercelDeployments = async (token: string): Promise<VercelDeployment[]> => {
  try {
    const response = await fetch(`${VERCEL_API_BASE}/v1/deployments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`)
    }
    const data = await response.json()
    return data.deployments || []
  } catch (error) {
    console.error('Error fetching Vercel deployments:', error)
    return []
  }
}

export const transformToProjects = (repos: GitHubRepo[], deployments: VercelDeployment[]): Project[] => {
  const deploymentMap = new Map<string, VercelDeployment>()

  deployments.forEach(deployment => {
    if (deployment.name) {
      deploymentMap.set(deployment.name.toLowerCase().replace(/[^a-z0-9]/g, ''), deployment)
    }
  })

  return repos
    .filter(repo => {
      const normalizedRepoName = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      return deploymentMap.has(normalizedRepoName)
    })
    .map((repo, index) => {
      const normalizedRepoName = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      const deployment = deploymentMap.get(normalizedRepoName)!

      // Get the latest READY deployment for this project
      const projectDeployments = deployments.filter(d =>
        d.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedRepoName && d.readyState === 'READY'
      ).sort((a, b) => b.created - a.created)

      const latestDeployment = projectDeployments[0] || deployment

      const technologies = extractTechnologies(repo)
      const category = determineCategory(repo, technologies)

      return {
        id: repo.id.toString(),
        title: formatTitle(repo.name),
        category,
        type: determineType(repo, technologies),
        description: repo.description || `A ${category.toLowerCase()} project built with modern technologies.`,
        image: getProjectImage(repo, technologies),
        technologies,
        features: generateFeatures(repo, technologies),
        demoUrl: `https://${latestDeployment.url}`,
        githubUrl: repo.html_url,
        status: latestDeployment.readyState === 'READY' ? 'Live' : 'Development',
        highlight: index === 0, // Highlight the most recently updated
      }
    })
}

const extractTechnologies = (repo: GitHubRepo): string[] => {
  const techMap: { [key: string]: string[] } = {
    javascript: ['JavaScript', 'React', 'Node.js', 'Express.js'],
    typescript: ['TypeScript', 'React', 'Node.js'],
    python: ['Python', 'Django', 'Flask', 'FastAPI'],
    java: ['Java', 'Spring Boot'],
    'c++': ['C++'],
    'c#': ['C#', '.NET'],
    go: ['Go'],
    rust: ['Rust'],
    php: ['PHP', 'Laravel'],
    ruby: ['Ruby', 'Rails'],
    swift: ['Swift'],
    kotlin: ['Kotlin'],
    dart: ['Dart', 'Flutter'],
    html: ['HTML', 'CSS', 'JavaScript'],
    css: ['CSS', 'SCSS', 'Tailwind CSS'],
  }

  const language = repo.language?.toLowerCase()
  const topics = repo.topics.map(t => t.toLowerCase())

  const techs = new Set<string>()

  if (language && techMap[language]) {
    techMap[language].forEach(tech => techs.add(tech))
  }

  topics.forEach(topic => {
    if (techMap[topic]) {
      techMap[topic].forEach(tech => techs.add(tech))
    } else {
      // Add topic as tech if it's a common framework/library
      const commonTechs = ['react', 'vue', 'angular', 'next', 'nuxt', 'svelte', 'express', 'fastify', 'koa', 'django', 'flask', 'spring', 'laravel', 'rails', 'tailwind', 'bootstrap', 'material-ui', 'chakra-ui', 'styled-components']
      if (commonTechs.includes(topic)) {
        techs.add(topic.charAt(0).toUpperCase() + topic.slice(1))
      }
    }
  })

  return Array.from(techs).slice(0, 5) // Limit to 5 technologies
}

const determineCategory = (repo: GitHubRepo, technologies: string[]): string => {
  const description = repo.description?.toLowerCase() || ''
  const topics = repo.topics.map(t => t.toLowerCase())

  if (topics.includes('e-commerce') || description.includes('shop') || description.includes('commerce')) return 'E-Commerce'
  if (topics.includes('data') || technologies.includes('Python') || technologies.includes('TensorFlow')) return 'Data Science'
  if (topics.includes('social') || description.includes('social')) return 'Social Media'
  if (topics.includes('crypto') || topics.includes('finance') || description.includes('crypto')) return 'Fintech'
  if (topics.includes('health') || description.includes('health')) return 'Healthcare'
  if (topics.includes('vr') || topics.includes('ar')) return 'VR/AR'
  if (topics.includes('ai') || topics.includes('ml') || technologies.includes('TensorFlow')) return 'AI/ML'
  if (topics.includes('education') || description.includes('learn')) return 'Education'
  if (topics.includes('weather') || description.includes('weather')) return 'Weather App'
  if (topics.includes('cms') || topics.includes('blog')) return 'Content Management'
  if (topics.includes('food') || description.includes('delivery')) return 'Food Delivery'

  // Default to Full Stack if multiple technologies or web-related
  if (technologies.length > 2 || technologies.some(t => ['React', 'Next.js', 'Vue.js', 'Angular'].includes(t))) {
    return 'Full Stack'
  }

  return 'Web Development'
}

const determineType = (repo: GitHubRepo, technologies: string[]): string => {
  const name = repo.name.toLowerCase()
  const description = repo.description?.toLowerCase() || ''
  const topics = repo.topics.map(t => t.toLowerCase())

  // Check for specific project types
  if (name.includes('portfolio') || description.includes('portfolio')) return 'Portfolio'
  if (name.includes('resume') || name.includes('cv') || description.includes('resume') || description.includes('parser')) return 'Resume Parser'
  if (name.includes('marketplace') || description.includes('marketplace')) return 'Marketplace'
  if (name.includes('smart') || name.includes('home') || description.includes('smart home')) return 'Smart Home'
  if (name.includes('web') || name.includes('website') || description.includes('website')) return 'Website'
  if (topics.includes('mobile') || technologies.includes('React Native') || technologies.includes('Flutter')) return 'Mobile App'
  if (topics.includes('api') || description.includes('api')) return 'API'
  if (topics.includes('dashboard') || description.includes('dashboard')) return 'Dashboard'
  if (topics.includes('landing') || description.includes('landing')) return 'Landing Page'

  // Default based on technologies
  if (technologies.includes('React') || technologies.includes('Vue.js') || technologies.includes('Angular')) return 'Web Application'
  if (technologies.includes('Node.js') || technologies.includes('Express.js')) return 'Backend Service'
  if (technologies.includes('Python')) return 'Python Application'

  return 'Web Project'
}

const formatTitle = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getProjectImage = (repo: GitHubRepo, technologies: string[]): string => {
  // Try to get the actual project screenshot from the deployment URL
  // For now, use placeholder images based on category, but we can enhance this later
  const category = determineCategory(repo, technologies)

  const imageMap: { [key: string]: string } = {
    'Full Stack': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    'E-Commerce': 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Data Science': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Social Media': 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Fintech': 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Healthcare': 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    'VR/AR': 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    'AI/ML': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Education': 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Weather App': 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Content Management': 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Food Delivery': 'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg?auto=compress&cs=tinysrgb&w=800',
  }

  return imageMap[category] || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
}

const generateFeatures = (repo: GitHubRepo, technologies: string[]): string[] => {
  const features = []

  if (repo.stargazers_count > 10) features.push('Popular Project')
  if (repo.forks_count > 5) features.push('Community Driven')
  if (technologies.includes('React') || technologies.includes('Vue.js')) features.push('Modern UI')
  if (technologies.includes('Node.js')) features.push('Server-side Rendering')
  if (repo.topics.includes('responsive')) features.push('Mobile Responsive')
  if (repo.topics.includes('api')) features.push('RESTful API')

  // Add some default features
  features.push('Clean Code', 'Well Documented', 'Open Source')

  return features.slice(0, 5)
}