
function Footer () {
    return (
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white">
            <span className="text-lg">312Coders</span>
            <span className="text-xs ml-2 text-gray-300">© 2023</span>
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
