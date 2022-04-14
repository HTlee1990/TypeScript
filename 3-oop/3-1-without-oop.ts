{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_GRAMM_PER__SHOT: number = 7;
  let coffeeBeansGram: number = 30;
  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeansGram < shots * BEANS_GRAMM_PER__SHOT) {
      throw new Error('Not Enough Coffee Beans!');
    }
    coffeeBeansGram -= shots * BEANS_GRAMM_PER__SHOT;

    return {
      shots,
      hasMilk: false,
    };
  }

  const coffee = makeCoffee(2);
  console.log(coffee);
}

/////////////////////////////////////////////////////

type Muscle = {
  muscles: number;
  fatigability: number;
};

let muscles = 0;
let fatigability = 50;
let deltaPerHour = 10;
function workout(hours: number): Muscle {
  if (fatigability >= 100) {
    console.log('Too Tired to Workout! Need to Rest!');
  }

  muscles += hours * deltaPerHour;
  fatigability -= hours * deltaPerHour;

  return {
    muscles,
    fatigability,
  };
}
