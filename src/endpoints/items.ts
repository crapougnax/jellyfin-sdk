import { JellyfinClient } from "../client.js";

export interface GetItemsParams {
  userId?: string;
  startIndex?: number;
  limit?: number;
  recursive?: boolean;
  searchTerm?: string;
  parentId?: string;
  fields?: string[];
  mediaTypes?: string[];
  [key: string]: any;
}

export class Items {
  private client: JellyfinClient;

  constructor(client: JellyfinClient) {
    this.client = client;
  }

  public async getItems(params: GetItemsParams = {}): Promise<any> {
    const queryParams: any = { ...params };
    if (params.fields) queryParams.fields = params.fields.join(",");
    if (params.mediaTypes) queryParams.mediaTypes = params.mediaTypes.join(",");

    return this.client.get("/Items", { params: queryParams });
  }

  public async getItem(itemId: string, userId?: string): Promise<any> {
    return this.client.get(`/Items/${itemId}`, { params: { userId } });
  }

  public async refreshItem(
    itemId: string,
    metadataRefreshMode:
      | "None"
      | "ValidationOnly"
      | "Default"
      | "Full" = "Default",
    imageRefreshMode:
      | "None"
      | "ValidationOnly"
      | "Default"
      | "Full" = "Default",
    replaceAllImages: boolean = false
  ): Promise<void> {
    return this.client.post(`/Items/${itemId}/Refresh`, {
      MetadataRefreshMode: metadataRefreshMode,
      ImageRefreshMode: imageRefreshMode,
      ReplaceAllImages: replaceAllImages,
    });
  }
}
