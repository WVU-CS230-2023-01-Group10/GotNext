# GotNext
<p align="center">
  <img src="https://media0.giphy.com/media/hogmFYXmaAa8CLWsoy/giphy.gif?cid=ecf05e47gt6j3923w1mncze26fbaaht9z1b3a0t4uiai8kbq&rid=giphy.gif&ct=g" />
</p>

GotNext is a web application created by our development team to improve the way games are played at parties. Users can create a party or join an existing party. Games can be created within the party for people to partner up and join. Hosts have the option to invite/remove players, decide the tournament style (queue, round robin, double elimination, etc...), and start/end the games. All users in the party can check the status of the game, the order of the queue, and view the other players in the game. 

## Features 
- User can either be a host for a party or a player
- Player
  - Players join a party via a 4-6 digit code
  - Join the queue for a game in the party
  - View players in line, queue order, and progress of the game
- Host
  - Create or delete a party
  - Create or delete a game
  - Choose game style of a game
  - Get a unique QR code for the party

## Required Packages 
```
npm install bootstrap
npm install firebase
npm install bootstrap-icons
npm install ngx-scanner-qrcode --save
npm install angularx-qrcode --save
```

## Deployment
App is currently deployed at: https://got-next-app.web.app/

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app automatically updates if you change any of the source files.

## Contributors 
Ian Jackson | Nathan Mullins | Bryn Shunney | Samuel Moody | Grant Stumpf | Daniel Mancini | Joel Robertson

<p align="center">
  <a href="https://github.com/WVU-CS230-2023-01-Group10/GotNext/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=WVU-CS230-2023-01-Group10/GotNext" />
  </a>
</p>
