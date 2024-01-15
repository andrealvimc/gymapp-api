import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 7)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
