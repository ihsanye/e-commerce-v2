import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div>

      <RouterConfig />
      <ToastContainer autoClose={2500} />
    </div>
  )
}

export default App
