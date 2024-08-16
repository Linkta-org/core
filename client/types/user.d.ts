export interface UserSettings {
  theme: 'light' | 'dark';
}

export interface UserProfile {
  email?: string;
  name?: string;
  profilePicture?: string;
  settings: UserSettings;
}

export type UserProfileResponse = { userProfile: UserProfile } | string;
