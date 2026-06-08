# GymTracker 💪

Aight so this is GymTracker — a full-stack workout app that lets you plan your workouts, track what you actually do in the gym, and keep a history of your gains (or lack thereof). Built with a Spring Boot backend and a React Native mobile app.

## What it does

- **Auth** — sign up, log in, get a JWT token, that whole deal
- **Programs** — create workout programs where you set which exercises you do on which days (Push/Pull/Legs, PPL, Upper/Lower, whatever you're into)
- **Today's Workout** — the app knows what day it is (shocking, right?) and shows you what you've scheduled for today
- **Live Tracking** — start a workout session, log sets with weight & reps as you go, then finish up
- **Workout History** — every set you log gets saved so you can look back and see if you're actually progressing
- **PR Detection** — if you hit a new personal record, the app knows (no notifications for it yet on the frontend tho)

## Tech Stack

### Backend

| Thing | What it is |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 4.0.6 |
| Database | PostgreSQL |
| ORM | JPA / Hibernate |
| Auth | JWT (jjwt) + Spring Security |
| API Docs | Swagger UI (SpringDoc) |
| Build | Maven |

### Mobile

| Thing | What it is |
|---|---|
| Framework | React Native 0.85.3 |
| Language | TypeScript |
| State Management | Zustand |
| Navigation | React Navigation (stack + bottom tabs) |
| Styling | NativeWind (Tailwind for RN) |
| HTTP | Axios |
| Storage | MMKV |

## Getting Started

### Backend

You'll need Java 21 and PostgreSQL running.

```bash
# Create the database
createdb gym_tracker

# Update src/main/resources/application.yaml if your DB creds are different
# Default is admin/password on localhost:5432

# Run it
./mvnw spring-boot:run
```

On startup it'll:
1. Create all the tables (thanks JPA `ddl-auto: update`)
2. Seed a test user — `test@example.com` / `securepassword`

Swagger UI will be at `http://localhost:8084/swagger-ui.html`.

### Mobile

```bash
cd mobile
npm install
npx react-native start
```

The mobile app points at `http://10.0.2.2:8084/api/v1` by default (Android emulator). If you're on iOS or a real device, change that in `mobile/src/services/api.ts`.

## API Endpoints

Everything under `/api/v1`. Auth endpoints are open, everything else needs a `Bearer <token>` header.

### Auth
- `POST /api/v1/auth/register` — create account (`displayName`, `email`, `fullName`, `password`)
- `POST /api/v1/auth/authenticate` — log in (`email`, `password`)

### Programs
- `POST /api/v1/programs` — create a program (name + list of workout days with exercises)
- `GET /api/v1/programs` — get all your programs
- `GET /api/v1/programs/today` — get what's scheduled for today

### Workouts
- `POST /api/v1/workouts` — log a finished set
- `GET /api/v1/workouts/today` — see what you logged today

### Tracking (live sessions)
- `POST /api/v1/tracking/start` — start a workout session
- `POST /api/v1/tracking/set` — log a set during your session
- `POST /api/v1/tracking/end` — finish your session

## Project Structure

```
src/main/java/com/example/gymtracker/
├── controller/        # API endpoints
├── service/           # business logic
├── repository/        # database access (Spring Data JPA)
├── models/            # entities + enums
├── dto/               # request/response objects
└── GymTrackerApplication.java   # entry point + security config

mobile/
├── src/
│   ├── screens/       # Login, Register, Home, Programs, Workout, Profile
│   ├── components/    # Button, Input, Card, Timer, etc.
│   ├── stores/        # Zustand stores (auth, workout, program)
│   ├── services/      # Axios API client
│   ├── navigation/    # React Navigation setup
│   └── theme/         # colors, muscle group colors, dark theme
```

## Stuff that could be better

- **No real tests** — there's literally one test that checks if Spring Boot starts. That's it.
- **Flyway is disabled** — schema is managed by JPA auto-update, which is fine for dev but you'd want migrations in prod
- **The test user's password isn't hashed** in the data initializer (but the auth service does hash it for real users)
- **Mobile app is a work in progress** — some screens work, some are placeholders
- **PR detection exists server-side** but there's no UI for it yet

## License

idk it's whatever
