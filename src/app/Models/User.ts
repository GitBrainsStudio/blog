export class User
{
    Id:string
    Email:string
    RegistrationDate:string

    constructor(id:string, email:string, registrationDate:string)
    {
        this.Id = id
        this.Email = email
        this.RegistrationDate = registrationDate
    }
}