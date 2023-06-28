import TwitterLogo from "/twitter.png";
import InstagramLogo from "/instagram.png";
import LinkedInLogo from "/linkedin.png";
import FacebookLogo from "/facebook.png";
import Logo from "/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-800 py-4 px-8 max-w-auto mx-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white flex items-center">
          <img
            src={Logo}
            className="block object-scale-down rounded h-14 mr-2"
            alt="Logo"
          />
          <span className="text-xs text-gray-300">312Coders © 2023</span>
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
