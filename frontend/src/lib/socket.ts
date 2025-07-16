

import { io } from 'socket.io-client';
import { apiUrl } from '../utils/config';

const socket = io(apiUrl, {
  autoConnect: false,
  transports: ['websocket'],
  query: {
    userId: localStorage.getItem('userId'),
  },
});

export default socket;
