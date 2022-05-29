import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { store } from './states'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

import Routes from './routes'
import { RecoilRoot } from 'recoil'
import store2 from 'store'

import userData from 'data/user_list.json'

store2.set('useManagement', userData)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
