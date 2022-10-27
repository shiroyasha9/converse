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

  const handleKeypress = (e: React.KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      if (message) {
        sendMessage();
      }
    }
  };

  const handleUsernameSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setChosenUsername(username);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-purple-500 p-4">
      <main className="flex h-full w-full flex-col items-center justify-center gap-4">
        {!chosenUsername ? (
          <>
            <h2 className="mb-2 text-3xl font-bold text-white">
              Welcome to <span className="text-[#F2FF49]">Converse</span> 👋
            </h2>
            <h3 className="text-xl text-white">What would be your username?</h3>
            <div className="flex flex-row items-center justify-between space-x-2">
              <input
                type="text"
                placeholder="Rick"
                value={username}
                className="rounded-md py-3 px-6 outline-none"
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={handleUsernameSubmit}
              />
              <button
                onClick={() => {
                  setChosenUsername(username);
                }}
                className="text-md rounded-md bg-[#F2FF49] px-6 py-3 font-semibold"
              >
                Let's start conversing!
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl font-bold text-white">
              Remember to be polite, {username}! 🥰
            </p>
            <div className="flex h-[20rem] min-w-[33%] flex-col justify-end rounded-md bg-white shadow-md ">
              <div className="h-full overflow-y-scroll last:border-b-0">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className={`flex w-full flex-col justify-end border-b border-gray-200/60 py-1 px-2 ${
                        msg.author === chosenUsername && 'items-end'
                      }`}
                      key={i}
                    >
                      <div className="flex flex-row items-center space-x-2">
                        {msg.author !== chosenUsername ? (
                          <>
                            <p className="font-bold text-purple-500">
                              {msg.author}
                            </p>
                            <p className="text-xs">
                              {formatTime(new Date(msg.date))}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs">
                              {formatTime(new Date(msg.date))}
                            </p>
                            <p className="font-bold">You</p>
                          </>
                        )}
                      </div>
                      <p>{msg.message}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex w-full rounded-b-md border-t border-gray-300">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className={`flex-1 ${
                    message.trim().length > 0 ? 'rounded-bl-md' : 'rounded-b-md'
                  } py-2 px-2 outline-none`}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                {message.trim().length > 0 && (
                  <div className="group flex items-center justify-center rounded-br-md  border-l border-gray-300 bg-[#F2FF49] transition-all hover:bg-[#fdef27]">
                    <button
                      className="h-full px-3"
                      onClick={() => {
                        sendMessage();
                      }}
                    >
                      ➡️
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
