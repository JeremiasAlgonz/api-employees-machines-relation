import { Request, Response, NextFunction } from 'express';
import { Secret, verify } from 'jsonwebtoken';
// verifica se os parâmetros da requisição são válidos
function ValidaToken(req: Request, res: Response, next: NextFunction) {
    const { authentication } = req.headers;
    verify(authentication as string, process.env.CHAVESEGURANCA as Secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'Acesso não autorizado.' });
        } else {
            console.log(decoded);
            return next();
        }
    });
}
export default ValidaToken 