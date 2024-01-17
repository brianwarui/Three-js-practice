import './style.css'
import  * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)


const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30)

// scene.add(camera)



const textLoader = new THREE.TextureLoader().load('pikachu.jpg')

const textLoader2 = new THREE.TextureLoader().load('spacee.jpg')

const textloader3 = new THREE.TextureLoader().load('space2.jpg')



scene.add(textLoader, textLoader2, textloader3)

const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
const torusMaterial = new THREE.MeshStandardMaterial({color:'green'})
const torus = new THREE.Mesh(torusGeometry, torusMaterial)

scene.add(torus, torus)

const sphereGeometry = new THREE.SphereGeometry(3, 20, 20)
const sphereMaterial = new THREE.MeshBasicMaterial({color:'orange', map:textLoader2})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

sphere.position.set(10, 10, 10)

scene.add(sphere)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

scene.add(pointLight)



const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
const boxMaterial = new THREE.MeshStandardMaterial({color:'orange', map:textLoader})
const box = new THREE.Mesh(boxGeometry, boxMaterial)

box.position.set(-10, -10, 10)
scene.add(box)


const gridHelper = new THREE.GridHelper(250, 50)
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

const spaceTexture = new THREE.TextureLoader().load('space2.jpg')
scene.background = spaceTexture


function addStar(){
    const starGeometry = new THREE.SphereGeometry(0.24, 24, 24)
    const starMaterial = new THREE.MeshBasicMaterial({map:textloader3})
    const star = new THREE.Mesh(starGeometry, starMaterial)
    const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}
Array(400).fill().forEach(addStar)


// function moveCamera(){

//     const t = document.body.getBoundingClientRect().bottom;

//     camera.position.x = t* -0.01;
//     camera.position.y = t* -0.002
//     camera.position.z = t * -0.002

// }

// document.body.onscroll = moveCamera


function animate(){
    requestAnimationFrame(animate)
    torus.rotation.x +=0.03
    torus.rotation.y +=0.005
    torus.rotation.z += 0.03

    sphere.rotation.x +=0.001
    sphere.rotation.y +=0.002
    sphere.rotation.z += 0.005

    controls.update()
    renderer.render(scene, camera)
}

animate()
