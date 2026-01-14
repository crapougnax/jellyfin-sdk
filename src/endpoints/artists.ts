import { JellyfinClient } from "../client.js";
import type { BaseItem, PaginatedResponse } from "../types.js";

export interface GetArtistsParams {
  enableImages?: boolean;
  enableTotalRecordCount?: boolean;
  userId?: string; // Often required for user-specific data like UserData
  startIndex?: number;
  limit?: number;
  parentId?: string;
  fields?: string[];
}

export class Artists {
  private client: JellyfinClient;

  constructor(client: JellyfinClient) {
    this.client = client;
  }

  public async getArtists(
    params: GetArtistsParams = {}
  ): Promise<PaginatedResponse<BaseItem>> {
    const queryParams: any = { ...params };

    // Convert array fields to comma-separated string if needed,
    // though axios generic params usually handle simple key-values.
    // Jellyfin often expects "Fields" as a comma-separated string.
    if (params.fields) {
      queryParams.fields = params.fields.join(",");
    }

    return this.client.get<PaginatedResponse<BaseItem>>("/Artists", {
      params: queryParams,
    });
  }
}
