import { SignJWT, jwtVerify, type JWTPayload } from "jose";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    console.warn(
      "AUTH_SECRET is not set. Using a fallback development secret."
    );
    return new TextEncoder().encode("dev-secret-change-me");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(payload: JWTPayload, expiresIn = "7d") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}
