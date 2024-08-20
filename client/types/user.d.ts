export interface UserSettings {
  theme: 'light' | 'dark';
}

export interface User {
  email?: string;
  name?: string;
  profilePicture?: string;
  settings: UserSettings;
}
