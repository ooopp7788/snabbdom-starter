"use strict";

import h from 'snabbdom/h';
import * as counter from './counter'

const ADD = Symbol('add');
const UPDATE = Symbol('update counter');
const REMOVE = Symbol('remove');
const RESET = Symbol('reset');

const action = {
  ADD,
  UPDATE,
  REMOVE,
  RESET
}

function init() {
  return  { nextID: 1, counters: [] };
}

function view(model, handler) {
  return h('div', [
    h('button', {
      on: { click: handler.bind(null, {type: ADD}) }
    }, 'Add'),
    h('button', {
      on: { click: handler.bind(null, {type: RESET}) }
    }, 'Reset'),
    h('hr'),
    h('div.counter-list', model.counters.map(item => counterItemView(item, handler)))
  ]);
}

function counterItemView(item, handler) {
  return h('div', {key: item.id}, [
    h('button', {
      on: { click: handler.bind(null, {type: REMOVE, id: item.id}) }
    }, 'remove'),
    counter.view(item.count, counterAction => handler({type: UPDATE, id: item.id, data: counterAction}))
  ])
}

function update(model, action) {
  // ADD,
  // UPDATE,
  // REMOVE,
  // RESET
  switch(action.type) {
    case ADD:
      model.counters.push({
        id: model.nextID,
        count: counter.init()
      })
      model.nextID++
      break
    case UPDATE:
      model.counters = model.counters.map(item => {
        if (item.id === action.id) {
          debugger;
          item.count = counter.update(item.count, action.data)
        }
        return item
      })
      break;
    case REMOVE:
      model.counters = model.counters.filter(item => !item.id === action.id)
      break
    case RESET:
      model = init()
      break
    default:
      break
  }
  return model
}

export default { view, update, action, init }