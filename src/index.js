module.exports = function check(str, bracketsConfig) {
  var sLength = str.length;
  // odd-parity check 
  if( sLength % 2 != 0 ){
    return false;
  }

  var count = 0, stack = [], positionBadBrackets = [];
  for( var i = 0; i < sLength; i++ ){
    for( var k = 0; k < bracketsConfig.length; k++ ){
      if( bracketsConfig[k][0] == bracketsConfig[k][1] && bracketsConfig[k][0] == str[i] ){
        for( var j = i; j < sLength; j++ ){
          if( bracketsConfig[k][0] == str[i] ){
            for( var z = j; z < sLength; z++ ){
              if( str[z] == str[j] && (z + j + 1) % 2 == 0 ){
                str = setCharAt(str,j,'0');
                str = setCharAt(str,z,'0');
                break;
              }
            }
          }
        }
      }else if( str[i] == bracketsConfig[k][0] ){
        count = 0;
        for( var j = i; j < sLength; j++ ){
          for( var m = 0; m < bracketsConfig.length; m++ ){
            if( str[j] == bracketsConfig[m][0] && bracketsConfig[m][0] != bracketsConfig[m][1] ){
              count++;
            }else if( str[j] == bracketsConfig[m][1] && bracketsConfig[m][0] != bracketsConfig[m][1] ){
              count--;
              stack.push(m);
            }
          }
          if( count == 0 && k == stack[stack.length-1] ){
            str = setCharAt(str,i,'0');
            str = setCharAt(str,j,'0');
            break;
          }
        }
      }else if( str[i] == bracketsConfig[k][1] ){
        return false;
      }
    }
  }

  //console.log(str);
  function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }
  
  for( var k = 0; k < bracketsConfig.length; k++ ){
    if( bracketsConfig[k][0] == bracketsConfig[k][1]){
      for( var i = 0; i < sLength; i++ ){
        if( str[i] == bracketsConfig[k][0] ){
          return false;
        }
      }
    }
  }

  return true;
}
