import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = 12
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
