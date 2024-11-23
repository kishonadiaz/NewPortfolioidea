
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import {CSS3DRenderer,CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js'
import { Character } from './componets/character.js';
import { NavObjects } from './componets/navobjects.js';
import * as TWEEN from "three/addons/libs/tween.module.js";



var levent = new Event("levent");
var revent = new Event("revent");
var mycont = document.getElementById("mycont");
var myCanvas = document.querySelector("#threecanvas")
const scene = new THREE.Scene();
const scenecss = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 1000 );
const csscamera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, .1, 1000 );
let stats, raycaster;
let clock;

clock = new THREE.Clock()
let INTERSECTED;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 5;

const cssrenderer = new CSS3DRenderer();
cssrenderer.setSize(innerWidth, innerHeight);
mycont.appendChild(cssrenderer.domElement);

const renderer = new THREE.WebGLRenderer({antialias: true, canvas: myCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
mycont.appendChild( renderer.domElement );

const al = new THREE.AmbientLight(0xffffff,0.5);
scene.add(al);
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
				dirLight.position.set( - 3, 10, - 10 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 2;
				dirLight.shadow.camera.bottom = - 2;
				dirLight.shadow.camera.left = - 2;
				dirLight.shadow.camera.right = 2;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 40;
				scene.add( dirLight );
                const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				mesh.name = "ground";
				scene.add( mesh );

                
                
                
const actor = new Character(scene,renderer,camera);

actor.addAnimetions("./animations/Idle.fbx","Idle");
actor.addAnimetions("./animations/Salute.fbx","Salute");
actor.addAnimetions("./animations/Standing Greeting.fbx","Standing Greeting");
actor.addAnimetions("./animations/Walking.fbx","Walking");

actor.load();
actor.setAnimation("Idle");
actor.voicedata("./Rhubarb-Lip-Sync-1.13.0-Linux/talkings.json")
actor.events();

setTimeout(()=>{
	actor.move(10,0,0)
},10)

var el = document.createElement("div");
el.innerHTML = "<h1>TEst</h1>";
var cssobj = new CSS3DObject(el)
console.log((window.innerWidth/(window.innerWidth/window.innerHeight)))
cssobj.position.set(window.innerWidth/(window.innerWidth/window.innerHeight),0,0);
// cssobj.scale.set(.9,.9,0.9)
scenecss.add(cssobj);
// camera.translateX(300);

console.log(actor)
// const navobjects = {};

// navobjects["navbar"] = new NavObjects(.09, 32, 16 ,new THREE.Color("green"),scene,"navbar")
// navobjects["navbar"].move(-1,2.1,0)
// navobjects["about"] = new NavObjects(.09, 32, 16 ,new THREE.Color("red"),scene,"about")
// navobjects["about"].move(1,1.5,0)
// navobjects["projects"] = new NavObjects(.09, 32, 16 ,new THREE.Color("blue"),scene,"projects")
// navobjects["projects"].move(-1,1,0)
// navobjects["contact"] = new NavObjects(.09, 32, 16 ,new THREE.Color("blue"),scene,"contact")
// navobjects["contact"].move(1,1,0)

// for(var [i, item] of Object.entries(navobjects)){
	
// 	item.load()
// }

scene.background = new THREE.Color( 0xffffff );
camera.position.set( 0, 2,  2 );
camera.lookAt( .5, 1.5, 0 );

camera.fov = camera.fov * .5;
var oldfov = camera.fov;
camera.updateProjectionMatrix();
csscamera.position.set( 0, 1,  800);
// camera.translateX(-.5);
// csscamera.lookAt( 0, 1, 0 );
// csscamera.fov = csscamera.fov * .5;
// csscamera.updateProjectionMatrix();
console.log(camera);
renderer.shadowMap.enabled = true;
function getScrollPosition(element) {
	if (!element) {
	  // If no element is provided, get the scroll position of the document.
	  return {
		x: window.scrollX || window.pageXOffset, 
		y: window.scrollY || window.pageYOffset 
	  };
	} else {
	  // Get the scroll position of the specified element.
	  return {
		x: element.scrollLeft, 
		y: element.scrollTop 
	  };
	}
  }
window.addEventListener( 'resize', onWindowResize );

var offpage = [false,false,false,false]

// Tween
//let currentCameraPosition = new THREE.Vector3().copy(camera.position);
let currentCameraPosition = camera.position;

let targetPosition = new THREE.Vector3( .5, 1.5, 0 );
let camrot = new THREE.Vector3().copy(camera.rotation);
var newfov = oldfov
var conts = document.querySelectorAll(".boxes");
var lrside= false;


var out = false;
var tweenfov ;
var og = oldfov
var upordown = false;
window.addEventListener("load",()=>{
	
	conts[0].dispatchEvent(revent);
	// conts[0].addEventListener("transitionstart",(ev)=>{
	// 	if(tweenfov)
	// 		tweenfov.stop();
	// 	oldfov =og;
	// 	newfov = og
	// 	console.log(ev,"sfdl")
	// 	tweenfov = new TWEEN.Tween(oldfov)
	// 	.to(newfov, 2000) // Duration in milliseconds
	// 	.easing(TWEEN.Easing.Quadratic.InOut)
	// 	.onUpdate(() => {
	// 		// camera.position.x =currentCameraPosition.x*targetPosition.x;
	// 		// camera.position.y =2;
	// 		// camera.position.z =2;
	// 		// var s =1;
			
	// 		// // actor.lookat(camera.position.x,-.12,camera.position.z)
	// 		// // camera.lookAt(targetPosition.x,1.5,0 );
	// 		// if(lrside){
	// 		//  	s =-1
	// 		// }else{
	// 		//  	s = 1
				
	// 		// }
	// 		// camera.fov = camera.fov*s;

	// 		camera.fov = (oldfov);
	// 		camera.updateProjectionMatrix();
	// 		console.log(camera.fov,newfov );
		
			

	// 	})
	// 	.start();
		
		
	// })
	// conts[0].addEventListener("transitionend",(ev)=>{
		
	// 	console.log("end");
		
	// 	tweenfov.stop();
		
	// })
	// conts[1].addEventListener("transitionstart",(ev)=>{
	// 	tweenfov.stop();
		
	// 	if(upordown){
	// 		newfov = og;
	// 		oldfov = og;
	// 	}
	// 	else{
	// 		newfov = og
	// 	}
	// 	console.log(ev,"sf")
	// 	tweenfov = new TWEEN.Tween(oldfov)
	// 	.to(newfov, 2000) // Duration in milliseconds
	// 	.easing(TWEEN.Easing.Quadratic.InOut)
	// 	.onUpdate(() => {
	// 		// camera.position.x =currentCameraPosition.x*targetPosition.x;
	// 		// camera.position.y =2;
	// 		// camera.position.z =2;
	// 		// var s =1;
			
	// 		// // actor.lookat(camera.position.x,-.12,camera.position.z)
	// 		// // camera.lookAt(targetPosition.x,1.5,0 );
	// 		// if(lrside){
	// 		//  	s =-1
	// 		// }else{
	// 		//  	s = 1
				
	// 		// }
	// 		// camera.fov = camera.fov*s;

	// 		camera.fov = (oldfov);
	// 		camera.updateProjectionMatrix();
	// 		console.log(camera.fov,newfov );
		
		

	// 	})
	// 	.start();
		
	// })
	// conts[1].addEventListener("transitionend",(ev)=>{
		
	
			
	// 	console.log("end");
		
		
	// })
	// conts[2].addEventListener("transitionstart",(ev)=>{
		
	// 	if(upordown){
	// 		//oldfov = newfov;
	// 		newfov = og;
	// 	}
	// 	else
	// 		newfov = og*1.6
	// 	console.log(ev,"s")
	// 	tweenfov = new TWEEN.Tween(oldfov)
	// 	.to(newfov, 2000) // Duration in milliseconds
	// 	.easing(TWEEN.Easing.Quadratic.InOut)
	// 	.onUpdate(() => {
	// 		// camera.position.x =currentCameraPosition.x*targetPosition.x;
	// 		// camera.position.y =2;
	// 		// camera.position.z =2;
	// 		// var s =1;
			
	// 		// // actor.lookat(camera.position.x,-.12,camera.position.z)
	// 		// // camera.lookAt(targetPosition.x,1.5,0 );
	// 		// if(lrside){
	// 		//  	s =-1
	// 		// }else{
	// 		//  	s = 1
				
	// 		// }
	// 		// camera.fov = camera.fov*s;

	// 		camera.fov = (oldfov);
	// 		camera.updateProjectionMatrix();
	// 		console.log(camera.fov,newfov );
			
			

	// 	})
	// 	.start();
		
	    
	// })
	// conts[2].addEventListener("transitionend",(ev)=>{
	
	// 	tweenfov.stop();
	// 	console.log("end");

		
	// })
	var count = 0;
	conts[3].addEventListener("transitionstart",(ev)=>{
		
		if(upordown){
			newfov = og*5;
			
		}
		else{
			newfov = og*5;
			
		}
		console.log(ev,"sfddddjh",oldfov)
		tweenfov = new TWEEN.Tween(camera.fov)
		.to(newfov, 2000) // Duration in milliseconds
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(() => {
			// camera.position.x =currentCameraPosition.x*targetPosition.x;
			// camera.position.y =2;
			// camera.position.z =2;
			// var s =1;
			
			// // actor.lookat(camera.position.x,-.12,camera.position.z)
			// // camera.lookAt(targetPosition.x,1.5,0 );
			// if(lrside){
			//  	s =-1
			// }else{
			//  	s = 1
				
			// }
			// camera.fov = camera.fov*s;
			if(upordown){
				//camera.fov = (newfov);
				if(camera.fov <= newfov/2){
					camera.fov = camera.fov+.25;
					// if(camera.fov <= newfov/2){
					// 	camera.fov = newfov/2;
					// }
					
				}
				
			}else{
				if(camera.fov >= og){
					camera.fov = camera.fov-.25;
					
				}
				//camera.fov = og;
			}
			//camera.position.set(count,2,2)
			
			count++;
			camera.updateProjectionMatrix();
			console.log(camera.fov,oldfov,newfov,count );
		
			

		})
		.start();
		
		

		
		
	})
	conts[3].addEventListener("transitionend",(ev)=>{
		if(!upordown){
			camera.fov = og;
		}
		
		
		//tweenfov.stop();
		
	})
	// for(var i of conts){
	// 	console.log(i.getAttribute("active"));
		
		
	// 	i.addEventListener("transitionstart",(ev)=>{
			
			
			
			
			
			
	// 	})
	// 	if(out)
	// 		break;
		
	// 	// break;
	// }
	
})
let lastScrollTop = 0;
var nav = document.querySelector(".navbtn");
var navb = nav.getBoundingClientRect().y;

window.addEventListener("scroll",(ev)=>{
	
	var conts = document.querySelectorAll(".boxes");
	
	navb = nav.getBoundingClientRect().y;
	console.log(window.scrollY,"dsajfhkajsfhkjfd");
	if(window.scrollY > 0){
		nav.classList.toggle("showbtn",true);
	}else{
		nav.classList.toggle("showbtn",false);
	}

	for(var i of conts){
		if(i.id =="intro"){
			if(i.getBoundingClientRect().bottom<=0){
				offpage[0] = true
				offpage[1] = false
				offpage[2] = false
				offpage[3] = false
			}else{
				offpage[0] = false
			}
		}else if(i.id =="projects"){
			if(i.getBoundingClientRect().bottom<=0){
				offpage[1] = true
				offpage[0] = false
				offpage[2] = false
				offpage[3] = false
			}else{
				offpage[1] = false
			}
		}
		else if(i.id =="blog"){
			if(i.getBoundingClientRect().bottom<=0){
				offpage[2] = true
				offpage[1] = false
				offpage[0] = false
				offpage[3] = false
			}else{
				offpage[2] = false
			}
		}else if(i.id =="contact"){
			if(i.getBoundingClientRect().bottom<=0){
				offpage[3] = true
				offpage[1] = false
				offpage[2] = false
				offpage[0] = false
			}else{
				offpage[3] = false
			}
		}
			
	}
	const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

	if (currentScrollTop > lastScrollTop) {
	  upordown = true;
	} else if (currentScrollTop < lastScrollTop) {
	  upordown= false
	}
  
	lastScrollTop = currentScrollTop;
	// console.log(offpage);
	//var startRotation = new THREE.Euler().copy( camera.position );

	// final rotation (with lookAt)
	//camera.lookAt( .5, 1.5, 0 );
	//var endRotation = new THREE.Euler().copy( camera.position );

	// revert to original rotation
	//camera.position.copy( startRotation );
	
	// for(var i =0 ; i < offpage.length; i++){
	// 	console.log(i % 3)
	// 	// if((i % 2) == 1){
	// 	// 	camera.lookAt( .5, 1.5, 0 );
	// 	// 	new TWEEN.Tween( camera.position ).to( { position: camera.position }, 600 ).start();
	// 	// 	camera.updateProjectionMatrix();
			
			
	// 	// }else{
	// 	// 	camera.lookAt( -.5, 1.5, 0 );
	// 	// 	new TWEEN.Tween( camera ).to( { position: camera.position }, 600 ).start();
	// 	// 	camera.updateProjectionMatrix();
			
	// 	// }
	// 	if(offpage[i] == true){
			
			
	// 		//camera.updateProjectionMatrix();
	// 	}else{
			
	// 		break;
	// 	}
		
		
	// }
	
	// offpage.find((s,d)=>{
	// 	console.log(s,d);
	// 	if((d%3)==true){
	// 		currentCameraPosition = new THREE.Vector3().copy(camera.position);
	// 		targetPosition = new THREE.Vector3( .5, 0, 0 );
			
	// 		// camera.lookAt( .5, 1.5, 0 );
	// 		// new TWEEN.Tween( camera ).to( { position: camera.position }, 600 ).start();
	// 	}else{
	// 		currentCameraPosition = new THREE.Vector3().copy(camera.position);
	// 		targetPosition = new THREE.Vector3( -.5, 0, 0 );
	// 		//new TWEEN.Tween( camera ).to( { position: camera.position }, 600 ).start();
	// 	}
		
	// });
	var lrside= false;
	if(conts[0].getBoundingClientRect().top+conts[0].getBoundingClientRect().height/2 > 0){
		//currentCameraPosition = new THREE.Vector3().copy(camera.position);
		targetPosition = new THREE.Vector3( .5, 1.5, 0 );
		lrside = false
		//newfov = oldfov
		
	}else
	if(conts[1].getBoundingClientRect().top+conts[1].getBoundingClientRect().height/2 > 0){
		//currentCameraPosition = new THREE.Vector3().copy(camera.position);
		targetPosition = new THREE.Vector3( -.5, 1.5, 0 );
		
		lrside = true
		//newfov = oldfov
		//camera.updateProjectionMatrix();
	}else
	if(conts[2].getBoundingClientRect().top+conts[2].getBoundingClientRect().height/2 > 0){
		//currentCameraPosition = new THREE.Vector3().copy(camera.position);
		targetPosition = new THREE.Vector3( .5, 1.5, 0 );
		
		lrside = false
		//newfov = oldfov * 1.2
		//camera.updateProjectionMatrix();
	}else
	if(conts[3].getBoundingClientRect().top <= window.innerHeight){
		//currentCameraPosition = new THREE.Vector3().copy(camera.position);
		targetPosition = new THREE.Vector3( 0, 1, 0 );
		
		lrside = true
		//newfov = oldfov * 1.2
		//camera.updateProjectionMatrix();
	}
	var s =.1;
	
	// actor.lookat(camera.position.x,-.12,camera.position.z)
	// camera.lookAt(targetPosition.x,1.5,0 );
	if(lrside){
	 	s =-.1
	}else{
	 	s = .1
		
	}
	
	const tween = new TWEEN.Tween(currentCameraPosition)
	.to(targetPosition, 2000) // Duration in milliseconds
	.easing(TWEEN.Easing.Quadratic.InOut)
	.onUpdate(() => {
		camera.position.x =currentCameraPosition.x*targetPosition.x;
		camera.position.y =2;
		camera.position.z =2;

		
		actor.lookat(camera.position.x,-.12,camera.position.z)
		camera.lookAt(targetPosition.x,targetPosition.y,0 );
		
		camera.updateProjectionMatrix();
		if(lrside){
			conts[1].dispatchEvent(levent);
			conts[2].dispatchEvent(levent)
		}else{
			conts[0].dispatchEvent(revent);
			conts[3].dispatchEvent(revent)
		}
	})
	.start();	
	
	
	
})


// const controls = new OrbitControls( camera, renderer.domElement );
// 				controls.target.set( 0, 1, 0 );
// 				controls.update();



stats = new Stats();
// document.body.appendChild( stats.dom );

window.addEventListener("mousemove",(event)=>{
	
	
})

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.lookAt( .6, 1.5, 0 );
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
const listener = new THREE.AudioListener();
camera.add( listener );

// const panel = new GUI( { width: 310 } );
// const folder1 = panel.addFolder( 'sound' );
// var settings = {
//     'play sound':false
// }
// THREE.Cache.enabled = true;
// folder1.add(settings,"play sound").onChange(actor.GUIActions.play);

function animate() {
	requestAnimationFrame( animate );
	//console.log(scene);
    const delta = clock.getDelta();
    actor.update(delta);
	TWEEN.update();
	render();
    stats.update();
	
}
window.addEventListener("click",(e)=>{
	if(INTERSECTED.name != "ground"){
		console.log(INTERSECTED.name);
		actor.setINTERCEPTED(INTERSECTED);
		if(INTERSECTED.name == "navbar")
			/*s*/;
		else{
			//console.log(INTERSECTED.name);
			//INTERSECTED = null;
			//actor.setINTERCEPTED(null);
		}
	}else{
		// console.log(INTERSECTED.name);
		// console.log(INTERSECTED.getObjectByName("Armature"))
	}
	
	for(var i of scene.children){
		console.log(i.name);
		if(i.name === "Scene"){
			console.log("slkdfh",i.children)
			
			
		}
	}
	console.log(scene);
})
window.addEventListener("mousemove",(event)=>{
	//console.log(INTERSECTED);
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	if(INTERSECTED){
		actor.setINTERCEPTED(INTERSECTED);
		
	}else{
		
	}
	if(INTERSECTED.name != "ground"){
		//console.log(INTERSECTED.name);

		
	}else{
		// console.log(INTERSECTED.name);
		// console.log(INTERSECTED.getObjectByName("Armature"))
	}
	if(INTERSECTED.name == "navbar"){
		//actor.setNextAnime("Idle")
		
	}
	
	for(var i of scene.children){
		//console.log(i.name);
		if(i.name === "Scene"){
			//console.log("slkdfh",i.children)
			
			
		}
	}
	//console.log(scene,"asdfjkhaksdf");
})

function render(){
	raycaster.setFromCamera( pointer, camera );

	const intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			INTERSECTED = intersects[ 0 ].object;
			//INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			//INTERSECTED.material.emissive.setHex( 0xff0000 );
			//console.log(INTERSECTED);

		}

	} else {

		// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

		//INTERSECTED = null;

	}
	var whereto = window.innerWidth * (-.75);
	//console.log(window.innerWidth);
	//console.log(actor.x)
	// if(actor.getPosition())
	// 	if(actor.getPosition()){
	// 		var xx = actor.getPosition().x;
	// 		if(actor.x <= .75){
				
	// 			//actor.move(actor.x,0,0)
				
	// 		}
	// 		actor.x+=.1;
	
			
	// 	}
	//actor.roatate(0,0,0);
	
	//actor.roatate(0,0,0);
	renderer.render( scene, camera );
	cssrenderer.render(scenecss,csscamera);

}

document.addEventListener("speak", e => {
	actor.GUIActions.play()
  })

if ( WebGL.isWebGLAvailable() ) {
	raycaster = new THREE.Raycaster();
	
	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}
// var test = document.querySelector("#audioplays")
// test.autoplay = true;
// test.load();
// console.log(test.autoplay);
// if (navigator.getAutoplayPolicy(test) === "allowed") {
// 	// The video element will autoplay with audio.
//   } else if (navigator.getAutoplayPolicy(test) === "allowed-muted") {
// 	// Mute audio on video
// 	test.muted = true;
//   } else if (navigator.getAutoplayPolicy(test) === "disallowed") {
// 	// Set a default placeholder image.
// 	console.log("no sir")
//   }

//   if (test !== undefined) {
// 	test.then(_ => {
// 	  // Autoplay started!
// 	  test.play();
// 	}).catch(error => {
// 	  // Autoplay was prevented.
// 	  // Show a "Play" button so that user can start playback.
// 	});
//   }