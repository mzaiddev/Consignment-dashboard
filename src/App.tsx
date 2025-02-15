import ConsigneePlatform from "./pages/Consignee/ConsigneeDashboard";
import DKCPlatform from "./pages/Consigner/testingUI";

function App() {
  const user = "x";

  return (
     user === "x" ? <DKCPlatform/>: <ConsigneePlatform/> 
      
    
  )
}

export default App
