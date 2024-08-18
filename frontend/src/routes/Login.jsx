export default function Login() {
    return  <form>
                <div>
                    <h1>LogIn</h1>
                    <hr />

                    <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" required />
                    <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />
                <div>
                    <button type="submit">Login</button>
                </div>
            </div>
    </form>
}