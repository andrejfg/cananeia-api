import { SigninDTO } from '../dtos/login/signin.dto'
import loginRepository from '../repositories/login.repository'

export async function signin(data: SigninDTO) {
  return await loginRepository.signin(data)
}
