import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

import vertShader from './../shaders/shader.vert'
import fragShader from './../shaders/shader.frag'

import Furniture from './Furniture'
import environment from './Environment'
import Player from './player'

import setBoundry from './set-boundry'

import building1 from './building1'
import building2 from './building2'
import keysAndMed from './keysAndMed'

import Boss from './boss'
import building3 from './building3'
import building4 from './building4'
import roofTop from './roofTop'
import configControls from './config-controls'
import gameAudio from './game-audio'

export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.time = 0
    this.keys = []
    this.medkit = []
    this.churchBell = new Audio('../../public/audio/bellsound.mp3')
    this.audio = new gameAudio()
    this.inMenu = true
    this.winningLocation = {
      xMax: -85,
      xMin: -105,
      zMax: -5,
      zMin: -20,
      yMax: 30,
      yMin: 14,
    }
  }
  createCamera() {
    this.camera = new BABYLON.UniversalCamera(
      'camera1',
      new BABYLON.Vector3(20, 10, -10),
      this.scene
    )
    this.camera.setTarget(BABYLON.Vector3.Zero())
    this.camera.attachControl(this.canvas, false)

    this.camera.keysUp.push(87)
    this.camera.keysDown.push(83)
    this.camera.keysLeft.push(65)
    this.camera.keysRight.push(68)
    this.camera.angularSensibility = 8000
    this.camera.speed = 1

    this.camera.applyGravity = true
    this.camera.checkCollisions = true

    this.camera.ellipsoid = new BABYLON.Vector3(1, 4, 1)

    //   // clipping
    this.camera.minZ = 0.3

    // this.light = new BABYLON.HemisphericLight()

    this.light = new BABYLON.SpotLight(
      'light1',
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(0, 0, 1),

      Math.PI / 3,
      60,

      this.scene
    )

    // this.light.projectionTextureLightNear = -1000
    this.light.parent = this.camera
    this.light.intensity = 3
    console.log(this.light)

    this.player = new Player(this.camera, this.light, this)
    this.player.flickerLight()
    this.boss = new Boss(this.scene, this.player, this)
  }
  // instructions() {
  //   document.getElementById('instruction-container').style.display = 'initial'
  // }
  gameOver() {
    document.getElementById('game-over').style.display = 'initial'
  }
  gameWon() {
    document.getElementById('game-won').style.display = 'initial'
  }
  exitMenu() {
    let menu = document.getElementById('main')
    menu.remove()
    document.getElementById('sprint-container').style.display = 'initial'
    document.getElementById('health-container').style.display = 'initial'
    this.inMenu = false
  }
  createScene() {
    this.scene = new BABYLON.Scene(this.engine)
    this.scene.onPointerDown = (evt) => {
      if (evt.button === 0) this.canvas.requestPointerLock()
    }
    // apply gravity

    this.scene.gravity = new BABYLON.Vector3(0, -0.3, 0)

    setBoundry(this.scene)

    BABYLON.Effect.ShadersStore['customVertexShader'] = vertShader
    BABYLON.Effect.ShadersStore['customFragmentShader'] = fragShader

    this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP
    this.scene.fogDensity = 0.02
    this.scene.fogColor = new BABYLON.Color3(0, 0, 0)
    this.scene.clearColor = new BABYLON.Color3(0, 0, 0)

    environment('environment', this.scene)

    Furniture('furniture', this.scene)
    building1('building1', this.scene, this)
    building2('building2', this.scene, this)
    building3('building3', this.scene)
    building4('building4', this.scene, this)
    roofTop('roofTop', this.scene)
    keysAndMed('keysAndMed', this.scene, this)

    this.createCamera()
    configControls(this)
  }

  doRender() {
    this.engine.runRenderLoop(() => {
      this.boss.updateBoss()
      this.player.updatePlayer(this.camera)
      this.scene.render()
    })

    window.addEventListener('resize', () => {
      this.engine.resize()
    })
  }
}
