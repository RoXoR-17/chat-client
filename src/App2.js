import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const ref = React.useRef(null);

  useEffect(() => {
    const newSocket = io("https://polar-spire-25990.herokuapp.com", {
      query: { user: "rrr", room: "room1" },
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  function readThenSendFile(data) {
    var reader = new FileReader();
    reader.onload = function (evt) {
      var msg = {};
      msg.file = evt.target.result;
      msg.fileName = data.name;
      socket.emit("image", msg);
    };
    reader.readAsDataURL(data);
  }

  return (
    <div className="App">
      <header className="app-header">React Chat</header>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
          <input
            ref={ref}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => readThenSendFile(e.target.files[0])}
          />
          <label htmlFor="contained-button-file">
            <button onClick={() => ref.current.click()}>Upload</button>
          </label>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
