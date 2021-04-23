import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'

export const LoginForm = () => {
    const [values, setValues] = useState({
        username: '', email: '', password: ''
    })
    const Login = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type="text" required onChange={handlechange('username')} name="username" value={username} placeholder="Username"/>
                </div>
                    <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" required onChange={handlechange('email')} name="email" value={email} placeholder="Email"/>
                </div>    <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" required onChange={handlechange('password')} name="password" value={password} placeholder="Password"/>
                </div>
                <button>Login</button>

            </form>
        )
    }
    return (
        <div>

        </div>
    )
}
