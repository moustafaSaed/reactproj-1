import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Counter from './Pages/Counter';
import Css from './Pages/Css';
import Form from './Pages/Form';

function App() {


  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/mous/counter' element={<Counter />}></Route>
          <Route path='/mous/css' element={<Css />}></Route>
          <Route path='/mous/form' element={<Form />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
