import { Routes, Route } from "react-router-dom"

//common

import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/RegistrationPages/SignIn";
import SignUp from "./pages/RegistrationPages/SignUp";
import HomePage from "./pages/UserPages/HomePage";
import AuthCheck from "./components/AuthCheck";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";

//SuccessRoutes
import SponsorSuccessPage from "./pages/successPages/SponsorSuccess";
import ProjectSuccessPage from "./pages/successPages/projectFormSuccess";


//Projects
import Project_display from "./pages/ProjectPages/ProjectDisplay";
import SubmissionForm from "./pages/UserPages/SubmissionForm";
import UserProjects from "./pages/ProjectPages/UserProjects";
import HackathonProjectDispay from "./pages/hackathon_projects";
import UserDashboard from "./pages/UserPages/UserDashboard";

//Hackathons
import MyOrganizedHackathons from "./pages/MyOrganizedHackathons";
import EditOrganizedHackathonDetails from "./pages/EditOrganizedHackathonDetails";
import FillFullHackathonDetails from "./pages/FillFullHackathonDetails";
import AllHackathonsDisplay from "./pages/AllHackathonsDisplay";
import HackathonWebpage from "./pages/HackathonWebpage";
import CreateHackathon from "./pages/CreateHackathon"
import HackathonRegistrationPage from "./pages/HackathonRegistrationPage";
import HackathonTeamPage from "./pages/HackathonTeamPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthCheck/>}>


          {/* Normal Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Project_display/>} path="/ProjectDisplay/:projectId" />
          <Route element={<UserDashboard/>} path="/@/:username" />
        
          {/* <Route path="/HackathonProjects" element={<HackathonProjectDispay/>}/> */}
        
         
          <Route path="/hackathons" element={<AllHackathonsDisplay />} />
          <Route path="/hackathon/:name" element={<HackathonWebpage />} />
          <Route path="/organizedHackathons/:name" element={<EditOrganizedHackathonDetails />} /> 




          {/* Success Pages */}
          <Route element={<ProjectSuccessPage />} path="/uploadsuccess" />
          <Route element={<SponsorSuccessPage />} path="/sponsoruploadsuccess" />









          {/* User private routes */}
          <Route element={<PrivateRoute role="User" />}>
            <Route path="/projectForm" element={<SubmissionForm formName="projectForm" />}/>
            <Route path="/sponsorForm" element={<SubmissionForm formName="sponsorForm" />}/>
            <Route path="/createHackathon" element={<CreateHackathon />} />
            <Route path="/completeHackathonCreation/:name" element={<FillFullHackathonDetails />} />
            <Route path="/organizedHackathons" element={<MyOrganizedHackathons />} />
            <Route path="/hackathon/:name/register" element={<HackathonRegistrationPage />} />
            <Route element={<UserProjects />} path="/userProjects" />
            <Route path="/hackathon/:name/team" element={<HackathonTeamPage />} />
          </Route>




          {/* Admin Private Routes */}
          <Route element={<PrivateRoute role="Admin" />}>
          <Route element={<AdminDashboard />} path="/adminDashboard" />
          </Route>
              
        </Route>

      </Routes>
    </>
  );
}

export default App;
