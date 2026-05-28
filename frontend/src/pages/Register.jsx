import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { name, email, phoneNumber: phone, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20 p-6 bg-white border rounded-xl shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Join Tusome</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2 mb-3" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded p-2 mb-3" required />
        <input type="tel" placeholder="Phone Number (e.g., 0712345678)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border rounded p-2 mb-3" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded p-2 mb-3" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Register</button>
      </form>
      <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-green-600">Login</Link></p>
    </div>
  );
}