// import { useEffect } from 'react';
// import { io } from 'socket.io-client';

// const userId = '68606c27e68e76db4fa2ed48'; // <-- change this to match your test user

// const socket = io('http://localhost:3000/api/message/send', {
//   query: { userId },
// });

// export default function SocketClient() {
//   useEffect(() => {
//     // Listen for new messages
//     socket.on('newMessage', (message) => {
//       console.log('📨 New message received:', message);
//     });

//     // Optional: Get list of online users
//     socket.on('getOnlineUsers', (users) => {
//       console.log('🟢 Online users:', users);
//     });

//     // Clean up on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       📡 Listening for messages as <b>{userId}</b>...
//     </div>
//   );
// }
