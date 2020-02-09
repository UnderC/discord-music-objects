const ytsr = require('ytsr')
// const ytpl = require('ytpl')
// const ytdl = require('ytdl-core')

class MusicSearcher {
  async search (query, counts) {
    const filters = await ytsr.getFilters(query)
    const filter = filters.get('Type').find(o => o.name === 'Video')
    const result = await ytsr(null, { limit: counts, nextpageRef: filter.ref })
    return result
  }

  /*
  playlist () {

  }
  */
}

module.exports = MusicSearcher
