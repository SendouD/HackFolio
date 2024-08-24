import Hack_org from "./pages/Hack_org"
import { Routes, Route } from "react-router-dom"
import ProjectSubmissionForm from "./pages/project_submission_form";

function App() {
  
  
  return(
    <>
      <Routes>
        <Route path="/" element={<Hack_org />}/>
        <Route path="/project_form" element={<ProjectSubmissionForm></ProjectSubmissionForm>}/>
      </Routes>
    </>
  );
}

export default App