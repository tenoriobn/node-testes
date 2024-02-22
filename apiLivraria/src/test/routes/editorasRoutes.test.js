import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import request from "supertest";

import app from "../../app.js"

let server;

beforeEach(() => {
  const port = 4000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;
describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: "CDC",
        cidade: "São Paulo",
        email: "s@s.com"
      })
      .expect(201);

      idResposta = resposta.body.content.id;
  });  
});

describe('DELETE em /editores/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('GET em /editores/id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});