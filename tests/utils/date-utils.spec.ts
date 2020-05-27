/* eslint-disable no-undef */
import { dateDiffInMinutes, dateFormatDE } from '../../src/utils/date-utils';

describe('Testing date diff function', () => {
  it('should return the difference between two dates in Hours', () => {
    const date1 = new Date('2020-05-01T10:00:00Z');
    const date2 = new Date('2020-05-01T11:00:00Z');
    const diff = dateDiffInMinutes(date1, date2);
    expect(diff).toBe(60);
  });

  it('should return a NaN for a wrong date string', () => {
    const date1 = new Date('20200-05-01T10:00:00Z');
    const date2 = new Date('20200-05-01T11:00:00Z');
    const diff = dateDiffInMinutes(date1, date2);
    expect(diff).toBe(NaN);
  });
});

describe('Testing date format DE functions', () => {
  it('should return the formated date with right', () => {
    const dateFormatted = dateFormatDE(new Date('2020-05-01T10:00:00Z'));
    expect(dateFormatted).toEqual('01.05.2020, 12:00:00');
  });

  it('should return a NaN for a wrong date string', () => {
    expect(() => dateFormatDE(new Date('20200-05-01T10:00:00Z'))).toThrow(
      RangeError
    );
  });
});
