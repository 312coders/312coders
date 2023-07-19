import React from "react";
import { Marker, Popup } from "react-leaflet";
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
  {
    geocode: [41.907476, -87.651148],
    popUp: "Off Color Brewing Taproom The Mousetrap",
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

const MarkersComponent: React.FC = () => {
  return (
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
  );
};

export default MarkersComponent;
