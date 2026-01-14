import { JellyfinClient } from "./client.js";
import { Artists, type GetArtistsParams } from "./endpoints/artists.js";
import { System } from "./endpoints/system.js";
import { User } from "./endpoints/user.js";
import { Items, type GetItemsParams } from "./endpoints/items.js";
import { Library } from "./endpoints/library.js";
import { Sessions } from "./endpoints/sessions.js";

import type {
  BaseItem,
  ImageBlurHashes,
  ImageTags,
  PaginatedResponse,
  UserData,
  AuthenticateUserByName,
  AuthenticationResult,
} from "./types.js";

export class JellyfinSDK {
  public client: JellyfinClient;

  // Namespaces
  public artists: Artists;
  public system: System;
  public user: User;
  public items: Items;
  public library: Library;
  public sessions: Sessions;

  constructor(baseURL: string, apiKey: string = "") {
    this.client = new JellyfinClient(baseURL, apiKey);

    // Initialize namespaces
    this.artists = new Artists(this.client);
    this.system = new System(this.client);
    this.user = new User(this.client);
    this.items = new Items(this.client);
    this.library = new Library(this.client);
    this.sessions = new Sessions(this.client);
  }
}

export { JellyfinClient, Artists, System, User, Items, Library, Sessions };

export type {
  GetArtistsParams,
  GetItemsParams,
  BaseItem,
  ImageBlurHashes,
  ImageTags,
  PaginatedResponse,
  UserData,
  AuthenticateUserByName,
  AuthenticationResult,
};
