import { createClient } from 'contentful'

const client = createClient({
  space: '5abu6ykfps0l',
  accessToken:
    'f3df452a61b472df87af23f67b40da5b4a20f128e246d7b30d0ee8c37b4424d9'
})

export default client
window.client = client
