#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) =>{
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
const saveCity = async (cityName)=>{
    if(!cityName.length){
        printError("Bad City name");
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, cityName)
        printSuccess('City name saved!')
    } catch (error) {
        printError(error.message)
    }
}

const getForcast = async () =>{
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
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

const initCLI = () => {
    const args = getArgs(process.argv)

    if(args.h){
        return printHelp()
    }
    if(args.s){
        saveCity(args.s)
    }
    if(args.t){
        saveToken(args.t)
    }
    return getForcast()
};

initCLI();