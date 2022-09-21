// import logo from './logo.svg';
import './App.css';

function SignIn(){
    return (
        <div>
            <div>
                <label>email</label>
                <input type="email" placeholder="email address"></input>
            </div>
            <div>
                <label>password</label>
                <input type="password" placeholder="password"></input>
            </div>
            <div>
                <input type="button">submit</input>
            </div>
        </div>
    );
}
export default SignIn;