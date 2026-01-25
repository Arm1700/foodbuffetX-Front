/**
 * Удаляет HTML-теги из строки, оставляя только текст
 * Работает без DOM, используя регулярные выражения
 */
export function stripHtmlTags(html) {
  if (!html) return '';
  if (typeof html !== 'string') return String(html);
  
  // Удаляем все HTML-теги
  let text = html.replace(/<[^>]*>/g, '');
  
  // Декодируем основные HTML-сущности
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };
  
  text = text.replace(/&[#\w]+;/g, (match) => entities[match] || match);
  
  // Убираем лишние пробелы
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

/**
 * Безопасно рендерит HTML или возвращает текст, если HTML нет
 */
export function renderHtmlOrText(content) {
  if (!content) return '';
  // Если есть HTML-теги, используем dangerouslySetInnerHTML
  if (/<[^>]+>/.test(content)) {
    return { __html: content };
  }
  // Иначе возвращаем просто текст
  return null;
}

