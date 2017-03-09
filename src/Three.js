import React, {Component} from 'react';
import io from 'socket.io-client';
import THREELib from "three-js";
const THREE = THREELib(['GPUParticleSystem', 'MTLLoader' , 'OBJLoader']);



export default class Three extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount = () => {
    this.ws = io.connect('ws://localhost:4000');
    this.threeLoaders();
  };


  threeLoaders = () => {
    const loader = new THREE.JSONLoader();
        loader.load(
          // resource URL
          '/assets/UFO.json',
          // Function when resource is loaded
          (obj) => {

            const mesh = new THREE.Mesh(obj);
            this.middleLoader(mesh)
          });
  }

  middleLoader = (ship) => {
    const loader = new THREE.JSONLoader();
    loader.load(
      // resource URL
      '/assets/star.json',
      // Function when resource is loaded
      (obj, mat) => {

        this.launchSimpleAnimation(ship, obj);
      });
  }





  launchSimpleAnimation(obj, obj2) {
    var camera, scene, renderer;
    var light1 = new THREE.PointLight(0xffffff, 2, 1000);
    var mouse = new THREE.Vector2();
    var ship = obj;
    var star = obj2

    var particleSystem = new THREE.GPUParticleSystem({
      maxParticles: 250000
    });
    var nodeContainer = new THREE.Object3D();
    var asteroidContainer = new THREE.Object3D();
    var clock = new THREE.Clock(true);
    var tick = 0;
    var options = {
      position: new THREE.Vector3(),
      positionRandomness: 1,
      velocity: new THREE.Vector3(),
      velocityRandomness: 1,
      color: 0x71a4f7,
      colorRandomness: 0.5,
      turbulence: .5,
      lifetime: 10,
      size: 5,
      sizeRandomness: 10,
    };
    var spawnerOptions = {
      spawnRate: 2000,
      horizontalSpeed: 0.75,
      verticalSpeed: 0.75,
      timeScale: 1
    };

    function matLoader(obj, song) {

      var mtlLoader = new THREE.MTLLoader();
      //mtlLoader.setBaseUrl( "/assets/" );
      mtlLoader.setPath(  "/obj/"  );
     let object = mtlLoader.load( obj + ".mtl", function( materials ) {
        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath(  "/obj/"  );
        let object = objLoader.load( obj +".obj", function ( object ) {
          object.position.z = -200;

          createStar(object, song);

        });
        return object;
      });
      return object
    }


    init();
    animate();

    function init() {

      renderer = new THREE.WebGLRenderer({alpha: true});
      renderer.setClearColor(0x000000, 0);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      var addNode = document.getElementById('threeContainer');
      addNode.appendChild(renderer.domElement);
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 500;
      scene = new THREE.Scene();
            light1.position.set(0, 0, 500);
      scene.add(light1);
      scene.add(nodeContainer);

      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('click', onClick, false);
      window.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('mousewheel', onWheel, false);
    }

    //Websocket responses
    this.ws.on('sendName', (data) => {
      console.log('newUser' , data.name);
      createShip(data.name);
    });

    //PLAYLIST UPDATE LOADER
    this.ws.on('sendNewSong', (song) => {
      console.log("newSong" , song);
      matLoader("20facestar" , song);
    });

    function onMouseMove(event) {

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

      camera.position.x = mouse.x * 100;
      camera.position.y = mouse.y * 100;
      camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));

    }


    function modifier(int){
      if (Math.random() > 0.5){
        return int - (int * 2)
      }
      else {return int
      }
    };


    function createStar(newStar, song){
      console.log(song.song.songTitle, "in star");
      var bitmap = document.createElement('canvas');
      bitmap.style.backgroundColor = 'black';
      var g = bitmap.getContext('2d');
      bitmap.width = 2048;
      bitmap.height = 2048;
      g.font = "80px Georgia";
      g.fillStyle = 'white';
      var title = song.song.songTitle;
      if (title.length > 40){
        title = title.substring(0, 40) + '...'
      }

      g.fillStyle='white';
      g.fillText(title, 126, 126);

      var bitmapName = document.createElement('canvas');
      bitmapName.style.backgroundColor = 'black';
      var g = bitmapName.getContext('2d');
      bitmapName.width = 2048;
      bitmapName.height = 2048;
      g.font = "80px Georgia";
      g.fillStyle = 'white';
      name = song.song.uploaderName + " Added"

      g.fillStyle='white';
      g.fillText(name, 126, 126);




      var randSeedX = 100 * Math.random();
      var randSeedY = 60 * Math.random();
      randSeedX = modifier((randSeedX));
      randSeedY = modifier((randSeedY));

      var texture = new THREE.Texture(bitmap)
      texture.needsUpdate = true;

      var textureName = new THREE.Texture(bitmapName)
      textureName.needsUpdate = true;

      var material = new THREE.MeshPhongMaterial({
        color: 0xF36F5E,
        transparent: true,
        opacity: 1,
        shading: THREE.FlatShading
      });

      newStar.position.x = camera.position.x + randSeedX;
      newStar.position.y = camera.position.y - 20 + randSeedY;
      newStar.position.z = camera.position.z - 800;
      newStar.scale.x = 3;
      newStar.scale.y = 3;
      newStar.scale.z = 3;
      newStar.rotation.x = 90;

      newStar.name = 'star';
      scene.add(newStar);



      var material = new THREE.MeshLambertMaterial({map: texture, alpha: true, alphaTest : 0.05});
      var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(80, 80), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x = newStar.position.x + 45;
      plane.position.y = newStar.position.y - 40;
      plane.position.z = newStar.position.z;
      scene.add(plane);

      material = new THREE.MeshLambertMaterial({map: textureName, alpha: true, alphaTest : 0.05});
      plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(80, 80), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x = newStar.position.x + 45;
      plane.position.y = newStar.position.y - 30;
      plane.position.z = newStar.position.z;
      scene.add(plane);

      particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 5000
      });
      particleSystem.position.x = newStar.position.x;
      particleSystem.position.y = newStar.position.y;
      particleSystem.position.z = newStar.position.z;
      particleSystem.rotation.x = 90;
      scene.add(particleSystem);
    }


    function createShip (userName) {


      var bitmap = document.createElement('canvas');

      bitmap.style.backgroundColor = 'black';
      var g = bitmap.getContext('2d');
      bitmap.width = 512;
      bitmap.height = 512;
      g.font = "80px Georgia";
      g.fillStyle = 'white';
      var title = userName;

      g.fillStyle='white';
      g.fillText(title, 126, 126);

      var randSeedX = 100 * Math.random();
      var randSeedY = 60 * Math.random();
      randSeedX = modifier((randSeedX));
      randSeedY = modifier((randSeedY));

      var texture = new THREE.Texture(bitmap)
      texture.needsUpdate = true;

      var material = new THREE.MeshPhongMaterial({
        color: 0x4286f4,
        transparent: true,
        opacity: 1,
        shading: THREE.FlatShading
      });
      //Add random asteroids
       let newShip = new THREE.Mesh(ship.geometry, material);

      //let newShip = ship;
      newShip.position.x = camera.position.x + randSeedX;
      newShip.position.y = camera.position.y - 20 + randSeedY;
      newShip.position.z = camera.position.z - 700;
      newShip.scale.x = 0.2;
      newShip.scale.y = 0.2;
      newShip.scale.z = 0.2;
      newShip.name = 'ship';
      scene.add(newShip);


      var material = new THREE.MeshLambertMaterial({map: texture, alpha: true, alphaTest : 0.05});
      var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 40), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x = newShip.position.x;
      plane.position.y = newShip.position.y + 5;
      plane.position.z = newShip.position.z;
      scene.add(plane);

      particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 5000
      });
      particleSystem.position.x = camera.position.x + randSeedX;
      particleSystem.position.y = camera.position.y - 19 + randSeedY;
      particleSystem.position.z = camera.position.z -200;
      scene.add(particleSystem);

    }

    function onWheel(event){
      camera.position.z -= event.deltaY
    }

    function onClick(event) {

       // createShip();
      //  matLoader(scene, "20facestar");
      }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      camera.position.z -= 1;
      light1.position.z = camera.position.z;


      for (var i = 0; i < asteroidContainer.children.length; i++) {
        if (asteroidContainer.children[i].position.z > camera.position.z) {
          asteroidContainer.children[i].position.z = camera.position.z - 1000 - (Math.random() * 1000);
        }
      }
      var delta = clock.getDelta() * spawnerOptions.timeScale;
      tick += delta;
      if (tick < 0) tick = 0;
      if (delta > 0) {
       // options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
       // options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 20;
       // options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5;
        var randSeedX = 100 * Math.random();
        var randSeedY = 60 * Math.random();
        randSeedX = modifier((randSeedX));
        randSeedY = modifier((randSeedY));
        options.position.x = randSeedX * 2;
        options.position.y = randSeedY * 8;
        //options.position.z = camera.position.z + 200;
        particleSystem.position.z = camera.position.z -200;

        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
          particleSystem.spawnParticle(options);
        }
        var offset = Math.sin(tick * spawnerOptions.verticalSpeed) * 0.05;
        scene.children.forEach((mesh) => {
          if (mesh.name === "ship" ){

            mesh.rotation.y += 0.3;
            mesh.rotation.z = offset;
            mesh.rotation.x = offset;
            mesh.position.y += modifier(offset) * 2;
          } else if (mesh.name === "star"){
            mesh.rotation.y += 0.1;
          }
        });
      }

      particleSystem.update(tick);
      renderer.render(scene, camera);
    }
  }


  render() {
    return (
      <div>
      </div>
    )
  };
};
