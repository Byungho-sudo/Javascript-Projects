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
  console.log('- List all assignments ("list")');
  console.log('- Remove all assignments ("clear")');
  console.log('- Show Commands ("commands")');
  console.log('- Clear Terminal ("clear terminal")');
  console.log('- Exit ("exit")\n');
}

function askForDueDate(assignmentName) {
  rl.question('Enter the due date for the assignment (DD-MM): ', dueDate => {
    assignmentsArray.push({ name: assignmentName, dueDate });
    console.log(`Added ${assignmentName} with due date ${dueDate} to the array.`);
    askForAssignment();
  });
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
        console.log('Current assignments:');
        console.log('   Assignment   |    Due Date');
        console.log('----------------|----------------');
        assignmentsArray.forEach((assignment) => {
          const paddedName = assignment.name.padEnd(16, ' ');
          const paddedDate = assignment.dueDate.padEnd(16, ' ');
          console.log(`${   paddedName}| ${    paddedDate}`);
        });
        askForAssignment();
        break;

      case 'clear':
        assignmentsArray = [];
        console.log('All assignments have been removed from the array.');
        askForAssignment();
        break;

      case 'clear terminal':
        console.clear();
        askForAssignment();
        break;

      case 'commands':
        showCommands();
        askForAssignment();
        break;

      default:
        if (input.startsWith('-')) {
          const assignmentToRemove = input.substring(1);
          const index = assignmentsArray.findIndex(a => a.name.toLowerCase() === assignmentToRemove.toLowerCase());
          if (index > -1) {
            assignmentsArray.splice(index, 1);
            console.log(`Removed ${assignmentToRemove} from the array.`);
          } else {
            console.log(`${assignmentToRemove} not found in the array.`);
          }
          askForAssignment();
        } else {
          askForDueDate(input);
        }
        break;
    }
  });
}

// Print the welcome message only once when the program starts.
console.clear();
console.log('Welcome to the Assignment Assistant!');
showCommands();
askForAssignment();
