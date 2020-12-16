addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  console.log('start')
  const response = await fetch('https://telop-maker.tokyo/')
  const results = await response.text()
  console.log(results)

  return new Response(results, {
    headers: { 'Content-Type': 'text/html' },
    status: 200,
  })
}
