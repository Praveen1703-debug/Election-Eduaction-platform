import { describe, it, expect } from 'vitest';
import { calculateAccuracy } from '../src/data/mockData';

describe('calculateAccuracy', () => {
  it('should return 100 for a perfect prediction', () => {
    const poll = { bjp: [240, 240], inc: [99, 99] };
    const actual = { bjp: 240, inc: 99 };
    const score = calculateAccuracy(poll, actual);
    expect(parseFloat(score)).toBe(100);
  });

  it('should deduct points for incorrect predictions', () => {
    const poll = { bjp: [200, 200], inc: [120, 120] }; // Error of 40 for BJP, 21 for INC = 61 total
    const actual = { bjp: 240, inc: 99 };
    const score = calculateAccuracy(poll, actual);
    expect(parseFloat(score)).toBeLessThan(100);
  });

  it('should not return a negative score', () => {
    const poll = { bjp: [0, 0], inc: [0, 0] };
    const actual = { bjp: 240, inc: 99 };
    const score = calculateAccuracy(poll, actual);
    expect(parseFloat(score)).toBeGreaterThanOrEqual(0);
  });
});
