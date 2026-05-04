# Лабораторна робота №2 — React Native

> **Тема:** Побудова вкладеної навігації та оптимізація відображення великих списків у React Native із використанням компонентів FlatList та SectionList.

---

## Зміст

- [Вимоги](#вимоги)
- [Інструкція запуску](#інструкція-запуску)
- [Структура проєкту](#структура-проєкту)
- [Реалізований функціонал](#реалізований-функціонал)
- [Скріншоти](#скріншоти)
- [Висновки (контрольні запитання)](#висновки)

---

## Інструкція запуску

### 1. Клонування репозиторію

```bash
git clone https://github.com/MobileLabsRN2026/lab2.git
cd lab2
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Встановлення бібліотек навігації

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-masked-view/masked-view
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer
```

### 4. Запуск застосунку

```bash
npx expo start
```

Після запуску:
- **На телефоні:** відскануйте QR-код через застосунок **Expo Go**
- **Android емулятор:** натисніть `a` у терміналі
- **iOS емулятор:** натисніть `i` у терміналі (лише на macOS)

---

## Структура проєкту

```
lab2/
├── App.js                          # Точка входу
└── src/
    ├── navigation/
    │   └── AppNavigator.js         # Drawer + Stack навігація
    ├── screens/
    │   ├── MainScreen.js           # Стрічка новин (FlatList)
    │   ├── DetailsScreen.js        # Деталі новини
    │   └── ContactsScreen.js       # Контакти (SectionList)
    ├── components/
    │   ├── CustomDrawer.js         # Кастомне бокове меню
    │   └── NewsCard.js             # Картка новини
    └── data/
        ├── newsData.js             # Генератор тестових новин
        └── contactsData.js         # Дані контактів
```

---

## Реалізований функціонал

### Навігація

| Елемент | Опис |
|--------|------|
| **Drawer Navigator** | Бокове меню з кастомним компонентом |
| **Stack Navigator** | Вкладений у Drawer; Main → Details |
| **Передача параметрів** | `newsItem` передається з MainScreen у DetailsScreen |
| **Динамічний заголовок** | DetailsScreen встановлює заголовок через `navigation.setOptions` |
| **Без подвійного header** | `headerShown: false` на Drawer, заголовок тільки у Stack |

### Екран новин — FlatList

| Функція | Деталі |
|---------|--------|
| **Pull-to-Refresh** | `refreshing` + `onRefresh` з `setTimeout` (імітація запиту) |
| **Infinite Scroll** | `onEndReached` + `onEndReachedThreshold={0.4}` |
| **ListHeaderComponent** | Заголовок стрічки з описом |
| **ListFooterComponent** | Індикатор завантаження або «Кінець стрічки» |
| **ItemSeparatorComponent** | Відступ між картками |
| **initialNumToRender** | `6` |
| **maxToRenderPerBatch** | `8` |
| **windowSize** | `7` |
| **removeClippedSubviews** | `true` |

### Кастомний Drawer

- Аватар користувача
- ПІБ
- Група
- Пункт меню «Новини»
- Пункт меню «Контакти»
- Активний пункт підсвічується

### Екран контактів — SectionList

| Властивість | Реалізація |
|-------------|-----------|
| `sections` | 10 секцій (А–Ш), 20 контактів |
| `renderItem` | Аватар + ім'я + телефон + email + кнопка |
| `renderSectionHeader` | Липкий заголовок з літерою алфавіту |
| `keyExtractor` | `item.id` |
| `ItemSeparatorComponent` | Тонка лінія між контактами |

### Модель даних

```js
// Новина
{
  id: '1',
  title: 'Технології: Новина №1',
  description: '...',
  image: 'https://picsum.photos/seed/1/400/200',
  category: 'Технології',
  date: '05.05.2026',
  author: 'Автор 1',
}
```

---

## Скріншоти

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/0db83f7b-1e9a-40e6-b34d-18ed4ffbc576" />

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/988c631c-05d0-4728-aaa0-b11f5f97ba62" />

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/8dfc4c80-429d-47ff-9aea-1f8a8531682b" />

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/b057e4f7-7bf5-4a37-badd-ab8d2ef5f031" />

---

## Висновки

### 1. Чим відрізняється FlatList від ScrollView?

**ScrollView** рендерить усі дочірні елементи одночасно — навіть ті, що знаходяться поза екраном. Це зручно для невеликої кількості елементів, але спричиняє проблеми з пам'яттю при великих списках.

**FlatList** використовує механізм **віртуалізації**: у DOM-подібному дереві рендеряться лише видимі елементи + невеликий буфер. Невидимі елементи видаляються і перевикористовуються при прокрутці. Це значно скорочує споживання пам'яті і підвищує продуктивність.

### 2. Що таке віртуалізація списків?

Віртуалізація — це техніка оптимізації, за якої у пам'яті та дереві компонентів зберігаються лише **елементи, видимі на екрані**, плюс невеликий буфер. При прокрутці компоненти, що виходять за межі екрану, **видаляються**, а компоненти, що потрапляють у видиму зону, **створюються заново або перевикористовуються**. Це дозволяє ефективно відображати списки з тисячами елементів без суттєвого навантаження на пам'ять.

### 3. Як здійснюється передача параметрів між екранами?

Параметри передаються через другий аргумент функції `navigation.navigate`:

```js
// Відправник
navigation.navigate('Details', { newsItem: item });

// Отримувач
const { newsItem } = route.params;
```

Параметр `route.params` містить об'єкт із переданими даними. Для динамічного заголовку можна використовувати `navigation.setOptions` всередині `useLayoutEffect`.

### 4. Що таке вкладена навігація?

Вкладена навігація — це архітектура, коли **один навігатор містить інший**. У цій роботі реалізована така структура:

```
Drawer Navigator           ← зовнішній (бокове меню)
└── NewsStack (Stack)      ← вкладений (управляє переходами)
    ├── MainScreen
    └── DetailsScreen
└── ContactsScreen         ← безпосередньо у Drawer
```

Це дозволяє поєднувати різні типи навігації в одному застосунку і будувати складні маршрути.

### 5. У яких випадках застосовується SectionList?

`SectionList` застосовується, коли дані потрібно **відображати групами (секціями)** з окремими заголовками для кожної групи. Типові приклади:

- **Контакти** згруповані за літерою алфавіту (як у цій роботі)
- **Список налаштувань** згрупований за розділами
- **Каталог товарів** за категоріями
- **Розклад** з групуванням за днями тижня

На відміну від `FlatList`, `SectionList` підтримує властивості `sections`, `renderSectionHeader` і `stickySectionHeadersEnabled`, що дозволяє створювати «липкі» заголовки секцій.
