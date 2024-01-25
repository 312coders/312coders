function Discord() {
  return (
    <>
      <div className="bg-white py-10 px-4 md:px-20">
        <h3 className="text-center font-semibold text-3xl pb-5">Connect with the 312 on Discord</h3>
        <div className="mb-4 mx-auto max-w-screen-md">
          <img
            src="/discord.jpg"
            className="block w-full h-auto rounded"
            alt="Discord Logo"
          />
        </div>
        <div className="column-1 md:columns-2 p-4 flex items-center justify-center flex-col md:flex-row">
          <p className="text-center m-3 p-5 text-2xl">
            Join our vibrant Discord community for software developers!
            Collaborate on projects, engage in code reviews, participate in
            hackathons, join us online for Social Sundays and discuss the latest tech trends. We foster a
            respectful and inclusive environment where knowledge sharing and
            networking thrive. Expand your skills, connect with like-minded
            individuals, and be part of our growing community. Join us today!
          </p>
        
        </div>  
        <div className="text-center">
            <a
              href="https://discord.gg/3QsqxxwKcP"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button role="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Join Discord
              </button>
            </a>
          </div>
      </div>
    </>
  );
}

export default Discord;
