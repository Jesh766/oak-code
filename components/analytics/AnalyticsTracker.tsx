'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const SESSION_KEY = 'oak_session_id';
const VISITOR_KEY = 'oak_visitor_id';

const HEARTBEAT_INTERVAL = 30_000;

function getOrCreateId(key: string): string {
  const existing = localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  let id: string;

  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    id = crypto.randomUUID();
  } else if (
    typeof crypto !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  ) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    id = Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  } else {
    id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  localStorage.setItem(key, id);

  return id;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  const sessionIdRef = useRef<string | null>(null);
  const visitorIdRef = useRef<string | null>(null);

  const pageViewIdRef = useRef<string | null>(null);
  const pageStartedAtRef = useRef<number>(Date.now());

  const durationSentRef = useRef(false);
  const initializedRef = useRef(false);

  /*
   * Create the visitor/session IDs once.
   */
  useEffect(() => {
    const sessionId = getOrCreateId(SESSION_KEY);
    const visitorId = getOrCreateId(VISITOR_KEY);

    sessionIdRef.current = sessionId;
    visitorIdRef.current = visitorId;
  }, []);

  /*
   * Record every page/route.
   */
  useEffect(() => {
    if (!pathname) return;

    const sessionId = sessionIdRef.current;
    const visitorId = visitorIdRef.current;

    if (!sessionId || !visitorId) return;

    let cancelled = false;

    async function recordPageView() {
      try {
        /*
         * If this isn't the first page,
         * finish the previous page first.
         */
        if (initializedRef.current) {
          await sendPreviousPageDuration();
        }

        if (cancelled) return;

        /*
         * Update the session.
         */
        const sessionResponse = await fetch('/api/analytics/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            visitorId,
            path: pathname,
            title: document.title,
          }),
        });

        if (!sessionResponse.ok) {
          console.error(
            '[Analytics] Session update failed:',
            await sessionResponse.text()
          );
          return;
        }

        /*
         * Create a new PageView.
         */
        const pageViewResponse = await fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            path: pathname,
            title: document.title,
            referrer: document.referrer || null,
          }),
        });

        if (!pageViewResponse.ok) {
          console.error(
            '[Analytics] Page view failed:',
            await pageViewResponse.text()
          );
          return;
        }

        const pageViewData = await pageViewResponse.json();

        if (cancelled) return;

        pageViewIdRef.current = pageViewData.pageView?.id || null;

        pageStartedAtRef.current = Date.now();
        durationSentRef.current = false;

        initializedRef.current = true;
      } catch (error) {
        console.error('[Analytics] Page tracking error:', error);
      }
    }

    recordPageView();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  /*
   * Finish the current page.
   */
  async function sendPreviousPageDuration() {
    if (durationSentRef.current) return;

    const pageViewId = pageViewIdRef.current;

    if (!pageViewId) return;

    const durationMs = Math.max(
      0,
      Date.now() - pageStartedAtRef.current
    );

    durationSentRef.current = true;

    try {
      const response = await fetch('/api/analytics/pageview', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageViewId,
          durationMs,
        }),
        keepalive: true,
      });

      if (!response.ok) {
        durationSentRef.current = false;

        console.error(
          '[Analytics] Failed to update duration:',
          await response.text()
        );
      }
    } catch (error) {
      durationSentRef.current = false;

      console.error(
        '[Analytics] Failed to update duration:',
        error
      );
    }
  }

  /*
   * Heartbeat.
   */
  useEffect(() => {
    const heartbeat = async () => {
      const sessionId = sessionIdRef.current;
      const visitorId = visitorIdRef.current;

      if (!sessionId || !visitorId) return;

      if (document.visibilityState !== 'visible') return;

      try {
        await fetch('/api/analytics/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            visitorId,
            path: pathname,
            title: document.title,
          }),
        });
      } catch (error) {
        console.error('[Analytics] Heartbeat error:', error);
      }
    };

    const interval = window.setInterval(
      heartbeat,
      HEARTBEAT_INTERVAL
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [pathname]);

  /*
   * Finish page when tab becomes hidden
   * or the browser starts unloading it.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        void sendPreviousPageDuration();
      }
    };

    const handlePageHide = () => {
      void sendPreviousPageDuration();
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );

      window.removeEventListener(
        'pagehide',
        handlePageHide
      );
    };
  }, []);

  return null;
}