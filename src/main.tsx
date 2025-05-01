import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";
import './index.css'

const rootElem =  document.getElementById('root');

if (rootElem) {
  createRoot(rootElem).render(
    <StrictMode>
      <Provider store={store}>
        <App/>
        <ToastContainer position='top-center' />
      </Provider>
    </StrictMode>,
  )
} else {
  console.error("Root element not found");
}


