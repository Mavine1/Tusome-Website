import { useEffect, useState } from 'react';
import API from '../services/api';
import CourseCard from '../components/CourseCard';

export default function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    API.get('/classes').then(res => setCourses(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-green-700">Leading educational platform available online</h1>
          <p className="text-gray-600 text-xl mt-4">Online courses from the world's leading experts. Join 17 million learners today</p>
          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full text-lg">Get started</button>
          <div className="flex justify-center gap-8 mt-10 flex-wrap">
            <span className="text-gray-400 font-semibold">Google</span>
            <span className="text-gray-400 font-semibold">Trello</span>
            <span className="text-gray-400 font-semibold">monday.com</span>
            <span className="text-gray-400 font-semibold">Notion</span>
            <span className="text-gray-400 font-semibold">Slack</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-xl bg-white shadow">
            <div className="text-4xl font-bold text-green-600">01</div>
            <h3 className="text-xl font-semibold mt-2">Choose Your Course</h3>
            <p className="text-gray-500">Browse our wide selection of expert-led courses.</p>
          </div>
          <div className="text-center p-6 border rounded-xl bg-white shadow">
            <div className="text-4xl font-bold text-green-600">02</div>
            <h3 className="text-xl font-semibold mt-2">Sign Up and Pay</h3>
            <p className="text-gray-500">Complete payment via M-Pesa – secure and instant.</p>
          </div>
          <div className="text-center p-6 border rounded-xl bg-white shadow">
            <div className="text-4xl font-bold text-green-600">03</div>
            <h3 className="text-xl font-semibold mt-2">Learn and Engage</h3>
            <p className="text-gray-500">Access your course and join the community.</p>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-700">Popular Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}