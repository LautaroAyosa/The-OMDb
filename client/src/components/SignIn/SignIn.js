import React from "react"
import { Navigate, Link } from "react-router-dom"
import SignInForm from "./SignInForm/SignInForm"

const LogIn = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))

    if (user === null) {
        return (
        <div className="full-width-container">
            <div className="loginContainer">
                <aside className="glassmorphism">
                    <h1>Sign In</h1>
                    <p>Create a free account or <Link to='/login'>log in</Link></p>
                    <SignInForm />
                </aside>
            </div>
        </div>
        )
    }

    return <Navigate to="/dashboard" />
}

export default LogIn