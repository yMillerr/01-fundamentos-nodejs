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

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = data
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}