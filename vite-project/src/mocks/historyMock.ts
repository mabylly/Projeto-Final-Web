// src/mocks/historyMock.ts

import type { HistoryItem } from '../types/history';

export const historyMock: HistoryItem[] = [
  {
    id: 'hist-001',
    topic: 'Velocidade e Aceleração', 
    grade: 'Ensino Médio',            
    createdAt: '24 de Jun, 2025',
  },
  {
    id: 'hist-002',
    topic: 'Gravidade e as Leis de Newton',
    grade: 'Ensino Médio',
    createdAt: '23 de Jun, 2025',
  },
  {
    id: 'hist-003',
    topic: 'Propriedades dos estados da matéria',
    grade: 'Ensino Fundamental II',
    createdAt: '21 de Jun, 2025',
  },
  {
    id: 'hist-004',
    topic: 'Ciclo da Água na natureza',
    grade: 'Ensino Fundamental I',
    createdAt: '20 de Jun, 2025',
  }
];