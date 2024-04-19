import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

import './css/main.css'

import VisitInfiniteScroll from './pages/VisitInfiniteScroll';
import VisitForm from './pages/VisitForm';

function App() {
  return (
    // html :  class
    // jsx  :  className

    <div className="App MyColor">
      <h2 className='title'>:::: 방명록 ::::</h2>  
      <hr></hr>
        <nav>
          <div className="btn-group btn-group-justified">
            <Link to="/" className='btn btn-success mybtn'>목록</Link>
            <Link to="/write" className='btn btn-success mybtn'>글쓰기</Link>
          </div>
        </nav>
      <hr></hr>
      
        <Routes> 
          <Route path="/" element={<VisitInfiniteScroll />} /> 
          <Route path="/write" element={<VisitForm />} /> 
        </Routes> 
    </div>
        
  );
}

export default App;
