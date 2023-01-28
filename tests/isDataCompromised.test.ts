import { describe, it, expect } from 'vitest'
import { isDataComromised } from '../src/helpers/isDataCompromised'

const example = [
  { id: 'c_RaFvpH-R', guesses: 1, name: 't-34-85-zis' },
  { id: 'kgHBFSSen9', guesses: 3, name: 'tiger-h1' },
  { id: 'gHAPRU72si', guesses: 0 },
]
const example2 = [{ id: 'c_RaFvpH-R', guesses: 4, name: 't-34-85-zis' }]
const example3 = [{ id: 'c_RaFvpH-R', guesses: -1, name: 't-34-85-zis' }]

describe('isDataCompromised', () => {
  it('points cant be less than 0', () => {
    expect(isDataComromised(example, -1, example)).toBe(true)
  })
  it('points cant be greater than overall sum of guesses', () => {
    expect(isDataComromised(example, 19, example)).toBe(true)
  })
  it('guesses cant be greater than 3', () => {
    expect(isDataComromised(example2, 1, example2)).toBe(true)
  })
  it('guesses cant be less than 0', () => {
    expect(isDataComromised([], 1, example3)).toBe(true)
  })
  it('should be false', () => {
    expect(isDataComromised(example, 1, example)).toBe(false)
  })
})
