export interface UserData {
  PlaybackPositionTicks: number;
  PlayCount: number;
  IsFavorite: boolean;
  Played: boolean;
  Key: string;
  ItemId: string;
}

export interface ImageTags {
  Primary?: string;
  Logo?: string;
  [key: string]: string | undefined;
}

export interface ImageBlurHashes {
  Primary?: { [key: string]: string };
  Logo?: { [key: string]: string };
  Backdrop?: { [key: string]: string };
  [key: string]: { [key: string]: string } | undefined;
}

export interface BaseItem {
  Name: string;
  ServerId: string;
  Id: string;
  RunTimeTicks?: number;
  Type: string;
  UserData: UserData;
  ImageTags: ImageTags;
  BackdropImageTags: string[];
  ImageBlurHashes: ImageBlurHashes;
  LocationType: string;
  MediaType: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  Items: T[];
  TotalRecordCount: number;
  StartIndex: number;
}

export interface AuthenticateUserByName {
  Username: string;
  Pw: string;
}

export interface AuthenticationResult {
  User: any; // Using any for now to avoid massive UserDto definition
  SessionInfo: any;
  AccessToken: string;
  ServerId: string;
}
