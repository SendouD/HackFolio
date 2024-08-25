

function Org_page(props) {
    return(
        <>
            <div className="flex justify-center min-h-screen bg-gray-200 pt-16">
                <div className="text-center">
                    <div className="font-bold text-4xl mb-4">Organize a hackathon!</div>
                    <div className="w-5/12 mx-auto text-center mb-4 text-2xl text-gray-500">
                        Experience the excitement of organizing your own hackathon with HackPro! 
                        Where you can seamlessly manage applications, submissions, communications, 
                        reimbursements, and judging alongside hundreds of other events.
                    </div>
                    <button
                        onClick={props.setTrue}
                        className="bg-blue-500 text-white py-3 px-8 rounded text-2xl hover:bg-blue-700 transition-all mt-12"
                    >
                        Organize a hackathon on HackPro!
                    </button>
                </div>
            </div>
        </>
    );
}

export default Org_page