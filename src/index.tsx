import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import IndexedDBProvider from 'use-indexeddb'

import { store } from './states'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

import Routes from './routes'

const idbConfig = {
  databaseName: 'moadata-db',
  version: 1,
  stores: [
    {
      name: 'Admin',
      id: { keyPath: 'id', autoIncrement: true },
      indices: [
        { name: 'admin_id', keyPath: 'admin_id' },
        { name: 'password', keyPath: 'password' },
      ],
    },
    {
      name: 'User',
      id: { keyPath: 'id', autoIncrement: true },
      indices: [
        { name: 'user_id', keyPath: 'user_id' },
        { name: 'seq', keyPath: 'seq', options: { unique: true } },
        { name: 'created_date', keyPath: 'created_date' },
      ],
    },
    {
      name: 'HeartRate',
      id: { keyPath: 'id', autoIncrement: true },
      indices: [
        { name: 'seq', keyPath: 'seq' },
        { name: 'member_seq', keyPath: 'member_seq' },
        { name: 'avg_beat', keyPath: 'avg_beat' },
        { name: 'crt_ymdt', keyPath: 'crt_ymdt' },
      ],
    },
    {
      name: 'Step',
      id: { keyPath: 'id', autoIncrement: true },
      indices: [
        { name: 'seq', keyPath: 'seq' },
        { name: 'member_seq', keyPath: 'member_seq' },
        { name: 'steps', keyPath: 'steps' },
        { name: 'minutes', keyPath: 'minutes' },
        { name: 'distance', keyPath: 'distance' },
        { name: 'calorie', keyPath: 'calorie' },
        { name: 'crt_ymdt', keyPath: 'crt_ymdt' },
      ],
    },
  ],
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IndexedDBProvider config={idbConfig}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </IndexedDBProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
