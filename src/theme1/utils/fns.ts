interface DayInfo {
  day: string;
  date: string;
  isToday?: boolean;
  isTomorrow?: boolean;
}

export const getDaysFromTodayToSunday = (): DayInfo[] => {
  const today = new Date();
  const days: DayInfo[] = [];
  
  // Day names
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const currentDay = today.getDay();
  
  // Calculate how many days from today to Sunday
  const daysToSunday = currentDay === 0 ? 0 : 7 - currentDay;
  
  for (let i = 0; i <= daysToSunday; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayOfWeek = date.getDay();
    const dayName = dayNames[dayOfWeek];
    const dateString = `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    const dayInfo: DayInfo = {
      day: dayName,
      date: dateString,
      isToday: i === 0,
      isTomorrow: i === 1
    };
    
    // Add special labels for today and tomorrow
    if (i === 0) {
      dayInfo.day = 'Today';
    } else if (i === 1) {
      dayInfo.day = 'Tomorrow';
    }
    
    days.push(dayInfo);
  }
  
  return days;
};

// Alternative function that returns days in a different format
export const getDaysFromTodayToSundayFormatted = (): Array<{label: string, value: string, date?: string}> => {
  const days = getDaysFromTodayToSunday();
  
  return days.map((day, index) => ({
    label: day.day,
    value: index === 0 ? 'today' : index === 1 ? 'tomorrow' : day.day.toLowerCase(),
    date: day.date
  }));
};
