# Лабораторна робота №6

## Тема
Побудова авторизації та збереження персональних даних у React Native з використанням Firebase Authentication та Firestore

---

## Інструкція запуску

### Передумови

- [Node.js](https://nodejs.org/) (версія 18 або вище)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Додаток **Expo Go** на мобільному пристрої або емулятор Android/iOS
- Обліковий запис [Firebase](https://firebase.google.com/)

### 1. Клонування репозиторію

```bash
git clone https://github.com/EmpOkami/MobileLabsRN2026.git
cd MobileLabsRN2026/Lab6
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Налаштування Firebase

1. Перейдіть до [Firebase Console](https://console.firebase.google.com/) та створіть новий проєкт.
2. Увімкніть **Authentication** → метод входу: **Email/Password**.
3. Створіть базу даних **Firestore** у тестовому режимі.
4. У налаштуваннях проєкту (⚙️ → Project settings → Your apps) зареєструйте веб-застосунок і скопіюйте конфігураційний об'єкт.
5. Створіть файл `firebaseConfig.js` у кореневій директорії проєкту:

```js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7xzn-R0N78Qcx9t7zyMBH9jbDnPm6qps",
    authDomain: "lab6-21ec7.firebaseapp.com",
    projectId: "lab6-21ec7",
    storageBucket: "lab6-21ec7.firebasestorage.app",
    messagingSenderId: "376103759684",
    appId: "1:376103759684:web:b455a77d428e1f1cfef111",
    measurementId: "G-E4N9WX8VZD"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export default app;
```

### 4. Firestore Security Rules

У Firestore Console перейдіть у вкладку **Rules** та встановіть наступні правила:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
  }
}
```

### 5. Запуск застосунку

```bash
npx expo start
```

Відскануйте QR-код у додатку **Expo Go** або запустіть на емуляторі.

---

## Опис реалізованого функціоналу

### 1. Авторизація користувача

- **Реєстрація** — нові користувачі можуть створити обліковий запис, вказавши email та пароль. Після успішної реєстрації відбувається автоматичний вхід.
- **Вхід** — існуючий користувач входить за email та паролем через Firebase Authentication.
- **Вихід із системи** — кнопка виходу скидає сесію та перенаправляє на екран входу.

### 2. Захищена навігація (Expo Router)

Маршрути розділені на дві групи:
- `(auth)` — публічні екрани: `login`, `register`, `forgot-password`.
- `(app)` — захищені екрани: `profile`, `edit-profile`.

У кореневому `_layout.jsx` реалізований `Redirect`: якщо користувач не авторизований — він перенаправляється на `/login`, якщо авторизований — на `/profile`.

### 3. Контекст авторизації (AuthContext)

`AuthContext` централізовано зберігає стан авторизованого користувача та надає методи:
- `login(email, password)`
- `register(email, password)`
- `logout()`
- `resetPassword(email)`
- `deleteAccount(email, password)`

Підписка на `onAuthStateChanged` автоматично оновлює стан при зміні сесії.

### 4. Збереження персональних даних

Після входу користувач може заповнити або оновити свій профіль:
- **Ім'я**
- **Вік**
- **Місто**

Дані зберігаються у Firestore у колекції `users`, в документі з ID рівним `uid` користувача. При завантаженні профілю дані зчитуються з Firestore та відображаються у формі.

### 5. Редагування та видалення облікового запису

- Форма редагування профілю дозволяє оновити ім'я, вік та місто.
- Кнопка **«Видалити акаунт»** відкриває діалог підтвердження.
- Перед видаленням виконується **повторна автентифікація** (`reauthenticateWithCredential`) — користувач вводить поточний пароль.
- Після успішної повторної автентифікації видаляється документ із Firestore та обліковий запис із Firebase Authentication.

### 6. Відновлення паролю

- На екрані входу є посилання **«Забули пароль?»**.
- Користувач вводить свій email, і Firebase надсилає лист зі скиданням пароля через `sendPasswordResetEmail`.

---

## Скріншоти роботи застосунку

Форма входу

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/ab7a4147-1956-4044-8fb5-fd58be88f280" />


Форма реєстрації

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/11796651-fd4a-4f8a-b721-4fa594c8b83b" />


Профіль

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/ca24af20-e7bd-4971-99d8-96a30a949881" />


Редагування профіля

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/1e458bdb-0523-4bc9-b6ff-57ece052b31f" />


Успішне редагування (Zhytomyr змінено на Zhytomyr2)

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/6eb09dc4-da7c-4cd5-8420-de277f501c63" />


База даних

<img width="1280" height="678" alt="image" src="https://github.com/user-attachments/assets/9286f38a-eced-4ff7-8857-b4386557017b" />
<img width="1280" height="619" alt="image" src="https://github.com/user-attachments/assets/19320de4-4d68-45d2-b0b2-b469cbcdc8f4" />


Видалення аккаунта

<img width="576" height="1280" alt="image" src="https://github.com/user-attachments/assets/fa3a67ba-dca4-473d-a941-37e4b9b7f5fe" />


База даних після видалення аккаунта

<img width="1063" height="431" alt="image" src="https://github.com/user-attachments/assets/f170aa90-cf45-498c-a280-c94b5c479395" />


---

## Структура проєкту

```
Lab6/
├── app/
│   ├── _layout.jsx          
│   ├── index.jsx            
│   ├── (auth)/
│   │   ├── _layout.jsx     
│   │   ├── login.jsx       
│   │   └── register.jsx     
│   └── (app)/
│       ├── _layout.jsx      
│       ├── profile.jsx      
│       └── edit-profile.jsx 
├── context/
│   └── AuthContext.jsx     
├── firebase/
│   └── config.js          
└── app.json
```

---

## Висновки

У ході виконання лабораторної роботи були набуті практичні навички:

- **Інтеграції Firebase Authentication** у React Native застосунок: реалізовано реєстрацію, вхід, вихід, скидання пароля та видалення облікового запису з повторною автентифікацією.
- **Роботи з Firebase Firestore**: збереження та читання персональних даних користувача з дотриманням принципу «кожен користувач бачить лише свої дані», забезпечено як на рівні клієнтського коду, так і через Firestore Security Rules.
- **Побудови захищеної навігації** за допомогою Expo Router: розподіл маршрутів на публічні `(auth)` та приватні `(app)` групи з автоматичним перенаправленням залежно від стану авторизації.
- **Централізованого управління станом** авторизації через React Context API (`AuthContext`), що спрощує доступ до даних користувача з будь-якого компонента застосунку.

Отриманий досвід є фундаментальним для розробки реальних мобільних застосунків із системою облікових записів.
