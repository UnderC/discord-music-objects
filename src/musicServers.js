const MusicServer = require('./musicServer')

class MusicServers {
  constructor () {
    this.servers = new Map()
  }

  get (gID) {
    const server = this.servers.get(gID)
    if (!server) return this.set(gID)
    return server
  }

  set (gID, server) {
    const here = server || new MusicServer()
    this.servers.set(gID, here)
    return here
  }

  del (gID) {
    this.get(gID).removeAllListeners()
    this.servers.delete(gID)
    this.handlers.delete(gID)
  }
}

module.exports = MusicServers
