# Jellyfin TypeScript SDK

A modern, type-safe SDK for interacting with the Jellyfin API, built with TypeScript and using native `fetch`.

## Features

- 🚀 **Modern**: Built with TypeScript and native `fetch` (ESM).
- 🔒 **Secure**: Supports authentication via Username/Password.
- 📦 **Namespace Support**: Structured access to API endpoints (`System`, `User`, `Library`, `Items`, etc.).
- ⚙️ **Configurable**: Environment variable support.

## Installation

```bash
yarn add @crapougnax/jellyfin-sdk
```

## Usage

You can initialize the SDK using environment variables (recommended) or by passing values directly.

### Option 1: Using .env (Recommended)

1. Install `dotenv` to load environment variables:

   ```bash
   yarn add dotenv
   ```

2. Create a `.env` file in your project root:

   ```env
   JELLYFIN_API_URL=https://your-jellyfin-server.com
   JELLYFIN_USERNAME=your_username
   JELLYFIN_PASSWORD=your_password
   ```

3. Initialize the SDK:

   ```typescript
   import "dotenv/config"; // Load .env file
   import { JellyfinSDK } from "@crapougnax/jellyfin-sdk";

   async function main() {
     // Config is loaded from process.env
     const sdk = new JellyfinSDK(process.env.JELLYFIN_API_URL || "");

     // Authenticate using env vars
     await sdk.client.authenticate(
       process.env.JELLYFIN_USERNAME || "",
       process.env.JELLYFIN_PASSWORD || ""
     );

     // Example: Get System Info
     const info = await sdk.system.getPublicSystemInfo();
     console.log(`Connected to ${info.ServerName}`);
   }
   main();
   ```

### Option 2: Direct Configuration (No .env)

You can pass configuration values directly as strings if you prefer not to use a `.env` file or are loading config from another source.

```typescript
import { JellyfinSDK } from "@crapougnax/jellyfin-sdk";

async function main() {
  // Initialize directly with URL string
  const sdk = new JellyfinSDK("https://jellyfin.myserver.com");

  // Authenticate using string literals
  await sdk.client.authenticate("myuser", "secretpassword");

  // Example: Get Current User
  const user = await sdk.user.getCurrentUser();
  console.log(`Logged in as ${user.Name}`);
}
main();
```

## Verification

To run the included verification scripts:

1. Clone the repo
2. Install dependencies: `yarn install`
3. Configure `.env` (see `.env.dist`)
4. Run verification:
   ```bash
   yarn build
   yarn node dist/verify-auth.js
   ```

## License

MIT
