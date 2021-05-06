export interface AuthenticationProps {
    authState: string,
    setAuthState: any,
    setSignedIn: any
  }

export interface ErrorToast {
  errorToast: boolean,
  signUpSuccessToast: boolean,
  authSuccessToast: boolean,
  message: string
}

export interface formInputState {
  email: string,
  password: string,
  verificationCode: string
}
