const fetchStats = async (packageName) => {
  return fetch(`https://api.npmjs.org/downloads/range/last-month/${packageName}`)
    .then(response => {
      if (response.status === 404) throw new Error('npm stats is not found')
      return response.json()
    })
    .then(response => {
      let { downloads } = response

      const lastDay = downloads[downloads.length - 1].downloads
      const lastWeek = downloads.slice(downloads.length - 7, downloads.length).reduce((sum, day) => (sum + day.downloads), 0)
      const lastMonth = downloads.reduce((sum, day) => (sum + day.downloads), 0)

      return { apiResponse: response, lastDay, lastWeek, lastMonth }
    })
    .catch((error) => {
      console.warn(`[github-npm-stats] ${error}`)
      return null
    })
}

export default fetchStats