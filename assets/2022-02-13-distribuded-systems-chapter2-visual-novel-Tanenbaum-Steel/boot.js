const RenJSConfig =  {
  'name': 'Distributed Systems Chapter 2',
  'w': 800,
  'h': 600,
  'renderer': Phaser.AUTO, // become renderer
  'scaleMode': Phaser.ScaleManager.SHOW_ALL,
  'loadingScreen': {
    'background': '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/assets/gui/loaderloaderbackground.png',
    'loadingBar': {
      'asset': '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/assets/gui/loaderloading-bar.png',
      'position': {
        'x': 109,
        'y': 458
      },
      'size': {
        'w': 578,
        'h': 82
      }
    }
  },
  'fonts': '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/assets/gui/fonts.css',
  'guiConfig': '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/story/GUI.yaml',
  storyConfig: '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/story/Config.yaml',
  storySetup: '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/story/Setup.yaml',
  'storyText': [
    '/assets/2022-02-13-distribuded-systems-chapter2-visual-novel-Tanenbaum-Steel/story/Story.yaml'
  ],
  'logChoices': true,
}

const RenJSGame = new RenJS.game(RenJSConfig)
RenJSGame.launch()
