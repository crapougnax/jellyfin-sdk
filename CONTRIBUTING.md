# Contributing to Jellyfin SDK

We welcome contributions to expand the SDK coverage! The Jellyfin API has over 60 namespaces, and we are adding them incrementally.

## Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/crapougnax/jellyfin-sdk.git
    cd jellyfin-sdk
    ```

2.  **Install dependencies**:
    ```bash
    yarn install
    ```

## Adding a New Endpoint

If you need an endpoint that isn't implemented yet:

1.  **Identify the Endpoint**: Find the endpoint in the [Jellyfin API Docs](https://api.jellyfin.org/) or Swagger.

    - Example: `GET /System/Info` -> Namespace `System`, Method `getSystemInfo`

2.  **Locate/Create the Namespace File**:

    - Files are in `src/endpoints/`.
    - If the namespace e.g. `Studios` doesn't exist, create `src/endpoints/studios.ts`.

3.  **Implement the Method**:

    - Use `this.client.get<T>(url, params)` for GET requests.
    - Use `this.client.post<T>(url, body)` for POST requests.
    - Add types in `src/types.ts` if complex structures are returned.

    ```typescript
    // src/endpoints/example.ts
    export class Example {
      // ... constructor ...

      public async getSomething(id: string): Promise<any> {
        return this.client.get(\`/Example/\${id}\`);
      }
    }
    ```

4.  **Export the Namespace**:
    - If you created a new file, add it to `src/index.ts` and expose it in the `JellyfinSDK` class.

## Verification

1.  Add a test case in `src/verify-sdk.ts` or `src/verify-auth.ts` to ensure it works.
2.  Run `yarn build && yarn node dist/verify-auth.js` to verify.

## Submitting a Pull Request

1.  Commit your changes: `git commit -m "feat: add Studios namespace"`
2.  Push to your fork and submit a PR!
