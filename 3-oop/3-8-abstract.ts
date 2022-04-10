/**
 * abstract
 * CoffeeMachine 을 상속받은 다른 클래스들에서 makeCoffee함수를 실행할 때,
 * super.makeCoffee(shots); 를 통해 커피를 만들어야 하지만,
 * 단순히 바로 makeCoffee(shots) 할 수도 있다.
 * 이러한 경우를 미연에 방지하기 위해
 * coffeeMachine앞에 abstract를 붙일 수 있다. 이렇게 되면 더이상 coffeemachine만으로는 오브젝트를 만들 수가 없다.
 *
 * 구현하는 클래스마다 달라져야 하는 부분이 있다면 abstract method로 접근 할 수 있다.
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  //Interface는 계약서 같은 역할을 한다.
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //클래스 CoffeeMachine은 CoffeeMaker 인터페이스를 구현해야 한다. 즉, interface에 정의된 makeCoffee 메소드를 구현해야 한다는 것
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER__SHOT: number = 7;
    private coffeeBeansGram: number = 0; // instance (object) level

    public constructor(coffeeBeans: number) {
      this.coffeeBeansGram = coffeeBeans;
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

    protected abstract extract(shots: number): CoffeeCup;

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

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(beans: number, public sugars: number) {
      super(beans);
    }
    pourSugar(sugar: number = 2) {
      console.log(`pouring sugar ${sugar} spoons...`);
      this.sugars -= sugar;
    }
    protected extract(shots: number): CoffeeCup {
      this.pourSugar(2);
      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: CoffeeMaker[] = [
    new CoffeeLatteMachine(40, 'SSS'),
    new SweetCoffeeMaker(40, 10),

    new CoffeeLatteMachine(40, 'SSS'),
    new SweetCoffeeMaker(40, 10),

    new CoffeeLatteMachine(40, 'SSS'),
    new SweetCoffeeMaker(40, 10),
  ];

  machines.forEach((machine) => {
    console.log('-----------------------------');
    machine.makeCoffee(1);
  });
}
