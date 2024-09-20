import { useState } from "react";
import Org_form2 from "./Org_form2";
import Org_form3 from "./Org_form3";

function Org_form_completion() {
    const [completed, setCompleted] = useState(0);

    return (
        <>
            {completed === 0 && 
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">
                            You're Almost There: Just 2 Steps to Launch Your Hackathon!
                        </h1>
                    </div>
                    <div className="space-y-8">
                        <Org_form2 completed={completed} setCompleted={setCompleted} />
                        {/* {completed === 2 && <Org_form4 completed={completed} setCompleted={setCompleted} />} */}
                    </div>
                    {/* <div className="mt-8">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${(completed / 2) * 100}%` }}
                            ></div>
                        </div>
                        <div className="text-center text-gray-500 mt-2">
                            Step {completed + 1} of 3
                        </div>
                    </div> */}
                </div>
            </div>
            }
            {completed === 1 && <Org_form3 completed={completed} setCompleted={setCompleted} />}
        </>
    );
}

export default Org_form_completion;
