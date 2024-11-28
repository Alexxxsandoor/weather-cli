#!/usr/bin/env node
import { getArgs } from './helpers/args.js';

const initCLI = () =>{
    const args = getArgs(process.argv)

    if(args.h){
        // Вывести help
    }
    if(args.s){
        // Сохранить город
    }
    if(args.t){
        // Сохранить город
    }
    // Вывести погоду
};

initCLI();