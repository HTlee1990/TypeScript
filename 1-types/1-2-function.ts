// 💩💩

{
  // //js💩
  // function jsAdd(num1, num2) {
  //   return num1 + num2;
  // }

  // //ts
  // function tsAdd(num1: number, num2: number): number {
  //   return num1 + num2;
  // }

  // //js 💩
  // function jsFetcNum(id) {
  //   //code...
  //   //code...
  //   //code...
  //   //code...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }
  // //ts
  // function tsFetcNum(id: string): Promise<number> {
  //   //code...
  //   //code...
  //   //code...
  //   //code...
  //   return new Promise((resolve, reject) => {
  //     resolve(100);
  //   });
  // }

  //JavaScript => TypeScript
  //Optional parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName('mark', 'lee');
  printName('mark');
  printName('mark', undefined);

  //default parameter;
  function printMessage(message: string = 'there is no message') {
    console.log(message);
  }

  printMessage();
  printMessage('there is a message');

  //Rest parameter
  function addNembers(...numbers: number[]): number {
    return numbers.reduce((a: number, c: number) => a + c, 0);
  }
  console.log(addNembers(1, 2, 3, 4));
  console.log(addNembers(1, 2, 3, 4, 5, 6, 7, 1, 2));
  console.log(addNembers(1, 2, 3, 4, 9, 128));
}
