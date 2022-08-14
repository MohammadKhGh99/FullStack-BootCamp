// (($)=>{
// $(document).ready(function(){
//     // $("button").click(function(){
//     //     $("number").slideToggle();
//     // });
//     const buttons = $('button');
//     buttons.on('click',function(){
//         addChar(this.value);
//     })
// })
// })
$(document).ready(function(){
    
    $("button").on("click",function(){
        console.log("What Happened?");
        addChar(this.value);
    });
  });

function addChar(num){
    // window.alert(num);
    // $('result').value += num
    document.getElementById('result').value += num;
}

function result(){
    document.getElementById('result').value = eval(document.getElementById('result').value);
}

function clr(){
    document.getElementById('result').value = "";
}

function divide(){
    document.getElementById('result').value = eval("1/" + document.getElementById('result').value);
}

function del(){
    // document.getElementById('result').value -= 
}
