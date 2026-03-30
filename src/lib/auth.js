import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
export function signToken(payload) { return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }); }
export function verifyToken(token) { try { return jwt.verify(token, JWT_SECRET); } catch { return null; } }
export function getTokenFromRequest(req) {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.substring(7);
  return req.cookies?.get('admin_token')?.value || null;
}
export function requireAuth(req) { const t = getTokenFromRequest(req); return t ? verifyToken(t) : null; }
