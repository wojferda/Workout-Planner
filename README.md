# Workout Planner

Aplikacja do zarządzania planami treningowymi, umożliwiająca tworzenie, edycję i organizację treningów.

## 🚀 Spis treści
- [Funkcjonalności](#-funkcjonalności)
- [Technologie](#️-technologie)
- [Instalacja](#-instalacja)
- [Struktura projektu](#-struktura-projektu)
- [API](#-api)
- [Testy](#-testy)
- [Rozwój](#-rozwój)

## 🚀 Funkcjonalności

### Plany treningowe
- Tworzenie nowych planów treningowych
- Przeglądanie listy planów
- Edycja istniejących planów
- Usuwanie planów

### Dni treningowe
- Dodawanie dni do planu treningowego
- Edycja nazw dni
- Usuwanie dni
- Automatyczne sortowanie dni według kolejności

### Ćwiczenia
- Dodawanie ćwiczeń do dni treningowych
- Edycja parametrów ćwiczeń (nazwa, serie, powtórzenia, notatki)
- Usuwanie ćwiczeń
- Automatyczne sortowanie ćwiczeń w ramach dnia

## 🛠️ Technologie

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- PostgreSQL

### Infrastruktura
- Docker
- Docker Compose

## 📦 Instalacja

### Wymagania
- Docker
- Docker Compose

### Uruchomienie aplikacji

1. Sklonuj repozytorium:
```bash
git clone <repository-url>
cd workout-planner
```

2. Uruchom aplikację:
```bash
docker-compose up --build
```

3. Aplikacja będzie dostępna pod adresami:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📁 Struktura projektu

```
workout-planner/
├── frontend/                 # Aplikacja React
│   ├── src/
│   │   ├── components/      # Komponenty React
│   │   └── tests/          # Testy integracyjne
│   ├── Dockerfile
│   └── package.json
├── backend/                  # Serwer Node.js
│   ├── src/
│   │   ├── controllers/    # Kontrolery
│   │   ├── entities/       # Encje TypeORM
│   │   └── services/       # Warstwa biznesowa
│   ├── Dockerfile
│   └── package.json
├── database/
│   └── init/              # Skrypty inicjalizacyjne bazy danych
└── docker-compose.yml
```

## 📝 API

### Plany treningowe
- `GET /api/plans` - Lista planów
- `GET /api/plans/:id` - Szczegóły planu
- `POST /api/plans` - Tworzenie planu
- `PATCH /api/plans/:id` - Aktualizacja planu
- `DELETE /api/plans/:id` - Usunięcie planu

### Dni treningowe
- `POST /api/plans/:planId/days` - Dodanie dnia
- `PATCH /api/days/:id` - Aktualizacja dnia
- `DELETE /api/days/:id` - Usunięcie dnia
- `POST /api/days/:dayId/exercises` - Dodanie ćwiczenia

### Ćwiczenia
- `PATCH /api/exercises/:id` - Aktualizacja ćwiczenia
- `DELETE /api/exercises/:id` - Usunięcie ćwiczenia

## 🧪 Testy

### Uruchamianie testów integracyjnych

1. Przez interfejs użytkownika:
```bash
# Uruchom aplikację
docker-compose up -d

# Otwórz http://localhost:5173
# Kliknij przycisk "Run Tests"
```

2. Przez wiersz poleceń:
```bash
# Uruchom testy
docker-compose run test
```

### Zakres testów
- Tworzenie planu treningowego
- Dodawanie dni do planu
- Dodawanie ćwiczeń
- Edycja ćwiczeń
- Usuwanie elementów

## 🔧 Rozwój

### Uruchomienie w trybie developerskim

1. Frontend:
```bash
cd frontend
npm install
npm run dev
```

2. Backend:
```bash
cd backend
npm install
npm run dev
```

### Główne pliki konfiguracyjne

1. docker-compose.yml:
```yaml
version: '3.8'
services:
  backend:
    build: 
      context: ./backend
    ports:
      - "3000:3000"
  frontend:
    build:
      context: ./frontend
    ports:
      - "5173:5173"
  postgres:
    image: postgres:15-alpine
```

2. frontend/package.json:
```json
{
  "scripts": {
    "dev": "vite",
    "test:integration": "vite-node src/tests/runTests.ts"
  }
}
```

3. backend/package.json:
```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "start": "ts-node src/index.ts"
  }
}
```

### Zmienne środowiskowe

1. Backend (.env):
```env
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=workout_planner
```

2. Frontend (.env):
```env
VITE_API_URL=http://localhost:3000/api
```

## API Structure
The API follows a nested resource pattern:
- Plans are top-level resources
- Days are nested under plans
- Exercises are nested under days for creation, but have their own endpoints for updates and deletion
