interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay(): void {
    console.log('Full Time!');
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay(): void {
    console.log('Part Time!');
  }
  workPartTime() {}
}

//세부적인 타입을 인자로 받아서, 정말 추상적인 타입으로 다시 리턴하는 함수는 똥이다!!!
//함수는 좀더 세부적으로 만들어야지 다시 추상적으로 만들면 절대 절대 안된다!
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

function pay<T extends Employee>(employee: T): T {
  //그냥 사용하면 pay는 T에 없는 메소드라는 에러가 나온다. 이때 extends를 사용하여 제한을 걸 수 잇다.
  employee.pay();
  return employee;
}

const mark = new FullTimeEmployee();
const bob = new PartTimeEmployee();

mark.workFullTime();
bob.workPartTime();

//pay 함수가 리턴 하는 값은 FullTimeEmployee나 PartTimeEmployee가 아니라 그냥 Employee가 되게 된다. 즉, 원래 FullTime이었던 것을 잃어 버리게 된다.
//이를 극복하기 위해 as를 사용할 수도 있지만 사용을 자제하는 것이 필요하다.
const markAfterPay = pay(mark); // as FullTimeEmployee
const bobAfterPay = pay(bob);

//markAfterPay는 pay 메소드만 사용이 가능하다. not workFullTime
markAfterPay.workFullTime();

const obj = {
  name: 'mark',
  age: 20,
};
const obj2 = {
  animal: 'dog',
};

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

console.log(getValue(obj, 'name')); //mark
console.log(getValue(obj, 'age')); //20
console.log(getValue(obj, 'name')); // dog
