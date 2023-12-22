export class ConflictParticipante extends Error {
  constructor() {
    super('Usuário já está sendo usado.')
  }
}

export class ConflictPolo extends Error {
  constructor() {
    super('Nome e/ou número do polo já estão sendo usados.')
  }
}
