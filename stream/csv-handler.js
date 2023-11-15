import { parse } from 'csv'
import fs from 'node:fs'

const csvFilePath = new URL('./tasks.csv', import.meta.url)

const stream = fs.createReadStream(csvFilePath)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2,
})

async function csvHandler() {
  const csvLine = stream.pipe(csvParse)

  for await (const line of csvLine) {
  
    const [ title, description ] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })

    await new Promise(resolve => setTimeout(resolve, 3000)) 
  }
}

csvHandler()