#!/usr/bin/env node
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

let ROOT_DIR = '';

/* === ============= === */
/* === ALL FUNCTIONS === */
/* === ============= === */

/* === MAIN FUNCTION === */

async function main() {
    console.log(
        'full project creation with structure. Choices made : Framerwork front : Vite + React / CSS: tailwind 4 / Input Check : Formik & Yup / fake data : faker / store : Zustand / e2e test : cypress / API Rest : Axios // Framework back : Node.Js / Token : JWT Service / Hash : argon2 / test : jest / env variables : dotenv / logger : pino // ORM : Prisma /'
    );

    const answersScopeScript = await inquirer.prompt([
        {
            type: 'expand',
            name: 'scopeScript',
            message: 'Do you want the script to create',
            choices: [
                {
                    key: 'a',
                    name: 'A full-project (front, back & ready to code) ?',
                    value: 'full'
                },
                { key: 'b', name: ' Just the Frontend ?', value: 'front' },
                { key: 'c', name: ' Just the Backend ?', value: 'back' },
                {
                    key: 'd',
                    name: ' Just the frameworks (Back & Front) with the folders only, let the dependencies to me',
                    value: 'skeleton'
                }
            ]
        }
    ]);

    switch (answersScopeScript.scopeScript) {
        case 'full':
            await fullProject();
            break;
        case 'front':
            await frontEndProject();
            break;
        case 'back':
            await backEndProject();
            break;
        case 'skeleton':
            await twitchProject();
            break;
    }

    console.log('finished');
}

/* === CALLING FUNCTIONS === */

async function fullProject() {
    await ensureRootDirectory();
    await frontendFunctions();
    await backendFunctions();
}

async function frontEndProject() {
    await ensureRootDirectory();
    console.log('création des fichiers, mise en place des frameworks front et dependencies');
}

async function backEndProject() {
    await ensureRootDirectory();
    console.log('création des fichiers, mise en place des frameworks back et dependencies');
    backendFunctions();
}

async function twitchProject() {
    await ensureRootDirectory();
    console.log('création des fichiers et mise en place des frameworks');
    // CREATION FRONT
    frontendFramework();
    frontendStructure();

    // CREATION BACK
    backendFramework();
    backendStructure();
}

async function frontendFunctions() {
    await frontendFramework();
    frontendStructure();
    tailwindInstal();
    npmOnlyInstall();
}

async function backendFunctions() {
    await backendFramework();
    backendStructure();
    jwtServiceInstall();
    dotenvInstal();
    pinoInstall();
    prismaInstall();
    npmOnlyBackInstall();
}

/* === COG FUNCTIONS === */

/*root dir*/
async function ensureRootDirectory() {
    const alreadyInRootFolder = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'inRoot',
            message: "you already are in your 'rootfolder', I can create everything here",
            default: false
        }
    ]);

    if (alreadyInRootFolder.inRoot) {
        ROOT_DIR = process.cwd();
    } else {
        const creationRootFolder = await inquirer.prompt([
            {
                type: 'input',
                name: 'rootFolderName',
                message: "what's the name of your projet ?"
            }
        ]);
        ROOT_DIR = path.resolve(creationRootFolder.rootFolderName);
        fs.mkdirSync(`${creationRootFolder.rootFolderName}`, { recursive: true });
    }
}

/* set directories */
function frontendDir() {
    if (!ROOT_DIR) throw new Error('ROOT_DIR non défini !');
    return path.join(ROOT_DIR, 'frontend');
}

function backendDir() {
    if (!ROOT_DIR) throw new Error('ROOT_DIR non défini !');
    return path.join(ROOT_DIR, 'backend');
}

function srcFrontendDir() {
    return path.join(frontendDir(), 'src');
}

function srcBackendDir() {
    return path.join(backendDir(), 'src');
}

/*frontend part*/
function frontendFramework() {
    try {
        execSync('npm create vite@latest frontend', {
            cwd: ROOT_DIR,
            stdio: 'inherit',
            shell: true
        });
    } catch (error) {
        console.log(`Erreur lors de l'installation de React+Vite`, error.message);
    }
}

function frontendStructure() {
    const folders = [
        'components',
        'layout',
        'context',
        'hooks',
        'store',
        'pages',
        'api',
        'types',
        'utils'
    ];
    const frontSrcDir = srcFrontendDir();
    folders.forEach((folder) => {
        fs.mkdirSync(`${frontSrcDir}/${folder}`, { stdio: ['ignore', 'ignore', 'pipe'] });
    });
}

function tailwindInstal() {
    try {
        execSync('npm install tailwindcss @tailwindcss/vite', {
            cwd: frontendDir(),
            stdio: 'inherit'
        });
        //modifying vite.config file
        const frontdir = frontendDir();
        fs.writeFileSync(
            `${frontdir}/vite.config.js`,
            `import { defineConfig } from 'vite'
        import tailwindcss from '@tailwindcss/vite'
        export default defineConfig({
            plugins: [
                tailwindcss(),
            ],
        })`
        );
        //modifying index.css
        const indexFile = path.join(frontendDir(), 'src', 'index.css');
        let contentIndexFile = fs.readFileSync(indexFile, 'utf-8');
        if (!contentIndexFile.includes(`@import "tailwindcss";`)) {
            contentIndexFile = `@import "tailwindcss";` + contentIndexFile;
            fs.writeFileSync(indexFile, contentIndexFile, 'utf-8');
        }
    } catch (error) {
        console.log('Erreur lors de la création de tailwind :', error.message);
    }
}

function npmOnlyInstall() {
    const depList = [
        'npm install -S yup',
        'npm install formik --save',
        'npm install zustand',
        'npm install @faker-js/faker --save-dev',
        'npm install axios',
        'npm install cypress --save-dev'
    ];
    try {
        depList.forEach((install) =>
            execSync(install, { cwd: frontendDir(), stdio: ['ignore', 'ignore', 'pipe'] })
        );
    } catch (error) {
        console.log(
            `Erreur lors de la création d'un de ces services (yup, formik, zustand, faker, axios, cypress) :`,
            error.message
        );
    }
}

/* backend part */
async function backendFramework() {
    const answerCLINest = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'NestOn',
            message: 'Do you have nest CLI installed ? Y/N',
            default: false
        }
    ]);
    if (answerCLINest.NestOn === false) {
        try {
            execSync('npm install -g @nestjs/cli --package-manager npm', {
                cwd: ROOT_DIR,
                stdio: 'inherit'
            });
        } catch (error) {
            console.log('Erreur lors de la création du backend :', error.message);
        }
    }

    try {
        fs.mkdirSync(backendDir(), { recursive: true });
        execSync('nest new . --skip-install --package-manager npm', {
            cwd: backendDir(),
            stdio: 'inherit'
        });
        //execSync('nest new backend', { cwd: ROOT_DIR, stdio: 'inherit' });
    } catch (error) {
        console.log('Erreur lors de la création du backend :', error.message);
    }
}

function backendStructure() {
    const foldersBack = [
        'common',
        'config',
        'modules',
        'shared',
        'utils',
        'assets',
        'users',
        'test',
        'database',
        'auth'
    ];
    const backSrcDir = srcBackendDir();
    foldersBack.forEach((folder) => fs.mkdirSync(`${backSrcDir}/${folder}`, { recursive: true }));
}

function jwtServiceInstall() {
    try {
        execSync('npm install --save @nestjs/jwt', {
            cwd: backendDir(),
            stdio: ['ignore', 'ignore', 'pipe']
        });
        //creation env file with secret
        const backDir = backendDir();
        fs.writeFileSync(
            `${backDir}/.env`,
            `JWT_SECRET = DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE. DON'T FORGET TO PUT THE ENV FILE INTO THE GITIGNORE FILE !,`
        );
    } catch (error) {
        console.log('Erreur lors de la création du service jwt :', error.message);
    }
}

function dotenvInstal() {
    try {
        execSync('npm install dotenv --save', {
            cwd: backendDir(),
            stdio: ['ignore', 'ignore', 'pipe']
        });
        //updating env file
        const backDir = backendDir();
        fs.appendFileSync(
            `${backDir}/.env`,
            `\nS3_BUCKET="YOURS3BUCKET\n"
        SECRET_KEY=YOURSECRETKEYGOESHERE-AND-DONTFORGETTOCHANGEIT`
        );
    } catch (error) {
        console.log('Erreur lors de la création du service dotenv :', error.message);
    }
}

function pinoInstall() {
    try {
        execSync('npm i nestjs-pino', { cwd: backendDir(), stdio: ['ignore', 'ignore', 'pipe'] });
    } catch (error) {
        console.error('Erreur lors de la création du service pino :', error.message);
    }
}

function prismaInstall() {
    try {
        const prismaCmdsList = [
            'npm install prisma --save-dev',
            'npm install @prisma/client',
            `npx prisma init`
        ];

        prismaCmdsList.forEach((install) => {
            try {
                execSync(install, { cwd: backendDir(), stdio: ['ignore', 'ignore', 'pipe'] });
            } catch (error) {
                console.error(
                    `Erreur lors de la création du service : ${install}: `,
                    error.message
                );
            }
        });
    } catch (error) {
        console.error('Erreur lors de la création du service prisma :', error.message);
    }

    /*     try {
        const prismaCmdsList = [
            'npm install prisma tsx --save-dev',
            'npm install @prisma/extension-accelerate @prisma/client'
        ];

        prismaCmdsList.forEach((install) => {
            try {
                execSync(install, { cwd: backendDir(), stdio: ['ignore', 'ignore', 'pipe'] });
            } catch (error) {
                console.error(
                    `Erreur lors de la création du service : ${install}: `,
                    error.message
                );
            }
        });

        const prismaOutDir = path.join(backendDir(), '../app/generated/prisma');
        fs.mkdirSync(prismaOutDir, { recursive: true }); // crée tous les dossiers parents
        try {
            execSync(`npx prisma init --db --output ${prismaOutDir}`, {
                cwd: backendDir(),
                stdio: 'inherit' // affiche les erreurs directement
            });
        } catch (error) {
            console.error('Erreur lors de la création du service Prisma: ', error.message);
        }
    } catch (error) {
        console.error('Erreur lors de la création du service prisma :', error.message);
    } */
}

function npmOnlyBackInstall() {
    const depList = ['npm i argon2', 'npm install --save-dev jest'];

    depList.forEach((install) => {
        try {
            execSync(install, { cwd: backendDir(), stdio: ['ignore', 'ignore', 'pipe'] });
        } catch (error) {
            console.error(`Erreur lors de la création du service : ${install}: `, error.message);
        }
    });
}

/* === ================== === */
/* === CALL MAIN FUNCTION === */
/* === ================== === */

main();
