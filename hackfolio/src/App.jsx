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
import HackathonProjectDispay from "./pages/HackathonPages/Hackathon_projects";
import UserDashboard from "./pages/UserPages/UserDashboard";

//Hackathons
import OrganizedHackathonsDisplay from "./pages/HackathonPages/OrganizedHackathonsDisplay";
import EditOrganizedHackathonDetails from "./pages/HackathonPages/EditOrganizedHackathonDetails";
import FillFullHackathonDetails from "./pages/HackathonPages/FillFullHackathonDetails";
import AllHackathonsDisplay from "./pages/HackathonPages/AllHackathonsDisplay";
import HackathonWebpage from "./pages/HackathonPages/HackathonWebpage";
import CreateHackathon from "./pages/HackathonPages/CreateHackathon"
import HackathonRegistrationPage from "./pages/HackathonPages/HackathonRegistrationPage";
import EditRegisteredHackathonDetails from "./pages/HackathonPages/EditRegisteredHackatonDetails";
import RegisteredHackathonsDisplay from "./pages/HackathonPages/RegisteredHackathonsDisplay";

//Chat
import ChatPage from "./pages/ChatPages/ChatPage";

//Sponsors
import SponsorList from "./pages/SponsorPages/SponsorsList";
import SponsorDetail from "./components/SponsorComponents/SponsorDetail";
import SponsorsDashboard from "./pages/SponsorPages/SponsorsDashboard";



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
          <Route element={<SponsorList />} path="/sponsors" />
          <Route element={<SponsorDetail />} path="/sponsors/:companyName" />
        
          {/* <Route path="/HackathonProjects" element={<HackathonProjectDispay/>}/> */}
          <Route path="/hackathons" element={<AllHackathonsDisplay />} />
          <Route path="/hackathon/:name" element={<HackathonWebpage />} />

          {/* Success Pages */}
          <Route element={<ProjectSuccessPage />} path="/uploadsuccess" />
          <Route element={<SponsorSuccessPage />} path="/sponsoruploadsuccess" />
          


          {/* User private routes */}
          <Route element={<PrivateRoute role="User" />}>
            <Route path="/projectForm" element={<SubmissionForm formName="projectForm" />}/>
            <Route path="/sponsorForm" element={<SubmissionForm formName="sponsorForm" />}/>
            <Route path="/createHackathon" element={<CreateHackathon />} />
            <Route path="/completeHackathonCreation/:name" element={<FillFullHackathonDetails />} />
            <Route path="/organizedHackathons" element={<OrganizedHackathonsDisplay />} />
            <Route path="/hackathon/:name/register" element={<HackathonRegistrationPage />} />
            <Route path="/userProjects" element={<UserProjects />} />
            <Route path="/organizedHackathons/:name" element={<EditOrganizedHackathonDetails />} /> 
            <Route path="/hackathon/:name/editRegistrationDetails" element={<EditRegisteredHackathonDetails/>} />
            <Route path="/registeredHackathons" element={<RegisteredHackathonsDisplay />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/sponsorDashboard" element={<SponsorsDashboard />} />
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
