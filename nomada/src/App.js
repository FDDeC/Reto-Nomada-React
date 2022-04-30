import {  
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import DragAndDrop from './components/DragAndDrop'
import ActorDetails from './components/ActorDetails';

function App() {
  return (
    <div className="App"> 
      <Routes>
        <Route exact path="/" element={<DragAndDrop />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
        <Route path='*' element={ <Navigate to="/" replace /> } />
      </Routes>
    </div>
  );
}

export default App;
