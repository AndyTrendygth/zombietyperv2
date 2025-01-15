# Zombietyper

## Game Objects

-   Fortress
-   Gun
    -   Bullet
-   Zombie
    -   and Subtypes
    -   hp
-   ZombieManager
    -   spawns a zombie in the scene
-   Text to type (Textmanager)

## Game Class

-   Vars
    -   ZombieManager (contains list of zombies)
    -   fortress (adds fortress to scene)
    -   Textmanager (has entire text + current char)
-   Methods
    -   create()
        -   adds fortress+ground
        -   reads level from json
        -   calls Textmanager with text from json
        -   calls ZombieManager with object from json
        -   keylistener event mit callback
    -   keyInput(key)
        -   if(key == textmanager.current) {
            if(textmanager.current==textmanager.text[0])
            {zombiemanager.spawnZombies()}  
             makeKeyWhite(), switchToNextKey(), fortress.shootAtZombie()}
        -   if(key == delete) {switchToPreviousKey(),makeKeyGray()}
        -   else {makeKeyRed(), switchToNextKey(),fortress.shootAndMissZombie()}
    -   update()

## ZombieManager Class

-   Vars
    -   aliveZombies []
    -   scene
-   Methods
    -   spawnZombies()
        -   scene.add(Zombie())
        -   aliveZombies.push(Zombie())

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

-   [x] make the text styling for the text to type
-   [x] make game over at 0 hp
-   [x] only allow the zombie to hit the fortress every second
-   [x] zombie texture with running animation
    -   [x] hitting animation
    -   [x] hurt animation
    -   [x] die animation
-   [ ] make one fully functioning level (that makes sense to play)
-   [x] level survived screen
-   [ ] Code zamräumen und sinnvoll abstrahieren, damit Erweiterungen leicht hinzufügbar sind
-   [x] Intro screen w/level selection
-   [x] fully working text manager
-   [ ] ammunition management

## Wished End State of the project

-   [x] Am Anfang lande ich in einem Menu Screen wo ich das Spiel starten kann (Story Mode)
-   [x] Dann wechselt die Szene in die Game Szene und das Level startet jos
-   [ ] der Text den man abtippt ist eine Story (mehr oder weniger ein Tagebuch von dem Character in der Fortress)
-   [ ] Es soll begrenzte Munition geben um richtiges abtippen zu belohnen
-   [ ] 5 Level soll es geben (bestehend aus mehreren Waves)
-   [x] Wenn man stirbt kann man dasselbe Level erneut probieren
-   [x] Wenn man ein Level schafft kann man das nächste Level (den nächsten Tag beginnen) jos
-   [ ] Die Level sollen Spaß machen zu spielen indem sie satisfying sind
-   [ ] es gibt für alle game assets coole grafiken
