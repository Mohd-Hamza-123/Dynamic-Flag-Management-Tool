type FormParams = {
    name?: string,
    email: string,
    password: string
}


export const passwordValidator =
    /^(?=.*[A-Za-z])(?=.*\d).+$/

export const emailPattern =
    /^[a-zA-Z]+[a-zA-Z0-9-\.]{2,}\@+[a-z]{4,}\.[a-z]{3,}$/;

export const validateForm = ({ email, password, name }: FormParams, registering: boolean) => {

    if (!name && registering) return {
        success: false,
        message: "Name is required"
    }
    else if (!email || !password) return {
        success: false,
        message: "Email and Password are required"
    }
    else if (!emailPattern.test(email)) return {
        success: false,
        message: "Invalid Email! Please provide a valid email."
    }
    else if (!passwordValidator.test(password)) return {
        success: false,
        message: "Password must be 6 characters long and must contain letters, and numbers."
    }
    else return { success: true, message: "" }

}