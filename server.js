'use strict'

const {wl, link} = require('./wasteland')
const { PeerRPCServer } = require('grenache-nodejs-ws')

link.start()
const peer = new PeerRPCServer(link, {})
peer.init()
const service = peer.transport('server')
service.listen(1337)
setInterval(() => {
  link.announce('crypto_worker', service.port, {})
}, 1000)
service.on('request', (rid, key, payload, handler) => {
  if (payload.action === 'store') {
    const opts = { seq: new Date().getTime(), salt: 'crypto-salt' }
    wl.put(payload.data, opts, (err, hash) => {
      if (err) handler.reply(null, {'error': err})
      else {
        wl.get(hash, {}, (err, data) => {
          if (err) handler.reply(null, {'error': err})
          else handler.reply(null, {'price': data.v, 'hash': hash})
        })
      }
    })
  } else {
    wl.get(payload.data, {}, (err, data) => {
      if (err) handler.reply(null, {'error': err})
      else handler.reply(null, {'price': data.v, 'hash': payload.data})
    })
  }
})
// si le agrego un then update, o algo con un intervalo
