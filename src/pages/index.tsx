import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { IMessage } from '../types';
import { formatTime } from '../utils/dateTime';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [chosenUsername, setChosenUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch('/api/socket');

    socket = io();

    socket.on('newIncomingMessage', (msg: IMessage) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message, date: msg.date },
      ]);
    });
  };

  const sendMessage = async () => {
    if (!String(message).trim()) return;
    const currentDateTimestamp = new Date().toString();

    socket.emit('createdMessage', {
      author: chosenUsername,
      message,
      date: currentDateTimestamp,
    });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: chosenUsername, message, date: currentDateTimestamp },
    ]);
    setMessage('');
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-purple-500 p-4">
      <main className="flex h-full w-full flex-col items-center justify-center gap-4">
        {!chosenUsername ? (
          <>
            <h3 className="text-xl font-bold text-white">
              How people should call you?
            </h3>
            <input
              type="text"
              placeholder="Identity..."
              value={username}
              className="rounded-md p-3 outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={() => {
                setChosenUsername(username);
              }}
              className="rounded-md bg-white px-4 py-2 text-xl"
            >
              Go!
            </button>
          </>
        ) : (
          <>
            <p className="text-xl font-bold text-white">
              Your username: {username}
            </p>
            <div className="flex h-[20rem] min-w-[33%] flex-col justify-end rounded-md bg-white shadow-md ">
              <div className="h-full overflow-y-scroll last:border-b-0">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full border-b border-gray-200 py-1 px-2"
                      key={i}
                    >
                      <div className="flex flex-row items-center justify-between">
                        <p
                          className={`${
                            msg.author !== username && 'text-purple-500'
                          } font-bold`}
                        >
                          {' '}
                          {msg.author === username ? 'You' : msg.author}{' '}
                        </p>
                        <p>{formatTime(new Date(msg.date))}</p>
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex w-full rounded-bl-md border-t border-gray-300">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="flex-1 rounded-bl-md py-2 px-2 outline-none"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="group flex items-center justify-center rounded-br-md  border-l border-gray-300 transition-all hover:bg-purple-500">
                  <button
                    className="h-full px-3 group-hover:text-white"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
