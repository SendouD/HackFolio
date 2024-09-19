import { useState, useEffect,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Org_form3(props) {
    const aboutRef = useRef(null);
    const prizeRef = useRef(null);
    const imgInpRef = useRef(null);
    const imgRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const inputElement = imgInpRef.current;
        
        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgRef.current.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        inputElement.addEventListener('change', handleImageChange);

        return () => {
            inputElement.removeEventListener('change', handleImageChange);
        };
    }, []);

    async function handleSubmit(e) {
        const aboutHack = aboutRef.current.value;
        const aboutPrize = prizeRef.current.value;
        console.log(aboutPrize);
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${id}/2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ aboutHack, aboutPrize }),
            });
            console.log(response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate(`/createHackathon`);

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{marginTop:"30px"}}>
                {/* <div style={{height:"300px",width:"100px"}}/> */}
                <div className="flex">
                    <div>
                        <div style={{padding:"30px",paddingTop:"0px",border:"solid 2px rgb(220, 220, 220)",borderRadius:"20px"}}>
                            <div className="hackathon-poster">
                                <img className="h-full w-full " ref={imgRef} style={{borderRadius:"20px"}}>

                                </img>
                            </div>

                            <input type="file" id="img" name="img" accept="image/*" style={{marginTop:"20px"}} ref={imgInpRef}/>

                            <div className="about-hack flex justify-center" style={{marginTop:"20px",height:"800px"}}>
                                <textarea type="text" className="min-h-full w-11/12" placeholder='Enter about the hackathon' ref={aboutRef}/>
                            </div>

                            <div className="about-hack flex justify-center" style={{marginTop:"20px",height:"200px"}}>
                                <textarea type="text" className="min-h-full w-11/12" placeholder='Enter about prizes' ref={prizeRef}/>
                            </div>
                        </div>
                        <div className='flex'>
                            <button className="px-6 py-3 bg-indigo-600 text-2xl hover:bg-indigo-700 text-white font-bold rounded my-5" style={{borderRadius:"10px"}} onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <div className="hack-info-card flex flex-col justify-between" style={{marginLeft:"30px"}}>
                            <div>

                            </div>

                            <div className='flex justify-center'>
                                <button 
                                    className="w-11/12 text-xl bg-gray-400 text-white py-4 rounded-md font-semibold cursor-default"
                                >
                                    Apply now
                                </button>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Org_form3