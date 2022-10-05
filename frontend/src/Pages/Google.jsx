import React from 'react'
import GoogleLogin from "react-google-login";
import axios from "axios";
// get env vars
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const baseURL = "http://localhost:8000";
export default function Google() {
    const handleGoogleLogin = (response) => {
        axios
          .post(`${baseURL}/auth/convert-token`, {
            token: response.accessToken,
            backend: "google-oauth2",
            grant_type: "convert_token",
            client_id: drfClientId,
            client_secret: drfClientSecret,
          })
          .then((res) => {
            const { access_token, refresh_token } = res.data;
            console.log({ access_token, refresh_token });
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
          })
          .catch((err) => {
            console.log("Error Google login", err);
          });
      };
  return (
    <div className="AppG">
  <GoogleLogin
    clientId={googleClientId}
    buttonText="LOGIN WITH GOOGLE"
    onSuccess={(response) => handleGoogleLogin(response)}
    render={(renderProps) => (
      <button
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        type="button"
        className="login-with-google-btn"
      >
        Sign in with Google
      </button>
    )}
    onFailure={(err) => console.log("Google Login failed", err)}
  />
</div>
  )
}
