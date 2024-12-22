import Mediajs from "./adminstuff/editorjsplugins/media.js";
import RenderAction from "./myrender.js";

let editor = new window.EditorJS({

    holder: 'editor',
    readOnly: true,
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

window.onload=function(){
  var  url = new URL(window.location);
  //console.log((url.searchParams.get("action")));
  
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
              document.querySelectorAll('*').forEach(element => {
                element.contentEditable = 'false';
            });
            var vids = document.querySelectorAll("video");
            for(var v of vids){
              console.log(v);
              // v.parentElement.style.cssText= `position: relative;
              //                                 padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
              //                                 height: 0;
              //                                 overflow: hidden;`

              v.parentElement.classList.add("d-flex") ;
              //v.parentElement.classList.add("ratio-16x9"); 
              //v.classList.add("embed-responsive-item")
              // v.style.cssText = `position: absolute;
              //                     top: 0;
              //                     left: 0;
              //                     width: 100%;
              //                     height: 100%;
              //                     border: 0;`
            }    
            var title = document.querySelector("#title");
            title.innerHTML = contents[1][0]["title"];
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
    window.addEventListener("scroll",()=>{
      var menu = document.querySelector("#menu");
      var cont = document.querySelector("#content");
      var height = cont.getBoundingClientRect().height;
      menu.style.height = height+"px";
    })

  


}