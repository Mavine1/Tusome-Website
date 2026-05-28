import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Checkout() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [checkoutId, setCheckoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/classes/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phone) return setMessage('Phone number required');
    setLoading(true);
    setMessage('');
    try {
      const res = await API.post('/payments/initiate', { classId: id, phoneNumber: phone });
      if (res.data.success) {
        setMessage(res.data.message);
        setCheckoutId(res.data.checkoutRequestID);
        // Poll for status every 3 seconds
        const interval = setInterval(async () => {
          const statusRes = await API.get(`/payments/status/${res.data.checkoutRequestID}`);
          if (statusRes.data.status === 'active') {
            clearInterval(interval);
            setMessage('Payment successful! Redirecting...');
            setTimeout(() => navigate('/dashboard'), 2000);
          } else if (statusRes.data.status === 'failed') {
            clearInterval(interval);
            setMessage('Payment failed. Please try again.');
            setLoading(false);
          }
        }, 3000);
      } else {
        setMessage(res.data.message || 'Payment initiation failed');
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Server error');
      setLoading(false);
    }
  };

  if (!course) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white border rounded-xl shadow">
      <h2 className="text-2xl font-bold text-green-700">Complete Your Subscription</h2>
      <div className="my-4 border-b pb-4">
        <p className="font-semibold">{course.title}</p>
        <p className="text-green-600 text-xl font-bold">KES {course.price}</p>
      </div>
      <form onSubmit={handlePayment}>
        <label className="block mb-2 text-gray-700">M-Pesa Phone Number</label>
        <input type="tel" placeholder="0712345678" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border rounded p-2 mb-4" required />
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
          {loading ? 'Sending STK Push...' : 'Pay with M-Pesa'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
}