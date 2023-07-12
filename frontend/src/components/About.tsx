import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

interface MarkerData {
  geocode: [number, number];
  popUp: string;
}

const markers: MarkerData[] = [
  {
    geocode: [41.9421788, -87.7082946],
    popUp: "Revolution Brewing - Brewery & Taproom",
  },
  {
    geocode: [41.9375821, -87.6912071],
    popUp: "Metropolitan Brewery",
  },
  {
    geocode: [41.9209586, -87.6938554],
    popUp: "Navigator Taproom",
  },
  {
    geocode: [41.9320068, -87.6931999],
    popUp: "Ravinia Brewing Company",
  },
  {
    geocode: [41.9392866, -87.7212467],
    popUp: "Sleeping Village",
  },
  {
    geocode: [41.919956, -87.6928755],
    popUp: "Pilot Project Brewery",
  },
];

const customIcon = new Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [30, 30],
});

const createCustomClusterIcon = (cluster: any) => {
  return divIcon({
    //the amount of icons per cluster
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    className:
      "custom-marker-cluster h-12 w-12 rounded-full bg-red-500 absolute top-1/4 left-1/4 transform translate-x-[-25%] translate-y-[-25%] flex justify-center items-center font-bold text-xl",
    iconSize: point(33, 33, true),
  });
};

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
          className="h-screen z-0"
          center={[41.8781, -87.6298]}
          zoom={10}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </>
  );
}

export default About;
