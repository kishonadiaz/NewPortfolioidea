var content =window.document.querySelector(".contents");
var menu = window.document.querySelector(".sidebar");
var childlinks = document.querySelectorAll("a");
var thead =  window.document.querySelector("#contenttblheader > tr")
var tbody =  window.document.querySelector("#contenttbl")


menu.style.height = content.scrollHeight+"px";

// window.addEventListener("scroll",()=>{
//     content = document.querySelector(".contents");
//     menu = document.querySelector(".sidebar");

//     menu.style.height = content.scrollHeight+"px";
// })

const queryString = window.location.search; 

// Create a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const names = urlParams.get('menu');

window.onload = ()=>{

    if(names == "posttable"){
        const url = new URL(window.location);
        console.log(window.document.querySelector("#contenttbl"));
        (async () => {
    
          var fos = new FormData();
          fos.append("query",`SELECT *  From post where isactive = 1 Order by postId DESC;`);
         
      
          const rawResponse = await fetch("./fetchurl.php"+`?id=${url.searchParams.get("id")}` , {
              method: 'POST',
              body: fos
            }).catch(()=>{
      
            })
            const content = await rawResponse.json();
            //console.log(JSON.parse(content));
            console.log(content);
            ///insertParam("action","edit");
            //var jsa = JSON.parse(content);
            var obj = Object.entries(content[1]);
            var key = obj;
            console.log(key);
           
    
            // var initElement = "<div class=\"adsfdfa\"><span>text</span>Text2</div>";
            // const updatedHtml = key[1]["html"].replace(/(src|href)=["']([^"']*)["']/g, (match, attr, value) => {
            //   // Replace only the whitespace between words in the attribute value
            //   const updatedValue = value.replace(/\s+/g, '%20');
            //   return `${attr}="${updatedValue}"`;
            // });
            
            //console.log(updatedHtml);
            var ths = [];
            var dat = [];
              for(var [th,them] of key){
                console.log(them);
                var dh = document.createElement("th");
                
                if(th == "postId"){
                    // var dhf = document.createElement("th");
                    // var btncont = document.createElement("div");
                    // btncont.className = "btn-cont";
                    // btncont.innerHTML= `<a class="btn" href="?link=pages/admin$id=${them}">Edit</a>`
                    // btncont.innerHTML += `<button class="btn primary-danger">Remove</button>`;
                    // dhf.append(btncont);
                    ths.unshift(dhf);
                }
                dat.push(them);
                dh.scope = "col";
                dh.innerHTML = "Title";
                ths.push(dh);
               
              }
              console.log(ths);
              
              thead.prepend(ths[0]);
              var dg = [];
              for(var [tr,item] of Object(dat).entries()){
                console.log(tr,item)
                var dh = document.createElement("tr");
                if(item["postId"]){
                    var dhf = document.createElement("td");
                    dhf.setAttribute("colspan","2")
                    var btncont = document.createElement("div");
                    btncont.className = "btn-cont d-flex justify-content-end";
                    btncont.innerHTML= `<a class="btn " href="?link=pages/adminstuff/post&action=edit&id=${item["postId"]}">Edit</a>`
                    btncont.innerHTML += `<button class="btn primary-danger removebtns" data-id="${item["postId"]}" >Remove</button>`;
                    dhf.appendChild(btncont);
                    dh.prepend(dhf);
                    dg.push(dhf);
                }
                
                  console.log("asdfjkhjklasdhfkjhsf");
                    var dhf = document.createElement("td");
                    dhf.innerHTML = item["title"];
                    dg.push(dhf);
                    dh.prepend(dhf);
                    //ths.unshift(dhf);
                    
                
                    
                // dh.innerHTML;
                //ths.push(dh);
                tbody.prepend(dh);
                
              }
              var removebtns = document.querySelectorAll(".removebtns")
                for(var r of removebtns){
                  r.addEventListener("click",async (ev)=>{
                    
                    var fos = new FormData();
                    fos.append("query",`Update post Set isactive=0 Where postId = ${ev.target.getAttribute("data-id")};`);
                   
                
                    const rs = await fetch("./fetchurl.php" , {
                        method: 'POST',
                        body: fos
                      }).catch(()=>{
                
                      })
                    ev.target.parentElement.parentElement.parentElement.hidden =true
                  })
                }
             
              
              
            //   // Add or update query parameters
            //   url.searchParams.set('action', 'edited');
            //   url.searchParams.set('id', id);
      
            //   // Update the browser's address bar
            //   history.pushState(null, '', url.toString());
      
            //   console.log('Updated URL:', window.location.href);
              
              // const originalFetch = window.fetch;
              // window.fetch = function (...args) {
              //     console.log("Fetch intercepted:", args);
              //     return originalFetch(...args).then(response => {
              //         if (response.url.includes("redirect")) {
              //             console.log("Redirect avoided:", response.url);
              //         }
              //         return response;
              //     });
              // };
       
            
        })();
        // (async () => {
          
        //     var fos = new FormData();
        //     fos.append("query","SELECT * From post");
           
      
        //     const rawResponse = await fetch("./fetchurl.php"+`?id=${url.searchParams.get("id")}` , {
        //         method: 'POST',
        //         body: fos
        //       }).catch(()=>{
        
        //       })
        //       const content = await rawResponse.text();
        //       //console.log(JSON.parse(content));
        //       console.log(content);
        //       ///insertParam("action","edit");
        //       var jsa = JSON.parse(content);
        //       console.log(jsa[0]);
        //       var obj = Object.entries(jsa[0]);
        //       var key = obj;
        //       console.log(key);
        //       var ths = [];
        //       for(var [th,them] of key){
        //         console.log(th);
        //         var dh = document.createElement("th");
                
        //         if(th == "postId"){
        //             // var dhf = document.createElement("th");
        //             // var btncont = document.createElement("div");
        //             // btncont.className = "btn-cont";
        //             // btncont.innerHTML= `<a class="btn" href="?link=pages/admin$id=${them}">Edit</a>`
        //             // btncont.innerHTML += `<button class="btn primary-danger">Remove</button>`;
        //             // dhf.append(btncont);
        //             ths.unshift(dhf);
        //         }
        //         dh.scope = "col";
        //         dh.innerHTML = th;
        //         ths.push(dh);
               
        //       }
        //       console.log(ths);
              
        //       thead.prepend(ths[2]);
        //       for(var [tr,item] of obj){
        //         var dh = document.createElement("td");
        //         if(tr == "postId"){
        //             var dhf = document.createElement("td");
        //             dhf.setAttribute("colspan","2")
        //             var btncont = document.createElement("div");
        //             btncont.className = "btn-cont d-flex justify-content-end";
        //             btncont.innerHTML= `<a class="btn " href="?link=pages/adminstuff/post&action=edit&id=${item}">Edit</a>`
        //             btncont.innerHTML += `<button class="btn primary-danger">Remove</button>`;
        //             dhf.appendChild(btncont);
        //             tbody.prepend(dhf);

        //         }
        //         if(tr == "title"){
        //             var dhf = document.createElement("td");
        //             dhf.innerHTML = item;
                
        //             //ths.unshift(dhf);
        //             tbody.prepend(dhf);
        //         }
                    
        //         dh.innerHTML = th;
        //         //ths.push(dh);
        //       }
              
              
        //     //   // Add or update query parameters
        //     //   url.searchParams.set('action', 'edited');
        //     //   url.searchParams.set('id', id);
      
        //     //   // Update the browser's address bar
        //     //   history.pushState(null, '', url.toString());
      
        //     //   console.log('Updated URL:', window.location.href);
              
        //       // const originalFetch = window.fetch;
        //       // window.fetch = function (...args) {
        //       //     console.log("Fetch intercepted:", args);
        //       //     return originalFetch(...args).then(response => {
        //       //         if (response.url.includes("redirect")) {
        //       //             console.log("Redirect avoided:", response.url);
        //       //         }
        //       //         return response;
        //       //     });
        //       // };
             
             
             
        //    })();
      
    
    }
}



