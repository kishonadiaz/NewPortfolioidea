import Mediajs from "./editorjsplugins/media.js";

console.log(window)


let editor = new window.EditorJS({

    holder: 'editor',
    onReady: () => {
        new DragDrop(editor);
      },
    tools: {
       
        header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4,5,6],
              defaultLevel: 3,
              inlineToolbar:true,
              tunes: ['anyTuneName'],
            }
        },
        linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:8008/fetchUrl.php', // Your backend endpoint for url data fetching,
            }
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
        },
        anyTuneName: {
            class:AlignmentBlockTune,
            config:{
              default: "right",
              blocks: {
                header: 'center',
                list: 'right'
              }
            },
        },
        attaches: {
            class: AttachesTool,
            config: {
              endpoint: 'http://localhost:8008/uploadFile'
            }
        },
        toggle: {
            class: ToggleBlock,
            inlineToolbar: true,
        },
        list: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            },
        },
        table: {
            class: Table,
            inlineToolbar: true,
        },
       
        media:{
          class: Mediajs,
          config:{
            endpoint:"./mediauploads.php"
          }
        }
        
        
    },
    
});
var update = document.querySelector("#update")
var myToastEl = document.getElementById('mtoast')
var profileimginput = document.querySelector("#postimg")
var profileprievew = document.querySelector("#preview")

var clicked = false;
function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp =  document.location.search.substring(1).split('&');
  let i=0;

  for(; i<kvp.length; i++){
      if (kvp[i].startsWith(key + '=')) {
          let pair = kvp[i].split('=');
          pair[1] = value;
          kvp[i] = pair.join('=');
          break;
      }
  }

  if(i >= kvp.length){
      kvp[kvp.length] = [key,value].join('=');
  }

  // can return this or...
  let params = kvp.join('&');

  // reload page with new params
  document.location.search = params;
}
profileimginput.addEventListener("change",(ev)=>{
  
  const reader = new FileReader();
  

  var file = ev.target.files[0];

  if (file) {
      const reader = new FileReader();
      profileprievew.innerHTML = "";
      reader.onload = (e) => {
      // Handle the file data here
          
        var preview = document.createElement("img");
        preview.src = e.target.result;
        profileprievew.append(preview);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
      //this.save(this.cont);
  }

    

})
var outarr =[];
var outobj = {};
update.addEventListener("click",function(){
  outarr = [];
  var title = document.querySelector("#posttitInput");
  outarr.push({title:title.value});
  try{
  (async () => {
    if(profileimginput.files.length > 0){
    var fos = new FormData();
    fos.append("FILE[]",profileimginput.files[0]);
    fos.append("key",window.key);
    fos.append("who","profile")
    
    const rawResponse = await fetch( Mediajs.up.config.endpoint+"?action=new&p=post", {
        method: 'POST',
        body: fos
      }).catch(()=>{

      })
      var content ;
      var f;
      
      content = await rawResponse.text();
      console.log(content);
     
        f = JSON.parse(content);
        profileprievew.innerHTML = f["html"];
        outarr.push(f);
        console.log(outarr)
      
    }
   })();
  }catch(ex){
        
  }
  const url = new URL(window.location);
  editor.save().then((outputData) => {
    console.log('Article data: ', outputData)
    
    // var content = document.querySelector("#editor");
    // console.log(content.innerHTML);
    // function customParser(block){
    //   alert("sdflkhsldhf")
    //   console.log(block.data);
    //   return `<custom-tag> ${block.data.text} </custom-tag>`;
    // }
  
    // const edjsParser =  edjsHTML({custom: customParser});
 
    // let html = edjsParser.parse(outputData);
    
    if(outputData.blocks.length > 0){
      var contents = document.querySelector("#editor");
      //console.log(contents.innerHTML);
    
      (async () => {
        var fos = new FormData();
        fos.append("key",window.key);
        var df =[];
        for(var b of outputData.blocks){
          console.log(b.data.file);
          fos.append("FILE[]",b.data.file);
        }
        
        
        fos.append("blocks",JSON.stringify( outputData.blocks));
        const rawResponse = await fetch( Mediajs.up.config.endpoint+"?action=new&p=post", {
            method: 'POST',
            body: fos
          }).catch(()=>{

          })
          const content = await rawResponse.text();
          console.log(content);
          //Mediajs.updata = content;
          console.log("kjsdfhkjshfjkshfd",Mediajs.hasmedia)
          if(Mediajs.hasmedia){
           
              var datasd = JSON.parse(content);

              for(var i = 0; i < datasd["html"].length; i++){
                
                var id = datasd["id"][i]
                var contd = document.querySelector(`[data-id = "${id}"]`);
                var child = contd.querySelector(".ce-block__content > div");
                var d = String(datasd["html"][i]).replace(`src=${datasd["uri"][i]}`,`src=${datasd["uri"][i]}`);
                child.innerHTML = d;
              }
              outarr.push(datasd)
              
            
          }
          outarr.push({"main":document.querySelector("#editor").innerHTML,
            "textcontent":document.querySelector("#editor").innerText,
          })
          console.log(outputData,content);
      })();
      
      // Add or update query parameters
  

      // Update the browser's address bar
  
      //console.log(Mediajs.up);
      clicked = !myToastEl.classList.contains("show")
      myToastEl.classList.toggle("show",clicked)
    }
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });

  setTimeout(()=>{
    (async () => {
      
      var fos = new FormData();
      const queryString = window.location.search; 

      // Create a URLSearchParams object
      const urlParams = new URLSearchParams(queryString);

      // Get the value of a specific parameter
      const name = urlParams.get('action'); 

      // Check if a parameter exists
      const hasColor = urlParams.has('color');
      alert(key);
      outarr.push({"key":key});
      outarr.push({"get":name});

      
      fos.append("data",JSON.stringify(outarr));
     

      const rawResponse = await fetch("./postsave.php"+`?action=${url.searchParams.get("action")}` , {
          method: 'POST',
          body: fos
        }).catch(()=>{
  
        })
        const content = await rawResponse.text();
        //console.log(JSON.parse(content));
        console.log(content);
        ///insertParam("action","edit");
        var jsa = JSON.parse(content);
        console.log(jsa);
        var id = 0;
        for(var [i,item] of Object.entries(jsa)){
          if(item["id"] == "preview"){

            id = parseInt(item["postid"])
          }
        }
        
        // Add or update query parameters
        url.searchParams.set('action', 'edited');
        url.searchParams.set('id', id);

        // Update the browser's address bar
        history.pushState(null, '', url.toString());

        console.log('Updated URL:', window.location.href);
        
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


  },800)
 

  
})
window.addEventListener("beforeunload",()=>{
  // alert("sdflkj");
  // Object.defineProperty(window, 'location', {
  //   configurable: true,
  //   get: function() {
  //       return { href: "Intercepted Location" };
  //   },
  //   set: function(url) {
      
  //       console.log("Redirect prevented to:", url);
  //   }
  // });
})

myToastEl.addEventListener('hidden.bs.toast', function () {
  // do something...
})
