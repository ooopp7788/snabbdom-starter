"use strict";

import h from 'snabbdom/h';

const EDIT = Symbol('edit')
const SAVE = Symbol('save')
const UPDATE = Symbol('update')

const action = {
  EDIT,
  SAVE,
  UPDATE
}

function init() {
  return {
    status: 'save',
    note: 'test'
  }
}

function view(state, handler) {
  let children = null;
  if (state.status === 'edit') {
    children = [
      h('input', {
        props: {
          type: 'text',
          value: state.note
        },
        on: { input: (e) => handler.call(null, { type: UPDATE, data: e.target.value }) }
      }),
      h('button', {
        on: {
          click: handler.bind(null, { type: SAVE })
        }
      }, '保存')
    ]
  } else {
    children = [
      h('span', state.note),
      h('button', {
        on: {
          click: handler.bind(null, { type: EDIT })
        }
      }, '编辑')
    ]
  }
  return h('div', children)
}

function update(state, action) {
  switch(action.type) {
    case EDIT:
      state.status = 'edit'
      break
    case SAVE:
      state.status = 'save'
      break;
    case UPDATE:
      state.note = action.data
      break
    default:
      break
  }
  return state
}

export default { view, update, init, action }