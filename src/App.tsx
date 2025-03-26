import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsigneePlatform from "./pages/Consignee/ConsigneeDashboard";
import ConsignorDashboard from './pages/Consigner/ConsignorDashboard';
import AuthSystemPreview from './pages/Login';
import ConsignmentDashboard from './pages/Admin/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consignor" element={<ConsignorDashboard/>} />
        <Route path="/consignee" element={<ConsigneePlatform />} />
        <Route path="/" element={<AuthSystemPreview/>}/>
        <Route path="/admin" element={<ConsignmentDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;