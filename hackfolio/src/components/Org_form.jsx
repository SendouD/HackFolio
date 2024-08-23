
function Org_form(props) {
    return(
        <>
            <button onClick={props.setFalse}>close form</button>
            <form action="post">
                <input type="text" placeholder="What are you calling your Hackathon?" />
                <input type="text" placeholder="University you are representing?" />
            </form>
        </>
    );
}

export default Org_form