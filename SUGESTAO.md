Aqui está um plano detalhado para conectar a aplicação ao seu banco de dados Supabase de forma segura e estruturada, utilizando as informações que você forneceu. Este plano foi projetado para que possamos consultar o MCP do Supabase em cada etapa para garantir que não haja problemas.

Plano de Integração com Supabase

Fase 1: Configuração Segura do Ambiente

1.
Criar Arquivo de Ambiente (.env):

Ação: Criar um arquivo .env na raiz do projeto apps/admin-panel.
Conteúdo: Adicionar as chaves da API do Supabase a este arquivo para evitar expô-las no código-fonte.
PlainText



VITE_SUPABASE_URL=https://jgpejuslqudqmkbiryak.supabase.coVITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncGVqdXNscXVkcW1rYmlyeWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNjI2MzEsImV4cCI6MjA2OTczODYzMX0._pO5aYGvZkE0_CDhsmM9h8gYG_gtIceWHf2BMe_RIP4
Verificação com MCP: Podemos confirmar se o Vite está configurado para ler variáveis de ambiente com o prefixo VITE_.
2.
Atualizar .gitignore:

Ação: Adicionar a linha *.env ao arquivo .gitignore na raiz do projeto.
Objetivo: Garantir que o arquivo com as chaves secretas nunca seja enviado para o repositório Git.
Verificação com MCP: Não aplicável, é uma ação local do Git.
Fase 2: Inicialização do Cliente Supabase

1.
Criar Cliente Supabase Centralizado:
Ação: Criar um novo arquivo em packages/services/supabase/client.ts.
Objetivo: Configurar e exportar uma única instância do cliente Supabase para ser usada em toda a aplicação. Isso centraliza a configuração e facilita a manutenção.
Código de Exemplo:
TypeScript



import { createClient } from '@supabase/supabase-js';const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;if (!supabaseUrl || !supabaseAnonKey) {  throw new Error('Supabase URL   and Anon Key must be defined   in .env file');}export const supabase = createClient(supabaseUrl, supabaseAnonKey);
Verificação com MCP: Podemos usar o MCP para search_docs e encontrar a documentação mais recente sobre how to initialize the client (createClient) para garantir que estamos usando as melhores práticas.
Fase 3: Refatoração dos Serviços de API

1.
Analisar e Substituir Mocks:

Ação: Investigar os diretórios em packages/services e apps/admin-panel/src/hooks para identificar onde os dados falsos (mocks) ou a lógica de API antiga estão sendo usados (ex: useAdminAuth.tsx).
Objetivo: Mapear todas as chamadas de dados que precisam ser substituídas por chamadas reais ao Supabase.
2.
Implementar Serviços Reais:

Ação: Modificar ou criar novos serviços (ex: packages/services/auth/adminService.ts) que importam o supabase client e implementam a lógica de comunicação com o banco de dados.
Exemplo (Autenticação):
TypeScript



import { supabase } from '../supabase/client';export const signInWithPassword = async (email, password) => {  const { data, error } = await   supabase.auth.signInWithPassword  ({    email: email,    password: password,  });  return { data, error };};
Verificação com MCP: Para cada tabela que vamos acessar (users, investments, etc.), podemos usar list_tables para confirmar o nome exato e get_advisors com o tipo security para verificar se a tabela possui RLS (Row Level Security) ativada e se há políticas de acesso recomendadas.
Fase 4: Integração com a Interface do Usuário (UI)

1.
Conectar Componentes aos Novos Serviços:
Ação: Atualizar os componentes React e hooks para que chamem os novos serviços da API do Supabase em vez dos mocks.
Exemplo (Formulário de Login): O componente AdminLoginForm.tsx passaria a chamar a função signInWithPassword do nosso novo serviço de autenticação.
Objetivo: Fazer com que a aplicação leia e escreva dados do banco de dados real.
Fase 5: Verificação e Segurança Contínua com MCP

1.
Consultar Logs:
Ação: Durante o desenvolvimento e teste, se encontrarmos erros, podemos usar get_logs no MCP para buscar logs específicos (api, postgres, auth) e depurar problemas em tempo real.
2.
Gerar Tipos TypeScript:
Ação: Após definir o esquema do banco de dados, podemos usar generate_typescript_types para criar automaticamente as definições de tipo para nossas tabelas. Isso garante que nosso código front-end esteja sempre sincronizado com a estrutura do banco de dados, evitando erros.
Este plano nos permite avançar de forma incremental e segura. Por favor, revise e me diga se está de acordo para que possamos começar com a primeira fase.