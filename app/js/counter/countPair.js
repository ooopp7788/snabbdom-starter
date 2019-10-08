"use strict";

import h from 'snabbdom/h';
import * as counter from './counter'

const RESET         = Symbol('reset');
const UPDATE_FIRST  = Symbol('update first');
const UPDATE_SECOND = Symbol('update second');

const action = {
  RESET,
  UPDATE_FIRST,
  UPDATE_SECOND
}

function init() {
  return { first: counter.init(), second: counter.init() };
}

function view(model, handler) {
  return h('div', [
    h('button', {
      on   : { click: handler.bind(null, {type: RESET}) }
    }, 'Reset'),
    h('hr'),
    counter.view(model.first, counterAction => handler({ type: UPDATE_FIRST, data: counterAction})),
    h('hr'),
    counter.view(model.second, counterAction => handler({ type: UPDATE_SECOND, data: counterAction}))
  ])
}

function update(model, action) {
  switch(action.type) {
    case UPDATE_FIRST:
      model.first = counter.update(model.first, action.data)
      break
    case UPDATE_SECOND:
      model.second = counter.update(model.second, action.data)
      break;
    case RESET:
      model.first = counter.init()
      model.second = counter.init()
      break
    default:action
      break
  }
  return model
}

export default { view, init, update, actions : { UPDATE_FIRST, UPDATE_SECOND, RESET } }