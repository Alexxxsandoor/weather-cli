import { homedir } from 'os';
import { join } from 'path';
import fs, { promises } from 'fs'

const FOLDER_NAME = join(homedir(), '/custom_cache')
const FILE_PATH = join(FOLDER_NAME, 'weather-data.json')
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const saveKeyValue = async (key, value) => {
    let data = {}

    if(await isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        data = JSON.parse(file);
    }

    data[key] = value;    

    //create-folder
    try {
        if(!fs.existsSync(FOLDER_PATH)){
            fs.mkdirSync(FOLDER_PATH);
        }
    } catch (error) {
        printError(error.message)
    }

    await promises.writeFile(FILE_PATH, JSON.stringify(data));
};

const getKeyValue = async (key) =>{
    if(await isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        const data = JSON.parse(file);
        return data[key]
    }
    return undefined;
}

const isExist = async (path) =>{
    try {
        await promises.stat(path);
        return true;
    } catch (error) {
        return false;
    }
    
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY}