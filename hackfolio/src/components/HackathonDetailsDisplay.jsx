import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "../styles/hack_detailed_info.css"

function HackathonDetailsDisplay() {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        aboutHack: '',
        aboutPrize: ''
    });
    
    useEffect(() => {
        getWebInfo();
    },[])

    async function getWebInfo() {
        try {
            const response = await fetch(`/api/hackathon/updateHackWebsite/${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            console.log(arr.data);
            setData(arr.data);
            setFormData({
                aboutHack: arr.data.aboutHack,
                aboutPrize: arr.data.aboutPrize
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(
        <div style={{padding:"30px",paddingTop:"0px",border:"solid 2px rgb(220, 220, 220)",borderRadius:"20px"}}>
            <div className="hackathon-poster">

            </div>

            <div className="about-hack" style={{marginTop:"20px"}}>
                <div className='text-4xl font-medium mb-5'>About Hackathon: </div>
                {formData.aboutHack}
            </div>
            <div className="about-hack" style={{marginTop:"20px"}}>
                {formData.aboutPrize}
            </div>
        </div>
    );
}

export default HackathonDetailsDisplay