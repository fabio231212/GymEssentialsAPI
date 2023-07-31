import { Request, Response, NextFunction } from "express"; // Asumiendo que estás usando Express junto a Multer

 const multer = require("multer");

// class ImageUploader {
//   public static upload = multer({
//     storage: multer.diskStorage({
//       destination: function (req: Request, file: any, cb: any) {
//         cb(null, "./storage/imgs");
//         console.log(req.body);
//       },
//       filename: function (req: Request, file: any, cb: any) {
//         cb(
//           null,
//           req.body.nombre.replace(/\s/g, "") +
//           // req.body.usuarioId +
//             4+
//             new Date().toISOString().slice(0, 10).replace(/-/g, "")   // Obtenemos solo el año, mes y día en formato YYYY-MM-DD
//             +".jpg"
//         );
//       },
//     }),
//   });
// }

// export default ImageUploader;

class ImageUploader {
  public static counter = 1;

  public static upload = multer({
    storage: multer.diskStorage({
      destination: function (req: Request, file: any, cb: any) {
        cb(null, "./storage/imgs");
        console.log(req.body);
      },
      filename: function (req: Request, file: any, cb: any) {
        cb(
          null,
          req.body.nombre.replace(/\s/g, "") +
            // req.body.usuarioId +
            4 +
            new Date().toISOString().slice(0, 10).replace(/-/g, "") + ImageUploader.counter + // Obtenemos solo el año, mes y día en formato YYYY-MM-DD
            ".jpg"
        );
        ImageUploader.counter++;
      },
    }),
  });
}
export default ImageUploader;