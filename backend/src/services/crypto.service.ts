import bcrypt from "bcrypt"

export const hash = (str: string) =>
    bcrypt.hashSync(str, 10)

export const verify = (str: string, hash: string) =>
    bcrypt.compareSync(str, hash)
