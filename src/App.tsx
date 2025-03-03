import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsigneePlatform from "./pages/Consignee/ConsigneeDashboard";
import DKCPlatform from "./pages/Consigner/testingUI";
import AuthSystemPreview from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consigner" element={<DKCPlatform />} />
        <Route path="/consignee" element={<ConsigneePlatform />} />
        <Route path="/" element={<AuthSystemPreview/>}/>
      </Routes>
    </Router>
  );
}

export default App;