import type { Metadata } from 'next';
import CookiesPolicyClient from './CookiesPolicyClient';

export const metadata: Metadata = {
  title: 'Cookies Policy - Al-Asr Canvas',
  description: 'Learn about how we use cookies and manage your preferences',
};

export default function CookiesPolicy() {
  return <CookiesPolicyClient />;
}