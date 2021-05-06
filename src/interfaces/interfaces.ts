export interface AuthenticationProps {
    authState: string,
    setAuthState: any,
    setSignedIn: any
  }

export interface ErrorToast {
  show: boolean,
  message: string
}

export interface formInputState {
  email: string,
  password: string,
  verificationCode: string
}
