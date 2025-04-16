import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "DNDzgz",
  version: "0.0.1"
});

server.tool("zaragoza-tram-estimations", "Get the estimation of when arrives to a tram station in Zaragoza",
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

const transport = new StdioServerTransport();
server.connect(transport);