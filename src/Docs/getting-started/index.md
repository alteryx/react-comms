UI-Core is a suite of React components that implement [Material-UI (MUI)](https://github.com/mui-org/material-ui) with a custom Alteryx theme.

<details>
  <summary>**Initial Setup**</summary>
  > **Summary**
  
  > If this is your first time rocking and rolling through a project, congratulations! Here are some helpful things you’ll need in your environment to get started.

  > **Git**

  > This is more important if you’re on a windows machine as mac tends to ship with at least some version of Git (though you’ll likely want to update your version). Checkout these installation docs: https://www.atlassian.com/git/tutorials/install-git. This will also install a pretty nice command line interface on windows called git bash that emulates a lot of the functionality that people prefer from mac/linux. 

  > **Node**

  > To install node, go here: https://nodejs.org/en/download/. We recommend using the LTS version. You can also use nvm or similar if your project is dependent on an older version of node. (**Note: **If you’re using a windows machine you will almost certainly need to remove the version of node that visual studio ships with. Under computer search for node.exe and remove the file if it stems from a visual studio/ directory)

  > **Package Managers**
  
  > Both npm and yarn work here. Installing node will add npm by default. If you’d prefer yarn, go ahead and checkout the installation docs here: [https://classic.yarnpkg.com/en/docs/install](https://classic.yarnpkg.com/en/docs/install#mac-stable)

  > **Visual Studio Code**
  
  > While you can technically use any IDE, we recommend installing Visual Studio Code. Many of our linters and other tools are configured to work most easily with VS Code.
</details>

<details>
  <summary>**Using ayx-scripts**</summary>
  > **Summary**

  > We’ve built a pretty awesome toolchain that we think (re: strongly suggest) you should use while bootstrapping your new application or if you are planning on consuming UI-Core! If you’ve already got a project setup or have a toolchain you prefer (note that we don’t encourage the use of create-react-app as it tends to cause difficulties), skip this step. 
  
  > **Getting Started**

  > First run the following from the command line to get access to the ayx artifactory:
  ```js static
    npm config set registry https://artifactory.alteryx.com/artifactory/api/npm/npm/
  ```
  > Then, to use ayx-scripts checkout the repo here: https://git.alteryx.com/ayx-ui/ayx-scripts. Please be sure to run `npm init` in your new project to get yourself a fancy package.json. Follow the documentation in ayx-scripts to get everything setup.

</details>

**Installing UI Core**
  > Run `npm install @ayx/ui-core` and you’ll have access to UI-Core within your new project (assuming you've completed required setup).