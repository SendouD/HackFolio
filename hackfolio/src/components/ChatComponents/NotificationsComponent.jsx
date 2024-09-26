import { useEffect, useState } from "react";



function NotificationsComponent(props) {
    const [data, setData] = useState([]);
    const [notis, setNotis] = useState({});

    useEffect(() => {
        getMessagesStatus();
    },[props.currUser,props.flag]);

    useEffect(() => {
        console.log("in");
        let temp = [];
        if(data.length !== 0) {
            data.data.map((ele,i) => {
                if(ele.from !== props.currUser) {
                    const from = ele.from;
                    if(!temp[from]){
                        temp[from] = 1;
                    }
                    else {
                        temp[from]++;
                    }
                }
            });
        }

        setNotis(temp);
    },[data])

    // useEffect(() => {
    //     console.log(notis);
    // },[notis]);

    async function getMessagesStatus() {
        try {
            const response = await fetch(`/api/chat/getReadStatus/${props.currUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');

            setData(await response.json());

        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    function NotificationBox(props1) {

        return(
            <div className="cursor-pointer flex bg-blue-500 mt-[12px] rounded border" onClick={() => props.setCurrUser(props1.from)}>
                <div className="flex items-center m-2 mr-0">
                    <div className="h-[7px] w-[7px] bg-white rounded-[10px]">

                    </div>
                </div>

                <div className="w-[100%] text-white rounded p-[10px]">
                    You have {props1.count} unread messages from {props1.from}
                </div>
            </div>
        );
    }

    return(
        <div className="bg-white w-[325px] rounded-[10px] ml-[50px] card-v p-4 mr-[10px]">
            <div className="flex justify-center text-3xl border-b p-3">
                Notifications
            </div>
            <div>
                {
                    Object.entries(notis).map(([from, count], i) => (
                        <div key={i}>
                            <NotificationBox from={from} count={count} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default NotificationsComponent