import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Results from './screens/Results';
import Welcome from './screens/Welcome';
import Loading from './screens/Loading';
import _layout from './screens/_layout';

function App() {


  return (

    <Router>
      <Routes>
        <Route path="/" element={<_layout />}>
          <Route index element={<Welcome />} />
          <Route path="home" element={<Welcome />} />
          <Route path="results" element={<Results />} />
          <Route path="loading" element={<Loading />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
