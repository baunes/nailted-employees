import { createArrayCsvStringifier } from 'csv-writer';
import * as parse from 'csv-parse/lib/sync';
import * as moment from 'moment';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';

export class ParseUtils {
  public static parseDate(value: string): Date {
    return moment.utc(value, DEFAULT_DATE_FORMAT).toDate();
  }

  public static formatDate(value: Date): string {
    return moment.utc(value).format(DEFAULT_DATE_FORMAT);
  }

  public static toCsvRow(row: any[]): string {
    const csvStringifier = createArrayCsvStringifier({});
    return csvStringifier.stringifyRecords([row]);
  }

  public static fromCsvRow(row: string): string[] {
    return (parse.default(row) as string[][])[0];
  }
}
