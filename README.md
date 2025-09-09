Here’s your README translated into clear, professional English, keeping all the details and formatting intact:

Create Starter Project

This script generates a full-stack project ready to use, with a standardized front-end and back-end structure.

⚡ Features
Front-end
  - Framework: Vite + React
  - CSS: TailwindCSS
  - Form management: Formik & Yup
  - Store: Zustand
  - Fake data: @faker-js/faker
  - HTTP: Axios
  - E2E testing: Cypress

Folder structure:
```bash
  src/
  components/
  layout/
  context/
  hooks/
  store/
  pages/
  api/
  types/
  utils/
```

Back-end

Framework: NestJS
  - Auth: JWT
  - Hash: argon2
  - Logger: nestjs-pino
  - ORM: Prisma
  - Tests: Jest
  - Environment variables: dotenv

Folder structure:
```bash
src/
common/
config/
modules/
shared/
utils/
assets/
users/
test/
database/
auth/
```

📦 Installation

Clone the repo:
```bash
git clone https://github.com/<your-username>/<repo>.git
cd <repo>
```

Install the script dependencies (not the generated project):
```bash
npm install
```

Run the script:
```bash
node create-starter.js
```

📝 Usage

The script will ask whether you want to create:
  - A full project (front + back)
  - Front-end only
  - Back-end only
  - Or a "skeleton" structure

If you are not in the project root folder, the script will ask for a folder name and create it.
The script automatically installs all required dependencies and creates the standardized folder structure.

💻 Script Functions
- npmOnlyInstall — installs front-end dependencies (Formik, Yup, Axios, etc.)
- npmOnlyBackInstall — installs back-end dependencies (argon2, Prisma, Jest, etc.)
- frontendFramework — sets up the Vite + React project
- backendFramework — sets up the NestJS project
- tailwindInstal — configures TailwindCSS
- pinoInstall, jwtServiceInstall, dotenvInstal, prismaInstall — configure back-end services

⚠️ Notes

On Windows, always use `node create-starter.js`. The script does not rely on the shebang to work.
  - Node.js >= 18 is required.
  - Prisma and NestJS CLI must be globally accessible for certain advanced options.

Final Project Structure (Full)
```bash
project-root/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ layout/
│  │  ├─ context/
│  │  └─ ... etc
├─ backend/
│  ├─ src/
│  │  ├─ common/
│  │  ├─ config/
│  │  ├─ modules/
│  │  └─ ... etc
├─ .gitignore
├─ package.json
└─ create-starter.js
```


Author: Scribbler

Next steps:
  - Publish to npm
  - Support multiple package managers
