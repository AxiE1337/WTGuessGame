//@ts-nocheck
import { describe, it, expect } from 'vitest'
import { guessesRemaining } from '../src/helpers/guessesRemaining'

const example = [{ id: 'c_RaFvpH-R', guesses: 3, name: 't-34-85-zis' }]

describe('guessesRemaining', () => {
  it('should return undefined because arrays empty', () => {
    expect(guessesRemaining([], [], 'map', '')).toBe(undefined)
  })
  it('should return undefined because no id', () => {
    expect(guessesRemaining(example, example, 'map', '')).toBe(undefined)
  })
  it('should return undefined because arrays maps arrays empty', () => {
    expect(guessesRemaining(example, [], 'map', 'c_RaFvpH-R')).toBe(undefined)
  })
  it('should return 3', () => {
    expect(guessesRemaining(example, [], 'tank', 'c_RaFvpH-R')).toBe(3)
  })
  it('should return 3', () => {
    expect(guessesRemaining([], example, 'map', 'c_RaFvpH-R')).toBe(3)
  })
  it('should return 0 if type is wrong or incorrect', () => {
    expect(guessesRemaining(example, [], '', 'c_RaFvpH-R')).toBe(0)
  })
})
