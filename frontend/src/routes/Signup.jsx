
import axios from "axios"
import { useState } from "react"
import { userInfo, isUserLoggedIn } from "../store/atoms/atoms"
import { useSetRecoilState, useRecoilState } from "recoil"

export default function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUserInfo] = useRecoilState(userInfo);
    const setIsUserLoggedIn = useSetRecoilState(isUserLoggedIn)

    function submitForm(e) {
        e.preventDefault()
        const userdata = {username, email, password}

        axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/user/signup',
            data: userdata
        })
        .then(async(response) => {
            console.log(response)

            setUserInfo({
                username: response.data.username,
                email: response.data.email
            })

            setIsUserLoggedIn(true)

            console.log(user)

        })
        .catch((error) => {
            console.log("Inside error function" + error)

            if(error.response.status === 409) {
                console.log("checking")
                setIsUserLoggedIn(false)
            }

            console.log("user info error: " + user)
        })
    }


    return  <form onSubmit={submitForm}>
                <div>
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Enter username..." name="username" onChange={e => setUsername(e.target.value)} value={username} required />
                    <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email..." name="email" onChange={e => setEmail(e.target.value)} value={email} required />
                    <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password..." name="psw" onChange={e => setPassword(e.target.value)} value={password} required />

                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </div>
    </form>
}