export interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Present' | 'Late' | 'Absent';
  gymName: string;
}

export interface MemberWorkout {
  id: string;
  title: string;
  day: string;
  targetFocus: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    weight?: string;
    completed: boolean;
  }[];
}

export interface MemberProgressLog {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  muscleMassKg?: number;
  notes?: string;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  gymName: string;
  paymentMethod: string;
  status: 'Completed' | 'Pending' | 'Failed';
  invoiceUrl?: string;
}

export interface TrainerBooking {
  id: string;
  trainerName: string;
  trainerPhoto: string;
  date: string;
  timeSlot: string;
  sessionType: string;
  status: 'Confirmed' | 'Upcoming' | 'Completed' | 'Cancelled';
}
