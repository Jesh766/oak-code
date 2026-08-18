'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const VISITOR_KEY = 'oak_analytics_visitor_id';
const SESSION_KEY = 'oak_analytics_session_id';

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_KEY);

  if (!visitorId) {
    visitorId = createId();
    localStorage.setItem(VISITOR_KEY, visitorId);
  }

  return visitorId;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = createId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

export function trackAnalyticsEvent(
  name: string,
  value?: string
): void {
  if (typeof window === 'undefined') return;

  const sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) return;

  fetch('/api/analytics/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      name,
      path: window.location.pathname,
      value,
    }),
    keepalive: true,
  }).catch(() => {
    // Analytics should never break the website.
  });
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  const pageEnteredAt = useRef<number>(Date.now());
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    const referrer = document.referrer || undefined;
    const title = document.title || undefined;

    fetch('/api/analytics/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        visitorId,
        path: pathname,
        referrer,
        title,
      }),
      keepalive: true,
    }).catch(() => {
      // Analytics failure should never break the site.
    });

    const pageStartedAt = Date.now();
    pageEnteredAt.current = pageStartedAt;

    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        path: pathname,
        title,
        referrer,
      }),
      keepalive: true,
    }).catch(() => {
      // Analytics failure should never break the site.
    });

    previousPath.current = pathname;

    return () => {
      const durationMs = Date.now() - pageStartedAt;

      // Update the current session's last activity.
      fetch('/api/analytics/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          visitorId,
          path: pathname,
        }),
        keepalive: true,
      }).catch(() => {});

      // We intentionally keep this lightweight.
      // Detailed duration updates will be added in the next step.
      void durationMs;
    };
  }, [pathname]);

  return null;
}