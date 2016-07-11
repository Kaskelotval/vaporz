// Set up the scene, camera, and renderer as global variables.
var scene, controls, camera, renderer, container;
var clock = new THREE.Clock();

init();
animate();
function init(){


    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x490E61, 0.0002 );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
    camera.position.z = 300;

    controls = new THREE.FlyControls( camera );    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)

    controls.movementSpeed = 2500;
    controls.domElement = container;
    controls.rollSpeed = Math.PI / 6;
    controls.autoForward = false;
    controls.dragToLook = false;


//Hemisphere
    var light = new THREE.HemisphereLight( 0x490E61, 0xFA056F, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );
//Ambient Light


    // Plane
    var size = 500, step = 100;
    var geometry = new THREE.Geometry();
    for ( var i = - size; i <= size; i += step ) {

        geometry.vertices.push( new THREE.Vector3( - 2*size, 0, 2*i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }

    var material = new THREE.LineBasicMaterial( { color: 0x05EAFA, opacity: 0.5 } );

    var line = new THREE.Line( geometry, material, THREE.LinePieces );
    scene.add( line );

//objects

    var geometry = new THREE.SphereGeometry( 10, 6, 6 );
    var material =
        new THREE.MeshLambertMaterial(
            {
                color: 0xCC0000,
                wireframe: true
            });
    var sphere = new THREE.Mesh( geometry, material );
    sphere.rotation.x += 1;
    sphere.rotation.y += 2;
    scene.add( sphere );

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //events

    window.addEventListener( 'resize', onWindowResize, false );
}

//rotate it a little

function onWindowResize( event ) {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame( animate );
    render();
}
//render to scene
function render() {
    var delta = clock.getDelta();

    controls.update(delta);
    renderer.render( scene, camera );

}
