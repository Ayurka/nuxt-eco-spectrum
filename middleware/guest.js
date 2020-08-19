export default function ({ $auth, redirect }) {
  const isLoggedIn = $auth.loggedIn;

  if (isLoggedIn) {
    return redirect({ name: 'account' });
  }
}
