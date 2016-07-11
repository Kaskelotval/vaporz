// Set up the scene, camera, and renderer as global variables.
var scene, controls, camera, renderer;

init();
animate();
function init(){

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x490E61, 0.0002 );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 30;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    scene.add(camera);

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

}

//rotate it a little

function animate() {
    requestAnimationFrame( animate );
    render();
}
//render to scene
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );

}
