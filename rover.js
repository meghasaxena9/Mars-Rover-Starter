const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = Number(position);
      //this.commands = commands;
    //  if (!position) {
    //     throw Error ("position not passed as parameter.")
    //  }
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let message1 = message;
      let obja = {};
      let objb = {};
      let results = [];

      if (!message1.name) {
         throw Error ("name not passed in message");
      }
      if (!message.commands) {
         throw Error ("no command present");
      }
         
   //   console.log(message);
   //   console.log(message1.commands);
      for (let i=0; i < message1.commands.length; i++) {
   //      console.log("Megha");
    //     console.log(message1.commands[i].commandType);
      if (message1.commands[i].commandType === 'MODE_CHANGE') {
  //       console.log("before", this.mode);
           obja = {};
           objb = {};

       this.mode = message1.commands[i].value;
  //     console.log("after", this.mode);
       obja.completed = 'true';
       results.push(obja);
       
      } else {
         if (message1.commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               obja = {};
               obja.completed = false;
      //         console.log("move fail");
               results.push(obja);
      //         console.log(results);
               obja = {};
            } else {
            this.position = Number(message1.commands[i].value);
      //      console.log(this.position);
            obja.completed = 'true';
            results.push(obja);
      //      console.log(results);
            obja = {};
            objb = {};
         }
         } else {
            if (message1.commands[i].commandType === 'STATUS_CHECK') {
               obja = {};
               objb ={};
               obja.completed = 'true';
               objb.mode = this.mode;
               objb.generatorWatts = this.generatorWatts;
               objb.position = this.position; 
       //        console.log(objb);
               obja.roverStatus = objb;
        //       console.log(obja.roverStatus);
      //         console.log(obja);
         
               results.push(obja);
      //         console.log("here");
      //         console.log(results);
               } else {
                  obja.completed = 'false';
                  throw Error ("no command present");

               }
            }
             
            }
         }
      //   results.push(obja);
     //    console.log(results);
         let Messageobj = {};
         Messageobj.message = message.name;
         Messageobj.results = results;
   //      console.log(results);
         return Messageobj;
      }
 
   }

//let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 34521), new Command('STATUS_CHECK')];
//let commands = [new Command('STATUS_CHECK')];
//let commandsentry = [];
//let commands = [new Command('MOVE', 4321)];
//commandsentry = commands;
let commands = [
   new Command('MOVE', 4321),
   new Command('STATUS_CHECK'),
   new Command('MODE_CHANGE', 'LOW_POWER'),
   new Command('MOVE', 3579),
   new Command('STATUS_CHECK')
];
let message = new Message('Test message with three commands', commands);

let rover = new Rover(100);
//console.log(rover);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);

module.exports = Rover;