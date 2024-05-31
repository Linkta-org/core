import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';

type TokenDataSchema = {
	userId: string,
	roles: string[],
}

type AuthStore = {
	accessToken: string | undefined;
	refreshToken: string | undefined;
	accessTokenData: TokenDataSchema | undefined;
}

export const useAuthStore = createStore<AuthStore>()(devtools((set, get) => ({
			accessToken: undefined,
			refreshToken: undefined,
			accessTokenData: undefined,
      setAccessToken: set((state) => ({ accessToken: state.accessToken })),
      setRefreshToken: set((state) => ({ refreshToken: state.refreshToken })),
      setAccessTokenData: set((state) => ({ accessTokenData: state.accessTokenData })),
      getAccessToken: get().accessToken,
      getRefreshToken: get().refreshToken,
      getRefreshTokenData: get().accessTokenData
		}),
		{
			name: 'auth-store',
			enabled: true,
		}
	)
);

