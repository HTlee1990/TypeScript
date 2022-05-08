const x = {};
const y = {};
console.log(x);
console.log(y);
console.log(x.__proto__ === y.__proto__);

const array = [];
console.log(array);

function CooffeeMacine(beans) {
  this.beans = beans;
  //Instance member level
  //   this.makeCoffee = (shots) => {
  //     console.log('making coffe...');
  //   };
}
//Prototype member level
CooffeeMacine.prototype.makeCoffee = (shots) => {
  console.log('making coffe...');
};

const machine1 = new CooffeeMacine(10);
const machine2 = new CooffeeMacine(20);
console.log(machine1);
console.log(machine2);

function LatteeMachine(milk) {
  this.milk = milk;
}

LatteeMachine.prototype = Object.create(CooffeeMacine.prototype);

const latteMachine = new LatteeMachine(123);
console.log(latteMachine);

latteMachine.makeCoffee();

//결국 상속과 재사용을 위해 사용하는 것.
