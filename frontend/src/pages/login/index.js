// import React from 'react'
import './style.css'
import {Formik, Form} from "formik";
import {Link} from "react-router-dom";
export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt=""/>
            <span>
              facebook helps you connet and share with people in your life
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik>
                {
                  (formik)=>(
                    <Form>
                      <input type="text" />
                      <input type="text" />
                      <button type="submit" className="blue_btn">Logi In</button>
                    </Form>
                  )
                }
              </Formik>
              <Link to="/forgot" className="forgot_password">Forgotten password?</Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create A page</b>
                for a celeberity, brand or buisneess.
            </Link>
          </div>
        </div>
      </div>
      <div className="register"></div>
    </div>
  )
}