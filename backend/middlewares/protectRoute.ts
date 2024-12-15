import jwt, { JwtPayload } from 'jsonwebtoken';

export const protectRoutes = (req:any, res:any, next:any) => {
  const token = req?.cookies.accessToken || req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

export default protectRoutes;
