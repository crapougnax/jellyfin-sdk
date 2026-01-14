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

## Quick Start

### 1. Configuration

You can configure the SDK using environment variables or pass them directly to the constructor.

Create a `.env` file:

```env
JELLYFIN_API_URL=https://your-jellyfin-server.com
JELLYFIN_USERNAME=your_username
JELLYFIN_PASSWORD=your_password
```

### 2. Usage

```typescript
import { JellyfinSDK } from "@crapougnax/jellyfin-sdk";

async function main() {
  // Initialize SDK
  const sdk = new JellyfinSDK("https://your-jellyfin-server.com");

  // Authenticate
  await sdk.client.authenticate("myuser", "mypassword");

  // Get System Info
  const info = await sdk.system.getPublicSystemInfo();
  console.log(`Connected to ${info.ServerName}`);

  // Get Current User
  const user = await sdk.user.getCurrentUser();
  console.log(`Logged in as ${user.Name}`);

  // Fetch Items
  const items = await sdk.items.getItems({
    limit: 5,
    recursive: true,
    mediaTypes: ["Movie"],
  });

  items.Items.forEach((item) => {
    console.log(`- ${item.Name}`);
  });
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
