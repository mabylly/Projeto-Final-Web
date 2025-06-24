// src/mocks/historyMock.ts

import type { HistoryItem } from '../types/history';

export const historyMock: HistoryItem[] = [
  {
    id: 'hist-001',
    searchTerm: 'velocity',
    createdAt: 'June 23rd, 2025',
    readingLevel: '5th Grade',
  },
  {
    id: 'hist-002',
    searchTerm: 'gravity',
    createdAt: 'June 23rd, 2025',
    readingLevel: '5th Grade',
  },
  {
    id: 'hist-003',
    searchTerm: 'Identify unique properties of each state of matter',
    createdAt: 'June 21st, 2025',
    readingLevel: '5th Grade',
  },
  {
    id: 'hist-004',
    searchTerm: 'Ciclo da Água',
    createdAt: 'June 20th, 2025',
    readingLevel: 'Ensino Fundamental',
  }
];