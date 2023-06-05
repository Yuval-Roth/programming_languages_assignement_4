import { InitialOptionsTsJest } from 'ts-jest';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true,
} as InitialOptionsTsJest;