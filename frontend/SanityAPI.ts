import { imageURLBuilder } from "./dep.ts";

type SanityClientOptions = {
    projectId: string;
    dataset: string;
    token?: string;
    useCdn?: boolean;
  };
  
  type QueryParameters = Record<string, string | number>;
  
  const sanityCredentials = {
      projectId: "INSERT_YOUR_PROJECT_ID_HERE",
      dataset: "production",
  };
  
  const sanityClient = (options: SanityClientOptions) => {
    const { useCdn, projectId, dataset, token } = options;
    const hasToken = token && token.length > 0;
    const baseHost = useCdn && !hasToken ? "apicdn.sanity.io" : "api.sanity.io";
    const endpoint = `https://${projectId}.${baseHost}/v1/data/query/${dataset}`;
  
    // Parse JSON and throw on bad responses
    const responseHandler = (response: Response) => {
      if (response.status >= 400) {
        throw new Error([response.status, response.statusText].join(" "));
      }
      return response.json();
    };
  
    // We need to prefix groq query params with `$` and quote the strings
    const transformedParams = (parameters: QueryParameters) =>
      Object.keys(parameters).reduce<QueryParameters>((prev, key) => {
        prev[`$${key}`] = JSON.stringify(parameters[key]);
        return prev;
      }, {});
  
    return {
      fetch: async (query: string, parameters?: QueryParameters) => {
        const urlParams = new URLSearchParams({
          query,
          ...(parameters && transformedParams(parameters)),
        });
  
        const url = new URL([endpoint, urlParams].join("?"));
        const request = new Request(url.toString());
  
        if (hasToken) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
  
        return (
          fetch(request)
            .then(responseHandler)
            // The query results are in the `result` property
            .then((json) => json.result)
        );
      },
    };
  };
  
  export const runQuery = async (
    query: string,
    callback: (json: any[]) => void
  ) => {
    const client = sanityClient({
      ...sanityCredentials,
      useCdn: false,
    });
    await client.fetch(query).then(callback);
  };
  
  export const urlFor = (source: any) =>
    imageURLBuilder(sanityCredentials).image(source);