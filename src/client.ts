import type { AuthenticateUserByName, AuthenticationResult } from "./types.js";

export class JellyfinClient {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string = "") {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  public setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async authenticate(
    username: string,
    pw: string
  ): Promise<AuthenticationResult> {
    const url = `${this.baseURL}/Users/AuthenticateByName`;
    const body: AuthenticateUserByName = { Username: username, Pw: pw };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Emby-Authorization":
          'MediaBrowser Client="Jellyfin SDK", Device="Node.js", DeviceId="scripthash", Version="1.0.0"',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Authentication Failed: ${response.status} ${response.statusText}`
      );
    }

    const result = (await response.json()) as AuthenticationResult;
    if (result.AccessToken) {
      this.setApiKey(result.AccessToken);
    }
    return result;
  }

  public async get<T>(
    url: string,
    config?: { params?: Record<string, any> }
  ): Promise<T> {
    const queryParams = new URLSearchParams();
    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const fullUrl = queryString
      ? `${this.baseURL}${url}?${queryString}`
      : `${this.baseURL}${url}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (this.apiKey) {
      headers["X-MediaBrowser-Token"] = this.apiKey;
    }

    const start = performance.now();
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: headers,
    });
    const duration = (performance.now() - start).toFixed(2);
    console.error(`[SDK] GET ${url} took ${duration}ms`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  public async post<T>(url: string, body?: any): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.apiKey) {
      headers["X-MediaBrowser-Token"] = this.apiKey;
    }

    const start = performance.now();
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    });
    const duration = (performance.now() - start).toFixed(2);
    console.error(`[SDK] POST ${url} took ${duration}ms`);

    if (!response.ok) {
      // Some POST requests (like refresh) might return 204 No Content
      if (response.status === 204) {
        return {} as T;
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Handle empty responses that are 200 OK
    const text = await response.text();
    return (text ? JSON.parse(text) : {}) as T;
  }
}
