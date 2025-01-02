# Zombietyper

## Game Objects

- Fortress
- Gun
  - Bullet
- Zombie
  - and Subtypes
  - hp
- ZombieManager
  - spawns a zombie in the scene
- Text to type (Textmanager)

## Game Class

- Vars
  - ZombieManager (contains list of zombies)
  - fortress (adds fortress to scene)
  - Textmanager (has entire text + current char)
- Methods
  - create()
    - adds fortress+ground
    - reads level from json
    - calls Textmanager with text from json
    - calls ZombieManager with object from json
    - keylistener event mit callback
  - keyInput(key)
    - if(key == textmanager.current) {
      if(textmanager.current==textmanager.text[0])
      {zombiemanager.spawnZombies()}  
       makeKeyWhite(), switchToNextKey(), fortress.shootAtZombie()}
    - if(key == delete) {switchToPreviousKey(),makeKeyGray()}
    - else {makeKeyRed(), switchToNextKey(),fortress.shootAndMissZombie()}
  - update()

## ZombieManager Class

- Vars
  - aliveZombies []
  - scene
- Methods
  - spawnZombies()
    - scene.add(Zombie())
    - aliveZombies.push(Zombie())

## Levels json

```
{
    "levels": [
        {
            level:1,
            waves: [{
                text: sldkfsjldkfjsöalkdfj,
                spawnCount: 5,
                zombies: {normal:5}
            },{
                text: söalfkdjaösldkfjsödlfksdjflöskdjflsd,
                spawnCount: 10,
                zombies: {normal:9, tank:1}
            }]
            ammo: 70
        }
    ]
}
```

- [x] make the text styling for the text to type
- [x] make game over at 0 hp
- [x] only allow the zombie to hit the fortress every second
- [x] zombie texture with running animation
  - [x] hitting animation
  - [x] hurt animation
  - [ ] die animation
- [ ] make one fully functioning level (that makes sense to play)
- [ ] level survived screen
- [ ] image of keyboard with layout of which fingers to use for keys (qwertz,qwerty)
- [ ] Code zamräumen und sinnvoll abstrahieren, damit Erweiterungen leicht hinzufügbar sind
- [ ] Intro screen w/level selection
