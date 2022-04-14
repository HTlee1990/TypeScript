{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  //public
  //private -> 외부든, 상속받은 클래스에서든 모두 접근이 불가능하다
  //protected -> 외부에서는 접근이 불가능 하지만, 상속한 다른 클래스에서는 접근이 가능하다

  class CoffeeMaker {
    //class 내부 멤버변수
    //만약 아래처럼 그냥 멤버변수로 선언하게 되면 -> 메모리 낭비가 될 수 있다.
    //cuz 새로운 인스턴스 생성할 때 마다 새롭게 데이터 생성됨
    private static BEANS_GRAMM_PER__SHOT: number = 7; // class level =>  object마다 생성되지 않는다. class레벨에 이미 고정되어 있는것.
    //coffeeBeansGram은 오직 fillCoffeeBeans를 이용해서만 접근 가능
    private coffeeBeansGram: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeansGram = coffeeBeans;
    }

    //이렇게 새로운 생성자를 만드는 것을 static 메소드로 만든다는 것은, 생성자를 이용해 생성하는 것을 금지하기 위해 사용한다.
    //그렇기 때문에, constructor에 private을 붙여주자
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeansGram += coffeeBeans;
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

  const maker = CoffeeMaker.makeMachine(32);
  //이렇게 외부에서 설정 가능하면 위험 할 수 있다.
  //   maker.coffeeBeansGram = 3;
  //   maker.coffeeBeansGram = -33;
  console.log(maker);

  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }

    set age(num: number) {
      if (num < 0) {
        throw new Error('age should be greater than 0 ');
      }
      this.internalAge = num;
    }
    constructor(public firstName: string, private lastName: string) {}
  }

  const user = new User('steve', 'jobs');
  console.log(user);
  user.firstName = 'Mark';
  console.log(user.age);
  user.age = 6;
  console.log(user.age);
}

//////////////////////////////////////////////////////
{
  type GymMember = {
    muscles: number;
    fatigability: number;
  };

  class Gym {
    private muscles = 0;

    constructor(private fatigability: number, private deltaPerHour: number) {}

    get currentState(): GymMember {
      return { muscles: this.muscles, fatigability: this.fatigability };
    }

    workout(hours: number): GymMember {
      if (this.fatigability >= 100) {
        console.log('Too Tired to Workout! Need to Rest!');
      }

      this.muscles += hours * this.deltaPerHour;
      this.fatigability += hours * this.deltaPerHour;

      return {
        muscles: this.muscles,
        fatigability: this.fatigability,
      };
    }
  }

  const mark = new Gym(30, 20);
  const gadot = new Gym(80, 5);

  console.log(mark.currentState);
  mark.workout(2);
  console.log(mark.currentState);
}
