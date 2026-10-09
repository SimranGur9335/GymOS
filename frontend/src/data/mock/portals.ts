import { AttendanceRecord, MemberWorkout, MemberProgressLog, PaymentTransaction, TrainerBooking } from '../../types/membership';

// Member Portal Mock Data
export const MOCK_MEMBER_DATA = {
  profile: {
    name: 'Rohan Sharma',
    email: 'rohan.sharma@gmail.com',
    phone: '+91 98221 12345',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    gymName: 'Iron Haven Fitness Club',
    locality: 'Keshav Nagar, Pune',
    membershipPlan: 'Annual VIP All-Access',
    membershipStatus: 'Active',
    startDate: '15 Jan 2026',
    endDate: '15 Jan 2027',
    daysRemaining: 102,
    assignedTrainer: 'Vikram Shinde',
  },
  stats: {
    totalWorkouts: 84,
    monthlyCheckIns: 18,
    streakDays: 4,
    caloriesBurned: 34500,
  },
  attendanceHistory: [
    { id: 'att-1', date: '04 Oct 2026', checkInTime: '06:45 AM', checkOutTime: '08:15 AM', status: 'Present', gymName: 'Iron Haven Fitness Club' },
    { id: 'att-2', date: '03 Oct 2026', checkInTime: '06:30 AM', checkOutTime: '08:00 AM', status: 'Present', gymName: 'Iron Haven Fitness Club' },
    { id: 'att-3', date: '01 Oct 2026', checkInTime: '07:00 AM', checkOutTime: '08:20 AM', status: 'Present', gymName: 'Iron Haven Fitness Club' },
    { id: 'att-4', date: '29 Sep 2026', checkInTime: '06:50 AM', checkOutTime: '08:10 AM', status: 'Present', gymName: 'Iron Haven Fitness Club' },
    { id: 'att-5', date: '28 Sep 2026', checkInTime: '06:40 AM', checkOutTime: '07:55 AM', status: 'Present', gymName: 'Iron Haven Fitness Club' },
  ] as AttendanceRecord[],
  todayWorkout: {
    id: 'wo-101',
    title: 'Chest & Triceps Hypertrophy',
    day: 'Monday',
    targetFocus: 'Upper Body Push',
    exercises: [
      { name: 'Barbell Flat Bench Press', sets: 4, reps: '8 - 10 reps', weight: '75 kg', completed: true },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10 - 12 reps', weight: '26 kg', completed: true },
      { name: 'Cable Chest Flyes', sets: 3, reps: '12 - 15 reps', weight: '15 kg', completed: false },
      { name: 'Tricep Rope Pushdowns', sets: 4, reps: '12 - 15 reps', weight: '22 kg', completed: false },
      { name: 'Skullcrushers (EZ Bar)', sets: 3, reps: '10 reps', weight: '30 kg', completed: false },
    ],
  } as MemberWorkout,
  progressLogs: [
    { id: 'pr-1', date: '01 May 2026', weightKg: 82.5, bodyFatPercent: 21.4, muscleMassKg: 34.2, notes: 'Initial assessment' },
    { id: 'pr-2', date: '01 Jun 2026', weightKg: 80.8, bodyFatPercent: 20.1, muscleMassKg: 34.8, notes: 'Diet adherence 85%' },
    { id: 'pr-3', date: '01 Jul 2026', weightKg: 79.2, bodyFatPercent: 18.9, muscleMassKg: 35.4, notes: 'Bench press PR 75kg' },
    { id: 'pr-4', date: '01 Aug 2026', weightKg: 77.9, bodyFatPercent: 17.6, muscleMassKg: 36.0, notes: 'Feeling energized' },
    { id: 'pr-5', date: '01 Sep 2026', weightKg: 76.8, bodyFatPercent: 16.5, muscleMassKg: 36.5, notes: 'Visible core definition' },
    { id: 'pr-6', date: '01 Oct 2026', weightKg: 75.8, bodyFatPercent: 15.8, muscleMassKg: 36.8, notes: 'Target achieved' },
  ] as MemberProgressLog[],
  payments: [
    { id: 'pay-1', date: '15 Jan 2026', amount: 16999, description: 'Annual VIP All-Access Membership', gymName: 'Iron Haven Fitness Club', paymentMethod: 'UPI (GPay)', status: 'Completed', invoiceUrl: '#' },
    { id: 'pay-2', date: '15 Jan 2026', amount: 4500, description: 'Personal Training (10 Session Add-on)', gymName: 'Iron Haven Fitness Club', paymentMethod: 'Credit Card', status: 'Completed', invoiceUrl: '#' },
  ] as PaymentTransaction[],
  bookings: [
    { id: 'bk-1', trainerName: 'Vikram Shinde', trainerPhoto: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80', date: '06 Oct 2026', timeSlot: '07:00 AM - 08:00 AM', sessionType: '1-on-1 Powerlifting Technique', status: 'Upcoming' },
    { id: 'bk-2', trainerName: 'Pooja Kulkarni', trainerPhoto: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80', date: '08 Oct 2026', timeSlot: '07:30 AM - 08:30 AM', sessionType: 'HIIT Conditioning & Core', status: 'Upcoming' },
  ] as TrainerBooking[],
};

// Owner Portal Mock Data
export const MOCK_OWNER_DATA = {
  gymProfile: {
    name: 'Iron Haven Fitness Club',
    locality: 'Keshav Nagar, Pune',
    rating: 4.8,
    activeMembersCount: 342,
    monthlyRevenue: 485000,
    newLeadsThisMonth: 64,
    renewalsPendingCount: 18,
  },
  revenueTrend: [
    { month: 'May', revenue: 390000, members: 290 },
    { month: 'Jun', revenue: 410000, members: 305 },
    { month: 'Jul', revenue: 440000, members: 320 },
    { month: 'Aug', revenue: 465000, members: 332 },
    { month: 'Sep', revenue: 472000, members: 338 },
    { month: 'Oct', revenue: 485000, members: 342 },
  ],
  membershipDistribution: [
    { name: 'Annual VIP', count: 185, value: 54 },
    { name: 'Quarterly', count: 92, value: 27 },
    { name: 'Monthly Pass', count: 65, value: 19 },
  ],
  attendanceTrend: [
    { day: 'Mon', count: 210 },
    { day: 'Tue', count: 198 },
    { day: 'Wed', count: 205 },
    { day: 'Thu', count: 189 },
    { day: 'Fri', count: 192 },
    { day: 'Sat', count: 175 },
    { day: 'Sun', count: 95 },
  ],
  recentMembers: [
    { id: 'mem-1', name: 'Amit Verma', plan: 'Annual VIP', joinedDate: '03 Oct 2026', phone: '+91 98111 22334', amount: '₹16,999', status: 'Active' },
    { id: 'mem-2', name: 'Neha Joshi', plan: 'Quarterly Plan', joinedDate: '02 Oct 2026', phone: '+91 97222 33445', amount: '₹6,200', status: 'Active' },
    { id: 'mem-3', name: 'Siddharth Nair', plan: 'Monthly Pass', joinedDate: '01 Oct 2026', phone: '+91 96333 44556', amount: '₹2,400', status: 'Active' },
    { id: 'mem-4', name: 'Pooja Waghmare', plan: 'Annual VIP', joinedDate: '28 Sep 2026', phone: '+91 95444 55667', amount: '₹16,999', status: 'Active' },
    { id: 'mem-5', name: 'Kiran Salunkhe', plan: 'Quarterly Plan', joinedDate: '25 Sep 2026', phone: '+91 94555 66778', amount: '₹6,200', status: 'Active' },
  ],
  leads: [
    { id: 'ld-1', name: 'Saurabh Kulkarni', phone: '+91 98765 43210', source: 'GymOS Search', interest: 'Annual VIP', date: '04 Oct 2026', status: 'Hot Lead' },
    { id: 'ld-2', name: 'Deepa Mane', phone: '+91 98765 11111', source: 'Instagram Offer', interest: 'Personal Training', date: '03 Oct 2026', status: 'Trial Booked' },
    { id: 'ld-3', name: 'Ganesh More', phone: '+91 98765 22222', source: 'Walk-in', interest: 'Quarterly Plan', date: '02 Oct 2026', status: 'Follow Up' },
  ],
};

// Trainer Portal Mock Data
export const MOCK_TRAINER_DATA = {
  profile: {
    name: 'Vikram Shinde',
    title: 'Head Strength & Power Coach',
    gymName: 'Iron Haven Fitness Club, Keshav Nagar',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    assignedClientsCount: 14,
    completedSessionsThisMonth: 38,
    averageRating: 4.9,
  },
  todaySchedule: [
    { id: 'ts-1', clientName: 'Rohan Sharma', time: '07:00 AM - 08:00 AM', goal: 'Squat & Deadlift Technique', status: 'Completed' },
    { id: 'ts-2', clientName: 'Aditya Deshmukh', time: '08:30 AM - 09:30 AM', goal: 'Upper Body Hypertrophy', status: 'Completed' },
    { id: 'ts-3', clientName: 'Suraj Jadhav', time: '05:30 PM - 06:30 PM', goal: 'Weight Loss Conditioning', status: 'Upcoming' },
    { id: 'ts-4', clientName: 'Aniket Bhosale', time: '07:00 PM - 08:00 PM', goal: 'Powerlifting Max Test', status: 'Upcoming' },
  ],
  assignedClients: [
    { id: 'cli-1', name: 'Rohan Sharma', plan: 'Annual VIP PT', progress: 'Lost 6.7 kg fat', attendance: '92%', lastSession: 'Today' },
    { id: 'cli-2', name: 'Aditya Deshmukh', plan: 'Strength PT', progress: 'Bench +15kg', attendance: '88%', lastSession: 'Today' },
    { id: 'cli-3', name: 'Suraj Jadhav', plan: 'Fat Loss PT', progress: 'Lost 4.2 kg fat', attendance: '95%', lastSession: '02 Oct 2026' },
    { id: 'cli-4', name: 'Sneha Patil', plan: 'Women Strength', progress: 'Deadlift 60kg', attendance: '90%', lastSession: '01 Oct 2026' },
  ],
};

// Super Admin Portal Mock Data
export const MOCK_ADMIN_DATA = {
  stats: {
    totalGyms: 48,
    verifiedGyms: 42,
    pendingVerification: 6,
    totalMembers: 12450,
    totalRevenueTracked: 18500000, // ₹1.85 Cr
    cityDistribution: [
      { city: 'Pune (Keshav Nagar & Surrounds)', count: 28 },
      { city: 'Pune (Rest of City)', count: 14 },
      { city: 'Mumbai', count: 4 },
      { city: 'Bangalore', count: 2 },
    ],
  },
  pendingGyms: [
    { id: 'pg-1', name: 'Titan Force Fitness', location: 'Mundhwa, Pune', ownerName: 'Rajesh Patil', submittedDate: '03 Oct 2026', phone: '+91 98888 77766', documentStatus: 'Documents Uploaded' },
    { id: 'pg-2', name: 'Core Zone Studio', location: 'Kharadi, Pune', ownerName: 'Priya Mehta', submittedDate: '02 Oct 2026', phone: '+91 97777 66655', documentStatus: 'Pending GST Verification' },
    { id: 'pg-3', name: 'Vibe Fitness & CrossFit', location: 'Magarpatta, Pune', ownerName: 'Vijay Shinde', submittedDate: '30 Sep 2026', phone: '+91 96666 55544', documentStatus: 'Under Review' },
  ],
  platformReports: [
    { id: 'rep-1', type: 'Monthly GymOnboarding Growth', metric: '+12 Gyms', date: 'Sep 2026' },
    { id: 'rep-2', type: 'Keshav Nagar Gym Discovery Searches', metric: '14,200 Searches', date: 'Sep 2026' },
    { id: 'rep-3', type: 'Membership Conversions', metric: '68% Click-to-Enquire', date: 'Sep 2026' },
  ],
};
