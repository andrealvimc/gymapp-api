import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 7)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('User with same email already exists')
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
