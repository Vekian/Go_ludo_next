"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getToken } from "@/lib/api/server/notification";

interface UseMercureOptions {
  topic: string;
  refreshUrl: string;
  onMessage: (data: object) => void;
}

export function useMercureSubscription({
  topic,
  refreshUrl,
  onMessage,
}: UseMercureOptions) {
  const [token, setToken] = useState<string>();
  const eventSourceRef = useRef<EventSource | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(
    (jwt: string) => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_MERCURE_URL}?topic=${encodeURIComponent(
          topic
        )}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };

      eventSource.onerror = (error) => {
        console.error("Mercure connection error:", error);
      };

      eventSourceRef.current = eventSource;
    },
    [onMessage, topic]
  );

  const fetchToken = useCallback(async () => {
    const response = await getToken(refreshUrl);
    if (response.ok && response.data) {
      setToken(response.data.token);
    }
  }, [refreshUrl]);

  // Initial token fetch
  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // Connect when token changes
  useEffect(() => {
    if (token) {
      connect(token);

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up token refresh interval
      intervalRef.current = setInterval(() => {
        fetchToken();
      }, 55 * 60 * 1000); // 55 minutes
    }

    return () => {
      eventSourceRef.current?.close();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [token, connect, fetchToken]);

  return {
    currentToken: token,
  };
}
