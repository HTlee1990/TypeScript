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
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  //클래스 CoffeeMachine은 CoffeeMaker 인터페이스를 구현해야 한다. 즉, interface에 정의된 makeCoffee 메소드를 구현해야 한다는 것
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER__SHOT: number = 7;
    private coffeeBeansGram: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
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

  //   const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  //   maker.fillCoffeeBeans(40);
  //   console.log(maker);
  //   const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);
  //   //interface에 없는 함수는 사용이 불가능하다!!!
  //   maker2.fillCoffeeBeans(40);
  //   maker2.clean();
  //   console.log(maker2);

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}

    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  //동일한 클래스의 인스턴스 일지라도, 해당 클래스가 두개의 interface를 구현하고 있기에
  //다르게 지정할 수 있다.
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(maker);
  const barista = new ProBarista(maker);

  //   amateur.makeCoffee();
  barista.makeCoffee();
}

//////////////////////////////////////////////////////
{
  type GymMember = {
    muscles: number;
    fatigability: number;
  };

  interface GymNewbie {
    workout(hours: number): GymMember;
    currentState: GymMember;
  }
  interface GymPro {
    workout(hours: number): GymMember;
    backWorkOut(): void;
    chestWorkOut(): void;
    legsWorkOut(): void;
  }

  class Gym implements GymNewbie, GymPro {
    private muscles = 0;

    constructor(private fatigability: number, private deltaPerHour: number) {}

    get currentState(): GymMember {
      return { muscles: this.muscles, fatigability: this.fatigability };
    }

    backWorkOut() {
      console.log('working out back');
    }
    chestWorkOut() {
      console.log('working out chest');
    }
    legsWorkOut() {
      console.log('working out legs');
    }

    workout(hours: number): GymMember {
      if (this.fatigability >= 100) {
        console.log('Too Tired to Workout! Need to Rest!');
      }
      this.backWorkOut();
      this.chestWorkOut();
      this.legsWorkOut();
      this.muscles += hours * this.deltaPerHour;
      this.fatigability += hours * this.deltaPerHour;

      return {
        muscles: this.muscles,
        fatigability: this.fatigability,
      };
    }
  }

  const mark: GymNewbie = new Gym(30, 20);
  const gadot: GymPro = new Gym(80, 5);
  console.log(mark.currentState);
  mark.workout(2);
  console.log(mark.currentState);
}
