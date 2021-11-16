//Crea una escena en la que estarán todos nuestros elementos como objetos, camaras y luces. 
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // Añade "cube" a la escena.
    scene.add(cube);
    return(cube);
}
function init() {

    //Crea una cámara, la cual define a dónde estamos mirando.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    //Se crea un render y se establece el tamaño.
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Muestra los ejes en pantalla.
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    //Se agrega luz.

   light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( -10, 10, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 


    Cubo = [];   // Definir un array unidimensional para almacenar tres cubos
    var dim = prompt("Ingrese valor de la dimension del cubo ","Valor"); //La variable ang guarda el valor ingresado por el usuario.
    if(dim != null){
	alert("Has escrito " + dim); //Si el usuario digita un valor, es indicado a modo de otra ventana emergente.
    } else {
	alert("No has escrito nada"); //Si el usuario NO digita valor, aparece este mensaje.
    }

    delta= dim/2;
    diagonal= Math.sqrt(Math.pow(delta, 2)+ Math.pow(delta, 2));
    
    var Angulo = prompt("Ingrese valor del angulo a rotar del cubo EN GRADOS","Valor"); //La variable ang guarda el valor ingresado por el usuario.
    if(Angulo != null){
	alert("Has escrito " + Angulo); //Si el usuario digita un valor, es indicado a modo de otra ventana emergente.
    } else {
	alert("No has escrito nada"); //Si el usuario NO digita valor, aparece este mensaje.
    }
    ang_rad= (Angulo)*((2*Math.PI)/(360)); //Conversión de grados a radianes.
    Angulo_2= ((Math.PI)/4)-ang_rad;
    valor=(Math.cos(Angulo_2))*diagonal;

    Cubo.push(cubo(dim, dim, dim, 'red', 'Physical', false)); //Se agrega el cubo 0.

    Cubo.push(cubo(dim, dim, dim, 'green', 'Physical', false)); //Se agrega el cubo 1.

    Cubo.push(cubo(dim, dim, dim, 'yellow', 'Physical', false)); //Se agrega el cubo 2.

    for(i=0; i<3; i++){  //Se trasladan los tres cubos con uno de sus vértices al origen de coordenadas.

      Cubo[i].translateX(valor); 
      Cubo[i].translateZ(valor); 
      Cubo[i].translateY(delta); 
    }
    
    for(i=1; i<3; i++){ //Transformaciones de escalado y traslación sobre el eje y.

        escala= 1/(2*i); //Escalado a la mitad del cubo anterior.
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); //Da la posición para que los cubos queden superpuestos.
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    }

    Cubo[0].rotateY(ang_rad);
    Cubo[2].rotateY(ang_rad);


    //Posicionamiento de la cámara
    camera.position.set(-3*dim, 4*dim, 3*dim);
    camera.lookAt(scene.position);

    //Agrega la salida del render al elemento html.
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // renderiza la escena.
    renderer.render(scene, camera);
}