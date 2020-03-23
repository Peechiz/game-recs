import React from "react";
import { ReactComponent as Playstation } from "../assets/icons/playstation.svg";
import { ReactComponent as Mac } from "../assets/icons/apple.svg";
import { ReactComponent as Linux } from "../assets/icons/linux.svg";
import { ReactComponent as Switch } from "../assets/icons/switch.svg";
import { ReactComponent as Xbox } from "../assets/icons/xbox.svg";
import { ReactComponent as PC } from "../assets/icons/windows.svg";
import { ReactComponent as IOS } from "../assets/icons/ios.svg";
import { ReactComponent as Android } from "../assets/icons/android.svg";
import { ReactComponent as Wii } from "../assets/icons/wii.svg";

const Platforms = {
  switch: /switch/i,
  mac: /mac/i,
  pc: /pc/i,
  linux: /linux/i,
  xbox: /xbox/i,
  playstation: /ps|playstation/i,
  android: /android/i,
  ios: /ios/i,
  wii: /wii/i,
};

const Platform = ({ platform, style }) => {
  // const [PlatformIcon] = Object.keys(Platforms)
  //   .map(key => Platforms[key])
  //   .filter(p => p.test.test(platform.name))
  //   .map(p => p.value);

  const testFor = (str, p) => Platforms[str].test(p.name);

  return (
    <>
      {testFor("ios", platform)         && <IOS {...style} />}
      {testFor("android", platform)     && <Android {...style} />}
      {testFor("xbox", platform)        && <Xbox {...style} />}
      {testFor("playstation", platform) && <Playstation {...style} />}
      {testFor("mac", platform)         && <Mac {...style}/>}
      {testFor("linux", platform)       && <Linux {...style} />}
      {testFor("switch", platform)    && <Switch {...style} />}
      {testFor("pc", platform)          && <PC {...style} />}
      {testFor("wii", platform)          && <Wii {...style} />}
    </>
  );
};

export default Platform;
