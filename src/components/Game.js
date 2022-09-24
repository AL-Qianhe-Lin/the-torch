import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

import vertShader from './../shaders/shader.vert'
import fragShader from './../shaders/shader.frag'
import Furniture from './Furniture'
import environment from './Environment'
import dirtImg from './../assets/textures/dirt.jpeg'
import concreteImg from './../assets/textures/concrete.jpeg'

export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.time = 0
  }

  createScene() {
    this.scene = new BABYLON.Scene(this.engine)

    this.camera = new BABYLON.FreeCamera(
      'camera1',
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    )
    this.camera.setTarget(BABYLON.Vector3.Zero())
    this.camera.attachControl(this.canvas, false)
    this.light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    )

    let ground = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: 300, height: 300, subdivisions: 2 },

      this.scene
    )
    const dummyGroundTexture = new BABYLON.StandardMaterial()
    dummyGroundTexture.diffuseTexture = new BABYLON.Texture(
      new BABYLON.Color3(1, 2, 1),
      this.scene
    )
    ground.material = dummyGroundTexture
    // const dirtMaterial = new BABYLON.StandardMaterial()
    // dirtMaterial.diffuseTexture = new BABYLON.Texture(concreteImg, this.scene)
    // ground.material = dirtMaterial

    BABYLON.Effect.ShadersStore['customVertexShader'] = vertShader
    BABYLON.Effect.ShadersStore['customFragmentShader'] = fragShader

    const renoWallOne = BABYLON.MeshBuilder.CreateBox('renoWallOne', {
      width: 111,
      height: 17,
      depth: 2,
    })
    renoWallOne.position.x = 75
    renoWallOne.position.y = 8
    renoWallOne.position.z = 129
    0

    const renoWallTwo = BABYLON.MeshBuilder.CreateBox('renoWallTwo', {
      width: 66,
      height: 17,
      depth: 2,
    })
    renoWallTwo.position.x = 129.5
    renoWallTwo.position.y = 8
    renoWallTwo.position.z = 95
    renoWallTwo.rotation.y = Math.PI / 2

    const renoWallThree = BABYLON.MeshBuilder.CreateBox('renoWallThree', {
      width: 35,
      height: 17,
      depth: 7,
    })
    renoWallThree.position.x = 69
    renoWallThree.position.y = 8
    renoWallThree.position.z = 66

    const plaza1 = BABYLON.MeshBuilder.CreateBox('plaza1', {
      width: 80,
      height: 0.3,
      depth: 80,
    })
    plaza1.position.x = 0
    plaza1.position.y = 1
    plaza1.position.z = 0
    const plaza2 = new BABYLON.MeshBuilder.CreateCylinder(
      'plaza2',
      { height: 1, diameter: 70, tessellation: 300 },
      this.scene
    )
    plaza2.position.y = 1

    const newBuildingRoof = BABYLON.MeshBuilder.CreateBox('plaza1', {
      width: 145,
      height: 0.5,
      depth: 70,
    })
    newBuildingRoof.position.x = 60
    newBuildingRoof.position.y = 17
    newBuildingRoof.position.z = 96

    environment('environment', this.scene)
    Furniture('furniture', this.scene)
  }

  doRender() {
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })

    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }
}
