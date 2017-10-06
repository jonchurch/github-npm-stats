import getRepoInfo from './get-repo-info'
import getPackageName from './get-package-name/get-package-name'
import getStats from './get-stats/get-stats'
import renderStats from './render-stats'

const run = async () => {
  const { owner, repo } = getRepoInfo() || {}
  if (!owner) return

  const packageName = await getPackageName(owner, repo)
  if (!packageName) return

  const stats = await getStats(packageName)
  if (!stats) return

  renderStats(packageName, stats)
}

if (!process || !process.env || process.env.NODE_ENV !== 'test') {
  run()
}

export default run
