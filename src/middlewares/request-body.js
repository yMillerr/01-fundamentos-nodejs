export async function requestBody(req, res){
  const chuncks = []

  for await (const chunck of req) {
    chuncks.push(chunck)
  }

  const fullContentStream = Buffer.concat(chuncks).toString()

  try {
    req.body = JSON.parse(fullContentStream)
  } catch {
    req.body = {}
  }

  res.setHeader('Content-Type', 'application/json')
}