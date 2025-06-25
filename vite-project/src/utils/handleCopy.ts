// Função para copiar conteúdo do card
import React from 'react';

type SetCopiedId = React.Dispatch<React.SetStateAction<string | null>>;

  export function handleCopy (textToCopy: string, id: string, setCopiedId: SetCopiedId ) {
  // Usamos a API nativa do navegador para copiar
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // Se a cópia funcionar, atualizamos o estado
      setCopiedId(id);
      // E definimos um tempo para remover o feedback visual
      setTimeout(() => {
        setCopiedId(null);
      }, 2000); // O feedback some após 2 segundos
    })
    .catch(err => {
      console.error('Falha ao copiar texto: ', err);
    });
  };