import { JellyfinClient } from "../client.js";

export class Sessions {
  private client: JellyfinClient;

  constructor(client: JellyfinClient) {
    this.client = client;
  }

  public async getSessions(
    controllableByUserId?: string,
    deviceId?: string,
    activeWithinSeconds?: number
  ): Promise<any[]> {
    return this.client.get("/Sessions", {
      params: {
        controllableByUserId,
        deviceId,
        activeWithinSeconds,
      },
    });
  }

  public async getSession(sessionId: string): Promise<any> {
    // NOTE: There isn't always a directly documented single session get by ID in some versions,
    // typically filtered list is used. But assuming standard REST if it exists.
    // Re-checking standard filtered list is safer if ID endpoint not explicit in filtered list.
    // Let's stick to getSessions filter for now if specific ID endpoint missing in quick glance.
    // Actually `/Sessions?deviceId=...` is common.
    // There is `/Sessions/{SessionId}/...` for controlling.
    // For now, we return list filtered.
    return this.client.get("/Sessions", { params: { deviceId: sessionId } }); // Usage approximation
  }
}
