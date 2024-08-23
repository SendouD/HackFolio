import { useState, useEffect, useRef } from "react";
import Org_form from "../components/Org_form";
import Org_page from "../components/Org_page.jsx";

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
                {
                    (isOpen) ? 
                    <Org_form setFalse={setFalse}/> :
                    <Org_page setTrue={setTrue}/>
                } 
            </div>
        </>
    );
}

export default Hack_org