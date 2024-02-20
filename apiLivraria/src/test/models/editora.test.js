import { describe, expect, it } from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo Editora', () => {
  const ObjetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com'
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(ObjetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(ObjetoEditora)
    );
  });
  
  it.skip('Deve salvar editora no BD', () => {
    const editora = new Editora(ObjetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it('Deve salvar no BD usando a sintaxe moderna', async () => {
    const editora = new Editora(ObjetoEditora);
    const dados = await editora.salvar();

    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...ObjetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    )
  })
  
});
