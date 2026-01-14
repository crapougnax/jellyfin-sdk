import { JellyfinSDK } from "./index.js";
import "dotenv/config";

// Configuration from env
const BASE_URL = process.env.JELLYFIN_API_URL || "";
const API_KEY = process.env.JELLYFIN_API_KEY || "";

if (!BASE_URL || !API_KEY) {
  console.error(
    "Error: JELLYFIN_API_URL and JELLYFIN_API_KEY must be set in .env"
  );
  process.exit(1);
}

async function main() {
  console.log("Initializing SDK...");
  const sdk = new JellyfinSDK(BASE_URL, API_KEY);

  try {
    console.log("Fetching artists...");
    const artists = await sdk.artists.getArtists({
      enableImages: true,
      enableTotalRecordCount: true,
      limit: 5, // Limit to 5 for testing
    });

    console.log(`Successfully fetched ${artists.Items.length} artists.`);
    console.log(`Total Record Count: ${artists.TotalRecordCount}`);

    if (artists.Items.length > 0) {
      console.log("First Artist:", JSON.stringify(artists.Items[0], null, 2));
    }
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
}

main();
