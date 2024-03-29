import { useState, ChangeEvent, FormEvent  } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from './sign-up-form.styles';
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!displayName || !email || !password || !confirmPassword ){
            alert("All values should be added")
            return
        }
        if(password !== confirmPassword ) {
            alert("Passwords do not match")
            return
        }
        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields()
        } catch (error) {
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){
                alert("Email alredy in use")
            }
            console.log("User created error " +  error)
        }

    }

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" onChange={handleChange} required value={displayName}/>

                <FormInput label="Email" type="email" name="email" onChange={handleChange} required value={email}/>

                <FormInput label="Password" type="password" name="password" onChange={handleChange} required value={password}/>
                
                <FormInput label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} required value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;