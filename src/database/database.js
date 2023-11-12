import { writeFile, readFile } from 'node:fs/promises'


const databaseFilePath = new URL("../../db.json", import.meta.url)

export class Database {
  #database = {}

  constructor () {
    readFile(databaseFilePath)
    .then(data => JSON.parse(data))
    .then(data => this.#database = data)
    .catch(() => this.#persist())
  }

  #persist() {
    writeFile(databaseFilePath, JSON.stringify(this.#database))
  }

  create(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    
    return data
  }

  read(table) {
    const data = this.#database[table]

    return data
  }
}