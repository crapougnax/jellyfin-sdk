import { JellyfinClient } from "../client.js";

export class User {
  private client: JellyfinClient;

  constructor(client: JellyfinClient) {
    this.client = client;
  }

  public async getCurrentUser(): Promise<any> {
    return this.client.get("/Users/Me");
  }

  public async getUsers(
    isHidden?: boolean,
    isDisabled?: boolean
  ): Promise<any[]> {
    return this.client.get("/Users", { params: { isHidden, isDisabled } });
  }

  public async getPublicUsers(): Promise<any[]> {
    return this.client.get("/Users/Public");
  }

  public async markPlayed(
    userId: string,
    itemId: string,
    datePlayed: Date = new Date()
  ): Promise<any> {
    return this.client.post(`/Users/${userId}/PlayedItems/${itemId}`, {
      DatePlayed: datePlayed.toISOString(),
    });
  }
}
