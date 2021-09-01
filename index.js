#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');


const dir = process.argv[2] || process.cwd();
// console.log(process.argv);


fs.readdir(dir, async function (err, files) {
    if (err) {
        console.log(err);
    }

    const statsPromises = files.map((file) => {
        // console.log(path.join(dir, file));
        return lstat(path.join(dir, file));
    });

    const allStats = await Promise.all(statsPromises);

    for (let stat of allStats) {
        let index = allStats.indexOf(stat);

        if (stat.isFile()) {
            console.log(files[index]);
        } else {
            console.log(chalk.bold(files[index]));
        }

        // console.log(files[index], stat.isFile());
    }
});


const lstat = (filename) => {
    return new Promise((resolve, reject) => {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}


/*
method 1 => Sequential Reads
            Only running one lstat function at a time due to async await

for (let file of files) {
    try {
        const stats = await lstat(file);
        console.log(file, stats.isFile());
    } catch (err) {
        console.log(err);
    }
}

const lstat = (filename) => {
    return new Promise((resolve, reject) => {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });

    const { lstat } = fs.promises;

}
*/

/*
directory that we want to open up
process.cwd (inbuilt) -> returns the current working directory  -> cross platform compatibility

1. add bin in package.json
2. chmod +x index.js
3. Add Comment to index.js file to allow it to be treated like an executable. (#!/usr/bin/env node)
4. Linking of the project => npm link
*/