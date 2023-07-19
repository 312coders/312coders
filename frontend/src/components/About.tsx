import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkersComponent from "./MarkerComponent";

function About() {
  return (
    <>
      <div className="bg-gray-300 py-20 px-10 max-w-4xl m-auto">
        <h2 className="text-center text-4xl text-mid-blue font-bold pb-5">
          About Us
        </h2>
        <div className="p-5 text-center">
          <h3 className="text-lg ">
            We are a collective of technology enthusiasts based in the
            Chicagoland area, coming together to collaborate on and engage in
            discussions about various tech-related topics, all while taking the
            opportunity to explore the city!
          </h3>
          <br />
          <h3 className="text-lg">
            Check out all the places we&rsquo;ve been to so far!
          </h3>
          <br />
          <h3 className="text-xl text-mid-blue font-bold">Collaborators</h3>
        </div>
        <div className="flex justify-center items-center space-x-4 pb-4">
          <a href="https://github.com/Michaeljaurigue">
            <p className="hover:text-blue-800">Michael Jaurigue</p>
          </a>
          <a href="https://github.com/EmmeRox">
            <p className="hover:text-blue-800">Emmeline Ocampo</p>
          </a>
          <a href="https://github.com/kevinpan47">
            <p className="hover:text-blue-800">Kevin Pan</p>
          </a>
          <a href="https://github.com/mayamauchi">
            <p className="hover:text-blue-800">Maaya Yamauchi</p>
          </a>
        </div>
        <MapContainer
          className="h-screen"
          center={[41.8781, -87.6298]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkersComponent />
        </MapContainer>
      </div>
    </>
  );
}

export default About;
