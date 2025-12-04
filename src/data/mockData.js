export const mockUsers = [
  { id: 'STU01', role: 'student', name: 'Arjun Verma', pass: 'student-1', details: 'B.Tech CSE - 3rd Year' },
  { id: 'FAC01', role: 'faculty', name: 'Prof. Sharma', pass: 'faculty-1', details: 'CSE Dept' },
  { id: 'HOD01', role: 'hod', name: 'Prof. Verma', pass: 'hod-1', details: 'CSE Dept' },
  { id: 'ADM01', role: 'admin', name: 'Prof. Goswami', pass: 'admin-1', details: 'college' }
];

export const studentStats = { attendancePercentage: 78, assignments: { completed: 12, pending: 3 }, syllabusCompletion: 45 };

export const todaysLectures = [
  { time: '09:00 AM', subject: 'Data Structures', room: 'LH-101' },
  { time: '11:00 AM', subject: 'OS Lab', room: 'Lab-2' },
  { time: '02:00 PM', subject: 'Soft Skills', room: 'LH-205' }
];

export const notices = [
  { id: 1, title: 'Hackathon Registration Open', type: 'Urgent', date: 'Today' },
  { id: 2, title: 'Library Closed on Sunday', type: 'Info', date: 'Tomorrow' }
];

// CRITICAL: Nested Inventory structure for Reservations
export const inventory = {
  library: {
    books: [{ id: 'b1', name: 'Data Structures', stock: 5, icon: '📕' }, { id: 'b2', name: 'AI Intro', stock: 2, icon: '📘' }],
    seats: [{ id: 's1', name: 'Seat A1', stock: 1, icon: '💺' }]
  },
  lab: {
    mechanics: [{ id: 'm1', name: 'Telescope', stock: 2, icon: '🔭' }],
    fluid: [{ id: 'f1', name: 'Flow Meter', stock: 4, icon: '🌊' }]
  },
  canteen: {
    food: [{ id: 'c1', name: 'Veg Biryani', price: 120, icon: '🍛' }, { id: 'c2', name: 'Cold Coffee', price: 50, icon: '🥤' }]
  },
  sports: {
    gear: [{ id: 'sp1', name: 'Cricket Kit', stock: 2, icon: '🏏' }]
  }
};

export const googleEvents = [
  { id: 'g1', title: "Google DevFest", date: "15 Dec", time: "10:00 AM", location: "Online", type: "google" }
];

export const badges = [
  { id: 'early-bird', label: 'Early Bird', unlocked: false, icon: '🦅' },
  { id: 'streak', label: 'Streak Master', unlocked: true, icon: '🔥' }
];

export const events = [
  { id: 1, title: 'AI Workshop', date: '2025-12-05', type: 'Tech' },
  { id: 2, title: 'Hackathon 2025', date: '2025-12-20', type: 'Tech' }
];

export const ebooks = [
  { id: 1, title: 'Modern React (Advanced)', year: '4th', tags: ['Web Dev'] },
  { id: 2, title: 'Python for DS (Intermediate)', year: '3rd', tags: ['Data Science'] },
  { id: 3, title: 'C Fundamentals', year: '1st', tags: ['Programming'] }, // NEW
  { id: 4, title: 'AI Ethics & Law (Advanced)', year: '4th', tags: ['Ethics'] } // NEW
]

export const forumThreads = [
  { id: 1, title: 'Exam Schedule?', author: 'Rahul', replies: 5, tag: 'Doubts' },
  { id: 2, title: 'Lost my ID Card', author: 'Priya', replies: 2, tag: 'General' }
];
