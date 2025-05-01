import swagger from '@fastify/swagger';
import fastify from 'fastify';

const headersSchema = {
  'dapi-test': {
    type: 'string',
    description: 'something',
  },
};

const responseSchema = {
  type: 'object',
  properties: {
    foo: { type: 'string' },
  },
};

const server = fastify();
await server.register(swagger, {
  openapi: {
    openapi: '3.0.0',
  },
});

server.get(
  '/some-route',
  {
    schema: {
      response: {
        200: {
          headers: headersSchema,
          content: {
            'application/json': {
              schema: responseSchema,
            },
          },
        },
        201: {
          headers: headersSchema,
          content: {
            'application/json': {
              schema: responseSchema,
            },
          },
        },
      },
    },
  },
  (req, reply) => {},
);

await server.ready();

console.log(headersSchema);

const spec = server.swagger();

console.log(headersSchema);
