addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch('https://telop-maker.tokyo/')
  let results = await response.text()
  const url = request.url
  const id = url
    .split('?')[1]
    .split('&')[0]
    .split('=')[1]
  const imageUrl = `https://i.imgur.com/${id}.png`
  results = results.replace(
    'content="https://telop-maker.tokyo/"',
    `content="${url}"`,
  )
  results = results.replace(
    /\"https:\/\/telop-maker\.tokyo\/sample\.png\"/g,
    imageUrl,
  )
  return new Response(results, {
    headers: { 'Content-Type': 'text/html' },
    status: 200,
  })
}
