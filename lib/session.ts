import crypto from "crypto"

const SESSION_SECRET = process.env.SESSION_SECRET || "change-me"

export function createSessionToken() {
  const id = crypto.randomBytes(32).toString("hex")
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(id).digest("hex")
  return `${id}.${signature}`
}

export function verifySessionToken(token: string) {
  const [id, signature] = token.split(".")
  if (!id || !signature) return false
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(id).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"))
}
