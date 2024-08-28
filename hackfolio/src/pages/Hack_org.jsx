import { useState, useEffect, useRef } from "react";
import Org_form from "../components/Org_form";
import Org_page from "../components/Org_page.jsx";
import "../styles/hack_org_form.css"

function Hack_org() {
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
            <div>
                <Org_page setTrue={setTrue}/>
                {
                    (isOpen) ? <Org_form setFalse={setFalse}/> : <></>
                } 
            </div>
        </>
    );
}

export default Hack_org