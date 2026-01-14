import { JellyfinClient } from "../client.js";

export class System {
  private client: JellyfinClient;

  constructor(client: JellyfinClient) {
    this.client = client;
  }

  public async getPublicSystemInfo(): Promise<any> {
    return this.client.get("/System/Info/Public");
  }

  public async getSystemInfo(): Promise<any> {
    return this.client.get("/System/Info");
  }

  public async getPing(): Promise<string> {
    // Ping usually returns plain text or sometimes 200 OK empty
    // Implementation depends on actual return type, often it is just "Pong" string via text/plain
    // But client.get expects JSON by default. We might need text support later.
    // For now, let's assume standard behavior or add a specific method for text if needed.
    // Spec says "System.String"
    return this.client.get("/System/Ping");
  }
}
