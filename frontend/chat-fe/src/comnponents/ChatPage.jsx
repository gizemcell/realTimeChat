import React, { useEffect, useState } from "react";
import axios from "axios"


function ChatPage() {
    const [receivedMessages, setReceivedMessages] = useState([])
    const [newMesssage, setNewMessage] = useState("")
    const BASE_URL = "http://localhost:8080/chat"
    const roomNo = 8;
    //get messages from database
    useEffect(() => {
        //databaseden verileri saniyeye gore cek
        getReceivedMessage(roomNo);
        const intervalId = setInterval(getReceivedMessage, 3000, roomNo)

        return () => {
            clearInterval(intervalId);
            console.log("Polling stopped");
        }
    }, [roomNo])

    const getReceivedMessage = async (id) => {
        console.log("receive");
        const url = BASE_URL + "/getMessage/" + id
        console.log(url);
        await axios.get(url).then((response) => {
            setReceivedMessages(response.data)
            console.log("Received response :", response.data)
        }).catch((err) => {
            console.log(err.message)
        });
    }

    const sendingMessage = async () => {
        const url = BASE_URL + "/sentMessage"
        await axios.post(url, { message: newMesssage, roomId: roomNo, }).then(function (response) {
            console.log("post response: ", response)
            setReceivedMessages(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (<div>
        <div>
            {receivedMessages.map((message, index) => {
                return <p key={index}>Received: {message.message}</p>
            })}
        </div>
        <div className="sendingMessage">
            <input type="text" placeholder="write your messages" value={newMesssage} onChange={(e) => { setNewMessage(e.target.value) }} />
            <button onClick={sendingMessage}>Send it</button>
        </div>

    </div>
    )


}








export default ChatPage


