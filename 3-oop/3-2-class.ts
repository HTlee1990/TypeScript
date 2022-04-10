import e from 'cors';

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    //class 내부 멤버변수
    //만약 아래처럼 그냥 멤버변수로 선언하게 되면 -> 메모리 낭비가 될 수 있다.
    //cuz 새로운 인스턴스 생성할 때 마다 새롭게 데이터 생성됨
    static BEANS_GRAMM_PER__SHOT: number = 7; // class level =>  object마다 생성되지 않는다. class레벨에 이미 고정되어 있는것.
    coffeeBeansGram: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      this.coffeeBeansGram = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeansGram < shots * CoffeeMaker.BEANS_GRAMM_PER__SHOT) {
        throw new Error('Not Enough Coffee Beans!');
      }
      this.coffeeBeansGram -= shots * CoffeeMaker.BEANS_GRAMM_PER__SHOT;

      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(32);
  console.log(maker);
  const maker2 = new CoffeeMaker(14);
  console.log(maker2);
  const maker3 = CoffeeMaker.makeMachine(3);
  console.log(maker3);

  // e.g. Math -> Math를 선언한지 않았음에도, Math.abs 와 같이 사용가능 한 것은 Math안에 있는 static method 이기 때문이다.
  // Math.abs
  // Math.PI
}
