import { conflictError } from "@/errors";
import { DateOrTimeKeys } from "@/helpers";

export function validateDatesOrFail(dates: Partial<DateOrTimeKeys>) {
  if (
    dates.startDate > dates.endDate ||
    dates.endDate > dates.testDate ||
    dates.testDate > dates.resultDate ||
    dates.testStartTime >= dates.testEndTime
  ) {
    throw conflictError("As datas devem seguir uma ordem cronológica");
  }
}
