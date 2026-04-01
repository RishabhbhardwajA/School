import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admission from '@/lib/models/Admission';
import Contact from '@/lib/models/Contact';
import Announcement from '@/lib/models/Announcement';
import FAQ from '@/lib/models/FAQ';
import Event from '@/lib/models/Event';
import SiteSetting from '@/lib/models/SiteSetting';
import Faculty from '@/lib/models/Faculty';
import Alumni from '@/lib/models/Alumni';
import TransportRoute from '@/lib/models/TransportRoute';
import Gallery from '@/lib/models/Gallery';

export async function POST() {
  try {
    await connectDB();

    // ====== DEMO ADMISSIONS ======
    const admissions = [
      { studentName: 'Aarav Sharma', parentName: 'Mr. Vikram Sharma', email: 'vikram.sharma@gmail.com', phone: '+91 98765 43210', classApplying: 'Class VI', previousSchool: 'DPS Dwarka', status: 'approved' },
      { studentName: 'Ishita Gupta', parentName: 'Mrs. Meena Gupta', email: 'meena.gupta@yahoo.com', phone: '+91 87654 32109', classApplying: 'Class IX (Science)', previousSchool: 'Ryan International', status: 'approved' },
      { studentName: 'Arjun Patel', parentName: 'Mr. Rajesh Patel', email: 'rajesh.patel@outlook.com', phone: '+91 76543 21098', classApplying: 'Class I', previousSchool: 'New Admission', status: 'pending' },
      { studentName: 'Ananya Verma', parentName: 'Mrs. Sunita Verma', email: 'sunita.verma@gmail.com', phone: '+91 65432 10987', classApplying: 'Class XI (Commerce)', previousSchool: 'St. Xavier\'s School', status: 'pending' },
      { studentName: 'Rohan Singh', parentName: 'Mr. Harpreet Singh', email: 'harpreet.s@gmail.com', phone: '+91 54321 09876', classApplying: 'Class IV', previousSchool: 'Kendriya Vidyalaya', status: 'approved' },
      { studentName: 'Priya Kapoor', parentName: 'Mr. Anil Kapoor', email: 'anil.kapoor@hotmail.com', phone: '+91 99887 76655', classApplying: 'Pre-Primary (Nursery)', previousSchool: 'New Admission', status: 'pending' },
      { studentName: 'Karan Mehta', parentName: 'Mrs. Neha Mehta', email: 'neha.mehta@gmail.com', phone: '+91 88776 65544', classApplying: 'Class VIII', previousSchool: 'Amity International', status: 'rejected' },
      { studentName: 'Simran Kaur', parentName: 'Mr. Gurpreet Kaur', email: 'gurpreet.k@gmail.com', phone: '+91 77665 54433', classApplying: 'Class II', previousSchool: 'Mother Mary School', status: 'approved' },
      { studentName: 'Dev Joshi', parentName: 'Mr. Ramesh Joshi', email: 'ramesh.joshi@yahoo.com', phone: '+91 66554 43322', classApplying: 'Class X', previousSchool: 'Delhi Public School', status: 'pending' },
      { studentName: 'Tanvi Reddy', parentName: 'Mrs. Lakshmi Reddy', email: 'lakshmi.r@outlook.com', phone: '+91 55443 32211', classApplying: 'Class VII', previousSchool: 'Bal Bharati Public School', status: 'approved' },
    ];
    await Admission.deleteMany({});
    await Admission.insertMany(admissions);

    // ====== DEMO CONTACT QUERIES ======
    const contacts = [
      { name: 'Suresh Kumar', phone: '+91 98123 45678', email: 'suresh.k@gmail.com', message: 'I would like to know about the admission process for Class III. My son is currently studying in DPS Rohini.', status: 'new' },
      { name: 'Priya Agarwal', phone: '+91 87234 56789', email: 'priya.a@yahoo.com', message: 'Can you share the fee structure for Class XI Science stream? Also interested in hostel facilities if available.', status: 'new' },
      { name: 'Rajiv Malhotra', phone: '+91 76345 67890', email: 'rajiv.m@outlook.com', message: 'We recently relocated to Dwarka. Looking for CBSE school for my daughter going to Class V. Can we visit the campus?', status: 'resolved' },
      { name: 'Neeta Sharma', phone: '+91 65456 78901', email: 'neeta.s@gmail.com', message: 'My child has special needs. Does your school have provisions for differently-abled students? Please guide.', status: 'new' },
      { name: 'Amit Bansal', phone: '+91 54567 89012', email: 'amit.b@hotmail.com', message: 'Interested in sports scholarship for my son. He is national level swimmer. What process should we follow?', status: 'resolved' },
      { name: 'Dr. Meenakshi Rao', phone: '+91 93456 78901', email: 'meenakshi.rao@gmail.com', message: 'I am impressed with your school\'s board results. Can you provide details about your faculty for Physics and Chemistry?', status: 'new' },
      { name: 'Harsh Vardhan', phone: '+91 82345 67890', email: 'harsh.v@gmail.com', message: 'Is transport available from Janakpuri to your school? My two kids will need the school bus service.', status: 'resolved' },
    ];
    await Contact.deleteMany({});
    await Contact.insertMany(contacts);

    // ====== DEMO ANNOUNCEMENTS ======
    const announcements = [
      { text: '🎓 Admissions Open for 2026-27 — Limited Seats Available!', active: true },
      { text: '🏆 100% Board Results — 5th Consecutive Year of Excellence', active: true },
      { text: '📅 Annual Sports Day — March 15, 2026', active: true },
      { text: '📞 Call +91 11-2345-6789 for Admission Enquiry', active: true },
      { text: '🏅 Our students secured 15 medals at State Level Science Olympiad', active: true },
      { text: '📚 Book Fair — April 10-12, 2026 — Open for all parents', active: true },
    ];
    await Announcement.deleteMany({});
    await Announcement.insertMany(announcements);

    // ====== DEMO FAQs ======
    const faqs = [
      { q: 'What is the student-teacher ratio?', a: 'We maintain a healthy 1:25 student-teacher ratio to ensure personalized attention for every child.', order: 1, active: true },
      { q: 'What are the school timings?', a: 'Summer: 7:30 AM - 2:30 PM | Winter: 8:00 AM - 3:00 PM. Pre-primary has shorter hours.', order: 2, active: true },
      { q: 'What safety measures are in place?', a: 'We have 200+ CCTV cameras, trained security guards, visitor management system, GPS-tracked buses with female attendants, on-campus medical room, and a strict child protection policy.', order: 3, active: true },
      { q: 'Are scholarships available?', a: 'Yes, merit-based scholarships are offered to top performers in entrance tests and board exams. Up to 50% fee waiver available.', order: 4, active: true },
      { q: 'Do you provide transport?', a: 'Yes, a fleet of 40+ GPS-tracked AC buses covers all major Delhi NCR routes with trained staff and female attendants on every bus.', order: 5, active: true },
      { q: 'How can parents track student progress?', a: 'Through our Parent Portal app, quarterly PTMs, and regular SMS/email updates on attendance, grades, and school activities.', order: 6, active: true },
    ];
    await FAQ.deleteMany({});
    await FAQ.insertMany(faqs);

    // ====== DEMO EVENTS ======
    const events = [
      { date: 'March 15, 2026', title: 'Annual Sports Day', desc: 'Inter-house athletics, swimming, and team sports competitions.', tag: 'Sports', active: true, order: 1 },
      { date: 'April 5, 2026', title: 'Science Exhibition', desc: 'Student-led innovations and working models showcase.', tag: 'Academic', active: true, order: 2 },
      { date: 'April 20, 2026', title: 'Parent-Teacher Meet', desc: 'Quarterly academic review and progress discussion.', tag: 'Notice', active: true, order: 3 },
      { date: 'May 1, 2026', title: 'Summer Camp Registration', desc: 'Robotics, art, music, and sports camps for all age groups.', tag: 'Activity', active: true, order: 4 },
      { date: 'May 15, 2026', title: 'Inter-School Debate', desc: 'Annual debate championship with 20+ schools participating.', tag: 'Academic', active: true, order: 5 },
    ];
    await Event.deleteMany({});
    await Event.insertMany(events);

    // ====== SITE SETTINGS ======
    await SiteSetting.findOneAndUpdate(
      { key: 'global' },
      {
        heroHeadline: 'Empowering Minds, Shaping Futures',
        heroSubheadline: 'Join Delhi Excellence Public School for a transformative educational journey grounded in values and innovation.',
        aboutText: 'Founded in 1985, Delhi Excellence Public School is a premier CBSE-affiliated institution dedicated to fostering academic excellence, moral integrity, and holistic development in a state-of-the-art learning environment.\n\nWith 38+ years of legacy, 15,000+ successful alumni, and 100% board results for 5 consecutive years, we are one of the most trusted schools in Delhi NCR.',
        contactPhone: '+91 11-2345-6789',
        contactEmail: 'info@delhiexcellence.edu.in',
        contactAddress: 'NH-8, Dwarka Sector 21, New Delhi — 110077',
      },
      { upsert: true }
    );

    // ====== DEMO FACULTY ======
    const faculty = [
      { name: 'Dr. Rajesh Kumar', subject: 'Physics', qualifications: 'Ph.D., M.Sc., B.Ed.', experience: 15 },
      { name: 'Mrs. Anjali Sharma', subject: 'Mathematics', qualifications: 'M.Sc., B.Ed.', experience: 12 },
      { name: 'Ms. Priya Singh', subject: 'English', qualifications: 'M.A., M.Ed.', experience: 8 },
      { name: 'Mr. Amit Verma', subject: 'Computer Science', qualifications: 'M.Tech, B.Ed.', experience: 10 },
      { name: 'Dr. Meena Gupta', subject: 'Chemistry', qualifications: 'Ph.D., M.Sc., B.Ed.', experience: 18 },
      { name: 'Mr. Vikram Singh', subject: 'Physical Education', qualifications: 'M.P.Ed.', experience: 14 },
    ];
    await Faculty.deleteMany({});
    await Faculty.insertMany(faculty);

    // ====== DEMO ALUMNI ======
    const alumni = [
      { name: 'Rohan Mehta', passingYear: 2018, achievement: 'IIT Delhi Graduate', currentRole: 'Software Engineer at Google' },
      { name: 'Aisha Khan', passingYear: 2015, achievement: 'AIIMS Gold Medalist', currentRole: 'Cardiologist at Max Hospital' },
      { name: 'Karan Patel', passingYear: 2019, achievement: 'UPSC CSE Rank 45', currentRole: 'IAS Officer' },
      { name: 'Neha Sharma', passingYear: 2020, achievement: 'IIM Ahmedabad Graduate', currentRole: 'Consultant at McKinsey' },
    ];
    await Alumni.deleteMany({});
    await Alumni.insertMany(alumni);

    // ====== DEMO TRANSPORT ROUTES ======
    const routes = [
      { routeName: 'Dwarka Sector 1-5', busNumber: 'DL-1PC-1234', stops: ['Sec 1', 'Sec 2', 'Sec 3', 'Sec 4', 'Sec 5'], monthlyFee: 2500, driverName: 'Ramesh Yadav', driverPhone: '9876543210' },
      { routeName: 'Janakpuri & Vikaspuri', busNumber: 'DL-1PC-5678', stops: ['Janakpuri East', 'Janakpuri West', 'Vikaspuri'], monthlyFee: 3000, driverName: 'Suresh Kumar', driverPhone: '8765432109' },
      { routeName: 'Palam & Mahavir Enclave', busNumber: 'DL-1PC-9012', stops: ['Palam Village', 'Mahavir Enclave Part 1', 'Part 2'], monthlyFee: 2000, driverName: 'Harish Singh', driverPhone: '7654321098' },
    ];
    await TransportRoute.deleteMany({});
    await TransportRoute.insertMany(routes);

    // ====== DEMO GALLERY ======
    const galleryItems = [
      { imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80', caption: 'State-of-the-art Library', category: 'campus' },
      { imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80', caption: 'Science Fair 2025', category: 'events' },
      { imageUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850b0a5?auto=format&fit=crop&q=80', caption: 'Inter-House Basketball', category: 'sports' },
      { imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80', caption: 'Computer Lab 1', category: 'academics' },
      { imageUrl: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80', caption: 'Annual Day Performance', category: 'cultural' },
    ];
    await Gallery.deleteMany({});
    await Gallery.insertMany(galleryItems);

    return NextResponse.json({
      success: true,
      message: 'Demo data seeded successfully!',
      counts: {
        admissions: admissions.length,
        contacts: contacts.length,
        announcements: announcements.length,
        faqs: faqs.length,
        events: events.length,
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
