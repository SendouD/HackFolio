


function NotificationsComponent() {

    function NotificationBox() {


        return(
            <div className="cursor-pointer flex bg-blue-500 mt-[12px] rounded border">
                <div className="flex items-center m-2 mr-0">
                    <div className="h-[7px] w-[7px] bg-white rounded-[10px]">

                    </div>
                </div>

                <div className="w-[100%] text-white rounded p-[10px]">
                    You have 5 unread messages from HIM
                </div>
            </div>
        );
    }

    return(
        <div className="bg-white w-[325px] rounded-[10px] ml-[100px] card-v p-4">
            <div className="flex justify-center text-3xl border-b p-3">
                Notifications
            </div>
            <div>
                <NotificationBox />
                <NotificationBox />
            </div>
        </div>
    );
}

export default NotificationsComponent