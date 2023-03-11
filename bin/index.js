#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import showBanner from "node-banner";
import randomInteger from "random-int";
async function myBanner() {
    await showBanner("\nAdventer Game", chalk.blue("Welcome!"), "green");
}
await myBanner();
//Game variables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
//Player variables
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let HealthPotionDropChance = 50; //Precentage
let running = true;
console.log("Welcome to the Dungeon!");
async function GAME() {
    while (running) {
        console.log("----------------------------------------------------------");
        let enemyHealth = randomInteger(maxEnemyHealth);
        let enemy = enemies[randomInteger(0, 3)];
        console.log("\t# " + enemy + " has appeared! #\n");
        while (enemyHealth > 0) {
            console.log("\tYour HP: " + health);
            console.log("\t" + enemy + "'s HP: " + enemyHealth);
            let input = await inquirer.prompt([
                {
                    name: "userInput",
                    type: "list",
                    message: "What would you like to do?",
                    choices: ["Attack!", "Drink health potion!", "Run!"],
                },
            ]);
            let { userInput } = input;
            if (userInput === "Attack!") {
                let damageDealt = randomInteger(attackDamage);
                let damageTaken = randomInteger(enemyAttackDamage);
                enemyHealth -= damageDealt;
                health -= damageTaken;
                console.log("\t> You strike the " + enemy + " for " + damageDealt + " damage.");
                console.log("\t> You recieve " + damageTaken + " in retaliation!");
                if (health < 1) {
                    console.log("\t> You have taken too much damage, you are too weak to go on!");
                    break;
                }
            }
            else if (userInput === "Drink health potion!") {
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    numHealthPotions--;
                    console.log("\t> You drink health potion, healing yourself for " +
                        healthPotionHealAmount +
                        "." +
                        "\n\t> You now have " +
                        health +
                        " HP." +
                        "\n\t> You have " +
                        numHealthPotions +
                        " health potions left.\n");
                }
                else {
                    console.log("\t> You have no health potions left! Defeat enemies for a chance to get one!\n");
                }
            }
            else if (userInput === "Run!") {
                console.log("\t> You run away from the " + enemy + "!");
            }
            else {
                console.log("\tInvalid Command!");
            }
        }
        if (health < 1) {
            console.log("You limp out of the dungeon, weak from battle.");
            break;
        }
        console.log("------------------------------------------------------------------");
        console.log(" # " + enemy + " was defeated! # ");
        console.log(" # You have " + health + " HP left. #");
        if (randomInteger(100) < HealthPotionDropChance) {
            numHealthPotions++;
            console.log(" # The " + enemy + " dropped a health potion! # ");
            console.log(" # You now have " + numHealthPotions + " health potion(s). # ");
        }
        console.log("-----------------------------------------------------------");
        let inputNew = await inquirer.prompt([
            {
                name: "user_Input",
                type: "list",
                message: "What would you like to do?",
                choices: ["Continue Fighting", "Exit dungeon"],
            },
        ]);
        let { user_Input } = inputNew;
        while (user_Input !== "Continue Fighting" &&
            user_Input !== "Exit dungeon") {
            console.log("Invalid command!");
        }
        if (user_Input === "Continue Fighting") {
            console.log("You continue on your adventure!");
        }
        else if (user_Input === "Exit dungeon") {
            console.log("You exit the dungeon, successful from your adventures!");
            break;
        }
    }
    console.log("##############################################");
    console.log("# THANKS FOR PLAYING! #");
    console.log("##############################################");
}
GAME();
