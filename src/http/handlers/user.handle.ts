import userRepository from '../repositories/user.repository'
export async function findById(id: string) {
  return await userRepository.findById(id)
}

export async function changeImage(id: string, imageId: string, tipo?: string) {
  return await userRepository.changeImage(id, imageId, tipo)
}

export async function removeImage(id: string, tipo: string) {
  return await userRepository.removeImage(id, tipo)
}
