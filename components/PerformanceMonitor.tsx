'use client';
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // LCP Monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // FCP Monitoring
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    });

    fcpObserver.observe({ entryTypes: ['paint'] });

    return () => {
      observer.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  return null;
}