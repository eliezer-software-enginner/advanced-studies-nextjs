/**
 * Cria um link markdown a partir de um texto selecionado e uma URL.
 * O link é formatado como [texto](url) e inserido no local da seleção.
 *
 * @param url - A URL para o link
 * @param selectedText - O texto selecionado que será transformado em link
 * @param textarea - O elemento textarea onde o texto está sendo editado
 * @param setValue - Função para atualizar o valor do campo
 * @returns void
 */
export const handleCreateLink = (
  url: string,
  selectedText: string,
  textarea: HTMLTextAreaElement | null,
  setValue: (text: string) => void
) => {
  if (!selectedText || !textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const newText =
    text.substring(0, start) +
    `[${selectedText}](${url})` +
    text.substring(end);

  if (url.trim().length > 0) setValue(newText);
};

/**
 * Aplica formatação de negrito ao texto selecionado usando a sintaxe markdown.
 * O texto é formatado como **texto** e inserido no local da seleção.
 *
 * @param selectedText - O texto selecionado que será formatado em negrito
 * @param textarea - O elemento textarea onde o texto está sendo editado
 * @param setValue - Função para atualizar o valor do campo
 * @param setSelectedText - Função para atualizar o texto selecionado com a formatação
 * @returns void
 */
export const handlePopupBold = (
  selectedText: string,
  textarea: HTMLTextAreaElement | null,
  setValue: (text: string) => void,
  setSelectedText: (text: string) => void
) => {
  if (!selectedText || !textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const newText =
    text.substring(0, start) + `**${selectedText}**` + text.substring(end);

  setValue(newText);
  setSelectedText(`**${selectedText}**`);
};

/**
 * Manipula a seleção de texto em um textarea, preparando para formatação ou criação de link.
 * Obtém o texto selecionado e sua posição para exibir o popup de formatação.
 *
 * @param textarea - O elemento textarea onde o texto está sendo editado
 * @param setSelectedText - Função para atualizar o texto selecionado
 * @param setPopupPosition - Função para atualizar a posição do popup
 * @param setShowPopup - Função para controlar a visibilidade do popup
 * @returns void
 */
export const handleTextSelection = (
  textarea: HTMLTextAreaElement | null,
  setSelectedText: (text: string) => void,
  setPopupPosition: (position: { x: number; y: number }) => void,
  setShowPopup: (show: boolean) => void
) => {
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value.substring(start, end);

  if (text.trim() === "") return;

  const rect = textarea.getBoundingClientRect();
  setSelectedText(text);
  setPopupPosition({
    x: rect.left,
    y: rect.bottom + window.scrollY,
  });
  setShowPopup(true);
};
