const ytdl = require('ytdl-core')

class MusicPlayer {
  constructor (server) {
    this.server = server
  }

  start () {
    if (!this.server.player) return
    if (this.server.isPlaying) return
    if (this.server.dispatcher) {
      this.server.dispatcher.removeAllListeners()
      delete this.server.dispatcher
    }
    const np = this.server.nowPlaying = this.server.queue.shift()
    this.play(np)
  }

  play (np) {
    if (!np) return
    this.server.isPlaying = true
    const dispatcher = this.server.player.playStream(ytdl(np.link))
    dispatcher.on('end', this.end.bind(this))
    dispatcher.setVolume(this.server.volume)

    this.server.dispatcher = dispatcher
    this.server.emit('now', np)
  }

  end () {
    this.server.isPlaying = false
    if (this.server.repeat) this.server.add(this.server.nowPlaying)
    if (this.server.skipSafe || this.server.queue.length === 0) {
      this.server.skipSafe = false
      return this.server.leave()
    }

    this.start()
  }
}

module.exports = MusicPlayer
