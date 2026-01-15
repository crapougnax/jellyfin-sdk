import { JellyfinClient } from "../client.js";

export class Library {
  private client: JellyfinClient;

  constructor(client: JellyfinClient) {
    this.client = client;
  }

  public async getMediaFolders(isHidden?: boolean): Promise<any> {
    return this.client.get("/Library/MediaFolders", { params: { isHidden } });
  }

  public async getPhysicalPaths(): Promise<string[]> {
    return this.client.get("/Library/PhysicalPaths");
  }

  public async refreshLibrary(): Promise<void> {
    return this.client.post("/Library/Refresh");
  }
}
