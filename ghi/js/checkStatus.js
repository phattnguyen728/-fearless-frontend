window.addEventListener('DOMContentLoaded', async () => {
  const plCookie = await cookieStore.get('jwt_access_payload');

  if (plCookie) {
    const encPayload = JSON.parse(plCookie.value);

    const decPayload = atob(encPayload)
    const payload = JSON.parse(decPayload)
    if (payload.user.perms.includes('events.add_conference')) {
      removeDNone("conf_link")
    }
    if (payload.user.perms.includes('events.add_location')) {
      removeDNone("loc_link")
    }
  }
})

function removeDNone(target) {
  const element = document.getElementById(target)
  element.classList.remove('d-none')
}
