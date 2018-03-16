brew install node
brew install watchman
npm install -g react-native-cli

Åpne xCode og velg Xcode -> Preferences -> Locations
og set default Command line tools for å bygge

For å kjøre prosjektet:
IOS
- ```npm install``` (i SmartBedAriotReactNative/) evt hvis du får feil her:
- ```rm -rf node_modules/ && npm i && rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json && rm -rf $TMPDIR/react-* &&  rm -rf $TMPDIR/haste-map-react-native-packager-*```
- ```cd ios/ $$ pod install```
- ```react-native run-ios```


ANDROID
- react-native run-android
- Dersom den sier no device found må man enten plugge i sitt eget android device eller starte en Android emulator fra android studio. Man kan kjøre "adb devices" for å se om man har noen tilgjengelige.
- Dersom du får feil med build tools må du installere android studio >= 3.1
- For å lage en release APK til android:
1. cd android && ./gradlew assembleRelease
2. react-native run-android --variant=release
3. Filen legges i android/app/build/outputs/apk/app-release.apk
