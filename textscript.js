import OctokitApiReader from "./componets/octokitReader.js";


var boe = new OctokitApiReader();

var f = await boe.getAllrepos();
for(var i of f.data){
    if(!i.archived){
        var dd = `<a href="index.php?link=projectpage&d=${i.name}" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${i.name}</h5>
                    <small class="text-muted">${new Date(i.updated_at).toLocaleDateString(
                        "en-US"
                    )}</small>
                </div>
                <p class="mb-1">${i.description}</p>
                
                </a>`
        console.log(i);
        if( document.querySelector("#projectslist"))
            document.querySelector("#projectslist").innerHTML+= dd;
    }
}
// var ar = ['InterviewProp',"js","main.js"]
// var so = await OctRepoRequest('GET','VisualVector','contents',ar);
// var out = so.data.content.split("/")
// let decodedString = decodeURIComponent(window.atob(out[1]));
// //var a = await fetch(so.data.content,{ method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}});
// console.log(decodedString);
// console.log(await octokitap.request(`GET /repos/kishonadiaz/VisualVector/contents/`,{
//     owner:'kishonadiaz',
//     repo: 'VisualVector',
//     headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//     }
// }));

// // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
// const {
//   data: { login },
// } = await octokit.rest.users.getAuthenticated();
// console.log("Hello, %s", login);
window.addEventListener("load",()=>{
  
})
window.scrollTo({
    left: 0,
    behavior: 'smooth' // Optional for smooth scrolling
});
var boxes = document.querySelectorAll(".boxes");
if(boxes.length> 0){
    boxes[0].classList.toggle("show",true);
    boxes[0].querySelector("div").classList.toggle("showC",true);
}
var observer = new IntersectionObserver(entries=>{
    entries.forEach(entry => {
        entry.target.addEventListener("levent",()=>{
            
            entry.target.classList.toggle("show",entry.isIntersecting);
            entry.target.querySelector("div").classList.toggle("showC",entry.isIntersecting);
        })
        entry.target.addEventListener("revent",()=>{
           
            entry.target.classList.toggle("show",entry.isIntersecting);
            entry.target.querySelector("div").classList.toggle("showC",entry.isIntersecting);
        })
        
        entry.target.setAttribute("active",entry.isIntersecting);
        
        
    });
},
{threshold:.45})
boxes.forEach(box=>{

    observer.observe(box);
})

function fadup(o){
    for(var i = 0.0; i <= 1; i+=.1){
      
        o.setAttribute("data-op",i);
        o.style.opacity = i;
    }
    return o;
}

/*>      <*/

var menu = document.querySelectorAll("#navmenu ul li > a");
for(var i of menu){
    i.addEventListener("click",(ev)=>{
        var close = document.querySelector(".btn-close");
        close.click();
    })
}
// var c = [0.0,0.0,0.0,0.0]
// window.addEventListener("scroll",(ev)=>{
//     // boxes.forEach((k,i)=>{
//     //     //console.log(rect.height/2 == window.innerHeight/2);
        
//     //     var rect = k.getBoundingClientRect();
//     //     var op = parseFloat(k.getAttribute("data-op"));
//     //     //console.log(Math.floor(rect.top/rect.bottom) == 0 , window.innerHeight/2);
//     //     if(Math.floor(rect.top/rect.bottom) === 0 ){
//     //         //..  
//     //         k.style.opacity = 1;
//     //         return;
//     //         //console.log(fadup(k));
//     //         //k.style.opacity += .1   
//     //         console.log(c);
//     //         //k.setAttribute("data-op",op.toString());
//     //         if(i==0){
//     //             //console.log(c);
//     //             c[0]+=.1;
//     //         }else
//     //         if(i==1){
//     //             //console.log(c);
//     //             c[1]+=.1;
//     //         }else
//     //         if(i==2){
//     //             //console.log(c);
//     //             c[2]+=.1;
//     //         }else
//     //         if(i==3){
//     //            // console.log(c);
//     //             c[3]+=.1;
//     //         }else{
//     //             c[0]=0
//     //             c[1]=0
//     //             c[2]=0
//     //             c[3]=0

//     //         }

            
//     //     }
//     //     // if(i == 0){
//     //     //     var rect = k.getBoundingClientRect();
//     //     //     //console.log(Math.floor(rect.top/rect.bottom) == 0 , window.innerHeight/2);
//     //     //     if(Math.floor(rect.top/rect.bottom) == 0 ){
//     //     //         //..      
//     //     //         console.log(rect.top/2 , window.innerHeight/2);
//     //     //     }
//     //     // }else if(i == 1){
           
//     //     // }
       
        
//     // })

    
// })
 