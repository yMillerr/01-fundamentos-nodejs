export class Database {
  #database = {}

  create(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    }

    this.#database[table] = data
  }
}