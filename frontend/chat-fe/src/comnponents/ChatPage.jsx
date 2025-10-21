import React, { useEffect, useState } from "react";
import axios from "axios"


function ChatPage() {
    const [receivedMessages, setReceivedMessages] = useState([])
    const [sendingMessages, setSendingMessages] = useState([])
    const [newMesssage, setNewMessage] = useState("")
    const BASE_URL = "http://localhost:8080/chat"
    const roomNo = 8;
    //get messages from database
    useEffect(() => {
        //databaseden verileri saniyeye gore cek
        getReceivedMessage(roomNo);
    }, [])
    useEffect(() => {
        //send newMessage to database
        if (sendingMessages.length != 0) {
            sendingMessage();
        }
    }, [sendingMessages])

    const getReceivedMessage = async (id) => {
        console.log(roomNo);
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
        await axios.post(url, { message: newMesssage, roomId: roomNo }).then(function (response) {
            console.log("post response: ", response)
        }).catch((err) => {
            console.log(err)
        })
    }
    const addNewMessage = () => {
        setSendingMessages([...sendingMessages, { message: newMesssage, roomId: roomNo }])
    }
    return (<div>
        <div>
            {sendingMessages.map((message, index) => {
                return <p key={index}>Sent: {message.message}</p>
            })}
            {receivedMessages.map((message, index) => {
                return <p key={index}>Received: {message.message}</p>
            })}
        </div>
        <div className="sendingMessage">
            <input type="text" placeholder="write your messages" value={newMesssage} onChange={(e) => { setNewMessage(e.target.value) }} />
            <button onClick={addNewMessage}>Send it</button>
        </div>

    </div>
    )


}








export default ChatPage


