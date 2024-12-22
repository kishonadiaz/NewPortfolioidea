function htmlToEditorJs(html, memo=[] ,customTags = {}) {
    const parser = new DOMParser();
    const documents = parser.parseFromString(html, 'text/html');
    const blocks = memo;
    console.log(documents);
    for(var [k,is] of Object.entries(blocks)){
      //console.log(k,is.data.items);
      if(blocks.includes(is)){
        break;
      }else{
        blocks = is;
      }
    }
    if(documents.body.children.length > 0){
      for(var i=0; i < documents.body.children.length; i++){
        var child = documents.body.children[i];
        console.log(documents.body.children);
        if (child.nodeType === 1) { // Element nodes
          const tagName = child.tagName.toLowerCase();
            switch (tagName) {
              case 'p':
                blocks.push({
                  type: 'paragraph',
                  data: { text: child.innerHTML }
                });
                break;
              case 'h1':
              case 'h2':
              case 'h3':
              case 'h4':
              case 'h5':
              case 'h6':  
                blocks.push({
                  type: 'header',
                  data: {
                    text: child.textContent,
                    level: parseInt(tagName[1]) // Extract level from tag name (e.g., h2 -> 2)
                  }
                });
                break;
              case 'ul':
                const unorderedItems = Array.from(child.querySelectorAll('li')).map(li => li.textContent);
                blocks.push({
                  type: 'list',
                  data: { style: 'unordered', items: unorderedItems }
                });
                break;
              case 'ol':
                const orderedItems = Array.from(child.querySelectorAll('li')).map(li => li.textContent);
                blocks.push({
                  type: 'list',
                  data: { style: 'ordered', items: orderedItems }
                });
                break;
              case 'div':
                console.log(child)
                var diviems = Array.from(child.children).map(childr => { 

                  if(child.children.length > 0){
                    for(var i =0;i<child.children.length; i++){
                      console.log(childr,childr.nodeName)
                      if(childr.innerHTML.length > 0)
                        return findchldren(childr.children[i],blocks[i]);
                      else{
                        console.log(childr);
                        if(childr)
                        return htmlToEditorJs(childr.innerHTML,blocks[i])
                      }
                      
                      break;
                    }
                  }  
                  return htmlToEditorJs(childr.innerHTML,blocks);
                
                });
                console.log(diviems,"asgldfhkasjdgkldsfh");
                blocks.push({
                  
                  type: 'div',
                  data: {items: diviems}
                });
                break;
              case 'a':
                blocks.push({
                  type: 'link',
                  data: {
                    text: node.textContent,
                    href: node.href
                  }
                });
                break;
              case 'video':
                console.log(child,"asljkdfhkjashdflkhsdafj")
                // var diviems = Array.from(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
                // console.log(diviems,Array(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"asjdgkldsfh");
                blocks.push({
                  type: 'video',
                  data: {
                    data: {items:"dsfff"},
                  }
                });
                break;
              case 'audio':
                console.log(child)
                var diviems = Array.from(child.children).map(childr => { 

                  if(child.children.length > 0){
                    for(var i =0;i<child.children.length; i++){
                      return findchldren(childr.children[i],blocks[0]),child.children[i];
                      break;
                    }
                  }  
                  return htmlToEditorJs(childr.innerHTML,blocks);
                
                });
                // var diviems = Array.from(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
                // console.log(diviems,Array(child.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"kldsfh");
                blocks.push({
                  type: 'audio',
                  data: {
                    data: {items:(diviems==undefined)?diviems.parentElement.innerHTML : diviems},
                  }
                });
                break;
              case 'source':
                console.log(child)
                blocks.push({
                  type: 'source',
                  data: {
                    src: {items:child.src},
                  }
                });
                break;
              case 'text':
                console.log(child);
                break;
              case 'undefined':
                console.log(child);
                break;
              default:
                console.log(`Unhandled tag: ${tagName}`);
              }
        }else if(child.nodeType === 3){
          console.log(child);
        }
      }
    }
    if(documents.body.children.length == 0){
      console.log("aslkdfhlkahsldfjhlkajsgjdf",html)
        blocks.push({
          type:'text',
          data: {
            text:html
          }
        })
    }
    findchldren(child,blocks);
      
    return  {
      time: Date.now(),
      blocks,
      version: '2.30.7'
    };
  }
  var findchldren = (elem,memo=[],customTags={})=>{
    if(elem == undefined)
      return;
    if(elem.length < 0)
      return;
    var out  = memo;
    var blocks = [];
    var child = {};
    if(elem){
      if(elem.children.length > 0){
        console.log(elem.children);
        for(var i = 0 ; i < elem.children.length;i++){
          console.log(elem.children);
          blocks.push(htmlToEditorJs(elem.children[i].outerHTML,blocks));
      
          if(elem.children[i].children.length > 0){
            console.log(elem.children[i]);
            blocks.push(htmlToEditorJs(elem.children[i].innerHTML,blocks))
          
            if(elem.children[i].children.length > 0){
              console.log(elem.children[i]);
                for(var j =0; j < elem.children[i].children.length; j++ ){
                  if(elem.children[i].children[j].firstChild){
                    console.log(elem.children[i].children[j]);
                    blocks.push(htmlToEditorJs(elem.children[i].children[j].innerHTML,blocks));
                  }
                  
                  blocks.push(findchldren(elem.children[i].children[j],blocks))
                  
                }
            }else{
              break;
            }
            break;
            
          }else{
            break;
          }
        }
      }else{
        blocks.push(htmlToEditorJs(elem.innerHTML,blocks));
      }
      //console.log(blocks[0]);
      out = blocks;
    }
      
    // var block = htmlToEditorJs(elem,blocks);
    // if(child){
     
    //   if(child.children.length> 0){
    //     for(var i =0; i < child.children.length; i++){
    //       console.log(child, child)
    //       // console.log(htmlToEditorJs(child.children[i].innerHTML,blocks));
    //     }
    //   }
    // }
    
    
    return out[0];
    // if(elem == undefined)
    //   return;
    
    // const parser = new DOMParser();
    // const documents = parser.parseFromString(elem, 'text/html');
    // const blocks = i;
    // var  out = {
    //   time: Date.now(),
    //   blocks,
    //   version: '2.30.7'
    // };
    // if(documents){
    //   console.log(documents)
    //   if(elem.childNodes)
    //   {
        
    //   }
    // }
    // console.log(documents);
    // documents.body.childNodes.forEach(node => {
    //   // if (node.nodeType === 1) { // Element nodes
    //   //   const tagName = node.tagName.toLowerCase();
  
    //   //   // Handle custom tags
    //   //   if (customTags[tagName]) {
    //   //     const customBlock = customTags[tagName](node);
    //   //     if (customBlock) blocks.push(customBlock);
    //   //     return;
    //   //   }
  
    //   //   // Handle default tags
    //   //   switch (tagName) {
    //   //     case 'p':
    //   //       blocks.push({
    //   //         type: 'paragraph',
    //   //         data: { text: node.innerHTML }
    //   //       });
    //   //       break;
    //   //     case 'h1':
    //   //     case 'h2':
    //   //     case 'h3':
    //   //     case 'h4':
    //   //     case 'h5':
    //   //     case 'h6':  
    //   //       blocks.push({
    //   //         type: 'header',
    //   //         data: {
    //   //           text: node.textContent,
    //   //           level: parseInt(tagName[1]) // Extract level from tag name (e.g., h2 -> 2)
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'ul':
    //   //       const unorderedItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent);
    //   //       blocks.push({
    //   //         type: 'list',
    //   //         data: { style: 'unordered', items: unorderedItems }
    //   //       });
    //   //       break;
    //   //     case 'ol':
    //   //       const orderedItems = Array.from(node.querySelectorAll('li')).map(li => li.textContent);
    //   //       blocks.push({
    //   //         type: 'list',
    //   //         data: { style: 'ordered', items: orderedItems }
    //   //       });
    //   //       break;
    //   //     case 'div':
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML,blocks)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
              
    //   //         type: 'div',
    //   //         data: {items: diviems }
    //   //       });
    //   //       break;
    //   //     case 'a':
    //   //       blocks.push({
    //   //         type: 'link',
    //   //         data: {
    //   //           text: node.textContent,
    //   //           href: node.href
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'video':
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
    //   //         type: 'video',
    //   //         data: {
    //   //           data: {items:diviems},
    //   //         }
    //   //       });
    //   //       break;
    //   //     case 'audio':
    //   //       var diviems = Array.from(node.childNodes).map(child => { return findchldren(child.innerHTML);});
    //   //       console.log(diviems,Array(node.childNodes).map(child => { return findchldren(child.innerHTML)}),"asgldfhkasjdgkldsfh");
    //   //       blocks.push({
    //   //         type: 'audio',
    //   //         data: {
    //   //           data: {items:diviems},
    //   //         }
    //   //       });
    //   //       break;
    //   //     default:
    //   //       console.log(`Unhandled tag: ${tagName}`);
    //   //   }
    //   // }
      
    //   if(node.lenght > 0){
    //     out = htmlToEditorJs(String(node.innerHTML),blocks);
    //   }else if(node.childNodes.length > 0){
    //     node.childNodes.forEach(noesd=>{
    //       out = htmlToEditorJs(String(noesd.innerHTML),blocks);
    //     })
        
    //   }
    //   return out;
    // })
    // if(elem == undefined)
    //     return;
    
   
    // if(elem.length > 0){
    //   for(var i=0;i < elem.length; i++){
    //     console.log(elem[i]);
    //   }
    // }else if(elem.childNodes.length > 0){
    //   for(var i=0;i < elem.childNodes.length; i++){
    //     console.log(elem.childNodes[i]);
    //   }
    // }
    // for(var i=0;elem.childNodes.length; i++){
    //     console.log(elem);
    //     //console.log(htmlToEditorJs(elem.childNodes[i]).innerHTML);

    // }
    return;
    
  }
  export default htmlToEditorJs;