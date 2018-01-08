import * as External2 from './external2';

export {
  function1,
  function2,
}

const function1 = () =>
  console.log('external1 function1');

const function2 = () =>
  console.log('external1 function2', External2.function1);

