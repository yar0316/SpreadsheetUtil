function myFunction() {
  const array = [0,1,2,3,4,5];
  array.forEach(function(number){
    Logger.log(number)
  });
}

function arrayTest(){
  var array = new Array(3);
  array.push(2);
  Logger.log(array[0]);
}