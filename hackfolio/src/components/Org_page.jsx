

function Org_page(props) {
    return(
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="font-bold text-4xl mb-4">Organize a hackathon!</div>
                    <div className="w-1/2 mx-auto text-center mb-4">
                        Experience the excitement of organizing your own hackathon with HackPro! 
                        Where you can seamlessly manage applications, submissions, communications, 
                        reimbursements, and judging alongside hundreds of other events.
                    </div>
                    <button
                        onClick={props.setTrue}
                        className="bg-blue-500 text-white py-3 px-8 rounded text-2xl"
                    >
                        Organize a hackathon on HackPro!
                    </button>
                </div>
            </div>
        </>
    );
}

export default Org_page