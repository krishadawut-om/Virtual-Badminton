import { UserModel } from "../../modules/login/models/userModel";

const userDataKey =
  "e2f203aac16ab3ab78f9070dcb59b59e8b8634d23c7de5668d85cb0426b43c51";

export function getUserDataFromStorage(): UserModel {
  return JSON.parse(localStorage.getItem(userDataKey) || "{}");
}

export function setUserDataFromStorage(userData: UserModel): void {
  localStorage.setItem(userDataKey, JSON.stringify(userData || {}));
}

export function deleteUserDataFromStorage(): void {
  localStorage.removeItem(userDataKey);
}
