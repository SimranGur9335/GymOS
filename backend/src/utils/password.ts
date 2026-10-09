import argon2 from 'argon2';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Hash a plain password using Argon2id if possible, otherwise fall back to bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Argon2id is preferred for its resistance to GPU attacks.
    return await argon2.hash(password, { type: argon2.argon2id });
  } catch (e) {
    // If Argon2 fails (e.g., missing native bindings), fallback to bcrypt.
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  }
}

/**
 * Verify a password against a previously stored hash.
 * Detects whether the hash was produced by Argon2 or bcrypt.
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  // Argon2 hashes start with `$argon2`
  if (hash.startsWith('$argon2')) {
    try {
      return await argon2.verify(hash, password);
    } catch {
      return false;
    }
  }
  // Assume bcrypt otherwise
  return await bcrypt.compare(password, hash);
}
