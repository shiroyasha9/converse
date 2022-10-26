import { IMessage } from '../../types';

export default (io, socket) => {
  const createdMessage = (msg: IMessage) => {
    socket.broadcast.emit('newIncomingMessage', msg);
  };

  socket.on('createdMessage', createdMessage);
};
