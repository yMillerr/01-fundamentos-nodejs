import fs from 'node:fs'

const databaseFilePath = new URL("../../db.json", import.meta.url)

export class Database {
  #database = {}

  #persist() {
    fs.writeFile(databaseFilePath, JSON.stringify(this.#database))
  }

  create(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
      return this.#persist()
    }

    this.#database[table] = data
    this.#persist()
  }
}