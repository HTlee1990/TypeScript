//누가 호출했느냐. 호출한 문맥에 따라서 this가 결정되게 된다.
console.log(this); //window

function simpleFunc() {
  console.log(this);
}

simpleFunc();
console.clear();
class Counter {
  count = 0;
  //arrow function을 이용하게 되면, 해당 함수는 선언될 당시의 this를 기억하게 되고,
  //bind를 해주지 않아도 되는 것이다.
  increase = () => {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase();
const caller = counter.increase;
// const caller = counter.increase.bind(counter);
caller();
//function을 선언하게 되면, 글로벌 객체, 즉 window에 등록되게 되고 언제든지 window.func와 같은 방식으로
//사용이 가능하다.
//하지만, const let과 같은 값들은 window객체에 등록되지 않게 된다.
//글로벌 적으로 선언한 변수들은 global적으로 바로바로 접근이 가능하다.
//함수는 글로벌 객체에 등록이 되기 때문에, window에서도 접근이 가능한것.

//단, var의 경우에는 window에 등록이 되게 된다. 호이스팅문제 + 재정의 문제 등이 생긴다.

class Bob {}

const bob = new Bob();
bob.run = counter.increase;
bob.run();
