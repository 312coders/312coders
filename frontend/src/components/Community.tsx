import Photo from "./PhotoGrid";

function Community() {
  return (
    <>
      <div className="py-10 px-4 md:px-20 bg-light-blue dark:bg-slate-800 dark:text-white">
        <h3 className="text-center font-semibold text-3xl pb-5">The 312 Coders Community</h3>
        <div className="mb-4 mx-auto max-w-screen-md">
          <img
            src="/community.jpg"
            className="block w-full h-auto rounded"
          />
        </div>
        <div className="column-1 md:columns-2 p-4 flex items-center justify-center flex-col md:flex-row">
          <div className="ml-4">
            <p className="text-center m-3 p-5 text-2xl">
              Join our community of passionate tech enthusiasts! Surrounding yourself with individuals who inspire and uplift can significantly contribute to personal and professional development. If you're unsure about where to start but desire to connect with exceptional individuals in the tech industry, keep an eye out for future events, insightful blog posts, and engaging content!
            </p>
          </div>
        </div>
        <h3 className="text-center font-semibold text-2xl p-2">
          Check out our newest events at{" "}
          <a
            href="https://www.meetup.com/312-coders/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 transition transform hover:text-red-700 hover:scale-105"
          >
            MeetUp.com
          </a>
          Next Event
        </h3>
        <br></br>
        <Photo />
      </div>
    </>
  );
}

export default Community;