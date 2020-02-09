const events = require('events')
const MusicQueue = require('./musicQueue')
const MusicPlayer = require('./musicPlayer')

class MusicServer extends events.EventEmitter {
  constructor () {
    super()
    this.player = null
    this.isPlaying = false
    this.skipSafe = false
    this.queue = new MusicQueue()
    this.nowPlaying = null
    this.dispatcher = null
    this.volume = 0.5
    this.repeat = false
    this.handled = false
    this._ = new MusicPlayer(this)
  }

  async join (voiceChannel) {
    if (this.player) return
    this.player = await voiceChannel.join()
  }

  leave () {
    if (!this.player) return
    this.player.disconnect()

    this.stop(true)
    this.clear()
    return true
  }

  move (voiceChannel) {
    const here = this.player.voiceConnection.channel.calculatedPosition
    if (here === voiceChannel.calculatedPosition) return

    this.leave(true)
    this.join(voiceChannel)
    return true
  }

  stop () {
    if (!this.dispatcher) return
    this.skipSafe = true
    this.dispatcher.end()
    return true
  }

  setVolume (vol) {
    if (!vol) return
    const before = this.volume
    this.volume = vol % 1 === 0 ? vol / 100 : vol
    if (this.dispatcher) this.dispatcher.setVolume(this.volume)
    return [before, this.volume]
  }

  stateToggle () {
    if (!this.dispatcher) return
    this.dispatcher.paused ? this.dispatcher.resume() : this.dispatcher.pause()
    return this.dispatcher.paused
  }

  skip () {
    if (!this.dispatcher) return
    this.dispatcher.end()
    return true
  }

  clear () {
    delete this.player
    delete this.dispatcher
  }
}

module.exports = MusicServer
