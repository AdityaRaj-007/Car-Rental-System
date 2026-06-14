import Router from "express";
import { UserLogin, UserSignup } from "./auth.controller";
import { validate } from "../../shared/middlewares/validationMiddleware";
import { LoginSchema, SignupSchema } from "./auth.schema";

const router = Router();

router.post("/signup", validate(SignupSchema), UserSignup);
router.post("/login", validate(LoginSchema), UserLogin);

export default router;
