var ctr=0;
console.log('hi');
var x=document.getElementById('div1');
var y=document.getElementById('div2');
var j =document.getElementById('div3');
var l = document.getElementsByClassName('links');
var m = document.getElementById('menu');
var z = document.getElementById('fade');
var h = document.querySelector('.hamburger');
x.style.transition ="all 2s";
y.style.transition = "all 2s";
y.classList.add('remove');
m.style.display="none";
j.classList.add('remove');
h.onmouseenter=function(){
    console.log('Hello');
    m.style.display="flex";
    t3 = new TimelineMax();
    t3.fromTo(m,0.25,{width:"0px"},{width:"200px"});
}
for (let item of l) {
    item.onmouseover=function(){
        m.style.display="flex";    
    }
    item.onmouseout=function(){
        m.style.display="none";    
    }
}

m.onmouseout=function(){
    m.style.display="none";
}
function myfunc(event){
    console.log(event.target.id)
    ctr=event.target.id;
    display(z,ctr)
}
function myerror(){
    
    }
    
function display(z,ctr){
    x.classList.add('remove');
    y.classList.add('remove');
    j.classList.add('remove');
    t2 = new TimelineMax({
        paused:true
    });
    t2.to(z,1,{height:"10px"});
    
     t = new TimelineMax({onComplete: function(){
             if(ctr=='1'){
                x.classList.remove('remove');
             }
             else if(ctr=='2'){
                y.classList.remove('remove');
             }
             else{
                 j.classList.remove('remove');
             }
             t2.play();
     }});
     t.fromTo(z,1,{height:"10px"},{height:"100%",ease: Power1.easeOut} );
    }
    /*
function ValidateEmail(mail) 
{
 
}

    */
    document.onload=function(){
        if(profile!=''){
           console.log("Name is :-"+profile.getName);
        }
    }

