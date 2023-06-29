import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const markers = [
  {
    geocode: [41.9428, -87.7083],
    popUp: "Revolution Brewing - Brewery & Taproom",
  },
  {
    geocode: [41.9362, -87.6943],
    popUp: "Metropolitan Brewery",
  },
  {
    geocode: [41.9214, -87.6975],
    popUp: "Navigator Taproom",
  },
  {
    geocode: [41.9319, -87.6969],
    popUp: "Ravinia Brewing Company",
  },
  {
    geocode: [41.9395, -87.7219],
    popUp: "Sleeping Village",
  },
];

const customIcon = new Icon({
  iconUrl: './marker-icon.png',
  iconSize: [30, 30],
});

const createCustomClusterIcon = (cluster) => {
  return new divIcon({
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
        <div className="p-5">
            <h3 className="text-center text-lg">
              We are a collective of technology enthusiasts based in the
              Chicagoland area, coming together to collaborate on and engage in
              discussions about various tech-related topics, all while taking
              the opportunity to explore the city!

            </h3>
            <br/>
            <h3 className="text-center text-lg">
              Check out all the places we&rsquo;ve been to so far!
              </h3>

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
