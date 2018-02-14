import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import registerServiceWorker from 'assets/registerServiceWorker'
import 'assets/index.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
