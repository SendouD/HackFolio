import Hack_org from "./pages/hack_org"
import { Routes, Route } from "react-router-dom"

function App() {
  
  
  return(
    <>
      <Routes>
        <Route path="/createHackathon" element={<Hack_org />}/>
      </Routes>
    </>
  );
}

export default App