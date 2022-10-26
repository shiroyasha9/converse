import { EVENTS } from 'constants/events';
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { SOCKET_URL } from '../config';

interface IMessage {
  message: string;
  time: string;
  username: string;
}

interface IContext {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  roomId?: string;
  rooms: { [key: string]: any };
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<IContext>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: []
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = 'Chat app';
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, value => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, value => {
    setRoomId(value);

    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = 'New message...';
      }

      setMessages(messages => [...messages, { message, username, time }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
