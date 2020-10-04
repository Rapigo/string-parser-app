import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'string-parser-app';
  result:any = 'Please enter string in input field and click validate';
  validateString(input:string) {
    this.result = isValid(input);
  }
}

function isValid(input:string) {
  var result:any = input;
  var openCount = 0 ;
  var closeCount = 0 ;
  for(var i = 0; i<input.length; i++){
    if(input.charAt(i)=='('){
      openCount++ ;
    }
    if(input.charAt(i)==')'){
      closeCount++ ;
    }
    if(closeCount>openCount){
      closeCount = 1 ;
      openCount = 0 ;
      break ;
    }
  }
  if(openCount!=closeCount){
    result = "syntax invalid" ;
  }
  else{
    var mainObj = new Object() ;
    result = findValid(input, 0, input.length-1, mainObj) ;
  }
  var queryObj:any = new Object() ;
  queryObj.query = result ;
  return JSON.stringify(queryObj, null, " ");
}

function findValid(input:string, firstIndex:number, lastIndex:number, mainObj:any){
  var result = input ;
  if(input.charAt(firstIndex)!='('){
    var indexOfAndOr = firstIndex ;
    for(; indexOfAndOr<=lastIndex; indexOfAndOr++){
      if(input.charAt(indexOfAndOr)=='&'||input.charAt(indexOfAndOr)=='|'){
        break ;
      }
    }
    if(indexOfAndOr<lastIndex){
      var indexOfEqual = firstIndex ;
      for(; indexOfEqual<indexOfAndOr; indexOfEqual++){
        if(input.charAt(indexOfEqual)=='='){
          break ;
        }
      }
      var myObj1 = input.substring(firstIndex, indexOfEqual) ;
      var myVal1 : number = +input.substring(indexOfEqual+1, indexOfAndOr) ;
      indexOfEqual = indexOfAndOr ;
      for(; indexOfEqual<lastIndex; indexOfEqual++){
        if(input.charAt(indexOfEqual)=='='){
          break ;
        }
      }
      var myObj2 = input.substring(indexOfAndOr+2, indexOfEqual) ;
      var myVal2 : number = +input.substring(indexOfEqual+1, lastIndex+1) ;
      if(input.charAt(indexOfAndOr)=='&'){
        var myNewObj = new Object() ;
        myNewObj[myObj1] = myVal1 ;
        myNewObj[myObj2] = myVal2 ;
        mainObj.and = myNewObj ;
      }
      else{
        var myNewObj = new Object() ;
        myNewObj[myObj1] = myVal1 ;
        myNewObj[myObj2] = myVal2 ;
        mainObj.or = myNewObj ;
      }
    }
  }
  else{
    var openCount = 0 ;
    var closeCount = 0 ;
    var closeIndex = firstIndex ;
    for(var i = firstIndex; i<=lastIndex; i++){
      if(input.charAt(i)=='('){
        openCount++ ;
      }
      if(input.charAt(i)==')'){
        closeCount++ ;
      }
      if(openCount==closeCount){
        closeIndex = i ;
        break ;
      }
    }
    if(closeIndex==lastIndex){
      mainObj = findValid(input, firstIndex+1, lastIndex-1, mainObj) ;
    }
    else{
      var input1 = input.substring(firstIndex+1, closeIndex) ;
      var input2 = input.substring(closeIndex+4, lastIndex) ;
      var obj1:any = new Object() ;
      obj1 = findValid(input1, 0, input1.length-1, obj1) ;
      var obj2:any = new Object() ;
      obj2 = findValid(input2, 0, input2.length-1, obj2) ;
      if(input.charAt(closeIndex+1)=='&'){
        mainObj.and = [] ;
        mainObj.and.push(obj1) ;
        mainObj.and.push(obj2) ;
      }
      else{
        mainObj.or = [] ;
        mainObj.or.push(obj1) ;
        mainObj.or.push(obj2) ;
      }
    }
  }
  return mainObj ;
}