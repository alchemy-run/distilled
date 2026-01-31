# distilled.cloud

> See [../AGENTS.md](../AGENTS.md) for ecosystem overview.

Marketing website and documentation hub for the Distilled ecosystem. Built with Astro and deployed to Cloudflare Workers.

## Architecture

```
distilled.cloud/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Landing page
│   │   ├── docs/                # SDK documentation (generated)
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── Hero.astro           # Landing hero section
│   │   ├── SDKCard.astro        # SDK feature cards
│   │   ├── CodeBlock.astro      # Syntax-highlighted code
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro         # Base layout
│   └── lib/
│       └── shiki-theme.ts       # Code highlighting theme
├── public/
│   └── potion.png               # Logo/assets
├── astro.config.mjs             # Astro configuration
├── alchemy.run.ts               # Deployment script (Cloudflare Workers)
└── wrangler.jsonc               # Wrangler configuration
```

## Commands

```bash
bun dev                          # Start dev server
bun build                        # Build for production
bun run alchemy.run.ts           # Deploy to Cloudflare Workers
bun run alchemy.run.ts --destroy # Tear down deployment
```

## Components

| Component | Purpose |
|-----------|---------|
| `Hero.astro` | Landing page hero with tagline |
| `SDKCard.astro` | Card displaying an SDK with features |
| `SDKSection.astro` | Grid of SDK cards |
| `CodeBlock.astro` | Syntax-highlighted code examples |
| `Feature.astro` | Single feature with icon |
| `FeaturesSection.astro` | Feature grid |
| `ProblemSection.astro` | Problem statement |
| `MissionSection.astro` | Mission/vision section |
| `Footer.astro` | Site footer |

## Documentation

SDK documentation is generated from distilled-aws and distilled-cloudflare source files:

```
src/pages/docs/
├── aws/
│   ├── index.astro              # AWS SDK overview
│   ├── s3.astro                 # S3 operations and examples
│   ├── dynamodb.astro           # DynamoDB operations
│   └── ...
├── cloudflare/
│   ├── index.astro              # Cloudflare SDK overview
│   ├── r2.astro                 # R2 operations
│   ├── workers.astro            # Workers operations
│   └── ...
└── index.astro                  # Docs landing page
```

### Generating Docs

Documentation is extracted from JSDoc comments in generated SDK files:

```bash
# From distilled-aws
bun run generate:docs            # Generate markdown from src/services/*.ts

# From distilled-cloudflare  
bun run generate:docs            # Generate markdown from src/services/*.ts
```

## Deployment

Deployed to Cloudflare Workers via Alchemy:

```typescript
// alchemy.run.ts
import { alchemy } from "alchemy";
import { StaticSite } from "alchemy/cloudflare";

const app = await alchemy("distilled-cloud");

await StaticSite("site", {
  dir: "./dist",
});

await app.finalize();
```

## Adding Content

### New SDK Page

1. Create `src/pages/docs/{sdk}/{service}.astro`
2. Import SDK operations and generate examples
3. Add to navigation in layout

### New Landing Section

1. Create component in `src/components/`
2. Import in `src/pages/index.astro`
3. Add to page layout

## Styling

Uses Tailwind CSS for styling. Theme colors match the Distilled brand.

## Environment

```bash
CLOUDFLARE_API_TOKEN=xxx         # For deployment
CLOUDFLARE_ACCOUNT_ID=xxx
```
