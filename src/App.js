import './App.css';
import VisitInfiniteScroll from './pages/VisitInfiniteScroll';

function App() {
  return (
    // html :  class
    // jsx  :  className

    <div className="App MyColor">
      <h2>:::: 방명록 ::::</h2>  
      <hr></hr>
      
      <VisitInfiniteScroll />
    </div>
        
  );
}

export default App;
