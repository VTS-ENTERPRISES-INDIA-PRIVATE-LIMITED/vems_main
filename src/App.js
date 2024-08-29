import './App.css';
import Dasboard from './Components/Dasboard';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="dashboardcomponents">
      <Sidebar />
      <Dasboard />
      </div>

    </div>
  );
}

export default App;
