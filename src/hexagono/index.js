'use strict'
const fs = require('fs')
const inquirer = require('inquirer')

const utils = require(`${__dirname}/../utils`)

const PATH = `${__dirname}/../../prov/hexagono`
const PROV = fs.readdirSync(PATH)

let ProjectName
exports.provider = async (projectName) => {
  ProjectName = projectName
  for (let i = 0; i < PROV.length; i++) {
    const pro = PROV[i];
    await askSelect(fs.readdirSync(`${PATH}/${pro}`), pro, `${PATH}/${pro}`)
  }
}

const askSelect = async (arr, kind, dir) => {
  const QUESTIONS = [
    {
      type: 'checkbox',
      message: `What kind of ${kind} do you want?`,
      name: kind,
      choices: arr,
    }
  ]

  let answers = await inquirer.prompt(QUESTIONS)

  try {
    for (let i = 0; i < answers[kind].length; i++) {
      const element = answers[kind][i];

      if (utils.isFile(`${dir}/${element}`)) {
        utils.createFile(`${dir}/${element}`, `${ProjectName}${dir.replace(PATH, '')}/${element}`)
      } else {
        await askSelect(fs.readdirSync(`${dir}/${element}`), element, `${dir}/${element}`)
      }

    }
  } catch (e) {
    console.log(e)
  }

}