import React, {Component} from 'react';
import io from 'socket.io-client';
import THREELib from "three-js";
const THREE = THREELib(['GPUParticleSystem']);


export default class Three extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount = () => {
    this.ws = io.connect('ws://localhost:4000');

    this.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      this.setState({userCount: data.userCount});
      window.wsUserCount = 0;
    });
    this.threeLoaders();
  };


  threeLoaders = () => {
    const loader = new THREE.JSONLoader();
        loader.load(
          // resource URL
          '/assets/UFO.json',
          // Function when resource is loaded
          (obj, mat) => {
            console.log(obj, mat);
            var material = new THREE.MultiMaterial( mat );
            const mesh = new THREE.Mesh(obj, material);
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
        console.log(obj, mat);
        var material = new THREE.MultiMaterial( mat );
        const mesh = new THREE.Mesh(obj, mat);
        this.launchSimpleAnimation(ship,mesh);
      });
  }

  launchSimpleAnimation(obj, obj2) {
    var camera, scene, renderer;
    var light1 = new THREE.PointLight(0xffffff, 2, 1000);
    var mouse = new THREE.Vector2();
    var numAsteroids = 50;
    var ship = obj;
    var star = obj2
    console.log(star, 'Star');
    var particleSystem = new THREE.GPUParticleSystem({
      maxParticles: 25000
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
      camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));

      scene = new THREE.Scene();
      //scene.background = new THREE.Color(0xff0000);
      light1.position.set(0, 0, 500);
      scene.add(light1);
      scene.add(nodeContainer);

      //scene.add(asteroidContainer);
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('click', onClick, false);
      window.addEventListener('mousemove', onMouseMove, false);

    }

    //Websocket responses
    this.ws.on('updateUserCount', (data) => {
      console.log('Received a message from the server!', data);
      var bitmap = document.createElement('canvas');
      var g = bitmap.getContext('2d');
      bitmap.width = 128;
      bitmap.height = 128;
      g.font = 'Bold 20px Arial';

      g.fillStyle = 'white';
      g.fillText(this.state.userCount, 0, 20);
      g.strokeStyle = 'black';
      g.strokeText(this.state.userCount, 0, 20);

// canvas contents will be used for a texture
      var texture = new THREE.Texture(bitmap)
      texture.needsUpdate = true;

      var material = new THREE.MeshLambertMaterial({map: texture});
      var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x = 100;

      plane.position.x = camera.position.x + 20;
      plane.position.y = camera.position.y;
      plane.position.z = camera.position.z - 300;
      scene.add(plane);

      particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 5000
      });
      particleSystem.position.x = 0
      particleSystem.position.y = 0
      particleSystem.position.z = 0
      scene.add(particleSystem);


    });

    //PLAYLIST UPDATE LOADER
    this.ws.on('updatePlaylist', (playlist) => {
      console.log('updateplaylist', playlist.data);



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


    function createStar(playListItem){
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

      camera.position.x = mouse.x * 100;
      camera.position.y = mouse.y * 100;
      camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));
      console.log(camera.position.x + ", " + camera.position.y);

      var bitmap = document.createElement('canvas');
      console.log(bitmap, "bitmap");
      bitmap.style.backgroundColor = 'black';
      var g = bitmap.getContext('2d');
      bitmap.width = 512;
      bitmap.height = 512;
      g.font = "80px Georgia";
      g.fillStyle = 'white';
      // var title = playlistdata[playlist.data.length -1].songTitle;
      var title = "clickTest";
      console.log(title);
      g.fillStyle='white';
      g.fillText(title, 126, 126);


      var randSeedX = 100 * Math.random();
      var randSeedY = 60 * Math.random();
      randSeedX = modifier((randSeedX));
      randSeedY = modifier((randSeedY));

      var texture = new THREE.Texture(bitmap)
      texture.needsUpdate = true;

      var material = new THREE.MeshPhongMaterial({
        color: 0xF36F5E,
        transparent: true,
        opacity: 1,
        shading: THREE.FlatShading
      });
      //Add random asteroids
      let newStar = new THREE.Mesh(star.geometry, material);
      newStar.position.x = camera.position.x + randSeedX;
      newStar.position.y = camera.position.y - 20 + randSeedY;
      newStar.position.z = camera.position.z - 800;
      newStar.scale.x = 2;
      newStar.scale.y = 2;
      newStar.scale.z = 2;
      newStar.rotation.x = 90;

      newStar.name = 'star';
      scene.add(newStar);


      var material = new THREE.MeshLambertMaterial({map: texture, alpha: true, alphaTest : 0.05});
      var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 40), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x = newStar.position.x;
      plane.position.y = newStar.position.y + 10;
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
      console.log(scene);
    }


    function createShip (userName) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

      camera.position.x = mouse.x * 100;
      camera.position.y = mouse.y * 100;
      camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));
      console.log(camera.position.x + ", " + camera.position.y);

      var bitmap = document.createElement('canvas');
      console.log(bitmap, "bitmap");
      bitmap.style.backgroundColor = 'black';
      var g = bitmap.getContext('2d');
      bitmap.width = 512;
      bitmap.height = 512;
      g.font = "80px Georgia";
      g.fillStyle = 'white';
      // var title = playlistdata[playlist.data.length -1].songTitle;
      var title = "clickTest";
      console.log(title);
      g.fillStyle='white';
      g.fillText(title, 126, 126);


      var randSeedX = 100 * Math.random();
      var randSeedY = 60 * Math.random();
      randSeedX = modifier((randSeedX));
      randSeedY = modifier((randSeedY));

      var texture = new THREE.Texture(bitmap)
      texture.needsUpdate = true;

      var material = new THREE.MeshPhongMaterial({
        color: 0xF36F5E,
        transparent: true,
        opacity: 1,
        shading: THREE.FlatShading
      });
      //Add random asteroids
      let newShip = new THREE.Mesh(ship.geometry, material);
      newShip.position.x = camera.position.x + randSeedX;
      newShip.position.y = camera.position.y - 20 + randSeedY;
      newShip.position.z = camera.position.z - 200;
      newShip.scale.x = 0.2;
      newShip.scale.y = 0.2;
      newShip.scale.z = 0.2;
      newShip.name = 'ship';
      scene.add(newShip);


      var material = new THREE.MeshLambertMaterial({map: texture, alpha: true, alphaTest : 0.05});
      var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 40), material);
      plane.material.side = THREE.DoubleSide;
      plane.position.x = newShip.position.x;
      plane.position.y = newShip.position.y + 10;
      plane.position.z = newShip.position.z;
      scene.add(plane);

      particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 5000
      });
      particleSystem.position.x = camera.position.x + randSeedX;
      particleSystem.position.y = camera.position.y - 19 + randSeedY;
      particleSystem.position.z = camera.position.z -200;
      particleSystem.rotation.x = 90;
      //scene.add(particleSystem);
      console.log(scene);
    }


    function onClick(event) {

     // createShip();
        createStar();
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

//   launchAnimation = (obj) => {
//     var camera, scene, renderer;
//     var light1 = new THREE.PointLight(0xffffff, 2, 1000);
//     var mesh;
//     var mouse = new THREE.Vector2();
//     var bufferLimit = 300;
//     var numAsteroids = 50;
//     // instantiate a loader
//     var star = obj;
//     console.log(star, "star 1");
//     // load a resource
//
//
//     var frameCounter = 0;
//     var nodeContainer = new THREE.Object3D();
//     var directLinkContainer = new THREE.Object3D();
//     var muscleLinkContainer = new THREE.Object3D();
//     var asteroidContainer = new THREE.Object3D();
//     var asteroidLinkContainer = new THREE.Object3D();
//     var asteroidHighlightContainer = new THREE.Object3D();
//
//     init();
//     animate();
//
//
//     var composer;
//
//     function init() {
//
//       renderer = new THREE.WebGLRenderer();
//       //renderer.setClearColor(0x000000, 0);
//
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);
//
//       //renderer.setSize(500,500);
//       //renderer.setClearColor(0xFFFFF9, 1);
//       var addNode = document.getElementById('threeContainer');
//       addNode.appendChild(renderer.domElement);
//       camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
//       camera.position.z = 500;
//       camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));
//
//       scene = new THREE.Scene();
//       scene.background = new THREE.Color(0x000000);
//       //scene.fog = new THREE.Fog(0xFFFFF9, 30, 800);
//
//       light1.position.set(0, 0, 500);
//
//      // scene.add(light1);
//
//       var geometry = new THREE.BoxGeometry(200, 200, 200);
//       var material = new THREE.MeshLambertMaterial({color: 'red'});
//       mesh = new THREE.Mesh(geometry, material);
//
//
//       scene.add(nodeContainer);
//       scene.add(directLinkContainer);
//       scene.add(muscleLinkContainer);
//
//       var material = new THREE.MeshLambertMaterial({
//         color: 0x222222,
//         transparent: true,
//         opacity: 1.0,
//         shading: THREE.FlatShading
//       });
//       //var material2 = new THREE.MeshLambertMaterial( { color: 0x547DA6, transparent: true, opacity: 0.8, shading: THREE.FlatShading } );
//       var material2 = new THREE.MeshPhongMaterial({
//         color: 0xF36F5E,
//         transparent: true,
//         opacity: 0.8,
//         shading: THREE.FlatShading
//       });
//       //Add random asteroids
//       for (var i = 0; i < numAsteroids; i++) {
//
//         var radius = 1 + (Math.random() * 5);
//
//         var circleGeometry = new THREE.IcosahedronGeometry(radius, 0);
//         console.log(star);
//
//
//         //var circle = new THREE.Mesh(circleGeometry, material);
//         let circle = new THREE.Mesh(star.geometry, material2);//var newShip = new THREE.Mesh(star);
//
//         circle.scale.x = 5;
//         circle.scale.y = 5;
//         circle.scale.z = 5;
//         circle.rotation.x = 90;
//
//
//         asteroidContainer.add(circle);
//
//         circle.position.x = -480 + ( Math.random() * 960 );
//         circle.position.y = -480 + ( Math.random() * 960 );
//         circle.position.z = camera.position.z - (Math.random() * 1000);
//
//         var radius = 3 * Math.random();
//         var segments = 32;
//
//         var circleGeometry2 = new THREE.CircleGeometry(radius, segments, Math.random(), ( 2 * Math.PI ) * Math.random());
//         var circle2 = new THREE.Mesh(circleGeometry2, material2);
//         asteroidHighlightContainer.add(circle2);
//         circle2.position.x = circle.position.x;
//         circle2.position.y = circle.position.y;
//         circle2.position.z = circle.position.z;
//       }
//
//       scene.add(asteroidContainer);
//       scene.add(asteroidLinkContainer);
//       scene.add(asteroidHighlightContainer);
//
//
//       //POST PROCESSING
//       //Create Shader Passes
//
//
//       var renderPass = new THREE.RenderPass(scene, camera);
//       var copyPass = new THREE.ShaderPass(THREE.CopyShader);
//
//       var vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
//       vignettePass.uniforms["darkness"].value = 1.0;
//
//       window.filmPass = new THREE.ShaderPass(THREE.FilmShader);
//       window.filmPass.uniforms["tDiffuse"].value = 1;
//       window.filmPass.uniforms["time"].value = 1;
//       window.filmPass.uniforms["sCount"].value = 1024;
//       window.filmPass.uniforms["nIntensity"].value = 0.05;
//       window.filmPass.uniforms["grayscale"].value = 0.0;
//
//
//       composer = new THREE.EffectComposer(renderer);
//       composer.addPass(renderPass);
//       composer.addPass(vignettePass);
//       composer.addPass(window.filmPass);
//       composer.addPass(copyPass);
//       //set last pass in composer chain to renderToScreen
//       copyPass.renderToScreen = true;
//       window.addEventListener('resize', onWindowResize, false);
//       window.addEventListener('mousemove', onMouseMove, false);
//       window.addEventListener('touchmove', onTouchMove, false);
//       window.addEventListener('click', onClick, false);
//     }
//
//     //Websocket responses
//     this.ws.on('updateUserCount', (data) => {
//       console.log('Received a message from the server!', data);
//       this.setState({userCount: data.userCount});
//
//       var bitmap = document.createElement('canvas');
//       var g = bitmap.getContext('2d');
//       bitmap.width = 128;
//       bitmap.height = 128;
//       g.font = 'Bold 20px Arial';
//
//       g.fillStyle = 'white';
//       g.fillText(this.state.userCount, 0, 20);
//       g.strokeStyle = 'black';
//       g.strokeText(this.state.userCount, 0, 20);
//
// // canvas contents will be used for a texture
//       var texture = new THREE.Texture(bitmap)
//       texture.needsUpdate = true;
//
//       var material = new THREE.MeshLambertMaterial({map: texture});
//       var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), material);
//       plane.material.side = THREE.DoubleSide;
//       plane.position.x = 100;
//
//       plane.position.x = camera.position.x;
//       plane.position.y = camera.position.y;
//       plane.position.z = camera.position.z - 300;
//       scene.add(plane);
//     });
//
//
//     function onMouseMove(event) {
//
//       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
//
//       camera.position.x = mouse.x * 100;
//       camera.position.y = mouse.y * 100;
//       camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));
//       //console.log( camera.position.x + ", " + camera.position.y );
//
//     }//onMouseMove
//
//     function onTouchMove(event) {
//
//       mouse.x = ( event.changedTouches[0].pageX / window.innerWidth ) * 2 - 1;
//       mouse.y = -( event.changedTouches[0].pageY / window.innerHeight ) * 2 + 1;
//
//       camera.position.x = mouse.x * 100;
//       camera.position.y = mouse.y * 100;
//       camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));
//     }
//
//     function onClick(event) {
//       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//       mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
//
//       camera.position.x = mouse.x * 100;
//       camera.position.y = mouse.y * 100;
//       camera.lookAt(new THREE.Vector3(0, 0, -1000000000000000));
//       console.log(camera.position.x + ", " + camera.position.y);
//
//       // var geometry = new THREE.IcosahedronGeometry(6, 1);
//       //
//       var material = new THREE.MeshLambertMaterial({color: 'red'});
//       //
//
//
//       var material = new THREE.MeshToonMaterial({
//         color: 'red',
//         specular: 'blue',
//         reflectivity: 1,
//         shininess: 1,
//         shading: THREE.SmoothShading,
//       });
//
//
//       console.log(star);
//       let mesh = new THREE.Mesh(star.geometry, material);
//
//       mesh.position.x = camera.position.x;
//       mesh.position.y = camera.position.y;
//       mesh.position.z = camera.position.z - 300;
//       mesh.rotation.x = 90;
//       scene.add(mesh);
//
//     }
//
//     function onWindowResize() {
//
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }
//
//
//     function animate() {
//       requestAnimationFrame(animate);
//       frameCounter++;
//
//       //remove the draw lines function
//       if (frameCounter % 3 == 0) {
//         //drawLines();
//       }
//
//       mesh.rotation.y -= 0.01;
//       camera.position.z -= 1;
//       light1.position.z = camera.position.z;
//       //console.log( camera.position.z + ", " + light1.position.z );
//       //console.log( muscleLinkContainer.children[ 0 ].geometry.vertices[ 1 ].position );
//
//       //generate the rand asteroid and red spinners
//       for (var i = 0; i < asteroidContainer.children.length; i++) {
//         // asteroidHighlightContainer.children[i].rotation.z += 0.05;
//
//         //if you are past the camera move back forward and randomize
//         if (asteroidContainer.children[i].position.z > camera.position.z) {
//           asteroidContainer.children[i].position.z = camera.position.z - 1000 - (Math.random() * 1000);
//           // asteroidHighlightContainer.children[ i ].position.z = asteroidContainer.children[ i ].position.z;
//           // asteroidHighlightContainer.children[ i ].scale.set(0.25, 0.25, 0.25);
//         }
//       }
//
//       //mesh.position.z -= 1;
//       window.filmPass.uniforms["time"].value += 0.01;
//
//       renderer.render(scene, camera);
//       //composer causes problems with alpha channel
//       //composer.render(0.1);
//
//     }
//
//     function drawLines() {
//
//       var material = new THREE.MeshLambertMaterial({
//         color: 0x222222,
//         transparent: true,
//         opacity: 1.0,
//         shading: THREE.FlatShading
//       });
//
//       var radius = 1;
//       var segments = 32;
//
//       var circleGeometry = new THREE.IcosahedronGeometry(radius, 0);
//       var circle = new THREE.Mesh(circleGeometry, material);
//       nodeContainer.add(circle);
//       circle.position.x = mouse.x * 500;
//       circle.position.y = mouse.y * 500;
//       circle.position.z = camera.position.z - 500;
//
//       var material = new THREE.LineBasicMaterial({color: 0x000000});
//
//       if (nodeContainer.children.length > 1) {
//         var geometry = new THREE.Geometry();
//         geometry.vertices.push(
//           new THREE.Vector3(
//             nodeContainer.children[nodeContainer.children.length - 2].position.x,
//             nodeContainer.children[nodeContainer.children.length - 2].position.y,
//             nodeContainer.children[nodeContainer.children.length - 2].position.z),
//           new THREE.Vector3(
//             nodeContainer.children[nodeContainer.children.length - 1].position.x,
//             nodeContainer.children[nodeContainer.children.length - 1].position.y,
//             nodeContainer.children[nodeContainer.children.length - 1].position.z)
//         );
//
//         var line = new THREE.Line(geometry, material);
//         directLinkContainer.add(line);
//       }
//
//       for (var i = 0; i < nodeContainer.children.length; i++) {
//         if (distanceB2P(nodeContainer.children[nodeContainer.children.length - 1].position, nodeContainer.children[i].position) < 70 && distanceB2P(nodeContainer.children[nodeContainer.children.length - 1].position, nodeContainer.children[i].position) > 0.0) {
//           var material = new THREE.LineBasicMaterial({color: 0x333333, linewidth: 1, transparent: true, opacity: 0.6});
//           var geometry = new THREE.Geometry();
//           geometry.vertices.push(
//             new THREE.Vector3(
//               nodeContainer.children[nodeContainer.children.length - 1].position.x,
//               nodeContainer.children[nodeContainer.children.length - 1].position.y,
//               nodeContainer.children[nodeContainer.children.length - 1].position.z),
//             new THREE.Vector3(
//               //nodeContainer.children[ i ].position.x,
//               //nodeContainer.children[ i ].position.y,
//               //nodeContainer.children[ i ].position.z )
//               nodeContainer.children[nodeContainer.children.length - 1].position.x,
//               nodeContainer.children[nodeContainer.children.length - 1].position.y,
//               nodeContainer.children[nodeContainer.children.length - 1].position.z)
//           );
//
//           var line = new THREE.Line(geometry, material);
//           line.geometry.verticesNeedUpdate = true;
//
//           muscleLinkContainer.add(line);
//
//           //if( muscleLinkContainer.children.length == 100 ){
//           animateLineFromOrigin(line, nodeContainer.children[nodeContainer.children.length - 1].position, nodeContainer.children[i].position);
//           //}
//
//         }
//
//         if (muscleLinkContainer.children.length >= (bufferLimit * 5)) {
//           muscleLinkContainer.remove(muscleLinkContainer.children[0]);
//         }
//       }
//
//       for (var i = 0; i < asteroidContainer.children.length; i++) {
//         if (distanceB2P(nodeContainer.children[nodeContainer.children.length - 1].position, asteroidContainer.children[i].position) < 80) {
//
//           var material = new THREE.LineBasicMaterial({color: 0x547DA6, linewidth: 1});
//           var geometry = new THREE.Geometry();
//           geometry.vertices.push(
//             new THREE.Vector3(
//               nodeContainer.children[nodeContainer.children.length - 1].position.x,
//               nodeContainer.children[nodeContainer.children.length - 1].position.y,
//               nodeContainer.children[nodeContainer.children.length - 1].position.z),
//             new THREE.Vector3(
//               //nodeContainer.children[ i ].position.x,
//               //nodeContainer.children[ i ].position.y,
//               //nodeContainer.children[ i ].position.z )
//               nodeContainer.children[nodeContainer.children.length - 1].position.x,
//               nodeContainer.children[nodeContainer.children.length - 1].position.y,
//               nodeContainer.children[nodeContainer.children.length - 1].position.z)
//           );
//
//           var line = new THREE.Line(geometry, material);
//           line.geometry.verticesNeedUpdate = true;
//
//           asteroidLinkContainer.add(line);
//
//
//           animateLineFromOrigin(line, nodeContainer.children[nodeContainer.children.length - 1].position, asteroidContainer.children[i].position);
//
//           //console.log( asteroidHighlightContainer.children[ i ].geometry.parameters.radius );
//           asteroidHighlightContainer.children[i].scale.set(8, 8, 8);
//           //console.log( asteroidHighlightContainer.children[ i ].geometry.parameters.radius );
//           asteroidHighlightContainer.children[i].geometry.verticesNeedUpdate = true;
//         }
//       }
//
//       if (nodeContainer.children.length >= bufferLimit) {
//         nodeContainer.remove(nodeContainer.children[0]);
//         directLinkContainer.remove(directLinkContainer.children[0]);
//       }
//
//       if (asteroidLinkContainer.children.length >= ( bufferLimit / 2 )) {
//         asteroidLinkContainer.remove(asteroidLinkContainer.children[0]);
//       }
//
//     }//drawLines
//
//     function distanceB2P(v1, v2) {
//       var dx = v1.x - v2.x;
//       var dy = v1.y - v2.y;
//       var dz = v1.z - v2.z;
//       var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
//       //console.log( distance );
//       return distance;
//     }
//
//     function getPointInBetweenByPerc(pointA, pointB, percentage) {
//
//       var dir = pointB.clone().sub(pointA);
//       var len = dir.length();
//       dir = dir.normalize().multiplyScalar(len * percentage);
//       return pointA.clone().add(dir);
//
//     }
//
//     function animateLineFromOrigin(object, origin, destination) {
//       var percentage = 0.0;
//       var transPosition;
//
//       function animateAnimateLineFromOrigin() {
//
//         transPosition = getPointInBetweenByPerc(origin, destination, percentage);
//
//         object.geometry.vertices[1].x = transPosition.x;
//         object.geometry.vertices[1].y = transPosition.y;
//         object.geometry.vertices[1].z = transPosition.z;
//         object.geometry.verticesNeedUpdate = true;
//         percentage += 0.02;
//
//         if (percentage < 1.0) {
//           requestAnimationFrame(animateAnimateLineFromOrigin);
//         }
//
//       }
//
//       animateAnimateLineFromOrigin();
//
//     }
//
//
//   };


  render() {
    return (
      <div>
      </div>
    )
  };
};
