import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Routes from "@/routes"
import store from "@/redux/store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
