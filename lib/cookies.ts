// lib/cookies.ts
export type CookiePreference = {
  necessary: boolean;
  functional: boolean;
  performance: boolean;
  targeting: boolean;
  timestamp: number;
};

export type CookieCategory = keyof Omit<CookiePreference, 'timestamp'>;

export const DEFAULT_COOKIE_PREFERENCES: CookiePreference = {
  necessary: true, // Always enabled
  functional: false,
  performance: false,
  targeting: false,
  timestamp: Date.now()
};

// Cookie storage utilities
export class CookieManager {
  static COOKIE_NAME = 'al-asr-cookie-consent';
  static EXPIRY_DAYS = 365;

  static getPreferences(): CookiePreference {
    if (typeof window === 'undefined') return DEFAULT_COOKIE_PREFERENCES;

    try {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${this.COOKIE_NAME}=`));
      
      if (cookie) {
        const cookieValue = cookie.split('=')[1];
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    } catch (error) {
      console.error('Error reading cookie preferences:', error);
    }
    
    return DEFAULT_COOKIE_PREFERENCES;
  }

  static setPreferences(preferences: CookiePreference): void {
    if (typeof window === 'undefined') return;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.EXPIRY_DAYS);

    const cookieValue = encodeURIComponent(JSON.stringify({
      ...preferences,
      timestamp: Date.now()
    }));

    document.cookie = `${this.COOKIE_NAME}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
  }

  static hasConsent(): boolean {
    const preferences = this.getPreferences();
    return preferences.timestamp > 0;
  }

  static resetPreferences(): void {
    this.setPreferences(DEFAULT_COOKIE_PREFERENCES);
  }

  // Check specific category consent
  static hasCategoryConsent(category: CookieCategory): boolean {
    const preferences = this.getPreferences();
    return preferences[category];
  }

  // Apply consent to third-party scripts
  static applyConsent(): void {
    const preferences = this.getPreferences();

    // Google Analytics
    if (preferences.performance) {
      this.loadGoogleAnalytics();
    } else {
      this.disableGoogleAnalytics();
    }

    // Facebook Pixel
    if (preferences.targeting) {
      this.loadFacebookPixel();
    } else {
      this.disableFacebookPixel();
    }

    // Other functional scripts
    if (preferences.functional) {
      this.loadFunctionalScripts();
    }
  }

  private static loadGoogleAnalytics() {
    // Add your GA script loading logic here
    console.log('Loading Google Analytics...');
  }

  private static disableGoogleAnalytics() {
    // Disable GA tracking
    console.log('Disabling Google Analytics...');
  }

  private static loadFacebookPixel() {
    // Add Facebook Pixel loading logic
    console.log('Loading Facebook Pixel...');
  }

  private static disableFacebookPixel() {
    // Disable Facebook Pixel
    console.log('Disabling Facebook Pixel...');
  }

  private static loadFunctionalScripts() {
    // Load other functional scripts
    console.log('Loading functional scripts...');
  }
}