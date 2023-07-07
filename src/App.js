import './App.css';
import { Login } from './Login';
import { DogFinder } from './DogFinder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    
    <div className="App" >
      <Routes>
        <Route path='/' element={<Login />} /> 
        <Route path='/dogfinder' element={<DogFinder />} /> 
      </Routes>      
    </div>
    </BrowserRouter>
  );
}

export default App;
