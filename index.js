#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// 1) asking user name 
// 2) game heading 
// 3) start functionality 
// 4) deposite function 
// 5) withdraw function 
// 6) check balance function 
// 7) fast cash 
//----------------------------ASKING USER NAME-----------------------------------
const askUserName = async () => {
    const userName_ans = await inquirer.prompt({
        name: `usr_name`,
        type: `input`,
        message: chalk.magenta(`\nWhat is Your Good Name: `),
        validate: (input) => {
            const trimmedInput = input.trim();
            if (trimmedInput === "") {
                return chalk.redBright(`Please enter your name.`);
            }
            else if (!/^[a-zA-Z]+$/.test(trimmedInput)) {
                return chalk.redBright(`Please enter a valid name without numbers.`);
            }
            return true;
        },
    });
    return userName_ans.usr_name;
};
const userName = await askUserName();
async function atm_func() {
    //---------------------------------ATM-Machine HEADING -------------------------
    let appName = chalk.yellow.underline(` Welcome to "ATM-Machine": `);
    console.log(`\n\t`, `\t`, `\t`, `${appName}\n`);
    //----------------------------------- Main function ------------------------------------
    let myBalance = `$350000`;
    let balance = parseInt(myBalance.replace('$', ''));
    let mypin = 1081;
    let remainingBalance;
    let attempt = 1; //  password attempt counter
    // ----------------------------------- PIN FUNCTION -----------------------------
    const validatePIN = async (attempt) => {
        let password = await inquirer.prompt([
            {
                name: 'pin',
                type: 'password',
                message: chalk.magenta('Kindly enter you Pin:'),
                mask: `*`,
                validate: (input) => {
                    const trimmedInput = input.trim();
                    if (trimmedInput === "") {
                        return chalk.redBright(`Please enter your PIN.`);
                    }
                    if (/^[a-zA-Z]+$/.test(trimmedInput)) {
                        return chalk.redBright(`Please enter a valid PIN with numbers only.`);
                    }
                    return true;
                },
            },
        ]);
        if (parseInt(password.pin) === mypin) {
            return true; //  true if PIN is correct
        }
        else {
            if (attempt < 2) { // Check if user has more attempts remaining
                console.log(chalk.red.bold(`\n\t Wrong PIN entered. Please try again.\n`));
                attempt++;
                return validatePIN(attempt);
            }
            else {
                console.log(chalk.red.bold(`\n\t Wrong PIN entered. You have exhausted all attempts. Exiting...\n`));
                process.exit(); // Exit program if all attempts are used
            }
        }
    };
    // -------------------------------------- DEPOSITE AMOUNT FUNCTION ----------------------------------
    const depositAmount = async () => {
        const Deposit_ans = await inquirer.prompt({
            name: `deposit_amount`,
            type: `number`,
            message: chalk.magenta(`Enter the amount to deposit: `),
        });
        if (Deposit_ans.deposit_amount > 0) {
            balance += Deposit_ans.deposit_amount;
            console.log(chalk.green(`\n\t Your Current Balance is: $${balance}\n`));
        }
        else {
            console.log(chalk.red(`\n\t You Entered an Invalid Amount.\n`));
        }
    };
    // -------------------------------- DEPOSITE TO ANOTHER ACCOUNT FUNCTION ----------------------------------
    const depositToAnotherAccount = async () => {
        console.log(chalk.yellow(`\n\t If you want to deposite amount on another account, Please give some details!\n`));
        // function of asking bank name 
        const bankNameAns = await inquirer.prompt({
            name: `bank_name`,
            type: `input`,
            message: chalk.magenta(`Please enter the name of the bank where this person has an account:`),
            validate: (input) => {
                if (input.trim() === "") {
                    return `Please enter the bank name.`;
                }
                return true;
            }
        });
        // function of asking another account person name 
        const askUserName = async () => {
            const userName_ans = await inquirer.prompt({
                name: `usr_name`,
                type: `input`,
                message: chalk.magenta(`Please enter the name of the person whose account you want to deposite money: `),
                validate: (input) => {
                    const trimmedInput = input.trim();
                    if (trimmedInput === "") {
                        return chalk.redBright(`Please enter name.`);
                    }
                    else if (!/^[a-zA-Z]+$/.test(trimmedInput)) {
                        return chalk.redBright(`Please enter a valid name without numbers.`);
                    }
                    return true;
                },
            });
            return userName_ans.usr_name;
        };
        const userName2 = await askUserName();
        // Ask user for the account number
        const accountNumberAns = await inquirer.prompt({
            name: `account_number`,
            type: `input`,
            message: chalk.magenta(`Enter the 16-digit account number of the person in whose account you want to deposit money:`),
            validate: (input) => {
                const trimmedInput = input.trim();
                if (trimmedInput.length !== 16 || !/^\d+$/.test(trimmedInput)) {
                    return `Please enter a valid 16-digit account number.`;
                }
                return true;
            }
        });
        // authentication and welcome line 
        let verMes = chalk.green(`Authentication Successful!`);
        console.log(`\n\t`, `\t`, `\t`, `${verMes}`);
        let usrBankAccName = chalk.yellow.italic(` Welcome "${userName}", you are in "${userName2}" ${bankNameAns.bank_name} Account:`);
        console.log(`\n\t`, `\t`, `${usrBankAccName}\n`);
        // function enter amount to deposite in another account 
        const Deposit_ans = await inquirer.prompt({
            name: `deposit_amount`,
            type: `number`,
            message: chalk.magenta(`Enter the amount to deposit: `),
        });
        if (Deposit_ans.deposit_amount > 0) {
            balance -= Deposit_ans.deposit_amount;
        }
        else {
            console.log(chalk.red(`\n\t You Entered an Invalid Amount.`));
        }
        // message of succesfully aand account balance 
        console.log(chalk.green(`\n\t Successfully "${Deposit_ans.deposit_amount}" deposite in "${userName2}" ${bankNameAns.bank_name} account \n`));
        console.log(chalk.green(`\t "${userName}", Your account balance is "$${balance}".\n`));
    };
    if (await validatePIN(1)) {
        console.log(chalk.green(`\n\t Authentication Successful. ATM Functionalities are unlocked!`));
        let usrAccName = chalk.yellow.italic(` ASSALAM O ALAIKUM "${userName}" Welcome to your Account: `);
        console.log(`\n\t`, `\t`, `${usrAccName}\n`);
        console.log(chalk.green(`\t Your current account balance is: $${balance}.\t\n`));
        // ------------------------------------- START LOOP FOR MAIN OPTIONS--------------------
        let anotherTransaction = true;
        while (anotherTransaction) {
            let atmFunctionalitiese = await inquirer.prompt([
                {
                    name: 'Operations',
                    type: 'list',
                    message: chalk.magenta('Kindly select an option: '),
                    choices: [`- Deposite Amount`, '- Cash Withdraw', '- Check Balance', '- Fast Cash']
                }
            ]);
            //-------------------------- DEPOSITE AMOUNT ---------------------------    
            if (atmFunctionalitiese.Operations === `- Deposite Amount`) {
                const depositChoice = await inquirer.prompt({
                    name: `deposit_choice`,
                    type: `list`,
                    message: chalk.magenta(`Do you want to deposit into your own account or another account?`),
                    choices: [`- My Own Account`, `- Another Account`]
                });
                if (depositChoice.deposit_choice === `- My Own Account`) {
                    await depositAmount();
                }
                else {
                    await depositToAnotherAccount();
                }
            }
            // ----------------------- CASH WITHDRAW FUNCTION ----------------------------
            else if (atmFunctionalitiese.Operations === '- Cash Withdraw') {
                let withdraw = await inquirer.prompt([{
                        name: 'amount',
                        type: 'number',
                        message: chalk.magenta('Enter amount to Withdraw: '),
                    }
                ]);
                if (withdraw.amount < balance && withdraw.amount > 0) {
                    balance -= withdraw.amount;
                    console.log(chalk.green(`\n\t Withdraw $${withdraw.amount} from your account. `));
                    console.log(chalk.green(`\n\t Your current balance is: $${balance}.\n`));
                }
                else {
                    console.log(chalk.red(`\n\tInsufficient balance or Invalid Amount\n`));
                }
            }
            // ------------------------ CHECK BALANCE FUNCTION --------------------------
            else if (atmFunctionalitiese.Operations === '- Check Balance') {
                console.log(chalk.green(`\n\tYour current balance is: $${balance}.\n`));
            }
            // ------------------------- FAST CASH  ------------------------------------
            else if (atmFunctionalitiese.Operations === `- Fast Cash`) {
                const fast_cash = await inquirer.prompt([
                    {
                        type: `list`,
                        name: `option`,
                        message: chalk.magenta(`Please select an option:`),
                        choices: [
                            `- Withdraw: $100`,
                            `- Withdraw: $500`,
                            `- Withdraw: $1000`,
                        ]
                    },
                ]);
                if (balance > 100) {
                    if (fast_cash.option === `- Withdraw: $100`) {
                        balance -= 100;
                        console.log(chalk.green(`\n\t Withdraw $100 from your Account.`));
                        console.log(chalk.green(`\n\t Your current balance is: $${balance}.\n`));
                    }
                    else if (fast_cash.option === `- Withdraw: $500`) {
                        balance -= 500;
                        console.log(chalk.green(`\n\t Withdrawn $500 from your account.`));
                        console.log(chalk.green(`\n\t Your Current Balance is: $${balance}\n`));
                    }
                    else if (fast_cash.option === `- Withdraw: $1000`) {
                        balance -= 1000;
                        console.log(chalk.green(`\n\t Withdrawn $1000 from your account.`));
                        console.log(chalk.green(`\n\t Your Current Balance is: $${balance}\n`));
                    }
                }
                else {
                    console.log(chalk.red(`\n\t Insufficient balance or Invalid Amount\n`));
                }
            }
            // message which appear after complete one function  
            const confirmation_ans = await inquirer.prompt({
                name: `user_confirmation`,
                type: `confirm`,
                message: chalk.red.bold(`Do you want to do another transaction.? `),
            });
            if (confirmation_ans.user_confirmation === false) {
                anotherTransaction = false;
            }
        }
        console.log(chalk.yellow(`\n\t`, `\t`, `Thank you for using the ATM. Have a great day! `));
        let develporName = chalk.magenta.underline ` BILAL WALEED `;
        console.log(chalk.magenta(`\n\t`, `\t`, `\t`, `Developer Name: ${develporName}`));
        process.exit(); // Code for program end
    }
}
atm_func();
