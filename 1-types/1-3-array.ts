{
  //Array
  const fruits: string[] = ['100', '97'];
  const scores: Array<number> = [1, 2, 3];

  //둘다 매우 흡사하지만 유일한 차이점은 readonly 가능 여부
  function printArray(sth: readonly string[]) {
    console.log(sth);
  }

  // 아래 주석처리된 코드는 에러 발생
  //   function printArray2(sth: readonly Array<number>) {
  //     console.log(sth);
  //   }

  //Tuple 배열은 배열이지만, 여러가지 타입을 가질 수 있는 배열 -> 권장하지 않음 -> interface || type alias || class로 사용하자
  let student: [string, number];
  student = ['htae', 123];
  student[0]; // 💩 인덱스 접근은 매우 가독성이 떨어짐
  student[1]; // 💩

  //가독성을 높이고 싶다면,
  const [name, age] = student;

  //React 에서 자주 사용하는 Tuple 형태 -> 동적으로 리턴하는데, 클래스나 인터페이스로 리턴하기 힘든 경우에만, tuple 사용하자
  //   const [count, setCount] = useState(0);
}
