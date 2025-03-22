export type ParamsType = Record<string, string | number | boolean | undefined>;

// eslint-disable-next-line
type RequestOptionsType = RequestInit & {
  params?: ParamsType;
};

const createDiscogsClient = () => {
  const baseURL: string = "https://api.discogs.com";
  const userAgent: string | undefined = process.env.DISCOGS_USER_AGENT;

  const fetchWithHeaders = async <T>(
    url: string,
    options: RequestOptionsType
  ): Promise<T> => {
    if (userAgent) {
      options.headers = {
        ...(options.headers as HeadersInit),
        "User-Agent": userAgent,
      };
    }
    const response = await fetch(url, options);
    return response.json() as Promise<T>;
  };

  const request = async <T>(
    method: string,
    url: string,
    // eslint-disable-next-line
    data: any,
    options: RequestOptionsType = {}
  ): Promise<T> => {
    const fetchOptions: RequestInit = { method, ...options };

    if (data) {
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers = {
        ...(fetchOptions.headers as HeadersInit),
        "Content-Type": "application/json",
      };
    }

    return fetchWithHeaders<T>(`${baseURL}${url}`, fetchOptions);
  };

  const get = <T>(url: string, options?: RequestOptionsType): Promise<T> =>
    request<T>("GET", url, null, options);

  const getAlbumRelease = async <T>(id: string): Promise<T> => {
    const url = `/releases/${id}`;
    return get<T>(url);
  };

  return {
    getAlbumRelease,
  };
};

export const discogsClient = createDiscogsClient();
