import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { Loader } from 'lucide-react';

function App() {
  const location = useLocation();

  const authRoutes = ['/login', '/signup'];
  const hideNavbar = authRoutes.includes(location.pathname);

  if (hideNavbar) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top center,rgba(173,109,244,0.44), transparent 70% )',
        }}
      >
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route
            path="/"
            element=<Home />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
