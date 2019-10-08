"use strict";

import snabbdom from 'snabbdom';
// import { view, update, init } from './counter/countList.js'
import { view, update, init } from './todo/todoList.js'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);

let state = init()
const oldVnode = document.getElementById('placeholder')

function main(state, vnode, { view, update }) {
  const newVnode = view(state, event => {
    const newState = update(state, event)
    main(newState, newVnode, { view, update })
  })
  patch(vnode ,newVnode)
}

main(state, oldVnode, { view, update })