import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs'

const FILE_PATH = join(homedir(), 'weather-data.json')
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const saveKeyValue = async (key, value) => {
    const data = {}

    if(await isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(FILE_PATH, JSON.stringify(data));
};

const getKyeValue = async (key) =>{
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

export {saveKeyValue, getKyeValue, TOKEN_DICTIONARY}