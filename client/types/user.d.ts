export interface UserSettings {
  theme: 'light' | 'dark';
}

export interface User {
  // email?: string;
  authProvider: string;
  name?: string;
  profilePicture?: string;
  settings: UserSettings;
}
