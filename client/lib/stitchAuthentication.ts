import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import { stitchClient } from './stitch';

// import type for StitchUser
interface User {
  id: string;
}

export function loginAnonymous(): void {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential();
  return stitchClient.auth
    .loginWithCredential(credential)
    .then(
      (user: User): User => {
        console.log(`Logged in as anonymous user with id: ${user.id}`);
        return user;
      }
    )
    .catch(console.error);
}

export function hasLoggedInUser(): boolean {
  // Check if there is currently a logged in user
  return stitchClient.auth.isLoggedIn;
}

export function getCurrentUser(): User | null {
  // Return the user object of the currently logged in user
  return stitchClient.auth.isLoggedIn ? stitchClient.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  const user = getCurrentUser();
  return stitchClient.auth.logoutUserWithId(user.id);
}
