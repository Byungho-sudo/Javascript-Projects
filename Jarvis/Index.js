const readline = require('readline');
const fs = require('fs');
const file = 'assignments.json';

let assignmentsArray;
try {
  const data = fs.readFileSync(file, 'utf8');
  assignmentsArray = JSON.parse(data);
} catch (err) {
  assignmentsArray = [];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showCommands() {
  console.log('Commands:');
  console.log('- Add an assignment (e.g., "Math Homework")');
  console.log('- Remove an assignment (e.g., "-Math Homework")');
  console.log('- Remove all assignments ("clear")');
  console.log('- List all assignments ("list")');
  console.log('- Show Commands ("commands")');
  console.log('- Exit ("exit")\n');
}

function askForAssignment() {
    console.log();
    rl.question('Enter your command: ', input => {
      const lowerInput = input.toLowerCase();
      const command = lowerInput.split(' ')[0];
  
      switch (command) {
        case 'exit':
          fs.writeFileSync(file, JSON.stringify(assignmentsArray, null, 2));
          console.log('Saved assignments to file and exiting the program.');
          rl.close();
          break;
  
        case 'list':
          console.log('Current assignments array:', assignmentsArray);
          askForAssignment();
          break;
  
        case 'clear':
          assignmentsArray = [];
          console.log('All assignments have been removed from the array.');
          askForAssignment();
          break;
  
        case 'commands':
          showCommands();
          askForAssignment();
          break;
  
        default:
          if (input.startsWith('-')) {
            const assignmentToRemove = input.substring(1);
            const index = assignmentsArray.indexOf(assignmentToRemove);
            if (index > -1) {
              assignmentsArray.splice(index, 1);
              console.log(`Removed ${assignmentToRemove} from the array.`);
            } else {
              console.log(`${assignmentToRemove} not found in the array.`);
            }
          } else {
            assignmentsArray.push(input);
            console.log(`Added ${input} to the array.`);
          }
          askForAssignment();
          break;
      }
    });
  }
  

// Print the welcome message only once when the program starts.
console.clear();
console.log('Welcome to the Assignment Assistant!');
showCommands();
askForAssignment();
