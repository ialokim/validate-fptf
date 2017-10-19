'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateCoordinates = require('./lib/coordinates')

const validateStop = (stop, name = 'stop') => {
  validateItem(stop, name)

  a.strictEqual(stop.type, 'stop', name + '.type must be `stop`')

  validateReference(stop.id, name + '.id')

  // todo: what if stop.station is a station object?
  validateReference(stop.station, name + '.station')

  a.strictEqual(typeof stop.name, 'string', name + '.name must be a string')
  a.ok(stop.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(stop.coordinates) && !is.undefined(stop.coordinates)) {
    validateCoordinates(stop.coordinates, name + '.coordinates')
  }
}

module.exports = validateStop