import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm'
import { full as emoji } from 'https://cdn.jsdelivr.net/npm/markdown-it-emoji@3.0.0/+esm'
import twemoji from 'https://cdn.jsdelivr.net/npm/twemoji@14.0.2/+esm'
import OctokitApiReader from '../componets/octokitReader.js'

// function emojiToUnicode(emojis) {
//     return emojis.codePointAt(0).toString(16).toUpperCase();
//   }
  
//   const emojis = "🛠️";
//   const unicode = emojiToUnicode(emojis);
  
//   console.log(unicode); // Output: 1F602


var ockit = new OctokitApiReader();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var repo = urlParams.get("d");


var menu = document.querySelector("#menu");
var main = document.querySelector("main");
var menufill = document.querySelector("#menufill");


var contm = main.getBoundingClientRect();
var mh = contm.height



var ou = await ockit.retiverepo('GET',repo.toString())
console.log(ou);
ockit.add('contents')
var so = await ockit.retiverepo('GET',repo.toString(),ockit.getquery());
console.log(so.data.find(data=>data.name=="README.md"));
ockit.add(so.data.find(data=>data.name=="README.md").name)
var ds = await ockit.retiverepo('GET',repo.toString(),ockit.getquery()) ;
console.log(ds);
var out = ds.data.content.split("/")
let decodedString = decodeURIComponent(window.atob(out[0]));

var dae = document.querySelector("#giticon");
dae.href = ou.data.html_url;
console.log(dae,so);
//var a = await fetch(so.data.content,{ method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}});
console.log(decodedString);
var md = markdownIt({
    html:true,
    linkify:true,
    typographer: true,
    breaks:true,
}).use(emoji);

console.log(md);
var outputsize = ()=>{
    alert("xkjdfhksjfd");
}
var observer = new MutationObserver(function (mutations) {
    main = document.querySelector("#content");
    contm = main.getBoundingClientRect();
    mh = contm.height
    menu.style.height = `${mh+8}px`;
    console.log(mh)
    mutations.forEach(function (mutation) {
        
    });
});

// configuration of the observer:
var config = { childList: true, subtree: true }
console.log(main)

// pass in the target node, as well as the observer options

observer.observe(main, config);
//new ResizeObserver(outputsize).observe(main)
md.renderer.rules.emoji = function(token, idx) {
    return twemoji.parse(token[idx].content);
};
var ren = md.render(decodedString);
// console.log(ren.find(data=>data));
var coun =0;
var ll = document.querySelector("#content");
console.log(ll.querySelectorAll("h2"));
var strd = "";
for(var h of ren.split('\n')){
    
    if(h.includes("h2")){
        var hs = h.replaceAll("<","")
        hs  = hs.replaceAll(">","");
        hs = hs.replaceAll("h2","");
        hs = hs.replaceAll("/","");
        var dd = `<li  class="nav-item">
            <a class="nav-link "  href="#${hs}">${hs}</a>
        </li>`
        menufill.innerHTML += dd;
        //h = h.replace(">",` id="${hs}">`)
        strd +=h+"\n";      
    }else{
        strd +=h+"\n";
    }
}
console.log(strd);
document.querySelector("#content").innerHTML =strd;



window.addEventListener("scroll",()=>{

})