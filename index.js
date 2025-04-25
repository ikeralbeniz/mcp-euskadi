import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "DNDzgz",
  version: "0.0.1"
});

server.tool("zaragoza-tram-estimations", "Get the estimation of when arrives to a tram station in Zaragoza in realtime",
  {station: z.number()},
  async ({station}) => {
    const response = await fetch(`https://dndzgz.herokuapp.com/services/tram/${station}`);
    if(response.ok){
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }]
      };
    }else{
      return {
        content: [{ type: "text", text: `Is not possible to get the estimate for ${station}` }]
      };
    }
  }
)

server.tool("zaragoza-tram-stations", "Get all tram stations in Zaragoza",
  {},
  async () => {
    const response = await fetch("https://dndzgz.herokuapp.com/services/tram");
    if(response.ok){
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }]
      };
    }else{
      return {
        content: [{ type: "text", text: "It was not possible to get the tram stations" }]
      };
    }
  }
)

server.tool("zaragoza-bus-stops", "Get all bus stops in Zaragoza",
  {},
  async () => {
    const response = await fetch("https://dndzgz.herokuapp.com/services/bus");
    if(response.ok){
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data.locations) }]
      };
    }else{
      return {
        content: [{ type: "text", text: "It was not possible to get the bus stops" }]
      };
    }
  }
)

server.tool("zaragoza-bus-estimations", "Get the estimation of when a bus arrives to a stop in Zaragoza in realtime",
  {stop: z.number()},
  async ({stop}) => {
    const response = await fetch(`https://dndzgz.herokuapp.com/services/bus/${stop}`);
    if(response.ok){
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }]
      };
    }else{
      return {
        content: [{ type: "text", text: `Is not possible to get the estimate for the stop ${stop}` }]
      };
    }
  }
)

server.tool("zaragoza-bizi-stations", "Get all Bizi stations in Zaragoza, the bicycle rental public service",
  {},
  async () => {
    const response = await fetch("https://dndzgz.herokuapp.com/services/bizi");
    if(response.ok){
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }]
      };
    }else{
      return {
        content: [{ type: "text", text: "It was not possible to get the Bizi stations" }]
      };
    }
  }
)

server.tool("zaragoza-bizi-estimations", "Get the estimation of bikes and free slots in a Bizi station in Zaragoza in realtime",
  {station: z.number()},
  async ({station}) => {
    const response = await fetch(`https://dndzgz.herokuapp.com/services/bizi/${station}`);
    if(response.ok){
      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }]
      };
    }else{
      return {
        content: [{ type: "text", text: `Is not possible to get the estimate for the Bizi station ${station}` }]
      };
    }
  }
)
server.tool("google-maps-link", "Get a Google Maps link from coordinates to help people to find a station o stop",
  {
    latitude: z.number(),
    longitude: z.number()
  },
  async ({latitude, longitude}) => {
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return {
      content: [{ type: "text", text: mapsUrl }]
    };
  }
)

server.tool("geolocation-from-address", "Get the geolocation (latitude and longitude) from an address and the formatted address that was found, only for Zaragoza. Can be used to find a bus stops, tram stations or bizi stations",
  {
    address: z.string()
  },
  async ({ address }) => {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(`${address}, Zaragoza, Spain`);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        location.confindence = data.results[0].geometry.location_type;
        location.formatted_address = data.results[0].formatted_address;
        return {
          content: [{ type: "text", text: JSON.stringify(location) }]
        };
      } else {
        return {
          content: [{ type: "text", text: `No geolocation found for the address: ${address}` }]
        };
      }
    } else {
      return {
        content: [{ type: "text", text: `Failed to fetch geolocation for the address: ${address}` }]
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("DNDzgz MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});