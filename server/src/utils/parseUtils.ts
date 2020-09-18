import * as moment from 'moment';

export class ParseUtils {
  public static sanitizeString(value: string): string {
    return value.trim().replace(/^"(.+(?="$))"$/, '$1');
  }

  public static parseDate(value: string): Date {
    return moment.utc(value, 'MM/DD/YYYY').toDate();
  }
}
