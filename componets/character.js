
import * as THREE from 'three';
import {AnimationUtils} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Animations } from './animations.js';
import { SkinMesh } from './SkinMesh.js';
import { Vocals } from './vocals.js';
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

export  class Character{

    constructor(scene,renderer,camera){
        console.log(window);
        this.scene = scene;
        this.renderer = renderer;
        this.animations = new Animations(this.scene);
        this.mixer;
        this.model;
        this.skinmesh;
        this.skeleton;
        this.anime;
        this.camera = camera;
        this.whichAnimetion = "";
        //this.voice = new Vocals("./Rhubarb-Lip-Sync-1.13.0-Linux/greats.wav")
        this.GUIActions={
            //play:this.voice.play
        }
        this.target = new THREE.Object3D();
        this.target.position.z = 2;
        this.intersectionPoint = new THREE.Vector3();
        this.planeNormal = new THREE.Vector3();
        this.plane = new THREE.Plane();
        this.mousePosition = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.head;
        this.actions;
        this.activeAction;
        this.previousAction;
        this.clip;
        this.INTERCEPTED;
        this.oldheadtrack = [];
        this.lastcameraPos;
        this.initalHeadPos = new THREE.Vector3();
        this.Tween = new TWEEN.Tween();
        this.moveback = false;
        this.nextanime = "";
        this.x = 0.0
        this.y = 0
        this.z = 0
       
    }
    setNextAnime(val){
        this.nextanime = val;
    }
    setINTERCEPTED(INTERCEPTED){
        this.INTERCEPTED = INTERCEPTED;
    }
    voicedata=(uri)=>{
        //this.voice.setaudiojson(uri);
    }
    getPosition(){
        if(this.model)
            return this.model.position;
        return undefined;
    }
    move(x,y,z){
        if(this.model)
            this.model.position.set(x,y,z);
    }
    roatate(x,y,z){
        if(this.model)
            this.model.rotation.set(0,(Math.PI / 2),0)
    }
    addAnimetions(uri,name){
        this.animations.add(uri,name);
    }
    setAnimation(name){
        setTimeout(()=>{
            this.animations.activeanimation = name;
            if(this.animations.CURRENTLIST[name].name ==  name){
               
                this.whichAnimetion = name;
               
            }
            
        },100)
       
    }
    get(val){
        return this[val];
    }
    animate(delta){
       
        if(this.mixer){ 
            // this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
            var anim = this.animations;
         
            var cli = anim.animations[anim.CURRENTLIST[this.animations.activeanimation].position];
            //console.log(anim,anim.CURRENTLIST[this.animations.activeanimation].position);
            var anime = this.mixer.clipAction(cli);
           
           // this.clip.tracks.splice(3, 3);
           
            //console.log(this.clip.tracks);
           
            if(this.INTERCEPTED){
                //console.log(this.INTERCEPTED.name)
                
                //this.head = this.model.getObjectByName("Head");
            if(this.INTERCEPTED.name== "navbar"){
                
                // if(this.mixer){ 
                //     this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                    
                //     this.clip = this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position-1];
                //     // this.clip.tracks.splice(3, 3);
                //     this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                // }
                // anim.stop( () => {
                //     // Start your next animation here
                //     //this.mixer.clipAction(this.animations.activeanimation).play();
                // });
                if(this.head){
                    //this.Tween.stop()
                    // this.anime.reset()
                    //this.anime.stop();
                    this.anime = {};
                    
                        //console.log("asflkhaksfhkljasdasdfh");
                   
                    anim.getObjectByName(this.animations.activeanimation).tracks[7].values= [];
                    this.Tween.stop();
                    this.Tween = {};
                    //console.log(anim);
                    //console.log(this.oldheadtrack);
                    //console.log(this.animations.getObjectByName(this.animations.activeanimation).tracks)
                    //anim.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                    this.head.lookAt(this.target.position);
                    // this.moveback = true
                    // this.head.lookAt(this.target.position);
                   this.Tween = new TWEEN.Tween();
                   this.Tween = new TWEEN.Tween(this.target.position)
                   .to(this.camera.position, 8000) // 2 seconds duration
                   .easing(TWEEN.Easing.Quadratic.InOut) // Easing function
                   .onUpdate(() => {
                    console.log("asfljhakjfdsh")
                    
                   });
                   var cli = anim.animations[anim.CURRENTLIST[this.animations.activeanimation].position];
                    console.log(anim,anim.CURRENTLIST[this.animations.activeanimation].position);
                    var anime = this.mixer.clipAction(cli);
                    //anime.reset();
                    
                    this.anime = anime;
                    anime.play();
                  
                
                   
                }
            }else if(this.INTERCEPTED.name== "projects"){
                //this.INTERCEPTED = null;
                //this.INTERCEPTED = null;
                if(this.head){
                    this.Tween.stop();
                    this.Tween = {};
                   
                    // this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                    this.head.lookAt(this.target.position);
                    this.moveback = true
                    // this.head.lookAt(this.target.position);
                   this.Tween = new TWEEN.Tween();
                }
            }else if(this.INTERCEPTED.name== "contact"){
                if(this.head){
                    this.Tween.stop();
                    this.Tween = {};
                    // this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                    this.head.lookAt(this.target.position);
                    this.moveback = true
                    // this.head.lookAt(this.target.position);
                   this.Tween = new TWEEN.Tween();
                }
            }else if(this.INTERCEPTED.name== "about"){
                if(this.head){
                    this.Tween.stop();
                    this.Tween = {};
                    // this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                    this.head.lookAt(this.target.position);
                    this.moveback = true
                    // this.head.lookAt(this.target.position);
                   this.Tween = new TWEEN.Tween();
                }
            }else{
                //this.head = this.model.getObjectByName("Head");
                //this.head = null;
                
                anim.getObjectByName(this.animations.activeanimation).tracks[7].values= [];
                
                    // this.animations.getObjectByName(this.animations.activeanimation).tracks.splice(6,6)
                    //console.log(this.Tween);
                    
                    this.Tween = new TWEEN.Tween(this.target.position)
                    .to(this.camera.position, 8000) // 2 seconds duration
                    .easing(TWEEN.Easing.Quadratic.InOut) // Easing function
                    .onUpdate(() => {
                        
                        this.anime = {}
                        anim.getObjectByName(this.animations.activeanimation).tracks[7].values= this.oldheadtrack
                        //console.log(anim)
                        var cli = anim.animations[anim.CURRENTLIST[this.animations.activeanimation].position];
                        //console.log(anim,anim.CURRENTLIST[this.animations.activeanimation].position);
                        var anime = this.mixer.clipAction(cli);
                        //anime.reset();
                        
                        this.anime = anime;
                        
                        
                        //this.animations.reload()
                        //this.head.lookAt(this.camera.position);
                        // this.lastcameraPos = this.camera.position;
                    })
                    .start();  
                    
                    
                    // anim = this.animations;
                    // cli = anim.animations[anim.CURRENTLIST[this.animations.activeanimation].position];
                    // console.log(anim,this.animations.animations,this.scene.animations);
                    // anime = this.mixer.clipAction(cli);
                    // //this.animations.reload()
                    // //this.moveback == false
                   
                    // //this.animations.getObjectByName(this.animations.activeanimation).tracks = this.oldheadtrack
                   
                    // anime.play();
                
                //console.log( this.oldheadtrack);
                // this.head.lookAt(this.camera.position);             
                //this.animations.getObjectByName(this.animations.activeanimation).tracks = this.oldheadtrack
            }
        }
     
            // if(this.head){
                // this.anime.enabled = true;
				// this.anime.setEffectiveTimeScale( 1 );
				//  this.anime.setEffectiveWeight( .1 );
                //this.animations.getObjectByName("Head.quaternion")["value"]=[]
                // this.anime.clampWhenFinished = true;
                // this.anime.loop = THREE.LoopOnce
               
                
               
                //console.log( this.skinmesh.data["Wolf3D_Head"].lookAt(this.target.position));
            // }
       
            
            anime.play();
            this.Tween.update();
            this.mixer.update(delta);
        }
        
        
        //this.talk(this.mouth)
    }
    mouth=(cues,val)=>{
        
        //console.log(cues,val,"skdnflhsdf");
        //console.log(this.voice.photonics,cues,val,this.skinmesh["class"])
        // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Teeth",this.voice.photonics[cues],val);
        //     if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Head",this.voice.photonics[cues],val);
        // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Teeth",cues,val);
        // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Head",cues,val);
        // if(cues == this.voice.photonics[cues]){
        //     console.log("it is here",cues)
        //     // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Teeth",cues,val);
        //     // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Head",cues,val);
            
        // }else{
        //     // console.log("it is there",cues)
        //     // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Teeth",this.voice.photonics[cues],val);
        //     // if(this.skinmesh) this.skinmesh["class"].action("Wolf3D_Head",this.voice.photonics[cues],val);
        // }
    }
    talk(callback){
        //this.voice.talk(callback)
    }
    events =()=>{
        document.addEventListener("speak",(e)=>{
            
            this.GUIActions.play(true);
        })
        document.addEventListener("mousemove", (e)=>{
            //console.log(this.head)
            this.mousePosition.x = (e.clientX /window.innerWidth) * 2-1;
            this.mousePosition.y =  -(e.clientY/window.innerHeight)*2 +1;
            this.planeNormal.copy(this.camera.position).normalize();
            this.plane.setFromNormalAndCoplanarPoint(this.planeNormal,this.scene.position);
            this.raycaster.setFromCamera(this.mousePosition,this.camera);
           
            this.raycaster.ray.intersectPlane(this.plane,this.intersectionPoint);
            this.target.position.set(this.intersectionPoint.x,this.intersectionPoint.y,2);
            //console.log(this.animations)
            //this.animations.reload()
        })
    }
    lookat(x,y,z){
        var arg = arguments;
        if(this.model)
            this.model.lookAt(x,y,z);
    }
    load=()=>{
        const loader = new GLTFLoader();

        
        loader.load( './models/6625fafc8be5a6962779be1e (4).glb',( gltf )=> {

            this.model = gltf.scene;
            this.model.name = "maincharacter"
            this.skinmesh = new SkinMesh(this.model);
            this.skinmesh.name = "character"
            this.scene.add(this.model);
            this.oldheadtrack =  this.animations.getObjectByName(this.animations.activeanimation).tracks[7].values
        //    console.log(model.getObjectByName(""),model.getObjectByProperty("material"),scene)
            // console.log(model.getObjectByName("Wolf3D_Head")["morphTargetInfluences"][skinmesh["data"]["morphTargetDictionary"]["morphTargetDictionary"].mouthSmileLeft]=1)
            
            this.mixer = new THREE.AnimationMixer(this.model);
            
            // if (blendMode !== this.clip.blendMode) {
                
            //     if (blendMode === AdditiveAnimationBlendMode) {
            //         AnimationUtils.makeClipAdditive(clip);
            //     } else {
            //         clip.blendMode = blendMode;
            //     }
            // }
            this.actions= {};
            // console.log(this.animations.getObjectByName("Head.quaternion")["valuse"]=[]);
            // for( let i =0; i < gltf.animations.length; i++){
            //     const clip = gltf.animations[i];
            //     const action = this.mixer.clipAction(clip);
            //     this.actions[clip.name] = action;
            //     console.log(clip.name);

            // }
            // for(var i=0; i< this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position].tracks.length; i++){
            //     this.oldheadtrack.push(this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position].tracks[i]);
            // }
            
            
            this.head = this.model.getObjectByName("Head");
            // this.head.name = "head"
            // this.initalHeadPos = this.head.position;
            // this.clip = this.scene.animations[this.animations.CURRENTLIST[this.whichAnimetion].position-1];
            // // this.clip.tracks.splice(3, 3);
            // this.oldheadtrack = this.scene.animations
            // console.log( this.oldheadtrack)

            this.x = this.model.position.x;
            this.y = this.model.position.y;
            this.z = this.model.position.z;
            this.model.traverse( function ( object ) {
                // console.log(object);
                //mixer = new THREE.AnimationMixer(object);
                if ( object.isMesh ) object.castShadow = true;

            } );

            
            
            
            //this.voice.load();
            this.skeleton = new THREE.SkeletonHelper( this.model );
                            this.skeleton.visible = false;
                            this.scene.add(this.skeleton );

        }, undefined, function ( error ) {

            console.error( error );

        } );

        
    }
    update(delta){
        this.animate(delta)
        this.animations.update()
        //this.voice.update();
        
        
    }

}



