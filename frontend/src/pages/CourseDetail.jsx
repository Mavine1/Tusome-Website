import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/classes/${id}`).then(res => {
      setCourse(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!course) return <div className="text-center mt-20">Course not found</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-green-700">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <h2 className="text-xl font-semibold text-green-700">What’ll you learn</h2>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              <li>Fundamentals of UI and UX</li>
              <li>Understanding user behavior and research</li>
              <li>Wireframing and prototyping</li>
              <li>Design systems and UI components</li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-green-700">Course Details</h2>
            <p>4.9 (5.7k Reviews) &nbsp;|&nbsp; 40 Lessons &nbsp;|&nbsp; 10 Assignments</p>
            <p>Last Update: 27 May 2025</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-green-700">Tools you will use</h2>
            <p>Figma, Miro, Notion, Adobe XD, Whimsical, etc.</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm h-fit sticky top-20">
          <p className="text-3xl font-bold text-green-600">KES {course.price}</p>
          <Link to={`/checkout/${course._id}`} className="block mt-4 bg-green-600 text-white text-center py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
            Enrol Now
          </Link>
          <div className="mt-6">
            <p className="font-semibold">Earn your certificate</p>
            <p className="text-sm text-gray-500">Complete your course and submit all assignments.</p>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="font-medium">{course.instructor}</p>
            <p className="text-sm text-gray-500">Certified Trainer</p>
          </div>
        </div>
      </div>
    </div>
  );
}