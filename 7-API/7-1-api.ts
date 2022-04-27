type Student = {
  passed: boolean;
};

const students: Student[] = [
  { passed: true },
  { passed: true },
  { passed: true },
  { passed: true },
];

const result = students.every((student) => student.passed);
console.log(result);

class Animal {}
class Cat extends Animal {
  isCat: boolean = true;
}
class Dog extends Animal {
  isDog: boolean = false;
}

const animals: Animal[] = [new Cat(), new Cat(), new Cat()];

function isCat(animal: Animal): animal is Cat {
  //만약 isCat이라는 메소드가 있다면, undefined가 아니라면, Cat이라는 뜻
  return (animal as Cat).isCat !== undefined;
}
console.log(animals.every<Cat>(isCat));
