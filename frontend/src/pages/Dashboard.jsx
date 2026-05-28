import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    API.get('/users/subscriptions').then(res => setSubscriptions(res.data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">My Learning</h2>
      {subscriptions.length === 0 && <p>You have not enrolled in any course yet. <Link to="/courses" className="text-green-600 underline">Browse courses</Link></p>}
      <div className="grid gap-4">
        {subscriptions.map(sub => (
          <div key={sub._id} className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{sub.classId?.title || 'Course'}</h3>
              <p className="text-gray-500">Status: <span className={`font-medium ${sub.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>{sub.status}</span></p>
              {sub.endDate && <p className="text-sm">Access until: {new Date(sub.endDate).toLocaleDateString()}</p>}
            </div>
            {sub.status === 'active' && (
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Continue Learning</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}