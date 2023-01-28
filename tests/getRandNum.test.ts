import { describe, it, expect } from 'vitest'
import { getRandNum } from '../src/helpers/getRandNum'

describe('getRandNum', () => {
  it('cant be greater than 10', () => {
    expect(getRandNum(1, 10)).toBeLessThanOrEqual(10)
  })
  it('cant be less than 1', () => {
    expect(getRandNum(1, 10)).toBeGreaterThanOrEqual(1)
  })
})
