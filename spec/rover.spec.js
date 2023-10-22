const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("Constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(12345);
    let Roverobj = {
      position: 12345,
      mode: 'NORMAL',
      generatorWatts: 110
    }
    expect(rover).toEqual(Roverobj);
  })

  it("response returned by receiveMessage contains the name of the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(12345);
    let response = rover.receiveMessage(message);
  //  let Roverobj = {
  //    position: 12345,
  //    mode: 'NORMAL',
  //    generatorWatts: 110
    
    expect(response.message).toEqual('Test message with two commands');
})

it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);
//  let Roverobj = {
//    position: 12345,
//    mode: 'NORMAL',
//    generatorWatts: 110
  
  expect(response.results.length).toEqual(2);
})

it("responds correctly to the status check command", function(){
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message with one command', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);
  let Roverobj = {
    position: 12345,
    mode: 'NORMAL',
    generatorWatts: 110
  }
  expect(response.results[0].roverStatus).toEqual(Roverobj);
})

it("responds correctly to the mode change command", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test message with one command', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);
 // let Roverobj = {
 //   position: 12345,
 //   mode: 'NORMAL',
 //   generatorWatts: 110
 // }
  expect(response.results[0].completed).toEqual('true');
})

it("responds correctly to the mode change command", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 34521)];
  let message = new Message('Test message with two command', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);
 // let Roverobj = {
 //   position: 12345,
 //   mode: 'NORMAL',
 //   generatorWatts: 110
 // }
  expect(response.results[1].completed).toEqual(false);
})

it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 34521)];
  let message = new Message('Test message with two command', commands);
  let rover = new Rover(12345);
  let response = rover.receiveMessage(message);
 // let Roverobj = {
 //   position: 12345,
 //   mode: 'NORMAL',
 //   generatorWatts: 110
 // }
  expect(rover.position).toEqual(12345);
})

});
