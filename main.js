
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Character } from './componets/character.js';
import { NavObjects } from './componets/navobjects.js';



var myCanvas = document.querySelector("#threecanvas")
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
let stats, raycaster;
let clock;

clock = new THREE.Clock()
let INTERSECTED;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 5;


const renderer = new THREE.WebGLRenderer({antialias: true, canvas: myCanvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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
actor.setAnimation("Walking");
actor.voicedata("./Rhubarb-Lip-Sync-1.13.0-Linux/talkings.json")
actor.events();

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
camera.position.set( 0, 2,  3 );
camera.lookAt( 0, 1, 0 );
renderer.shadowMap.enabled = true;

window.addEventListener( 'resize', onWindowResize );

// const controls = new OrbitControls( camera, renderer.domElement );
// 				controls.target.set( 0, 1, 0 );
// 				controls.update();



stats = new Stats();
// document.body.appendChild( stats.dom );

window.addEventListener("mousemove",(event)=>{
	
	
})

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
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
	if(actor.getPosition().x <= whereto)
		actor.move(whereto,actor.y,actor.z);
	renderer.render( scene, camera );

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