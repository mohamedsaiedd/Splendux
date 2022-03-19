import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70 , window.innerWidth / window.innerHeight , 1  , 700);
const renderer = new THREE.WebGL1Renderer({canvas : document.querySelector("#bg")})  

//threed module render and light

const light = new THREE.PointLight( 0xffffff);
light.position.set(120,120,120); // soft white light
scene.add( light );

const gltfLoader = new GLTFLoader();
gltfLoader.load('scene.gltf ', function(gltf) {
    scene.add(gltf.scene);
    gltf.scene.scale.set(15.5, 15.5, 15.5);

});



// scene.background = new THREE.Color( 0x02002 );
camera.position.set(10,10,40);
renderer.setClearColor( 0xffffff, 0)
const orbitcontrol = new OrbitControls(camera , renderer.domElement);


const geometry =  new THREE.TorusGeometry( 10, 4, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x5162fb } );
const torus = new THREE.Mesh( geometry, material );
// scene.add( torus );

const PointLight = new THREE.PointLight(0xffffff)
PointLight.position.set(120,120,120);
scene.add( PointLight );

// const pointLightHelper = new THREE.PointLightHelper( PointLight);
// const gridHleper =  new THREE.GridHelper(200,50)
// scene.add(   );



renderer.setClearColor( 0xffffff, 1);
function animate() {
    requestAnimationFrame( animate );  
    scene.rotation.x += .004;
    // torus.rotation.x += .01;
    scene.rotation.y -= .004;
    scene.rotation.Z -= .004;

    orbitcontrol.update()
  
    renderer.render( scene , camera);

    Array(1).fill().forEach(addStar)

    //resizing the scene
    renderer.setSize(window.innerWidth , window.innerHeight);
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

}

animate()

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );

// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/Two Moons - Bobby Richards.mp3' , function( buffer ) {
	sound.setBuffer( buffer );
	sound.setRefDistance( 10 );
    // sound.play();
	sound.setLoop( true );
});



//add stars to the canvas
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25,24,24)
    const matrial = new THREE.MeshBasicMaterial({color : 0x5162fb})
    const star = new THREE.Mesh( geometry , matrial )
   const [x , y , z ] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(320));
   star.position.set(x,y,z)
   scene.add(star)
}
//changing sound state from mute to unmute
const soundOff = document.getElementById('soundOff');
soundOff.addEventListener('click' , function() {
    
        const x = soundOff;
        
        if (x.innerHTML === "mute") {
            
          x.innerHTML = "play";
        
          sound.pause();
          
        } else {
          x.innerHTML = "mute";
          sound.play();
         
        }
      
})


//moon texture
// const moonTexture  = new THREE.TextureLoader().load('./textures/moon.jpg');

// const moon = new THREE.Mesh(
//     new THREE.SphereGeometry(3,44,23),
//     new THREE.MeshStandardMaterial(
//         {
//             map : moonTexture,
//         }
//     )
// )

// moon.position.set(20,20,20)
// // moon.scale.set(15.5, 15.5, 15.5);
// scene.add(moon)
// // sound on ios

window.addEventListener('touchstart', function() {

	// create empty buffer
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;

	// connect to output (your speakers)
	source.connect(myContext.destination);

	// play the file
	source.noteOn(0);

}, false);

var isUnlocked = false;
function unlock() {
			
	if(isIOS || this.unlocked)
		return;

	// create empty buffer and play it
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;
	source.connect(myContext.destination);
	source.noteOn(0);

	// by checking the play state after some time, we know if we're really unlocked
	setTimeout(function() {
		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
			isUnlocked = true;
		}
	}, 0);

}


//function move camera 

function cameraMove() {
const t = document.body.getBoundingClientRect().top;
gltf.rotation.x += 0.5;


camera.position.z = t * -0.1;

camera.position.x = t * -0.1
}

document.body.scroll = cameraMove