This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### About the app

* State management in the app is relatively simple: whether the user has completed biometric auth or not which will grant or block access to functionality use the todo list, and the state of the todo list.
* Opted to use a context for each of these states to keep them separate and given their relatively simple scope
* Todo list provider interacts with a Hook responsible for loading data from the async local storage, and syncing data back to persist the state
* General functionality provided once authenticated is the ability to add, edit, delete, and complete todo list items. It also provides the ability to filter out completed items.
* Generally a pretty simple implementation and design.  I focused test coverage mostly on the todo list provider given that is where all the logic and behavior is.
