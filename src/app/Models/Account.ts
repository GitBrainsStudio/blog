import { User } from "./User"

export class Account
{
    User:User
    Token:string

    constructor(user:User, token:string)
    {
        this.User = user
        this.Token = token
    }
}