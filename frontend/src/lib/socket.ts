// import { io, Socket } from 'socket.io-client';
// import { url } from '../utils/config';

// const socket: Socket = io(`${url}/message/send`, {
//   autoConnect: false,
//   auth: {
//     token: localStorage.getItem('token'),
//   },
//   query: {
//     userId: localStorage.getItem('userId'),
//   },
// });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

// export default socket;

import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  autoConnect: false,
  transports: ['websocket'],
  query: {
    userId: localStorage.getItem('userId'),
  },
});

export default socket;
