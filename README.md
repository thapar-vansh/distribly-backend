# Distribly Backend

A simple Express.js application with TypeScript boilerplate using Drizzle ORM and PostgreSQL.

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── app.ts      # App configuration
│   └── database.ts # Database configuration
├── constants/       # Global constants
│   └── global.ts   # Success, failed, etc.
├── controllers/     # HTTP request/response handlers
│   └── userController.ts
├── db/             # Database functions
│   └── user.ts     # User table operations
├── routes/          # Route definitions
│   ├── index.ts    # Main routes
│   └── userRoutes.ts
├── schemas/         # Drizzle schemas
│   └── user.ts     # User table schema
├── services/        # Business logic
│   └── userService.ts
├── utils/           # Utility functions
│   └── logger.ts   # Winston logger
└── index.ts         # Main application file
```

## Architecture Flow

```
Controller → Service → Database
```

- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Database**: Handle data operations (never called directly by controllers)

## Features

- ✅ TypeScript with path aliases
- ✅ Express.js with middleware
- ✅ Drizzle ORM with PostgreSQL
- ✅ Code-first database approach
- ✅ Structured logging with Winston
- ✅ ESLint configuration
- ✅ Environment configuration
- ✅ CORS and security middleware

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd distribly-backend
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp env.example .env
# Edit .env with your database credentials
```

4. Set up your PostgreSQL database and update the `.env` file with your credentials.

## Database Setup

1. Generate migrations from your schemas:

```bash
yarn db:generate
```

2. Apply migrations to your database:

```bash
yarn db:migrate
```

3. (Optional) View your database with Drizzle Studio:

```bash
yarn db:studio
```

## Development

Start the development server:

```bash
yarn dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build the TypeScript project
- `yarn start` - Start the production server
- `yarn db:generate` - Generate database migrations
- `yarn db:migrate` - Apply database migrations
- `yarn db:studio` - Open Drizzle Studio
- `yarn db:push` - Push schema changes to database
- `yarn db:drop` - Drop all tables
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors

## API Endpoints

### Health Check

- `GET /health` - Server health status

### Users

- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user
- `PATCH /api/v1/users/:id/deactivate` - Deactivate user

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=distribly

# Logging Configuration
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## Adding New Features

1. **Schema**: Define your table structure in `src/schemas/`
2. **Database**: Create database functions in `src/db/`
3. **Service**: Add business logic in `src/services/`
4. **Controller**: Handle HTTP requests in `src/controllers/`
5. **Routes**: Define endpoints in `src/routes/`

## Code Style

- Use camelCase for constants (e.g., `SUCCESS`, `FAILED`)
- Follow the controller → service → database flow
- Use path aliases for imports (e.g., `@/config/database`)
- Log all important operations
- Handle errors gracefully

## License

MIT
