function choice(minute){ //function that gets the choice of the user
    // gets the select button and enters value according to what we get in the function
    document.getElementById("mySelect").value = minute;
    select(minute);
}
 
function select(val){
    let father = document.getElementById("timers");
    // run on all the children of the main div.
    for (let i = 0; i < father.children.length; i++) {
        father.children[i].style.display = "none";
    }
    document.getElementById('timer' + val).style.display = "";
    // switch (val) {
    //     case 10:
    //         console.log(val);
    //         document.getElementById("timer10").style.display = "";
    //         break;
    //     case 15:
    //         document.getElementById("timer15").style.display = "";
    //         break;
    //     case 20:
    //         document.getElementById("timer20").style.display = "";
    //         break;
    //     case 40:
    //         document.getElementById("timer40").style.display = "";
    //         break;
    //     default:
    //         break;
    // }
}

$(document).ready(function(){
    select(10);
});
