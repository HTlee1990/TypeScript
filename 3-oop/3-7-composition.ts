/**
 * 상속은 한번만 된다. 여러개를 상속 할 수는 없다.
 * Favor Composition Over inheritance
 *
 * 하지만 아래처럼 너무 긴밀하게 composition되어 있는 것 좋지 못하다.
 * 만약, CheapMilkSteamer나 CandySugarMixer class가 변경이 된다면
 * 그에 따라 모든 클래스들을 다 update 해줘야 한다.
 *
 * -> 즉, 클래스들 간의 관계를 너무 타이트하게 커플링이 되어잇으면 안된다.
 */

import e from 'cors';

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
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER__SHOT: number = 7;
    private coffeeBeansGram: number = 0; // instance (object) level

    public constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
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
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }

    clean(): void {
      console.log('cleaning the machine...');
    }
  }

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  //싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log('Cheap Steaming some milk...');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log('Fancy Steaming some milk...');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log('Cold Steaming some milk...');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  //설탕 제조기
  class CandySugarMixer implements SugarProvider {
    private getSugar(): boolean {
      console.log('getting some sugar from candy');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class SugarMixer implements SugarProvider {
    private getSugar(): boolean {
      console.log('getting some sugar from jar');
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }
  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  //milk
  const cheapMilkSteamer = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();
  const noMilk = new NoMilk();

  //sugar
  const candySugar = new CandySugarMixer();
  const jarSugar = new SugarMixer();
  const noSugar = new NoSugar();

  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, jarSugar);
  //만약, 더 좋은 우유 거품기를 사서 라떼 머신에 적용하려고 하더라도 적용이 불가능하다.
  //클래스 자체로 서로 의사소통을 하게 된다면 재사용성이 매우 떨어짐
  // interface를 통해서 decoupling 할 수 있다.
  const latteMachine = new CoffeeMachine(12, cheapMilkSteamer, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, fancyMilkSteamer, noSugar);
  const sweetLatteMachine = new CoffeeMachine(12, fancyMilkSteamer, jarSugar);
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

  interface Treadmill {
    run(
      mins: number,
      muscles: number,
      fatigability: number,
      deltaPerHour: number
    ): Record<keyof GymMember, number>;
  }

  class Gym implements GymNewbie {
    protected muscles = 0;

    constructor(
      protected fatigability: number,
      protected deltaPerHour: number,
      private treadmill: Treadmill
    ) {}

    get currentState(): GymMember {
      return { muscles: this.muscles, fatigability: this.fatigability };
    }

    private backWorkOut() {
      console.log('working out back');
    }
    private chestWorkOut() {
      console.log('working out chest');
    }
    private legsWorkOut() {
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
      return this.treadmill.run(
        hours * 60,
        this.muscles,
        this.fatigability,
        this.deltaPerHour
      );
    }
  }

  class NoRunning implements Treadmill {
    run(
      mins: number,
      muscles: number,
      fatigability: number,
      deltaPerHour: number
    ): Record<keyof GymMember, number> {
      console.log('no need to run');
      return { fatigability, muscles };
    }
  }
  class Running implements Treadmill {
    run(
      mins: number,
      muscles: number,
      fatigability: number,
      deltaPerHour: number
    ): Record<keyof GymMember, number> {
      console.log('running...🏃💨');
      fatigability += deltaPerHour * (mins / 60);
      muscles += deltaPerHour * (mins / 60);
      return { fatigability, muscles };
    }
  }

  //running coach
  const skinnyOne = new NoRunning();
  const fatOne = new Running();

  const mark = new Gym(10, 5, fatOne);
  const gadot = new Gym(10, 5, skinnyOne);

  console.log('------------------------------');
  console.log(mark.currentState);
  mark.workout(2);
  console.log(mark.currentState);
  console.log('------------------------------');
  console.log(gadot.currentState);
  gadot.workout(2);
  console.log(gadot.currentState);
}
