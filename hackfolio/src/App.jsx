import { Routes, Route } from "react-router-dom"
import Hack_org from "./pages/Hack_org"
import ProjectSubmissionForm from "./pages/ProjectSubmissionForm";
import Org_form_completion from "./components/Org_form_completion";
import SuccessPage from "./pages/project_successupload";
import Hack_disp from "./pages/Hack_disp";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Project_display from "./pages/ProjectDisplay";
import UserProjects from "./pages/UserProjects";
import HackathonProjectDispay from "./pages/hackathon_projects";
import Hackathon_page from "./pages/Hackathon_page";
import Org_form3 from "./components/Org_form3";

function App() {
  
  
  return(
    <>
      <Routes>
      <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute/>}>
            <Route element={<SuccessPage/>} path="/uploadsuccess" />
        </Route>
        <Route element={<Project_display/>} path="/ProjectDisplay/:projectId" />
        <Route element={<PrivateRoute/>}>
            <Route element={<UserProjects/>} path="/userProjects" />
        </Route>
        <Route path="/createHackathon" element={<Hack_org />}/>
        {/* <Route path="/HackathonProjects" element={<HackathonProjectDispay/>}/> */}
        <Route path="/project_form" element={<ProjectSubmissionForm />}/>
        <Route path="/completeHackathonCreation/:id" element={<Org_form_completion />}/>
        {/* <Route path="/uploadsuccess" element={<SuccessPage/>}/> */}
        <Route path="/hackathons" element={<Hack_cards_disp />}/>
        <Route path="/hackathon/:id" element={<Hackathon_page />} />
      </Routes>
    </>
  );
}

export default App