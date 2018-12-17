'use strict'
const utils = require(`${__dirname}/src/utils`)
const inquirer = require('inquirer')
const fs = require('fs')

const TEMPLATES = fs.readdirSync(`${__dirname}/templates`)

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: TEMPLATES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true
      }
      return 'Project name may only include letters, numbers, underscores and hashes.'
    }
  },
]

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectChoice = answers['project-choice']
    const projectName = answers['project-name']
    const templatePath = `${__dirname}/templates/${projectChoice}`

    utils.create(templatePath, projectName)

    require(`${__dirname}/src`).provider(projectName, projectChoice)
  })
