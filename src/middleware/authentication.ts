import { Next } from "koa"
import { IContext } from "../interfaces/IContext"

export async function authenticate(ctx:IContext, next:Next) {

    return next()

}