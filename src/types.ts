export type Activity = {
  id: string;
  dayOfWeek: string;
  time: string;
  name: string;
  location: string;
};

export type DaySchedule = {
  dayName: string;
  activities: Activity[];
};