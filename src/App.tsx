import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsigneePlatform from "./pages/Consignee/ConsigneeDashboard";
import DKCPlatform from "./pages/Consigner/testingUI";
import AuthSystemPreview from './pages/Login';
import ConsignmentDashboard from './pages/Admin/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consignor" element={<DKCPlatform />} />
        <Route path="/consignee" element={<ConsigneePlatform />} />
        <Route path="/" element={<AuthSystemPreview/>}/>
        <Route path="/admin" element={<ConsignmentDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;