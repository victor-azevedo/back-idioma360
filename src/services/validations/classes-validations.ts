import { conflictError } from "@/errors";
import { DateOrTimeKeys } from "@/helpers";

export function validateClasseDatesOrFail(dates: Partial<DateOrTimeKeys>) {
  if (dates.startDate > dates.endDate || dates.startTime >= dates.endTime) {
    throw conflictError("As datas devem seguir uma ordem cronológica");
  }
}
