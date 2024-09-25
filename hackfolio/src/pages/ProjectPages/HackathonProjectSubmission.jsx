import HackathonDetailsDisplay from "../../components/HackathonComponents/HackathonDetailsDisplay";
import Header from "../../components/Header";
import HackathonProjectSubmissionForm from "../../components/ProjectComponents/HackathonProjectSubmissionForm";


function HackathonProjectSubmission() {


    return(
        <>
            <Header />
            <div className="flex justify-center mt-[20px]">
                <HackathonProjectSubmissionForm />
            </div>
        </>
    );
}

export default HackathonProjectSubmission