#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveTokern = async (token) =>{
    if(!token.length){
        return printError("NO pull token")
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token saved!')
    } catch (error) {
        printError(error.message)
    }
    
}

const initCLI = () =>{
    const args = getArgs(process.argv)

    if(args.h){
        printHelp()
    }
    if(args.s){
        // Сохранить город
    }
    if(args.t){
       return saveTokern(args.t)
    }
    getWeather('Kyiv')
    // Вывести погоду
};

initCLI();