import {BrowserRouter} from "react-router-dom"
import AuthContextProvider from "./utils/AuthContextProvider.jsx"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
     <BrowserRouter>
     <AuthContextProvider>
           <App />
     </AuthContextProvider>
     </BrowserRouter>
 
)
