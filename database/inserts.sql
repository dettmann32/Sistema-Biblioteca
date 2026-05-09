-- =======================================================
-- INSERTS PARA POVOAR O BANCO
-- Ordem respeita as chaves estrangeiras
-- =======================================================

-- 1. TABELAS BASE
INSERT INTO area_conhecimento (descricao) VALUES
('Ciência da Computação'),
('Matemática'),
('Engenharia'),
('Literatura'),
('História');

INSERT INTO editora (nome) VALUES
('Pearson'),
('Atlas'),
('Campus'),
('Saraiva'),
('Moderna');

INSERT INTO autor (nome) VALUES
('Robert C. Martin'),
('Martin Fowler'),
('Donald E. Knuth'),
('Andrew S. Tanenbaum'),
('Michael T. Goodrich');

INSERT INTO funcionario (nome, cargo) VALUES
('Carlos Silva', 'Bibliotecário'),
('Ana Oliveira', 'Atendente'),
('Fernanda Souza', 'Auxiliar'),
('Rafael Costa', 'Bibliotecário'),
('Juliana Pereira', 'Estagiária');

INSERT INTO aluno (matricula, nome, email, telefone, status_bloqueio) VALUES
('2020001', 'João Santos', 'joao@email.com', '11999990001', 0),
('2020002', 'Maria Souza', 'maria@email.com', '11999990002', 0),
('2020003', 'Pedro Lima', 'pedro@email.com', '11999990003', 1),
('2020004', 'Ana Costa', 'ana.costa@email.com', '11999990004', 0),
('2020005', 'Lucas Pereira', 'lucas@email.com', '11999990005', 0),
('2020006', 'Juliana Alves', 'juliana@email.com', '11999990006', 0),
('2020007', 'Roberto Dias', 'roberto@email.com', '11999990007', 1),
('2020008', 'Carla Nogueira', 'carla@email.com', '11999990008', 0);

-- 2. ACERVO

INSERT INTO livro (isbn, titulo, ano_publicacao, id_editora, id_area) VALUES
('9780132350884', 'Código Limpo', 2009, 1, 1),
('9788577807008', 'Arquitetura Limpa', 2017, 1, 1),
('9788566250031', 'Refatoração', 2020, 3, 1),
('9788574527812', 'Algoritmos', 2012, 2, 2),
('9788582603989', 'Redes de Computadores', 2021, 1, 1),
('9788592603410', 'Cálculo I', 2015, 5, 2),
('9788521111111', 'Introdução à Engenharia', 2018, 4, 3),
('9788522222222', 'Dom Casmurro', 1899, 4, 4),
('9788523333333', 'História do Brasil', 2020, 5, 5),
('9788524444444', 'Estruturas de Dados', 2019, 3, 1);

INSERT INTO livro_autor (id_livro, id_autor) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 3);

INSERT INTO exemplar (codigo_barras, condicao, id_livro) VALUES
('BAR001', 'Novo', 1),
('BAR002', 'Bom', 1),
('BAR003', 'Novo', 2),
('BAR004', 'Regular', 3),
('BAR005', 'Novo', 4),
('BAR006', 'Bom', 4),
('BAR007', 'Novo', 5),
('BAR008', 'Bom', 6),
('BAR009', 'Novo', 7),
('BAR010', 'Regular', 8),
('BAR011', 'Novo', 9),
('BAR012', 'Bom', 10);

-- 3. MOVIMENTAÇÃO

INSERT INTO emprestimo (data_emprestimo, data_devolucao_prevista, data_devolucao_real, valor_multa, id_aluno, id_exemplar, id_funcionario) VALUES
('2026-05-01', '2026-05-08', NULL, 0.00, 1, 1, 1),
('2026-05-02', '2026-05-09', '2026-05-07', 0.00, 2, 3, 1),
('2026-05-03', '2026-05-10', NULL, 0.00, 4, 5, 2),
('2026-04-20', '2026-04-27', '2026-04-30', 7.50, 5, 2, 3),
('2026-05-05', '2026-05-12', NULL, 0.00, 6, 7, 2),
('2026-04-15', '2026-04-22', '2026-04-22', 0.00, 2, 9, 1);

INSERT INTO reserva (data_reserva, status, id_aluno, id_livro) VALUES
('2026-05-06', 'Aguardando', 3, 1),
('2026-05-07', 'Aguardando', 5, 5),
('2026-05-08', 'Atendida', 1, 3),
('2026-05-08', 'Cancelada', 8, 2);
