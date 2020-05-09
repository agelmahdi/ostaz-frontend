export default async function ({ $auth, redirect, store }) {
  const user = await $auth.user
  if (user && user.is_streamer) {
    // let the user in
    console.log('Admin', 'true')
  } else {
    // store.dispatch('snackbar/setSnackbar', { color: 'error', text: 'You must be an admin to view that page.' })
    console.log('Admin', false)

    redirect('/')
  }
}
