import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed("ERROR") + " " + error)
}

const printSuccess = (message) =>{
    console.log(chalk.bgGreen('SUCCESS') + " " + message)
}

const printHelp = () =>{
    console.log(
        dedent
        `
        ${chalk.bgYellow('HELP')}
        -h - help
        no params - get Weather
        -s [CITY] - set your city
        -t [API_KEY] - set your API token
        `
    )
}

export {printError, printSuccess, printHelp}