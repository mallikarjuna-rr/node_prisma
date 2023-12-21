import jwt from 'jsonwebtoken';


export const generateToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}