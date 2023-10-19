class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      this.commands = commands;
      if (!name) {
         throw Error ("name not passed as first parameter.");
      }
   }

}

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);

module.exports = Message;