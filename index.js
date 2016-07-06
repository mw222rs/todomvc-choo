const choo = require('choo')
const mainView = require('./views/main')

const app = choo({
  // onAction: (action, state, name, caller, createSend) => {console.log(name, action)},
  onStateChange: (action, state, prev, caller, createSend) => {
    const str = JSON.stringify({data: state})
    window.localStorage.setItem('SAVESTATE', str)
  }
})
app.model(require('./model'))

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
