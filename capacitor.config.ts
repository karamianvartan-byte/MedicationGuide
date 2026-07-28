import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medguide.app',
  appName: 'Справочник лекарств',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
