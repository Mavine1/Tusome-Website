import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Class from './models/Class.js';

dotenv.config();

const courses = [
  {
    title: 'UI/UX Design',
    description: 'Mastering UI/UX Design: From Basics to Pro Level. Learn core principles, user behavior, wireframing, prototyping, and design systems.',
    instructor: 'Daniel Scott',
    price: 1,
    currency: 'KES',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Design'
  },
  {
    title: 'Finance - Leonel Money',
    description: 'Master personal finance and investment strategies. Build wealth and manage risk.',
    instructor: 'Leonel Money',
    price: 1,
    currency: 'KES',
    duration: '6 weeks',
    level: 'Intermediate',
    category: 'Business'
  },
  {
    title: 'Design - Abrar Islam',
    description: 'Advanced UI/UX with real world projects. Learn from industry expert.',
    instructor: 'Abrar Islam',
    price: 1,
    currency: 'KES',
    duration: '10 weeks',
    level: 'Advanced',
    category: 'Design'
  }
];

const seed = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
    await Class.deleteMany();
    console.log('Existing courses removed');
    await Class.insertMany(courses);
    console.log(' Courses seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  }
};

seed();