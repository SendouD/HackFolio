import { Routes, Route } from "react-router-dom"
import Hack_org from "./pages/Hack_org"
import ProjectSubmissionForm from "./pages/project_submission_form";
import Org_form_completion from "./components/Org_form_completion";
import SuccessPage from "./pages/project_successupload";
import Hack_disp from "./pages/Hack_disp";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  
  
  return(
    <>
      <Routes>
      <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
            <Route element={<SuccessPage/>} path="/uploadsuccess" />
        </Route>
        <Route path="/createHackathon" element={<Hack_org />}/>
        <Route path="/project_form" element={<ProjectSubmissionForm />}/>
        <Route path="/completeHackathonCreation/:id" element={<Org_form_completion />}/>
        {/* <Route path="/uploadsuccess" element={<SuccessPage/>}/> */}
        <Route path="/hackathons" element={<Hack_disp />}/>
      </Routes>
    </>
  );
}

export default App