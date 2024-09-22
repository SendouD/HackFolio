import { Routes, Route } from "react-router-dom"

//common
import SuccessPage from "./pages/projectSuccessUpload";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import AuthCheck from "./components/AuthCheck";
import AdminDashboard from "./pages/AdminDashboard";


//Projects
import Project_display from "./pages/ProjectDisplay";
import ProjectSubmissionForm from "./pages/ProjectSubmissionForm";
import UserProjects from "./pages/UserProjects";
import HackathonProjectDispay from "./pages/hackathon_projects";
import UserDashboard from "./pages/UserDashboard";

//Hackathons
import MyOrganizedHackathons from "./pages/MyOrganizedHackathons";
import EditOrganizedHackathonDetails from "./pages/EditOrganizedHackathonDetails";
import FillFullHackathonDetails from "./pages/FillFullHackathonDetails";
import AllHackathonsDisplay from "./pages/AllHackathonsDisplay";
import HackathonWebpage from "./pages/HackathonWebpage";
import CreateHackathon from "./pages/CreateHackathon"
import HackathonRegistrationPage from "./pages/HackathonRegistrationPage";

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
          <Route element={<SuccessPage />} path="/uploadsuccess" />
          {/* <Route path="/HackathonProjects" element={<HackathonProjectDispay/>}/> */}
          <Route path="/projectForm" element={<ProjectSubmissionForm />}/>
          <Route element={<SuccessPage />} path="/uploadsuccess" />
          <Route path="/hackathons" element={<AllHackathonsDisplay />} />
          <Route path="/hackathon/:name" element={<HackathonWebpage />} />
          <Route path="/organizedHackathons/:name" element={<EditOrganizedHackathonDetails />} /> 





          {/* User private routes */}
          <Route element={<PrivateRoute role="User" />}>
            <Route path="/createHackathon" element={<CreateHackathon />} />
            <Route path="/completeHackathonCreation/:name" element={<FillFullHackathonDetails />} />
            <Route path="/organizedHackathons" element={<MyOrganizedHackathons />} />
            <Route path="/hackathon/:name/register" element={<HackathonRegistrationPage />} />
            <Route element={<UserProjects />} path="/userProjects" />
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
