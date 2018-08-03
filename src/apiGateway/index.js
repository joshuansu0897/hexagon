'use strict'
const { Observable } = require('rxjs')

const observe = Observable.create(function(obs) {
  obs.complete()
})

exports.observe = observe