import { useState, useEffect, useRef } from "react";
import HackathonCreationForm from "../components/HackathonCreationForm.jsx";
import HackathonRegisterWebpage from "../components/HackathonRegisterWebpage.jsx";
import Header from "../components/Header.jsx";
import "../styles/hack_org_form.css"

function CreateHackathon() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    },[]);

    function setTrue() {
        setIsOpen(true);
    }

    function setFalse() {
        setIsOpen(false);
    }

    return(
        <>
            <Header></Header>
            <div>
                <HackathonRegisterWebpage setTrue={setTrue}/>
                {
                    (isOpen) ? <HackathonCreationForm setFalse={setFalse}/> : <></>
                } 
            </div>
        </>
    );
}

export default CreateHackathon