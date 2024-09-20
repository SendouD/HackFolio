import { useState, useEffect,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditHackathonWebsite() {
    const [data, setData] = useState(null);
    const [hackName,setHackName] = useState("");
    const imgInpRef = useRef(null);
    const imgRef = useRef(null);
    const navigate = useNavigate();
    const { name } = useParams();

    const [formData, setFormData] = useState({
        aboutHack: '',
        aboutPrize: ''
    });
    const [editableFields, setEditableFields] = useState({
        aboutHack: false,
        aboutPrize: false
    });

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

    useEffect(() => {
        console.log(formData);
    },[formData])

    async function getWebInfo() {
        try {
            const response = await fetch(`/api/hackathon/updateHackWebsite/${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            console.log(arr.data);
            setData(arr.data);
            setHackName(arr.data.hackathonName);
            setFormData({
                aboutHack: arr.data.aboutHack,
                aboutPrize: arr.data.aboutPrize
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleSubmit() {
        try {
            const response = await fetch(`/api/hackathon/updateHackWebsite/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            console.log(await response.json())
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function handleEdit(field) {
        setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return(
        <>
            <div className="text-2xl mb-3 flex justify-center font-bold">This is what your website will display!</div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{marginTop:"30px"}}>
                    <div className="flex w-full h-full">
                        <div>
                            <div style={{padding:"30px",paddingTop:"0px",border:"solid 2px rgb(220, 220, 220)",borderRadius:"20px"}}>
                                <div className="hackathon-poster w-[450px] h-52">
                                    <img className="h-full w-full " ref={imgRef} style={{borderRadius:"5px"}}>

                                    </img>
                                </div>

                                <input type="file" id="img" name="img" accept="image/*" style={{marginTop:"20px"}} ref={imgInpRef}/>

                                <div className="about-hack w-[450px] flex justify-center" style={{marginTop:"20px",height:"800px"}}>
                                    <textarea type="text" name="aboutHack" value={formData.aboutHack} className="min-h-full w-11/12 text-xs p-3" placeholder='Enter about the hackathon' onChange={handleChange} disabled={!editableFields["aboutHack"]}/>
                                </div>
                                <button onClick={() => handleEdit("aboutHack")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 edit-btn">
                                    {editableFields["aboutHack"] ? 'Save' : 'Edit'}
                                </button>

                                <div className="about-hack w-[450px] flex justify-center" style={{marginTop:"20px",height:"200px"}}>
                                    <textarea type="text" name="aboutPrize" value={formData.aboutPrize} className="min-h-full w-11/12 text-xs p-3" placeholder='Enter about prizes' onChange={handleChange} disabled={!editableFields["aboutPrize"]}/>
                                </div>
                                <button onClick={() => handleEdit("aboutPrize")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 edit-btn">
                                    {editableFields["aboutPrize"] ? 'Save' : 'Edit'}
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