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
    updateNew: (data, state, prev) => ({ name: data.payload }),
    add: (data, state, prev) => ({
      counter: state.counter + 1,
      name: '',
      todos: state.todos.concat({ id: state.counter, name: state.name, done: false })
    }),
    toggle: (data, state, prev) => ({
      todos: state.todos.map(todo => {
        if (todo.id === data.payload) {
          return xtend({}, todo, { done: !todo.done })
        } else {
          return todo
        }
      })
    }),
    edit: (data, state, prev) => ({ editing: data.payload }),
    cancelEditing: (data, state, prev) => ({ editing: null }),
    update: (data, state, prev) => ({
      editing: null,
      todos: state.todos.map(todo => {
        if (todo.id === data.payload.id) {
          return xtend({}, todo, { name: data.payload.name })
        } else {
          return todo
        }
      })
    }),
    delete: (data, state, prev) => ({
      todos: state.todos.filter(todo => todo.id !== data.payload)
    }),
    clearCompleted: (data, state, prev) => ({
      todos: state.todos.filter(todo => !todo.done)
    }),
    toggleAll: (data, state, prev) => {
      const allDone = state.todos.every(todo => todo.done)
      return {
        todos: state.todos.map(todo => xtend({}, todo, { done: !allDone }))
      }
    },
    filter: (data, state, prev) => ({ filter: data.payload })
  }
}
