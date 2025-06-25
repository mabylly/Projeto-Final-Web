import { searchRepository } from '../repositories/searchRepository';
import type { Result } from '../types/result';

interface SaveSearchArgs {
  userId: string;
  topic: string;
  grade: string;
  results: Result[];
}

export const searchService = {
  /**
   * Orquestra o salvamento de um resultado de busca.
   */
  saveSearchResult: async ({ userId, topic, grade, results }: SaveSearchArgs) => {
    try {
      const newSearch = await searchRepository.createSearchWithResults(userId, topic, grade, results);
      console.log(`Busca ${newSearch.id} salva com sucesso para o usuário ${userId}.`);
      return newSearch;
    } catch (error) {
      console.error("Erro na camada de serviço ao salvar busca:", error);
      // Lança o erro para que a camada superior (o controller) saiba que algo deu errado.
      throw new Error("Falha ao salvar o resultado da busca.");
    }
  },
};