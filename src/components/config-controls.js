export default function configControls(game) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      console.log(game.light)
      if (game.inMenu) {
        game.exitMenu()
        let ambience = document.getElementById('myAudio')
        ambience.loop = true
        ambience.autoplay = true
        ambience.load()
      }
    } else if (e.key === 'v') {
      game.instructions()
    } else if (e.key === 'b') {
      game.gameOver()
    } else if (e.key === 'n') {
      game.gameWon()
    } else if (e.key === '1') {
      game.boss.initialize()
    } else if (e.key === 'Shift') {
      game.player.sprinting = true
    } else if (e.key === 'f') {
      game.player.toggleLight()
    } else if (e.key === 'e') {
      if (game.player.checkForKey(game.keys)) {
        document.getElementById(
          'announcement'
        ).innerHTML = `${game.player.keysFound} OUT OF 5 KEYS FOUND`
        game.churchBell.play()
        setTimeout(() => {
          document.getElementById('announcement').innerHTML = ''
        }, 4000)
      }
      if (game.player.pickupMedkit(game.medkit)) {
        game.player.health += 15
        game.audio.gotMed.play()
      } else {
        game.player.checkWin(game.winningLocation)
      }
    }
  })
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
      game.player.sprinting = false
    }
  })
}
