export const generateNews = (startId = 1, count = 15) => {
  const categories = ['Технології', 'Наука', 'Спорт', 'Культура', 'Економіка'];
  const images = [
    'https://picsum.photos/seed/tech/400/200',
    'https://picsum.photos/seed/science/400/200',
    'https://picsum.photos/seed/sport/400/200',
    'https://picsum.photos/seed/culture/400/200',
    'https://picsum.photos/seed/economy/400/200',
  ];

  return Array.from({ length: count }, (_, i) => {
    const idx = (startId + i - 1) % 5;
    return {
      id: String(startId + i),
      title: `${categories[idx]}: Новина №${startId + i}`,
      description: `Це детальний опис новини №${startId + i} з категорії "${categories[idx]}". ` +
        `Тут міститься важлива інформація про останні події у цій сфері. ` +
        `Наші кореспонденти зібрали актуальні дані та підготували вичерпний матеріал для читачів. ` +
        `Слідкуйте за оновленнями на нашому порталі!`,
      category: categories[idx],
      image: `https://picsum.photos/seed/${startId + i}/400/200`,
      date: new Date(Date.now() - (startId + i) * 3600000).toLocaleDateString('uk-UA'),
      author: `Автор ${((startId + i) % 5) + 1}`,
    };
  });
};

export const initialNews = generateNews(1, 15);
