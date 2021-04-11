import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
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
      server.createList('user', 10) // Criar 10 dos dados da factory escolhida
    },

    routes() {
      this.namespace = 'api'; // Caminho para a chamada de rotas. 'api' pois usamos Next
      this.timing = 750; // 750 milisegundos para ocorrer requisição (Delay)

      this.get('/users'); // Entende que quando chamar a rota, deve pegar a lista completa de users
      this.post('/users'); // Cria automaticamente um novo user, passando os dados corretos

      this.namespace = ''; // Volta para nada, pois assim não interfere nas rotas do Next
      this.passthrough(); // Se a rota atual não for detectada pelo Mirage, passe ela para os outros
    }
  })

  return server;
}