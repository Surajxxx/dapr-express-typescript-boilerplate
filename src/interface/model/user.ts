// types
export type NullableAny = any | null | undefined
export type NullableDate = Date | null | undefined
export type NullableString = string | null | undefined
export type NullableNumber = number | null | undefined
export type NullableBoolean = boolean | null | undefined
export type NullableBuffer = Buffer | null | undefined

// Array
export type NullableArrayString = Array<string> | null | undefined

// user interface
export type IUser = {
  name: NullableString
  email: NullableString
  password: NullableString
  isDeleted: NullableBoolean
  comparePassword(password: string, cd: any): NullableBoolean
}

// Custom user interface
export type NullableUser = IUser | null | undefined
