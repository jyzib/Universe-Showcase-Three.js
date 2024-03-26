import * as THREE from 'three';
import {OrbitControls, OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import star from '../stars.jpg'
import sun from '../sun.jpg'
import earth from '../earth.jpg'
const render = new THREE.WebGL1Renderer()
render.setSize(window.innerWidth,window.innerHeight)

const data = document.querySelector('.canvas')
data.appendChild(render.domElement)


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000

)
const orbitControls = new OrbitControls(camera,render.domElement)

const axixes = new THREE.AxesHelper(5)
// scene.add(axixes)
camera.position.set(0,2,5)
orbitControls.update()
const planeGemoutery = new THREE.PlaneGeometry(20,20)
const planeMatrial = new THREE.MeshStandardMaterial({color:0xffffff,side:THREE.DoubleSide})
const plane = new THREE.Mesh(planeGemoutery,planeMatrial)
// scene.add(plane)
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)
const textLoded = new THREE.TextureLoader()
const cubeText = new THREE.CubeTextureLoader()



scene.background = cubeText.load([star,star,star ,star,star,star])
// const dirLight = new THREE.DirectionalLight(0xffffff,0.8)

// scene.add(dirLight)

// dirLight.position.set(-30,50,0)
// const dirHelper = new THREE.DirectionalLightHelper(dirLight)
// scene.add(dirHelper)

const pointlight = new THREE.PointLight(0xffffff,50,300)
scene.add(pointlight)
const helperpoint = new THREE.PointLightHelper(pointlight)
scene.add(helperpoint)
plane.rotation.x = -0.5 * Math.PI

const Spheregeo = new THREE.SphereGeometry(4,50,50)
const spharMatrial = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:false})
const sphare = new THREE.Mesh(Spheregeo,spharMatrial)
const murcharygeo = new THREE.SphereGeometry(2,50,20)
const murcharymatrial = new THREE.MeshStandardMaterial({})
const murcha = new THREE.Mesh(murcharygeo,murcharymatrial)
sphare.material.map = textLoded.load(sun)

const newObj = new THREE.Object3D()

murcha.material.map = textLoded.load(earth)
scene.add(sphare)
murcha.position.x = 10
newObj.add(murcha)
scene.add(newObj)


function animations() {
    sphare.rotation.y += 0.001
    murcha.rotation.y += 0.001
    newObj.rotateY(0.0002)
    render.render(scene,camera)
}
render.setAnimationLoop(animations)


