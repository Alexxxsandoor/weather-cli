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

const getForcast = async () =>{
    try {
        const weather = await getWeather(process.env.CITY ?? "Kyiv")
        console.log(weather)
    } catch (error) {
        if(error?.response?.status == 404){
            printError("bad city name")
        }else if(error?.response?.status == 401){
            printError("bad api token")
        }else {
            printError(error.message)
        }
        
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
    getForcast()
};

initCLI();