import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsigneePlatform from "./pages/Consignee/ConsigneeDashboard";
import DKCPlatform from "./pages/Consigner/testingUI";
import EntryRoute from './pages/EntryRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/consigner" element={<DKCPlatform />} />
        <Route path="/consignee" element={<ConsigneePlatform />} />
        <Route path="/" element={<EntryRoute/>} />
      </Routes>
    </Router>
  );
}

export default App;