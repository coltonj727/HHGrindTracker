import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
}

export async function apiRequest(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => (context: { queryKey: string[] }) => Promise<T | null> = (options) => {
  return async (context) => {
    try {
      const res = await fetch(context.queryKey[0], {
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.status === 401) {
        if (options.on401 === "returnNull") {
          return null;
        }
        throw new Error("Unauthorized");
      }
      
      await throwIfResNotOk(res);
      return res.json();
    } catch (error) {
      throw error;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
