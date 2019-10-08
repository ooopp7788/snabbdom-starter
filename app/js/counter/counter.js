"use strict";

import h from 'snabbdom/h';

const INC = Symbol('inc')
const DEC = Symbol('dec')
const RESET = Symbol('reset')

const action = {
  INC,
  DEC,
  RESET
}

function init() {
  return 0
}

function view(count, callback) {
  return h('div', [
    h('button', {
      on: {
        click: callback.bind(null, { type: INC })
      }
    }, '+'),
    h('button', {
      on: {
        click: callback.bind(null, { type: DEC })
      }
    }, '-'),
    h('button', {
      on: {
        click: callback.bind(null,  { type: RESET })
      }
    }, 'reset'),
    h('p', `Count : ${count}`)
  ])
}

function update(count, action) {
  switch(action.type) {
    case INC:
      count++
      break
    case DEC:
      count--
      break;
    case RESET:
      count = 0
      break
    default:
      break
  }
  return count
}

export default { view, update, init, action }