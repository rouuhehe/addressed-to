import { ExpressMiddlewareInterface } from "routing-controllers";
import jwt  from "jsonwebtoken";

export class AuthMiddleware implements ExpressMiddlewareInterface {
  use(req: any, res: any, next: (err?: any) => any): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "");
      req.user = payload; 
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  }
}