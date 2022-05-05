import { promises as fs } from 'fs';


const fetch = require('node-fetch');
export const downloadImage = async(url:string, path: string) =>{
    const response = await fetch(url,{
        encoding: 'null',
    });
    const buffer = await response.buffer();
    await fs.writeFile(path, buffer);
};

