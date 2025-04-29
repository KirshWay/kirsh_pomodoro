<div align="center">
  <img src="public/icons/image.png" alt="Kirsh Pomodoro Logo" width="200" />
  <h1>Kirsh Pomodoro</h1>
</div>

A time management application based on the Pomodoro technique to help increase productivity and work efficiency.

## Features

- 🍅 Pomodoro timer with three modes: work time, short break, long break
- ✅ Task management and tracking
- 📝 Ability to add notes to tasks
- 🖌️ Minimalist and intuitive interface

## Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Hook Form

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- pnpm 10.10.0 or later

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/KirshWay/kirsh_pomodoro
   cd kirsh_pomodoro
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Run the development server
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Running the Database with Docker Compose

```bash
docker compose -f compose.dev.yaml up --build -d
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
