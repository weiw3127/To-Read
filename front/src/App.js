import HomePage from './cpn/HomePage';
import Article from './cpn/Article';
import {
  BrowserRouter as Router, 
  Route,
  Routes
} from 'react-router-dom'



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/article/:Id" element={<Article/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
