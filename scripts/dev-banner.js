#!/usr/bin/env node

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

const banner = `
${colors.bright}${colors.cyan}
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                    ${colors.magenta}SaaSKit Dev Server${colors.cyan}                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}

${colors.bright}${colors.green}Local Development URLs:${colors.reset}

  ${colors.cyan}┌─${colors.reset} ${colors.bright}Vite App${colors.reset}        ${colors.cyan}http://localhost:4317${colors.reset}
  ${colors.cyan}│${colors.reset}   ${colors.dim}React dashboard with shared packages${colors.reset}
  ${colors.cyan}│${colors.reset}
  ${colors.cyan}├─${colors.reset} ${colors.bright}Astro Web${colors.reset}       ${colors.cyan}http://localhost:4420${colors.reset}
  ${colors.cyan}│${colors.reset}   ${colors.dim}Marketing site with coming soon page${colors.reset}
  ${colors.cyan}│${colors.reset}
  ${colors.cyan}└─${colors.reset} ${colors.bright}Fastify API${colors.reset}     ${colors.cyan}http://localhost:4810${colors.reset}
      ${colors.dim}REST API with /health endpoint${colors.reset}

${colors.bright}${colors.yellow}Quick Info:${colors.reset}

  ${colors.dim}•${colors.reset} Environment: ${colors.cyan}development${colors.reset}
  ${colors.dim}•${colors.reset} Package Manager: ${colors.cyan}pnpm${colors.reset}
  ${colors.dim}•${colors.reset} Build Tool: ${colors.cyan}Turbo${colors.reset}
  ${colors.dim}•${colors.reset} Database: ${colors.cyan}PostgreSQL${colors.reset} (via docker-compose)

${colors.bright}${colors.blue}Tips:${colors.reset}

  ${colors.dim}•${colors.reset} Run ${colors.cyan}pnpm build${colors.reset} to build all packages
  ${colors.dim}•${colors.reset} Run ${colors.cyan}pnpm lint${colors.reset} to check code quality
  ${colors.dim}•${colors.reset} Run ${colors.cyan}docker compose up${colors.reset} for full stack
  ${colors.dim}•${colors.reset} Set ${colors.cyan}PUBLIC_RELEASE_DATE${colors.reset} to control coming soon page

${colors.dim}────────────────────────────────────────────────────────────${colors.reset}
${colors.bright}${colors.green}All services starting...${colors.reset}
${colors.dim}────────────────────────────────────────────────────────────${colors.reset}

`;

console.log(banner);

