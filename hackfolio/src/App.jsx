import { Routes, Route } from "react-router-dom"

//common
import SuccessPage from "./pages/projectSuccessUpload";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";

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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route element={<SuccessPage />} path="/uploadsuccess" />
          <Route element={<UserProjects />} path="/userProjects" />
          <Route path="/createHackathon" element={<Hack_org />} />
          <Route
            path="/completeHackathonCreation/:id"
            element={<Org_form_completion />}
          />
          <Route path="organizedHackathons" element={<My_hackathons />} />
        </Route>
        <Route element={<Project_display/>} path="/ProjectDisplay/:projectId" />
       
        <Route element={<UserDashboard/>} path="/UserDashBoard" />
       
        {/* <Route path="/HackathonProjects" element={<HackathonProjectDispay/>}/> */}
        <Route path="/project_form" element={<ProjectSubmissionForm />}/>
        {/* <Route path="/uploadsuccess" element={<SuccessPage/>}/> */}

        <Route element={<PrivateRoute/>}>
          <Route path="/createHackathon" element={<CreateHackathon />}/>
          <Route path="/completeHackathonCreation/:name" element={<FillFullHackathonDetails />}/>
          <Route path="/organizedHackathons" element={<MyOrganizedHackathons />}/>
        </Route>
        <Route path="/hackathons" element={<AllHackathonsDisplay />}/>
        <Route path="/hackathon/:name" element={<HackathonWebpage />} />
        <Route path="/organizedHackathons/:name" element={<EditOrganizedHackathonDetails />} />
      </Routes>
    </>
  );
}

export default App;
