import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Tusome</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-green-200">Home</Link>
          <Link to="/courses" className="hover:text-green-200">Courses</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
              <button onClick={logout} className="bg-white text-green-600 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-200">Login</Link>
              <Link to="/register" className="bg-white text-green-600 px-3 py-1 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}