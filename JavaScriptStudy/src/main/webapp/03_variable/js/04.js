const a = 100;
const b = "100";

console.log("a 값 =>", a);  // a 값 => 100
console.log("b 값 =>", b);  // b 값 => 100

console.log("변수 a 타입 =>", typeof(a));   // 변수 a 타입 => number
console.log("변수 b 타입 =>", typeof(b));   // 변수 b 타입 => string
// ◆ typeof(변수) => typeof 변수 도 가능하다. ◆

console.log("---------------------------------");

if(a==b){   // == 은 값만 비교하는 것이다.
    console.log('변수a 와 변수 b 의 값은 같습니다.');
}
else{
    console.log('변수a 와 변수 b 의 값은 같지 않습니다.');
}

console.log("----------------------");

if(a===b){  // === 은 데이터타입 및 값 모두 비교하는 것이다.
    console.log('변수a 와 변수 b 는 데이터타입도 같으며 값도 같습니다.');
}
else{
    console.log('변수a 와 변수 b 는 데이터타입이 같지 않든지, 또는 값이 같지 않습니다.');
}