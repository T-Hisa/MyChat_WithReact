interface ProfileCommon {
  userId: string
}

export interface SetProfileProps extends ProfileCommon {
  email: string
}

export interface UpdateProfilePropsForData extends ProfileCommon {
  username: string
  photoURL: string | null
}

export interface UpdateProfilePropsForAuth {
  displayName: string
  photoURL: string | null
}
