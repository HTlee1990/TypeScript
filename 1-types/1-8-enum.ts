{
  /**
   * Enum
   */
  //JavaScript에는 없음.
  //JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_OF_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_OF_ENUM.TUESDAY;

  //TypeScript -> 사용 권하지 않음. 단, 모바일과 웹이 소통해야 하는 경우에만 제한적으로 사용
  enum Days {
    Monday = 1, //0
    Tuesday, // 1
    Wednesday, //2
    Thursday, //3
    Friday, //4
    Saturday, //5
    Sunday,
  }
  //아무것도 할당하지 않으면, 0부터 하나씩 증가하게 된다. 숫자를 입력(e.g. 1)해준다면 1부터 하나씩 증가한다.
  //문자열로도 할당 가능하다.
  console.log(Days.Monday);
  let day: Days = Days.Saturday;
  //아래처럼 내맘대로 할당이 가능하다.
  day = Days.Monday;
  day = 1;
  console.log(day);

  //Union Type을 사용하자
  type DaysOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';

  let dayOfWeek: DaysOfWeek = 'Tuesday';
  //아래처럼 정해진 값 이외에는 할 당 불가능
  //   dayOfWeek = 123
}
