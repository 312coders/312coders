import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import pinIcon from "/marker-icon.png";
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
  {
    geocode: [41.919956, -87.6928755],
    popUp: "Pilot Project Brewery",
  },
  {
    geocode: [41.907476, -87.651148],
    popUp: "Off Color Brewing Taproom The Mousetrap",
  },
  {
    geocode: [41.95937, -87.682137],
    popUp: "Hop Butcher For The World",
  },
  {
    geocode: [41.91742, -87.70009],
    popUp: "Solemn Oath Brewery Still Life",
  },
  {
    geocode: [41.96085, -87.70993],
    popUp: "Surge Coffee Bar & Billiards",
  },
  {
    geocode: [41.94513, -87.7102],
    popUp: "First Ascent Avondale",
  },
  {
    geocode: [41.979858, -87.680458],
    popUp: "Spiteful Brewing Tap Room",
  },
  {
    geocode: [41.969890, -87.862270],
    popUp: "Shortfuse Brewery",
  },
  {
    geocode: [41.9758188, -87.6685536],
    popUp: "Hopleaf",
  },
  {
    geocode: [41.9177233, -87.6988825],
    popUp: "Bungalow by Middle Brow",
  },
  {
    geocode: [41.9538493, -87.7342629],
    popUp: "ERIS Brewery and Cider House",
  },

];

const customIcon = new Icon({
  iconUrl: pinIcon,
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
        <h2 className="text-center text-4xl text-mid-blue font-bold">
          About Us
        </h2>
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

        {/* <div className="columns-1 md:columns-3 p-5">
          <div className="p-5">
            <h3 className="text-center text-xl font-medium pb-3">Who we are</h3>
            <img
              src="../../placeholder.jpg"
              className="hidden md:block rounded"
            />
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda architecto blanditiis veritatis sed impedit!
            </p>
          </div>
          <div className="p-5">
            <h3 className="text-center text-xl font-medium pb-3">What we do</h3>
            <img
              src="../placeholder.jpg"
              className="hidden md:block rounded"
            />
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda architecto blanditiis veritatis sed impedit!
            </p>
          </div>
          <div className="p-5">
            <h3 className="text-center text-xl font-medium pb-3">Why we do</h3>
            <img
              src="../placeholder.jpg"
              className="hidden md:block rounded"
            />
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda architecto blanditiis veritatis sed impedit!
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default About;
