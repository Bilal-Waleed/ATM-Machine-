#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 350000;
let mypin = 1081;
console.log(chalk.blue('Welcome to ATM machine...'));
console.log(chalk.green(`\t Your current account balance is: ${myBalance}\t`));
let remainingBalance;
let password = await inquirer.prompt([
    {
        name: 'pin',
        type: 'number',
        message: 'Kindly enter you Pin:',
    },
]);
let verMes = `\n Authentication Successfull. ATM Functionalitiese are unlock`;
let feel = `\n\t Lo phr kad lo mera paisa \t\n`;
if (password.pin === mypin) {
    console.log(chalk.green(verMes));
    console.log(chalk.redBright(feel));
    let atmFunctionalitiese = await inquirer.prompt([
        {
            name: 'Operations',
            type: 'list',
            message: 'Kindly select an option ',
            choices: ['Withdraw', 'Check Balance', 'Exit']
        }
    ]);
    if (atmFunctionalitiese.Operations === 'Withdraw') {
        let withdraw = await inquirer.prompt([{
                name: 'amount',
                type: 'list',
                message: 'Choose an amount or Enter Amount  ',
                choices: [5000, 10000, 15000, 20000, 25000, 'Enter Amount']
            }]);
        if (withdraw.amount === 'Enter Amount') {
            let EnterusrAmount = await inquirer.prompt([{
                    name: 'EnterAmount',
                    type: 'number',
                    message: 'Enter your amount : '
                }]);
            if (EnterusrAmount.EnterAmount > myBalance) {
                console.log(chalk.red('Insufficient Balance.'));
                console.log(chalk.yellow('Thank you for using ATM machine'));
            }
            else {
                remainingBalance = myBalance - EnterusrAmount.EnterAmount;
                console.log(chalk.green(`Your remaining balance is: ${remainingBalance}`));
                console.log(chalk.yellow('Thank you for using ATM machine'));
            }
        }
        else {
            remainingBalance = myBalance - withdraw.amount;
            console.log(chalk.green(`Your remaining balance is: ${remainingBalance}`));
            console.log(chalk.yellow('Thank you for using ATM machine'));
        }
    }
    else if (atmFunctionalitiese.Operations === 'Check Balance') {
        console.log(chalk.green(`Your current balance is 350000`));
        console.log(chalk.yellow('Thank you for using ATM machine'));
    }
    else if (atmFunctionalitiese.Operations === 'Exit') {
        console.log(chalk.yellow('Thank you for using ATM machine'));
    }
    else {
        console.log(chalk.red('Please select an option'));
    }
}
else {
    console.log(chalk.red('Authentication failed, Kindly enter a valid pin!'));
}
