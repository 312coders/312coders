import About from "../components/About";
import Discord from "../components/Discord";
import Community from "../components/Community";
import Contact from "../components/Contact";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="background-img center flex flex-col md:flex-row md:space-x-3 py-10 border-4 border-t-red-500 max-w-4xl m-auto">
        <div className="intro items-center justify-center md:w-1/2">
          <h1 className="welcome text-6xl font-extrabold text-center">
            Code,
            <br />
            <span className="margin">312</span> Style
          </h1>
          <h2 className="tag">Developing in the Chicagoland</h2>
        </div>
        <div className="flex items-center justify-center md:w-1/2">
          <img src="logo.png" alt="logo" />
        </div>
      </div>
      <About />
      <Community />
      <Discord />
      <Contact />
    </>
  );
}

export default Home;
