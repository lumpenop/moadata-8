import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { store } from './states'
import i18n from 'utils/locale'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

import userData from 'data/user_list.json'
import heartrate from 'data/heartrate_136_0226_user1.json'

import Routes from './routes'

import store2 from 'store'

store2.clearAll()
store2.set('userManagement', userData)
console.log(userData)
store2.set('heartrate', heartrate)

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false } },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Provider store={store}>
          <RecoilRoot>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </RecoilRoot>
        </Provider>
      </QueryClientProvider>
    </I18nextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
