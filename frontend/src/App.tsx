import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';

function App() {
  const location = useLocation();

  const authRoutes = ['/login', '/signup'];
  const hideNavbar = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen w-full relative bg-[#fefdfb]">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element=<Login />
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element=<Login />
        />
        <Route
          path="/profile"
          element=<Profile />
        />
        <Route
          path="/messages"
          element={<Messages />}
        />
      </Routes>
    </div>
  );
}

export default App;
