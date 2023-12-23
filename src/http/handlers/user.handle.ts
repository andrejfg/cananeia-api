import usuarioRepository from '../repositories/user.repository'
export async function findById(id: string) {
  return await usuarioRepository.findById(id)
}
