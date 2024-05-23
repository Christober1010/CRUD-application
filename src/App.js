import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './Components/Form';
import List from './Components/List';
import Navbar from './Components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Form/>}></Route>
          <Route path='/list' element={<List/>}></Route>
        </Routes>
        <Toaster></Toaster>
      </BrowserRouter>

    </>
  );
}

export default App;
