import { useState } from "react";
import { api } from "../api";

import useAuth from "../hooks/useAuth";

import FacebookLogo from "/facebook.png";
import InstagramLogo from "/instagram.png";
import LinkedInLogo from "/linkedin.png";
import Logo from "/logo.png";
import TwitterLogo from "/twitter.png";

function Footer() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleForgotPassword = () => {
    if (email) {
      api.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log("Password reset email sent successfully");
          setResetEmailSent(true); // Set the state to indicate that the email was sent
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);
          // Handle any errors that occurred during sending the password reset email
        });
    } else {
      console.log("Please enter your email to reset the password");
      // Add any additional logic here, such as showing an error message to the user
    }
  };

  return (
    <footer className="bg-gray-800 py-4 px-8 max-w-4xl m-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white flex items-center">
          <img
            src={Logo}
            className="block object-scale-down rounded h-14 mr-2"
            alt="Logo"
          />
          <span className="text-xs text-gray-300">312Coders © 2023</span>
          {user === null ? (
            <div className="space-x-1">
                <input
                  className="text-xs border rounded py-2 px-3 text-gray-700"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                />
                <input
                  className="text-xs border rounded py-2 px-3 text-gray-700"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                />
                <button
                  className="text-xs bg-blue-500 hover:bg-blue-700 rounded p-2 font-bold"
                  onClick={() => api.auth.signIn(email, password)}
                >
                  login
                </button>
              <button
                className="text-xs bg-gray-500 hover:bg-gray-700 rounded p-2 font-bold"
                onClick={handleForgotPassword}
              >
                Forgot Password
              </button>
              {resetEmailSent && (
                <span className="text-xs text-green-500 ml-2">
                  Password reset email sent!
                </span>
              )}
            </div>
          ) : (
            <div>
              <button
                className="text-xs bg-red-500 hover:bg-red-700 rounded p-2 font-bold"
                onClick={() => api.auth.signOut()}
              >
                logout
              </button>
            </div>
          )}
        </div>
        <div className="text-white flex">
          <a
            href="https://www.twitter.com/312coders"
            className="mx-2 hover:text-gray-300"
          >
            <img
              src={TwitterLogo}
              className="block object-scale-down h-6"
              alt="Twitter"
            />
          </a>
          <a
            href="https://www.instagram.com/312coders"
            className="mx-2 hover:text-gray-300"
          >
            <img
              src={InstagramLogo}
              className="block object-scale-down h-6"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.twitter.com/312coders"
            className="mx-2 hover:text-gray-300"
          >
            <img
              src={LinkedInLogo}
              className="block object-scale-down h-6"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://www.facebook.com/312coders"
            className="mx-2 hover:text-gray-300"
          >
            <img
              src={FacebookLogo}
              className="block object-scale-down h-6"
              alt="Facebook"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
