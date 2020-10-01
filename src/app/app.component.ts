import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'string-parser-app';
  result = 'Please enter string in input field and click validate';
  validateString(input:string) {
    this.result = isValid(input);
  }
}

function isValid(input:string) {
  var res:string = input;
  var ocount = 0 ;
  var ccount = 0 ;
  for(var i = 0; i<input.length; i++){
    if(input.charAt(i)=='('){
      ocount++ ;
    }
    if(input.charAt(i)==')'){
      ccount++ ;
    }
    if(ccount>ocount){
      ccount = 1 ;
      ocount = 0 ;
      break ;
    }
  }
  if(ocount!=ccount){
    res = "syntax invalid" ;
  }
  else{
    /*input = "(" + input + ")" ;
    var re = /=/gi ;
    input = input.replace(re, ":") ;
    res = input ;
    var oindex = 0 ;
    var cindex = 0 ;
    while(oindex!=0&&cindex!=input.length-1){

    }*/
  }
  return res;
}