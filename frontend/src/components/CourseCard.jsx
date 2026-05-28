import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  // If course is undefined or missing required fields, don't render
  if (!course || !course.title) {
    return null; // or return a loading/error placeholder
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      <h3 className="text-xl font-semibold text-green-700">{course.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{course.instructor}</p>
      <p className="text-green-600 font-bold mt-2">KES {course.price}</p>
      <Link to={`/course/${course._id}`} className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
        Enrol Now
      </Link>
    </div>
  );
}