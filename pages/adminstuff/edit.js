import Mediajs from "./editorjsplugins/media.js";
import htmlToEditorJs  from "../../componets/htmltoeditorjs.js";
import RenderAction from "../myrender.js";

//console.log(window)


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
        },

        renderaction:{
          class:RenderAction
        }

        
        
    },
    data: "HTML",
    
});

var update = document.querySelector("#update")
var myToastEl = document.getElementById('mtoast')
var profileimginput = document.querySelector("#postimg")
var profileprievew = document.querySelector("#preview")
var postprolbl = document.querySelector("#postprolbl");
var title = document.querySelector("#posttitInput");

editor.isReady.then((d)=>{
 
}).catch((e)=>{

  //console.log(e);
})
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
function mapDOM(element, json) {
  var treeObject = {};
  var parser;
  var docNode;
  // If string convert to document Node
  if (typeof element === "string") {
      if (window.DOMParser) {
            var parser = new DOMParser();
            docNode = parser.parseFromString(element,"text/xml");
      } else { // Microsoft strikes again
            docNode = new ActiveXObject("Microsoft.XMLDOM");
            docNode.async = false;
            docNode.loadXML(element); 
      } 
      element = docNode.firstChild;
  }
  
  //Recursively loop through DOM elements and assign properties to object
  function treeHTML(element, object) {
      object["type"] = element.nodeName;
      var nodeList = element.childNodes;
      if (nodeList != null) {
          if (nodeList.length) {
              object["content"] = [];
              for (var i = 0; i < nodeList.length; i++) {
                  if (nodeList[i].nodeType == 3) {
                      object["content"].push(nodeList[i].nodeValue);
                  } else {
                      object["content"].push({});
                      treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                  }
              }
          }
      }
      if (element.attributes != null) {
          if (element.attributes.length) {
              object["attributes"] = {};
              for (var i = 0; i < element.attributes.length; i++) {
                  object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
              }
          }
      }
  }
  treeHTML(element, treeObject);
  
  return (json) ? JSON.stringify(treeObject) : treeObject;
}
function validateHTML(html) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.innerHTML; // Return sanitized HTML
  } catch (error) {
    console.error("Invalid HTML:", error);
    return ''; // Return empty string for invalid HTML
  }
}

window.onload = function(){
  
  var  url = new URL(window.location);
  //console.log((url.searchParams.get("action")));
  if(url.searchParams.get("action") == "edit"){
    (async () => {
    
      var fos = new FormData();
      fos.append("query",`SELECT html,title,mediaid  From post where postId = ${url.searchParams.get("id")} ;`);
     
  
      const rawResponse = await fetch("./fetchurl.php"+`?id=${url.searchParams.get("id")}` , {
          method: 'POST',
          body: fos
        }).catch((ex)=>{
          //console.log(ex);
        })
        const contents = await rawResponse.json();
        ////console.log(JSON.parse(content));
        console.log(contents);
        ///insertParam("action","edit");
        //var jsa = JSON.parse(content);
        title.value = contents[1][0]["title"];
        var docss = document.createElement("div");
        docss.innerHTML = contents[1][0]["html"];
        var mediaid = contents[1][0]["mediaid"];
        console.log(mediaid);
        var pmedia = new FormData();
        pmedia.append("query",`Select filelocation,filename  From media where mediaId = ${mediaid} ;`);
     
        await fetch("./fetchurl.php"+`?id=${url.searchParams.get("id")}`,{
          method: 'POST',
          body: pmedia

        }).then(data=>data.json()).then(json=>{
          console.log(json);
          profileprievew.innerHTML =`<img src="http://${json[1][0]["filelocation"]+json[1][0]["filename"]}" />`
          postprolbl.innerHTML = json[1][0]["filename"];
        })
        .catch((ex)=>{
          //console.log(ex);
        })
        //console.log(contents[1][0]["html"]);
        
        //console.log(docss.innerHTML);
        // make a new parser
        
        
      
          const parser = new DOMParser();

        // convert html string into DOM
        const documents = parser.parseFromString(contents[1][0]["html"], "text/html");
        
        console.group(documents.body)
       
        var initElement = "<div class=\"adsfdfa\"><span>text</span>Text2</div>";
        const updatedHtml = contents[1][0]["html"].replace(/(src|href)=["']([^"']*)["']/g, (match, attr, value) => {
          // Replace only the whitespace between words in the attribute value
          const updatedValue = value.replace(/\s+/g, '%20');
          return `${attr}="${updatedValue}"`;
        });
        
        //console.log(updatedHtml);
        var dv =  document.createElement("div");
        dv.innerHTML = updatedHtml;
        //var json = mapDOM(dv.querySelector("audio"), true);
        ////console.log(json);
          //await editor.isReady;
          //editor.blocks.renderFromHTML(dv.querySelector("audio").outerHTML)
         // var doc = document.querySelector(".codex-editor__redactor");
          //doc.innerHTML = dv.innerHTML; 
         
          
          // editor.render(json);
          
          var doc = document.querySelector(".codex-editor__redactor");
          
          await editor.isReady
          //doc.innerHTML = updatedHtml;
          //editor.blocks.render(htmlToEditorJs(updatedHtml))
          // editor.blocks.update(editor.blocks[editor.blocks.getCurrentBlockIndex()].id, blockToUpdate.data);
          // //console.log(editor.blocks,htmlToEditorJs(updatedHtml));
          // editor.blocks.insertMany(updatedHtml)
          // editor.blocks.update(dv.querySelectorAll("[data-id]")[0].getAttribute("data-id"), editor.blocks.data);
          
          try{

          
            editor.isReady.then(async ()=>{
              RenderAction.setrender = {html:updatedHtml};
  
              // editor.blocks.renderFromHTML("<video controls></video>").then((e)=>{
              //   ////console.log(editor,"yesy",htmlToEditorJs(validateHTML(updatedHtml).replaceAll("data-id","data-old").toString()))
              //   // editor.blocks.insert('paragraph', {
              //   //   text: 'Hello world',
              //   // });
              //   editor.holder = "editor"
              // }).catch(d=>{
              //   //console.log(d,"nope")
              // });
            }).catch((e)=>{
              //console.log("sldfjhkjdfhas",e);
            });
          
          
          }catch(ex){
            //console.log(ex);
          }
          // //console.log(editor.blocks);
          // editor.save().then(data => {
          //   //console.log(data); // json block data as expected
          //  //res.end(JSON.stringify(data))
           
          // });
          //doc.innerHTML = updatedHtml;
          
     
        //console.log(document.getElementById("editor").outerHTML);
        
        //datas.html = content[0][0];
        // var doc = document.querySelector(".codex-editor__redactor");
        // doc.innerHTML = docss.children[0].innerHTML.replaceAll("\\")
   
        
    })();
  }
}
var outarr =[];
var outobj = {};
const popover = new bootstrap.Popover(title,{})
popover.disable()
console.log(popover);
update.addEventListener("click",function(){
  popover.enable()
  var title = document.querySelector("#posttitInput");
  
  
  if(title.value == ""){
    
      console.log(popover);
      
      popover.show()
    // document.querySelector(".popover")[0].classList.toggle("show",true);
    return;
  }else{
    popover.hide();
  }
 
  var  url = new URL(window.location);
  //console.log((url.searchParams.get("action")));
  outarr = [];
  
  outarr.push({title:title.value});
  var url = new URL(window.location);
  if(url.searchParams.get("action") == "new"){
    try{
    (async () => {
      if(profileimginput.files.length > 0){
      var fos = new FormData();
      fos.append("FILE[]",profileimginput.files[0]);
      fos.append("key",window.key);
      fos.append("who","profile")
      
      const rawResponse = await fetch(  (Mediajs.up.config == undefined)? "./mediauploads.php":Mediajs.up.config.endpoint+"?action=new&p=post", {
          method: 'POST',
          body: fos
        }).catch((ex)=>{
          console.log(ex);
        })
        var content ;
        var f;
        
        content = await rawResponse.text();
        console.log(content);
      
          f = JSON.parse(content);
          profileprievew.innerHTML = f["html"];
          outarr.push(f);
          //console.log(outarr)
        
      }
    })();
    }catch(ex){
          console.log(ex);
    }
    const url = new URL(window.location);
    editor.save(true).then((outputData) => {


      console.log('Article data: ', outputData)
      
      // var content = document.querySelector("#editor");
      // //console.log(content.innerHTML);
      // function customParser(block){
      //   alert("sdflkhsldhf")
      //   //console.log(block.data);
      //   return `<custom-tag> ${block.data.text} </custom-tag>`;
      // }
    
      // const edjsParser =  edjsHTML({custom: customParser});
  
      // let html = edjsParser.parse(outputData);
      
      if(outputData.blocks.length > 0){
        var contents = document.querySelector("#editor");
        ////console.log(contents.innerHTML);
      
        (async () => {
          var fos = new FormData();
          fos.append("key",window.key);
          var df =[];
          for(var b of outputData.blocks){
            //console.log(b.data.file);
            fos.append("FILE[]",b.data.file);
          }
          
          
          fos.append("blocks",JSON.stringify( outputData.blocks));
          const rawResponse = await fetch(  (Mediajs.up.config == undefined)? "./mediauploads.php":Mediajs.up.config.endpoint+"?action=new&p=post", {
              method: 'POST',
              body: fos
            }).catch(()=>{

            })
            const content = await rawResponse.text();
            console.log(content);
            //Mediajs.updata = content;
            //console.log("kjsdfhkjshfjkshfd",Mediajs.hasmedia)
            if(Mediajs.hasmedia){
                //alert("asdjklfhkjsadhgjklf");
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
            console.log(document.querySelector(".codex-editor__redactor").innerHTML, "asldkfhkjahlgdfghkl")
            outarr.push({"main":document.querySelector(".codex-editor__redactor").innerHTML,
              "textcontent":document.querySelector(".codex-editor__redactor").innerHTML
            })
            //console.log(outputData,content);
        })();
        
        // Add or update query parameters
    

        // Update the browser's address bar
    
        ////console.log(Mediajs.up);
        clicked = !myToastEl.classList.contains("show")
        myToastEl.classList.toggle("show",clicked)
      }
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }else if(url.searchParams.get("action") == "edit"){
    try{
      (async () => {
        if(profileimginput.files.length > 0){
        var fos = new FormData();
        fos.append("FILE[]",profileimginput.files[0]);
        fos.append("key",window.key);
        fos.append("who","profile")
        var url = new URL(window.location);
        const rawResponse = await fetch( (Mediajs.up.config == undefined)? "./mediauploads.php":Mediajs.up.config.endpoint+"?action=edit&p=post&id="+`${url.searchParams.get("id")}`, {
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
            //console.log(outarr)
          
        }
       })();
      }catch(ex){
            
      }
      const url = new URL(window.location);
      editor.save().then((outputData) => {
        //console.log('Article data: ', outputData)
        
        // var content = document.querySelector("#editor");
        // //console.log(content.innerHTML);
        // function customParser(block){
        //   alert("sdflkhsldhf")
        //   //console.log(block.data);
        //   return `<custom-tag> ${block.data.text} </custom-tag>`;
        // }
      
        // const edjsParser =  edjsHTML({custom: customParser});
     
        // let html = edjsParser.parse(outputData);
        
        if(outputData.blocks.length > 0){
          var contents = document.querySelector("#editor");
          ////console.log(contents.innerHTML);
        
          (async () => {
            var fos = new FormData();
            fos.append("key",window.key);
            var df =[];
            for(var b of outputData.blocks){
              //console.log(b.data.file);
              fos.append("FILE[]",b.data.file);
            }
            
            
            fos.append("blocks",JSON.stringify( outputData.blocks));
            const rawResponse = await fetch((Mediajs.up.config == undefined)? "./mediauploads.php":Mediajs.up.config.endpoint+"?action=new&p=post"+`${url.searchParams.get("id")}`, {
                method: 'POST',
                body: fos
              }).catch(()=>{
    
              })
              const content = await rawResponse.text();
              //console.log(content);
              //Mediajs.updata = content;
              //console.log("kjsdfhkjshfjkshfd",Mediajs.hasmedia)
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

              outarr.push({"main":document.querySelector(".codex-editor__redactor").innerHTML,
                "textcontent":document.querySelector(".codex-editor__redactor").innerHTML
              })
            console.log(outputData,content);
          })();
          
          // Add or update query parameters
      
    
          // Update the browser's address bar
      
          ////console.log(Mediajs.up);
          clicked = !myToastEl.classList.contains("show")
          myToastEl.classList.toggle("show",clicked)
        }
      }).catch((error) => {
        //console.log('Saving failed: ', error)
      });
  }
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

      console.log(outarr);
      fos.append("data",JSON.stringify(outarr));
       var uriparam = "./postsave.php"+`?action=${url.searchParams.get("action")}&profileimg`
      if(profileimginput.files.length > 0){
        alert("sjsjjsj");
        uriparam = "./postsave.php"+`?action=${url.searchParams.get("action")}&profileimg=${profileimginput.files[0].name}`
      }
      if(url.searchParams.get("id")){
        uriparam += `&id=${url.searchParams.get("id")}`;
      }
      alert(uriparam);
      const rawResponse = await fetch(uriparam , {
          method: 'POST',
          body: fos
        }).catch(()=>{
  
        })
        const content = await rawResponse.text();
        ////console.log(JSON.parse(content));
        console.log(content);
        ///insertParam("action","edit");
    
        if(url.searchParams.get("action") == "new"){
          var jsa = JSON.parse(content);
          console.log(jsa);
          var id = 0;
          for(var [i,item] of Object.entries(jsa)){
            console.warn(item);
            for(var [j,inner] of Object.entries(item)){
              console.warn(j,inner);
              // if(Object.entries(inner))
              if(j == "postid"){
                if(inner != 0){
                  
                  if(inner > 0){
                    
                    id = parseInt(inner)
                  }
                }
              }
            }
            
          }
          
          // Add or update query parameters
          url.searchParams.set('action', 'edit');
          url.searchParams.set('id', id);
        }

        // Update the browser's address bar
        history.pushState(null, '', url.toString());

        //console.log('Updated URL:', window.location.href);
        
        // const originalFetch = window.fetch;
        // window.fetch = function (...args) {
        //     //console.log("Fetch intercepted:", args);
        //     return originalFetch(...args).then(response => {
        //         if (response.url.includes("redirect")) {
        //             //console.log("Redirect avoided:", response.url);
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
      
  //       //console.log("Redirect prevented to:", url);
  //   }
  // });
})

myToastEl.addEventListener('hidden.bs.toast', function () {
  // do something...
})
