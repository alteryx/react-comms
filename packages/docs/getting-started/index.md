The UI-SDK is a software development kit built on top of our Eclipse Component library. The library is a suite of React components that use [Material-UI (MUI)](https://github.com/mui-org/material-ui) with a custom Alteryx theme.

The UI-SDK provides global context, a DesignerApi component, and multiple messaging APIs. The messaging API that you use will depend on the Alteryx product where your custom app lives.

<details>
  <summary>**Initial Setup**</summary>
**Summary**
  
If this is your first project, congratulations! Here are some helpful things you will need to get started.

**Git**

This is more important if you’re on a Windows machine since Mac tends to ship with a version of Git (though you will likely want to update your version). To install Git, go to https://www.atlassian.com/git/tutorials/install-git. The installation also installs a command-line interface (CLI) on Windows called Git Bash. Git Bash emulates a lot of the functionality that Mac/Linux users prefer. 

**Node**

To install node, go to https://nodejs.org/en/download/. We recommend the LTS version. You can also use NVM or similar if your project is dependent on an older version of node. Note: If you use a Windows machine you will most likely need to remove the version of node that Visual Studio ships with. Under computer, search for node.exe and remove the file if it stems from a Visual Studio directory.

**Package Managers**
  
Both npm and yarn are good options. When you install node, npm is added by default. If you prefer yarn, visit the installation documentation at [https://classic.yarnpkg.com/en/docs/install](https://classic.yarnpkg.com/en/docs/install#mac-stable).

### Visual Studio Code

While technically you can use any integrated development environment (IDE), we recommend Visual Studio (VS) Code. We configured many of our linters and other tools to work best with VS Code. Additionally, TypeScript support is strongest in VS Code.
