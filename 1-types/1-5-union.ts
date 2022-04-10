{
  /**
   * Union Types: OR
   */

  type Direction = 'left' | 'right' | 'up' | 'down';

  function move(direction: Direction) {
    console.log(direction);
  }
  move('down');

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  //function : login -> success , fail

  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };

  type LoginState = SuccessState | FailState;
  function login(): Promise<LoginState> {
    return new Promise((resolve, reject) => {
      resolve({
        response: {
          body: 'login!',
        },
      });
    });
  }

  //printLoginState(state)
  //success -> body with congrats!
  //fail -> reason
  function printLoginState(state: LoginState) {
    if ('response' in state) {
      console.log(state.response.body);
    } else {
      console.log(state.reason);
    }
  }
}
