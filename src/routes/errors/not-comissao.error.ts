export class NotComissao extends Error {
  constructor() {
    super('Usuário não faz parte da comissão.')
  }
}
