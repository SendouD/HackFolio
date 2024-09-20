import { useState,useEffect,useRef } from 'react'

function EditOrganizedHackathon() {
    const [] = useState(0);

    return(
        <>
            <div>
                <button>Details</button>
                <button>Webpage</button>
            </div>
            {
                (temp == 0) ? 
                <div>
                    EditHackathon
                </div> :
                <div>

                </div>
            }
        </>
    );
}

export default EditOrganizedHackathon