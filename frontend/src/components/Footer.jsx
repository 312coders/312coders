import { useEffect, useState } from "react";
import { api, firebaseAuth } from "../api";

import useAuth from '../hooks/useAuth';

function Footer () {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <span className="text-lg">312Coders</span>
          <span className="text-xs ml-2 text-gray-300">© 2023</span>
          {
            user === null ?
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
            </div>
            :
            <div>
              <button
                className="text-xs bg-red-500 hover:bg-red-700 rounded p-2 font-bold"
                onClick={() => api.auth.signOut()}
              >
                logout
              </button>
            </div>
          }
        </div>
        <div className="text-white">
          <a href="#" className="mx-2 hover:text-gray-300">
            Twitter
          </a>
          <a href="#" className="mx-2 hover:text-gray-300">
            Instagram
          </a>
          <a href="#" className="mx-2 hover:text-gray-300">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
  
  export default Footer;
