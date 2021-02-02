const allowedMode = ['lost', 'found', 'theft']

export default ({ route, redirect }) => {
  if (!allowedMode.includes(route.params.mode)) {
    return redirect({ name: 'index' })
  }
}
