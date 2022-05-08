function Log(
  _: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log('before executed!');
  const newDescriptor = {
    ...descriptor,
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`);
      console.dir(args);
      console.dir('descriptor is', descriptor);
      const result = descriptor.value.apply(this, args);
      console.log(`Result:`);
      console.dir(result);
      return result;
    },
  };
  console.log('after defined!');

  console.log('newDescriptor', descriptor);
  return newDescriptor;
}

class Calculator {
  @Log
  add(x: number, y: number): number {
    console.log('inside of add');
    return x + y;
  }
}

const calculator = new Calculator();
console.log('after created!');
console.log(calculator.add(1, 2));

// function tog(target: any, name: string, descriptor: any): PropertyDescriptor {
//   console.log(
//     'before newDescriptor',
//     descriptor,
//     'target',
//     target,
//     'name',
//     name
//   );
//   const newDescriptor = {
//     ...descriptor,
//     value: function (...args: any[]): any {
//       console.log(`Calling ${name} with arguments:`);
//       console.dir(args);
//       const result = descriptor.value.apply(this, args);
//       console.log(`Result:`);
//       console.dir(result);
//       return result;
//     },
//   };

//   console.log('newDescriptor', descriptor);
//   return newDescriptor;
// }

// function add(x: number, y: number): number {
//   return x + y;
// }
// tog('', 'name', add);
