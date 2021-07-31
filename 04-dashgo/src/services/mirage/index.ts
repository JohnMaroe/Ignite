import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    
    models: {
      user: Model.extend<Partial<User>>({}) // <Partial>, não necessita ter todas as tipagens.
    },

    factories: { // Criação de dados em massa (por isso factory!)
      user: Factory.extend({ // Deve ter mesmo nome do que o Model correspondente
        name(i: number) {
          return `User ${i+1}` // Criação de usuários com nomes diferentes
        },
        email() {
          return faker.internet.email().toLowerCase(); // Gera e-mails fakes
        },
        createAt() {
          return faker.date.recent(10, new Date()); // Data recente a partir de hoje
        },
      })
    },

    seeds(server) { // Dados fícticios para não deixar a aplicação sem dados no ínicio
      server.createList('user', 200) // Criar 200 dos dados da factory escolhida
    },

    routes() {
      this.namespace = 'api'; // Caminho para a chamada de rotas. 'api' pois usamos Next
      this.timing = 750; // 750 milisegundos para ocorrer requisição (Delay)

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )
      }); // Entende que quando chamar a rota, deve pegar a lista completa de users

      this.get('/users/:id');
      this.post('/users'); // Cria automaticamente um novo user, passando os dados corretos

      this.namespace = ''; // Volta para nada, pois assim não interfere nas rotas do Next
      this.passthrough(); // Se a rota atual não for detectada pelo Mirage, passe ela para os outros
    }
  })

  return server;
}