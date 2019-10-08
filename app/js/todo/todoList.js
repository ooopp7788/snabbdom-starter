"use strict";

import h from 'snabbdom/h';
import * as todo from './todoItem'

const ADD = Symbol('add');
const UPDATE = Symbol('update todo');
const REMOVE = Symbol('remove');
const CLEAR = Symbol('clear');

const action = {
  ADD,
  UPDATE,
  REMOVE,
  CLEAR
}

function init() {
  return  { nextID: 1, todos: [] };
}

function view(model, handler) {
  return h('div', [
    h('button', {
      on: { click: handler.bind(null, {type: ADD}) }
    }, 'Add'),
    h('button', {
      on: { click: handler.bind(null, {type: CLEAR}) }
    }, 'Clear'),
    h('hr'),
    h('div.todo-list', model.todos.map(item => todoItemView(item, handler)))
  ]);
}

function todoItemView(item, handler) {
  return h('div', {key: item.id}, [
    h('button', {
      on: { click: handler.bind(null, {type: REMOVE, id: item.id}) }
    }, 'remove'),
    todo.view(item.todo, todoAction => handler({type: UPDATE, id: item.id, data: todoAction}))
  ])
}

function update(model, action) {
  // ADD,
  // UPDATE,
  // REMOVE,
  // CLEAR
  switch(action.type) {
    case ADD:
      model.todos.push({
        id: model.nextID,
        todo: todo.init()
      })
      model.nextID++
      break
    case UPDATE:
      model.todos = model.todos.map(item => {
        if (item.id === action.id) {
          item.todo = todo.update(item.todo, action.data)
        }
        return item
      })
      break;
    case REMOVE:
      debugger;
      model.todos = model.todos.filter(item => !item.id === action.id)
      break
    case CLEAR:
      model = init()
      break
    default:
      break
  }
  return model
}

export default { view, update, action, init }