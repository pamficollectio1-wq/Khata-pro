import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.khatapro.app',
  appName: 'Khata Pro',
  webDir: 'www',
  backgroundColor: '#FFF6E0',
  android: {
    backgroundColor: '#FFF6E0',
    allowMixedContent: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#FFF6E0'
    },
    GoogleAuth: {
      scopes: ['https://www.googleapis.com/auth/drive.appdata'],
      serverClientId: '509942567397-29a8dkj2dtf1f54ph29dd79ol66qf6i4.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
