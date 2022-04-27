{
  class TimeOutError extends Error {}
  class OfflineError extends Error {}

  class NetworkClient {
    tryConnect(): void {
      throw new Error('no network!');
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      this.client.tryConnect();
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);

  class App {
    constructor(private userService: UserService) {}

    run() {
      try {
        this.userService.login();
      } catch (error) {
        //만약 error 타입을 알 수 있다면 아래처럼 처리 할 수 있겠지만,
        // if(error instanceof OfflineError){}
        //error가 catch문에서 잡히게 되면, any type이 되면서 타입정보가 모두 사라지게 된다.

        //show dialog to user 와 같은 우아하게 에러처리가 가능한 곳에서 catch를 사용하자.
        console.log(`I got error`);
      }
    }
  }

  const app = new App(service);
  app.run();
}
