export interface SelectOption {
  value: number;
  label: string;
}

export const generateTimeOptions = (maxHours: number = 4): SelectOption[] => {
  const options: SelectOption[] = [];

  for (let hours = 0; hours <= maxHours; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      if (hours === 0 && minutes === 0) continue;
      if (hours === maxHours && minutes > 0) break;

      const totalMinutes = hours * 60 + minutes;
      let label = '';

      if (hours > 0) {
        label += `${hours}시간`;
      }
      if (minutes > 0) {
        if (hours > 0) label += ' ';
        label += `${minutes}분`;
      }

      options.push({ value: totalMinutes, label });
    }
  }
  return options;
};

export const minutesToHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};
