import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Ferrari", base: "Maranello, Italy" },
  { id: 4, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 7, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 8, name: "Williams", base: "Grove, United Kingdom" },
  { id: 9, name: "Haas", base: "Kannapolis, United States" },
  { id: 10, name: "Alfa Romeo", base: "Hinwil, Switzerland" },
];

const drivers = [
  { id: 1, name: "Lewis Hamilton", team: "Mercedes" },
  { id: 2, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 3, name: "Charles Leclerc", team: "Ferrari" },
  { id: 4, name: "Carlos Sainz", team: "Ferrari" },
  { id: 5, name: "Lando Norris", team: "McLaren" },
  { id: 6, name: "Oscar Piastri", team: "McLaren" },
  { id: 7, name: "George Russell", team: "Mercedes" },
  { id: 8, name: "Fernando Alonso", team: "Aston Martin" },
  { id: 9, name: "Sergio Pérez", team: "Red Bull Racing" },
  { id: 10, name: "Valtteri Bottas", team: "Alfa Romeo" },
  { id: 11, name: "Zhou Guanyu", team: "Alfa Romeo" },
  { id: 12, name: "Pierre Gasly", team: "Alpine" },
  { id: 13, name: "Esteban Ocon", team: "Alpine" },
  { id: 14, name: "Yuki Tsunoda", team: "AlphaTauri" },
  { id: 15, name: "Liam Lawson", team: "AlphaTauri" },
  { id: 16, name: "Nico Hülkenberg", team: "Haas" },
  { id: 17, name: "Kevin Magnussen", team: "Haas" },
  { id: 18, name: "Alex Albon", team: "Williams" },
  { id: 19, name: "Logan Sargeant", team: "Williams" },
];

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>(
  "/drivers/:id",
  async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
      response.type("application/json").code(404);
      return { message: "Driver Not Found" };
    } else {
      response.type("application/json").code(200);
      return { driver };
    }
  }
);

server.listen({ port: 3333 }, () => {
  console.log("Server init");
});
