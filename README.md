# claap test case

Here is a frontend test case made for Claap.io.

## install & run

### install dependencies

```
$ npm i
```

### launch project (dev)

```
$ npm start
```

## dependencies

- [choc-autocomplete](https://github.com/anubra266/choc-autocomplete)

It's a custom implementation of a multi-select with [Chakra-UI](https://chakra-ui.com/) based-components

I wanted to use this custom library because the creator based it with Chakra-UI components and I wanted to get aligned with the project requirements such as the design system.

- [react-redux](https://github.com/reduxjs/react-redux)

It's a library that helps you to manage your state in your application.

I could have used a [React context](https://fr.reactjs.org/docs/context.html) or other stuff like that, but I thing Redux is powerfull even if this test is not big enough to use it.

## feature proposal

### tech dept

The [choc-autocomplete](https://github.com/anubra266/choc-autocomplete) library doesn't all us to get the live user input with a callback such as `onChange`. Indeed, I had to hack it and create manually the event handler with pure JS instead.

To avoid that, we could:

- find another library that does the job
- fork the repo and add/propose this feature to the maintainer
- or create our own multi-select component

### toast

I added some user feedback as [toast](https://chakra-ui.com/docs/components/feedback/toast) messages.

- `error` when the user provides an invalid email address
- `success` when the user provides at least one valid address and clicks on the `invite` button
- `error` when the user provides an email address with "error" in it (sample: `error@gmail.com`) - it's just a test case in order to simulate a backend exception

### storybook

[Storybook](https://storybook.js.org/) is a tool that helps you to create stories and to test your components without any context. It'll be good to implement it for devs (as a technial documentation) and for designers (as a visual documentation).

### tests

I added some utils methods to compute certain data. It'll be better to add some unit tests in order to avoid regression.

We can add rendering and state testing for components I made.

### CI/CD

I didn't make it, but we can think about adding a complete CI/CD pipeline in order to launch tests on a PR, to build the project and deploy it to a dev/prod enviroments.

Generally, I deal with Github Actions, but I could use Travis CI, Circle CI or even GitLab CI.

### responsive design

Only if needed, we could improve the project by handling responsive design.
