import { JellyfinSDK } from "./index.js";
import "dotenv/config";

// Configuration from env or defaults
const BASE_URL = process.env.JELLYFIN_API_URL || "";
const USERNAME = process.env.JELLYFIN_USERNAME || "";
const PASSWORD = process.env.JELLYFIN_PASSWORD || "";

if (!BASE_URL || !USERNAME || !PASSWORD) {
  console.error(
    "Error: JELLYFIN_API_URL, JELLYFIN_USERNAME, and JELLYFIN_PASSWORD must be set in .env"
  );
  process.exit(1);
}

async function main() {
  console.log("Initializing SDK...");
  const sdk = new JellyfinSDK(BASE_URL);

  try {
    console.log(`Authenticating as ${USERNAME}...`);
    await sdk.client.authenticate(USERNAME, PASSWORD);
    console.log("Authentication Successful!");

    // Test System
    console.log("\n--- SYSTEM ---");
    const info = await sdk.system.getPublicSystemInfo();
    console.log("Server Name:", info.ServerName);
    console.log("Version:", info.Version);

    // Test User
    console.log("\n--- USER ---");
    const user = await sdk.user.getCurrentUser();
    console.log("Current User:", user.Name, `(${user.Id})`);

    // Test Library
    console.log("\n--- LIBRARY ---");
    const folders = await sdk.library.getMediaFolders();
    console.log(`Media Folders: ${folders.Items.length}`);
    folders.Items.forEach((f: any) => console.log(" - " + f.Name));

    // Test Items
    console.log("\n--- ITEMS ---");
    const items = await sdk.items.getItems({ limit: 3, recursive: true });
    console.log(`Fetched ${items.Items.length} items from root.`);
    items.Items.forEach((i: any) => console.log(" - " + i.Name));
  } catch (error) {
    console.error("Error during full verification:", error);
  }
}

main();
