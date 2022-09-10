import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { HashComparer } from '@/data/protocols/criptography/hashComparer'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = 12
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const compare = await bcrypt.compare(value, hash)
    return compare
  }
}