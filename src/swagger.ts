import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Maliroso Api",
      version: "1.0.0",
      description: "Describes all the available  APIs on the Maliroso website",
    },
  },
  apis: ["src/routes/v1/*.ts"], // Path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;
