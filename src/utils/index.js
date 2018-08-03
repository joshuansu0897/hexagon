'use strict'
const fs = require('fs')
const CURR_DIR = process.cwd()

exports.create = (templatePath, projectName) => {
  fs.mkdirSync(`${CURR_DIR}/${projectName}`)

  this.createDirectoryContents(templatePath, projectName)
}

exports.createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`

    // get stats about the current file
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`)

      // recursive call
      this.createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`)
    }
  })
}

exports.createFile = (filePath, projectPath) => {
  const contents = fs.readFileSync(filePath, 'utf8')

  const writePath = `${CURR_DIR}/${projectPath}`
  fs.writeFileSync(writePath, contents, 'utf8')
}

exports.isDirectory = (path) => {
  const stats = fs.statSync(path)
  return stats.isDirectory()
}

exports.isFile = (path) => {
  const stats = fs.statSync(path)
  return stats.isFile()
}
