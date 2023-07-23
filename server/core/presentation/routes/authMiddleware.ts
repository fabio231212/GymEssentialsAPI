// authMiddleware.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. No se proporcionó token.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'me_gustan_malvadas');
    req.user = decodedToken; //request fue extendido
    next(); // llamar a next para pasar al controller
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. Token inválido.' });
  }
};
