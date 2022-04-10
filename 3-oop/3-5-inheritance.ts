/**
 * 복잡한 내부를 보여줘서 사용자가 사용하기 힘들게 하는 것이 아니라,
 * 간단하게 이용 가능하도록 해주자
 * private을 통해 추상화를 얻을 수 도 있지만,
 * interface를 통해서도 얻을 수 잇다.
 */

import e from 'cors';

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //Interface는 계약서 같은 역할을 한다.
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //클래스 CoffeeMachine은 CoffeeMaker 인터페이스를 구현해야 한다. 즉, interface에 정의된 makeCoffee 메소드를 구현해야 한다는 것
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER__SHOT: number = 7;
    private coffeeBeansGram: number = 0; // instance (object) level

    public constructor(coffeeBeans: number) {
      this.coffeeBeansGram = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeansGram += coffeeBeans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeansGram < shots * CoffeeMachine.BEANS_GRAMM_PER__SHOT) {
        throw new Error('Not Enough Coffee Beans!');
      }
      this.coffeeBeansGram -= shots * CoffeeMachine.BEANS_GRAMM_PER__SHOT;
    }

    private preheat() {
      console.log('heating up...');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    clean(): void {
      console.log('cleaning the machine...');
    }
  }

  //만약, 생성자를 private으로 하게 되면, 상속이 불가능하게 된다.
  //public으로 하거나 상속하는 클래스에서만 사용가능하도록 protected로 설정해도 된다.
  class CoffeeLatteMachine extends CoffeeMachine {
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    private steamMilk(): void {
      console.log('Steaming some milk...');
    }
    makeCoffee(shots: number): CoffeeCup {
      //자식 클래스에서 상속받은 클래스를 이용하고 싶다면 super를 이용하자
      const coffee = super.makeCoffee(shots);
      this.steamMilk();

      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  const machine = new CoffeeMachine(30);
  const latteMachine = new CoffeeLatteMachine(40, 'SSS');
  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee);
  console.log(latteMachine.serialNumber);
}
