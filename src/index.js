import React from 'react'
import { render } from 'react-dom'
import 'typeface-ubuntu'
import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

render(<App />, document.getElementById('root'))
registerServiceWorker()
