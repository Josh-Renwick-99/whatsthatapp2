import { validate } from 'react-email-validator';

export function emailValidator(email) {
    if (!email) return "Email can't be empty."
    if (!validate(email)) return 'Ooops! We need a valid email address.'
    return ''
  }

export function passwordValidator(password) {
  if (!/^.{8,16}$/.test(password)) {
    return 'Password must be between 8 and 16 characters long';
  }
  if (!/[!@#$%^&*()-_+=\[\]{}|\\:;"'<>,.?/]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one digit';
  }
  if (!/[A-Z]/.test(password)) {
    return 'password must contain at least one uppercase letter';
  }
  return ''
}
