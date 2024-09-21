import { useState, useEffect,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ResizableTextArea from './ResizableTextArea';

function EditHackathonWebsite() {
    const [data, setData] = useState(null);
    const [hackName,setHackName] = useState("");
    const imgInpRef = useRef(null);
    const imgRef = useRef(null);
    const aboutRef = useRef(null);
    const prizeRef = useRef(null);
    const [otherFields, setOtherFields] = useState([]);
    const navigate = useNavigate();
    const { name } = useParams();

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

        getWebInfo();

        return () => {
            inputElement.removeEventListener('change', handleImageChange);
        };
    }, []);

    async function getWebInfo() {
        try {
            const response = await fetch(`/api/hackathon/updateHackWebsite/${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
            setHackName(arr.data.hackathonName);
            aboutRef.current.value = arr.data.aboutHack;
            prizeRef.current.value = arr.data.aboutPrize;
            setOtherFields(arr.data.otherFields);
            handleTextChange(aboutRef.current,aboutRef);
            handleTextChange(prizeRef.current,prizeRef);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleSubmit() {
        const aboutHack = aboutRef.current.value;
        const aboutPrize = prizeRef.current.value;
        try {
            const response = await fetch(`/api/hackathon/updateHackWebsite/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    aboutHack, 
                    aboutPrize, 
                    otherFields,
                }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(response);
            navigate(`/organizedHackathons/${name}`);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function addField() {
        setOtherFields([...otherFields, { key: '', value: '' }]);
    }

    function removeField(ind) {
        const newArr = [...otherFields.slice(0, ind), ...otherFields.slice(ind + 1)];
        setOtherFields(newArr);
    }

    function handleFieldChange(index, fieldType, value) {
        const updatedFields = otherFields.map((field, i) =>
            i === index ? { ...field, [fieldType]: value } : field
        );
        setOtherFields(updatedFields);
    }

    function handleTextChange(e,textRef) {
        textRef.current.style.height = "0px";
        const scrollHeight = textRef.current.scrollHeight;
        textRef.current.style.height = scrollHeight + "px";
    }

    return(
        <>
            <div className="text-2xl mb-3 flex justify-center font-bold">This is what your website will display!</div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{marginTop:"30px"}}>
                    <div className="flex w-full h-full">
                        <div>
                            <div style={{padding:"30px",paddingTop:"0px",border:"solid 2px rgb(220, 220, 220)",borderRadius:"20px"}}>
                                <div className="hackathon-poster w-[500px] h-52">
                                    <img className="h-full w-full " ref={imgRef} style={{borderRadius:"5px"}}>

                                    </img>
                                </div>

                                <input type="file" id="img" name="img" accept="image/*" style={{marginTop:"20px"}} ref={imgInpRef}/>

                                <div className="about-hack w-[500px]" style={{ marginTop: "20px" }}>
                                    <div className='text-2xl font-medium mb-5 flex justify-center'>About Hackathon: </div>
                                    <div className='flex justify-center'>
                                        <textarea
                                            type="text"
                                            className="min-h-[75px] w-11/12 resize-y border rounded-md p-2 overflow-y-hidden"
                                            placeholder="Enter about the hackathon"
                                            ref={aboutRef}
                                            onChange={(e)=>handleTextChange(e,aboutRef)}
                                        />
                                    </div>
                                </div>

                                <div className="about-hack w-[500px]" style={{ marginTop: "20px" }}>
                                    <div className='text-2xl font-medium mb-5 flex justify-center'>About Prizes:</div>
                                    <div className='flex justify-center'>
                                        <textarea
                                            type="text"
                                            className="min-h-[75px] w-11/12 resize-y border rounded-md p-2 overflow-y-hidden"
                                            placeholder="Enter about prizes"
                                            ref={prizeRef}
                                            onChange={(e)=>handleTextChange(e,prizeRef)}
                                        />                                        
                                    </div>
                                </div>
                                {
                                    otherFields.map((field, i) => (
                                        <div key={i} className="about-hack w-[500px]" style={{ marginTop: "20px" }}>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="h-[25%] w-11/12 mb-3 font-medium text-2xl border rounded-md p-2"
                                                    placeholder="Enter field name"
                                                    value={field.key}
                                                    onChange={(e) => handleFieldChange(i, 'key', e.target.value)}
                                                />
                                                <ResizableTextArea
                                                    className="h-[75%] w-11/12 resize-y border rounded-md p-2"
                                                    placeholder="Enter field value"
                                                    val={field.value}
                                                    otherFields={otherFields}
                                                    setOtherFields={setOtherFields}
                                                    ind={i}
                                                />
                                                <div className='flex justify-end'>
                                                    <button className='remove-link-btn1 edit-btn mt-2 mr-0 ml-2' onClick={() => removeField(i)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button onClick={addField} className="add-link-btn edit-btn py-2 px-3 mt-[20px]">
                                    Add more fields
                                </button>
                            </div>

                            <div className='flex'>
                                <button className="px-4 py-2 bg-indigo-600 text-xl hover:bg-indigo-700 text-white font-bold rounded my-5" style={{borderRadius:"10px"}} onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <div className="hack-info-card flex flex-col justify-between w-[250px] h-28" style={{marginLeft:"30px"}}>
                                <div>
                                    From: To:
                                </div>

                                <div className='flex justify-center'>
                                    <button 
                                        className="w-11/12 text-sm p-1 bg-gray-400 text-white rounded-md font-semibold cursor-default"
                                    >
                                        Apply
                                    </button>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    ); 
}

export default EditHackathonWebsite