//Java: Exception;
//JavaScript: Error

//game.ts 컴파일시 바로 에러 뜨도록 하는 방법 참고

// const array = new Array(10000000000000000000000000000);

//Error(Exception) Handling: try -> catch -> finally

function readFile(fileName: string): string {
  if (fileName === 'not exist!') {
    throw new Error(`file not exist! ${fileName}`);
  }
  return 'file contents';
}
function closeFile(fileName: string) {
  //
}

function run() {
  const fileName = 'not exist!';
  //try는 정말 에러가 발생하는 부분에만 적용을 하자
  try {
    console.log(readFile(fileName));
  } catch (error) {
    console.log('catched!');
    return;
  } finally {
    //만약 catch에서 Return 문과 같이 종료되는 부분이 있다면, 관련된 로직은 finally에 넣어 주는 것이 좋다.
    closeFile(fileName);
    console.log(`finally!!`);

    closeFile(fileName);
    console.log('not dead');
  }
}

run();
