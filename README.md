# Shopi

A NestJS-based application for managing items and authentication.

## Development Environment

### Devbox

This project uses [Devbox](https://www.jetify.com/devbox) to manage development dependencies and ensure consistent environments across the team.

Devbox provides a reproducible development environment by:
- Managing Node.js and other tool versions through `devbox.json`
- Ensuring all developers use the same versions of dependencies
- Simplifying onboarding by eliminating manual environment setup

To get started with Devbox:

```bash
# Install devbox (if not already installed)
# Follow instructions at https://www.jetify.com/devbox/docs/installing_devbox

# Enter the devbox shell
devbox shell

# Install dependencies
npm install
```

The project currently uses:
- **Node.js 24** - Runtime environment
- **yq-go 4.50.1** - YAML processor

## MCP Servers

This project uses Model Context Protocol (MCP) servers to enhance development capabilities and AI-assisted workflows.

### Currently Active MCP Servers

1. **cursor-browser-extension**
   - Provides browser automation capabilities
   - Enables web interaction, navigation, and testing through the development environment

2. **memory**
   - Knowledge graph management system
   - Stores and retrieves project context, relationships, and observations
   - Helps maintain project knowledge across development sessions

Additional MCP servers will be added as the project evolves.

## Project Setup

```bash
# Install dependencies
npm install

# Set up Prisma database
npx prisma generate
npx prisma migrate dev
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```
