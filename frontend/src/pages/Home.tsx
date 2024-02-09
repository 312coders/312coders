import About from "../components/About";
import Discord from "../components/Discord";
import Community from "../components/Community";
// import Contact from "../components/Contact";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="background-img center flex flex-col md:flex-row md:space-x-3 py-10 border-4 border-t-red-500 m-auto dark:border-l-slate-900 dark:border-r-slate-900 dark:border-b-slate-900">
        <div className="intro items-center justify-center md:w-1/2">
          <h1 className="welcome text-6xl font-extrabold text-center">
            Code,
            <br />
            <span className="margin">312</span> Style
          </h1>
          <h2 className="tag">Developing in the Chicagoland</h2>
        </div>
        <div className="flex items-center justify-center md:w-1/2">
          <img src="logo.png" alt="logo" className="logo-pulse" />
        </div>
      </div>
      <Community />
      <Discord />
      {/* <Contact /> */}
    </>
  );
}

export default Home;
