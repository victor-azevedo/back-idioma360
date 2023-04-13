const DATE_KEYS: (keyof DateOrTimeKeys)[] = ["birthday", "startDate", "endDate", "testDate", "resultDate"];
const TIME_KEYS: (keyof DateOrTimeKeys)[] = ["testStartTime", "testEndTime", "startTime", "endTime"];

export function parseDateToDB<T extends Partial<DateOrTimeKeys>>(object: T): T {
  DATE_KEYS.forEach((dateKey) => {
    if (object[dateKey]) {
      object[dateKey] = new Date(object[dateKey] + "T00:00");
    }
  });
  TIME_KEYS.forEach((timeKey) => {
    if (object[timeKey]) {
      object[timeKey] = new Date("1970-01-01T" + object[timeKey]);
    }
  });

  return object;
}

export interface DateOrTimeKeys {
  birthday: string | Date;
  startDate: string | Date;
  endDate: string | Date;
  testDate: string | Date;
  resultDate: string | Date;
  testStartTime: string | Date;
  testEndTime: string | Date;
  startTime: string | Date;
  endTime: string | Date;
}
