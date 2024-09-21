import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/hack_detailed_info.css";

function HackathonDetailsDisplay() {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState({
        imageUrl: '',
        aboutHack: '',
        aboutPrize: '',
        otherFields: [],
    });

    useEffect(() => {
        getWebInfo();
    }, []);

    async function getWebInfo() {
        try {
            const response = await fetch(`/api/hackathon/updateHackWebsite/${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
            setFormData({
                imageUrl: arr.data.imageUrl,
                aboutHack: arr.data.aboutHack,
                aboutPrize: arr.data.aboutPrize,
                otherFields: arr.data.otherFields,
            });
            console.log(arr.data.imageUrl);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div style={{ padding: "30px", paddingTop: "0px", border: "solid 2px rgb(220, 220, 220)", borderRadius: "20px" }}>
            <img src={formData.imageUrl} className="hackathon-poster">
                
            </img>

            <div className="about-hack" style={{ marginTop: "20px" }}>
                <div className='text-4xl font-medium mb-5'>About Hackathon </div>
                <div style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                }}>
                    {formData.aboutHack}
                </div>
            </div>
            <div className="about-hack" style={{ marginTop: "20px" }}>
                <div className='text-4xl font-medium mb-5'>About Prizes</div>
                <div style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                }}>
                    {formData.aboutPrize}
                </div>
            </div>
            {
                formData.otherFields && formData.otherFields.map((field,i) => {
                    return(
                        <div key={i} className="about-hack" style={{ marginTop: "20px" }}>
                            <div className='text-4xl font-medium mb-5'>{field.key}</div>
                            <div style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {field.value}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default HackathonDetailsDisplay;
