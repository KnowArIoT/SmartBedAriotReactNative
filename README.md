# SmartBedAriotReactNative

## Requirements:
Install these first
```
brew install node
brew install watchman
npm install -g react-native-cli
```
## Setup
- Open Xcode and select Xcode -> Preferences -> Locations
- Set `default Command line tools` for å bygge

## To build and run the project:
### iOS:
- ```npm install``` (in `SmartBedAriotReactNative/` root) - Eventually, if you get errorts here, do follow the next steps:
  - ```rm -rf node_modules/ && npm i && rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json && rm -rf $TMPDIR/react-* &&  rm -rf $TMPDIR/haste-map-react-native-packager-*```
- ```cd ios/ $$ pod install```
- ```react-native run-ios```


### Android
- ```react-native run-android```
  - If you get `no device found` you need to connect your own Android devide into the computer or start an Android Simulator from Android Studio. You can run  ```adb devices``` to see if you have any devices available.
  - If  you get errors with build tools, you need to install Android Studio >= 3.1
- To build a release APK to Android:
1. ```cd android && ./gradlew assembleRelease```
2. ```react-native run-android --variant=release```
3. The file is saved in `android/app/build/outputs/apk/app-release.apk`
