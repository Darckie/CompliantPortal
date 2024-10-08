import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StyleProvider } from './css/globalcss.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './components/SidebarContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyleProvider>
        <SidebarProvider>


          <App />

        </SidebarProvider>
      </StyleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
