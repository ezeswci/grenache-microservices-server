'use strict'

const Wasteland = require('./')
const GrenacheBackend = require('./Grenache.js')
const Link = require('grenache-nodejs-link')

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

// Keys for wasteland db
const publicKey = Buffer.from('hhxfYe12mPMnEWIKHEKMl6hTHVNlkKbMfysgmSg05ls=', 'base64')
const secretKey = Buffer.from('2Hxb4p7VGwg1QKm3RpV+SRwbhQ8Jk8TTyHvVFoFMmlYcKE8m08FmQT9pqUEli4IQSZJDHfCD/UT2em524mV0Sw==', 'base64')
const gb = new GrenacheBackend({
  transport: link,
  keys: { publicKey, secretKey }
})

module.exports.wl = new Wasteland({ backend: gb })
module.exports.link = link
