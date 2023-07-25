import { Request, Response, NextFunction } from 'express'; // Asumiendo que estás usando Express junto a Multer

const multer = require('multer');

class ImageUploader {
  
  public static upload = multer({
    storage: multer.diskStorage({
      destination: function (req: Request, file: any, cb: any) {
        cb(null, './storage/imgs');
        console.log(req.body);
      },
      filename: function (req: Request, file: any, cb: any) {
        cb(null, req.body.nombre + req.body.usuarioId + Date.now() + '.jpg');
      },
    }),
  });
}

export default ImageUploader;
