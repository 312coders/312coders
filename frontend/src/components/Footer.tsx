import FacebookLogo from "/facebook.png";
import InstagramLogo from "/instagram.png";
import LinkedInLogo from "/linkedin.png";
import TwitterLogo from "/twitter.png";

function Footer() {

  return (
    <footer className="py-4 px-8 border-t border-slate-600 bg-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex justify-between items-center">
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
