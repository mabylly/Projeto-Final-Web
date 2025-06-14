// Este é um exemplo de como a resposta da sua API poderia ser estruturada.
// É um array de objetos, onde cada objeto representa um card de resultado.


import type { Result } from '../types';

export const resultsMock: Result[] = [
  {
    id: 'def-agua-01',
    type: 'definition',
    title: 'Definição do Tópico',
    content: {
      text: 'O ciclo da água, também conhecido como ciclo hidrológico, descreve o movimento contínuo da água sobre, acima e abaixo da superfície da Terra...'
    }
  },
  {
    id: 'cur-agua-02',
    type: 'curiosities',
    title: 'Curiosidades',
    content: {
      items: [
        'Aproximadamente 97% de toda a água da Terra é salgada.',
        'Uma única árvore pode liberar centenas de litros de água por dia.',
        'A água que bebemos hoje é a mesma que os dinossauros beberam.'
      ]
    }
  },
  {
    id: 'mcq-agua-03', // Apenas um ID para o card inteiro
    type: 'multiple_choice_question',
    title: 'Atividade: Múltipla Escolha', // Título genérico para o card
    content: {
      // O conteúdo agora é um array de objetos de pergunta
      questions: [
        {
          id: 'q1', // ID para a key do loop interno
          question: 'Qual processo é responsável pela transformação da água líquida em vapor?',
          options: ['Condensação', 'Precipitação', 'Evaporação', 'Infiltração'],
          correctAnswerIndex: 2
        },
        {
          id: 'q2', // ID para a key do loop interno
          question: 'Quando o vapor de água na atmosfera esfria e se transforma em nuvens, chamamos de:',
          options: ['Evaporação', 'Transpiração', 'Sublimação', 'Condensação'],
          correctAnswerIndex: 3
        }
      ]
    }
  },
  {
    id: 'opn-agua-05',
    type: 'open_ended_question',
    title: 'Atividade: Pergunta Dissertativa',
    content: {
      prompt: 'Descreva como o desmatamento pode impactar o ciclo da água.'
    }
  },
  {
    id: 'vid-agua-06',
    type: 'video_links',
    title: 'Vídeos Sugeridos',
    content: {
      videos: [
        { id: 'vid-yt-1', title: 'O Ciclo da Água Explicado', url: '#', platform: 'YouTube' },
        { id: 'vid-vm-2', title: 'Water Cycle by NatGeo', url: '#', platform: 'YouTube' }
      ]
    }
  }
];