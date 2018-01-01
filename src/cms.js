import { createClient } from 'contentful'

const client = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: '5abu6ykfps0l',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken:
    'f3df452a61b472df87af23f67b40da5b4a20f128e246d7b30d0ee8c37b4424d9'
})

export function fetchEntriesForContentType(id) {
  return client
    .getEntries({ content_type: id })
    .then(response => response.items)
    .catch(console.error)
}

export function fetchGuides() {
  return fetchEntriesForContentType('guide')
}

export default client

window.addEventListener('load', async function() {
  const entries = await fetchGuides()
  console.log(entries)
})
