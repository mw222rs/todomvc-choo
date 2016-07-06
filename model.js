const xtend = require('xtend')

module.exports = {
  state: {
    // UI state
    editing: null,
    name: '',
    filter: '',
    // real state
    counter: 0,
    todos: []
  },
  reducers: {
    initLocalstorageData: (data, state) => xtend({}, state, data),
    updateNew: (data, state) => ({ name: data.payload }),
    add: (data, state) => ({
      counter: state.counter + 1,
      name: '',
      todos: state.todos.concat({ id: state.counter, name: state.name, done: false })
    }),
    toggle: (data, state) => ({
      todos: state.todos.map(todo => {
        if (todo.id === data.payload) {
          return xtend({}, todo, { done: !todo.done })
        } else {
          return todo
        }
      })
    }),
    edit: (data, state) => ({ editing: data.payload }),
    cancelEditing: (data, state) => ({ editing: null }),
    update: (data, state) => ({
      editing: null,
      todos: state.todos.map(todo => {
        if (todo.id === data.payload.id) {
          return xtend({}, todo, { name: data.payload.name })
        } else {
          return todo
        }
      })
    }),
    delete: (data, state) => ({
      todos: state.todos.filter(todo => todo.id !== data.payload)
    }),
    clearCompleted: (data, state) => ({
      todos: state.todos.filter(todo => !todo.done)
    }),
    toggleAll: (data, state) => {
      const allDone = state.todos.every(todo => todo.done)
      return {
        todos: state.todos.map(todo => xtend({}, todo, { done: !allDone }))
      }
    },
    filter: (data, state) => ({ filter: data.payload })
  },
  subscriptions: {
    init: (send, done) => {
      const savedstr = window.localStorage.getItem('SAVESTATE') || '{}'
      const initialState = JSON.parse(savedstr).data

      send('initLocalstorageData', initialState, done)
    }
  }
}
