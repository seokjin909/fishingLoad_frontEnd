'use clinet'
export function isValidUserId(userId: string) {
  const regex = /^[a-zA-Z0-9]{4,15}$/;
  return regex.test(userId);
}
export function isValidPassword(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return regex.test(password);
}
export function isValidNickname(nickname: string) {
  const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  return regex.test(nickname);
}
export function isValidEmail(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}
