"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const argon2_1 = __importDefault(require("argon2"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const BCRYPT_SALT_ROUNDS = 12;
/**
 * Hash a plain password using Argon2id if possible, otherwise fall back to bcrypt.
 */
async function hashPassword(password) {
    try {
        // Argon2id is preferred for its resistance to GPU attacks.
        return await argon2_1.default.hash(password, { type: argon2_1.default.argon2id });
    }
    catch (e) {
        // If Argon2 fails (e.g., missing native bindings), fallback to bcrypt.
        const salt = await bcrypt_1.default.genSalt(BCRYPT_SALT_ROUNDS);
        return await bcrypt_1.default.hash(password, salt);
    }
}
/**
 * Verify a password against a previously stored hash.
 * Detects whether the hash was produced by Argon2 or bcrypt.
 */
async function verifyPassword(hash, password) {
    // Argon2 hashes start with `$argon2`
    if (hash.startsWith('$argon2')) {
        try {
            return await argon2_1.default.verify(hash, password);
        }
        catch {
            return false;
        }
    }
    // Assume bcrypt otherwise
    return await bcrypt_1.default.compare(password, hash);
}
//# sourceMappingURL=password.js.map