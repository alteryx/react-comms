The UI-SDK is a software development kit built on top of our UI-Core library. The library is a suite of React components that use [Material-UI (MUI)](https://github.com/mui-org/material-ui) with a custom Alteryx theme.

The UI-SDK provides global context, a Provider component, and multiple messaging APIs. The messaging API that you use will depend on the Alteryx product that your custom app will live in.

## Initial Setup

If this is your first time rocking and rolling through a project, congratulations! Here are some helpful things you’ll need in your environment to get started.

### Git

This is more important if you’re on a windows machine as mac tends to ship with at least some version of Git (though you’ll likely want to update your version). Checkout these installation docs: https://www.atlassian.com/git/tutorials/install-git. This will also install a pretty nice command line interface on windows called git bash that emulates a lot of the functionality that people prefer from mac/linux. 

### Node

To install node, go here: https://nodejs.org/en/download/. We recommend using the LTS version. You can also use nvm or similar if your project is dependent on an older version of node. (**Note: **If you’re using a windows machine you will almost certainly need to remove the version of node that visual studio ships with. Under computer search for node.exe and remove the file if it stems from a visual studio/ directory)

### Package Managers

Both npm and yarn work here. Installing node will add npm by default. If you’d prefer yarn, go ahead and checkout the installation docs here: [https://classic.yarnpkg.com/en/docs/install](https://classic.yarnpkg.com/en/docs/install#mac-stable)

### Visual Studio Code

While you can technically use any IDE, we recommend installing Visual Studio Code. Many of our linters and other tools are configured to work most easily with VS Code. Additionally, TypeScript support is strongest in VS Code. 

## Using The Dev-Harness

We’ve built a pretty awesome development harness that will you allow to simulate custom application development in real time. It provides you a sandboxed iframe to develop your custom application within, which is housed within a sample "product" that mocks some of the data contracts you can expect to interact with from within an Alteryx product. Additionally, it provides you all of the build processes you'll need to get your tool deployed to the Alteryx product of your choosing. To get started with this, clone this repo: [UI-SDK Dev Harness](https://git.alteryx.com/ayx-ui-sdk/ui-sdk-dev-harness)
