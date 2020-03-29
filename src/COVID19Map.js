import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const COVID19Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      ["esri/Map", "esri/views/SceneView", "esri/layers/FeatureLayer"],
      {
        css: true
      }
    ).then(([ArcGISMap, SceneView, FeatureLayer]) => {
      const countries = new FeatureLayer({
        url:
          "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer",
        renderer: {
          type: "simple",
          symbol: {
            type: "polygon-3d", // autocasts as new PolygonSymbol3D()
            symbolLayers: [
              {
                type: "fill", // autocasts as new FillSymbol3DLayer()
                material: {
                  color: [0, 0, 0, 0]
                },
                outline: {
                  color: [4, 245, 248]
                }
              }
            ]
          }
        }
      });
      const map = new ArcGISMap({
        layers: [countries],
        ground: {
          opacity: 0.5,
          surfaceColor: "black"
        }
      });

      // load the map view at the ref's DOM node
      const view = new SceneView({
        container: mapRef.current,
        map: map,
        ui: {
          components: ["attribution"]
        },
        environment: {
          starsEnabled: false,
          atmosphereEnabled: false,
          background: {
            type: "color",
            color: "black"
          }
        },
        center: [78, 22],
        zoom: 3
      });

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return <div className="webmap" ref={mapRef} />;
};
