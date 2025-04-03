import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PlanList from './components/PlanList';
import PlanDetails from './components/PlanDetails';
import CreatePlan from './components/CreatePlan';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<PlanList />} />
            <Route path="/plans/create" element={<CreatePlan />} />
            <Route path="/plans/:id" element={<PlanDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
