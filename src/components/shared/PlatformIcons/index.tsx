/** @jsxImportSource @emotion/react */

import { Platform } from '../../../types';
import {
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaWindows,
  FaGamepad,
  FaApple,
  FaAndroid,
  FaAppStoreIos,
  FaQuestion,
} from 'react-icons/fa';
import { SiNintendo } from 'react-icons/si';
import Tooltip from '@reach/tooltip';

import { cloneElement } from 'react';
import styles from './styles';

// https://api-docs.igdb.com/#platform-family
enum Family {
  PlayStation = 1,
  Xbox, // 2
  Sega, // 3
  Linux, // 4
  Nintendo, // 5
}

// https://api-docs.igdb.com/#platform
// enum Category {
//   console = 1, // FaGamepad
//   arcade, // 2 -
//   platform, // 3
//   operating_system, // 4
//   portable_console, // 5
//   computer, // 6
// }

enum PlatformIds {
  Windows = 6,
  Mac = 14,
  Linux = 3,
  Android = 34,
  iOS = 39,
}

// We make the key dynamic to describe an object of objects.
interface AvailablePlatform {
  [key: string]: {
    displayName: string;
    found: boolean;
    // icon: IconType,
    icon: JSX.Element;
  };
}

const PlatformIcons = ({ platforms }: { platforms: Platform[] }) => {
  // I don't use useState because I want to avoid rerenders during the icon calculations and because the component is static
  // let playStation = false; // FaPlaystation
  // let xbox = false; // FaXbox
  // let linux = false; // FaLinux
  // let nintendo = false; // SiNintendo
  // let windows = false; // FaWindows
  // let mac = false; // FaApple
  // let android = false; // FaAndroid
  // let iOS = false; // FaAppStoreIos
  // let otherPlatforms = false; // MdDevicesOther

  const availablePlatforms: AvailablePlatform = {
    windows: {
      displayName: 'Windows',
      found: false,
      icon: <FaWindows />,
    },
    playStation: {
      displayName: 'PlayStation',
      found: false,
      icon: <FaPlaystation />,
    },
    xbox: {
      displayName: 'Xbox',
      found: false,
      icon: <FaXbox />,
    },
    nintendo: {
      displayName: 'Nintendo',
      found: false,
      icon: <SiNintendo />,
    },
    linux: {
      displayName: 'Linux',
      found: false,
      icon: <FaLinux />,
    },
    mac: {
      displayName: 'Mac',
      found: false,
      icon: <FaApple />,
    },
    android: {
      displayName: 'Android',
      found: false,
      icon: <FaAndroid />,
    },
    iOS: {
      displayName: 'iOS',
      found: false,
      icon: <FaAppStoreIos />,
    },
    otherPlatforms: {
      displayName: 'Other Platforms',
      found: false,
      icon: <FaGamepad />,
    },
  };

  if (!platforms)
    return (
      <Tooltip label='Platform Unknown'>
        <div>
          <FaQuestion />
        </div>
      </Tooltip>
    );

  platforms.map((platform: Platform) => {
    switch (platform.id) {
      case PlatformIds.Windows:
        if (availablePlatforms.windows.found) return;
        availablePlatforms.windows.found = true;
        return;

      case PlatformIds.Mac:
        if (availablePlatforms.mac.found) return;
        availablePlatforms.mac.found = true;
        return;

      case PlatformIds.Linux:
        if (availablePlatforms.linux.found) return;
        availablePlatforms.linux.found = true;
        return;

      case PlatformIds.Android:
        if (availablePlatforms.android.found) return;
        availablePlatforms.android.found = true;
        return;

      case PlatformIds.iOS:
        if (availablePlatforms.iOS.found) return;
        availablePlatforms.iOS.found = true;
        return;
    }

    if (platform.platform_family) {
      switch (platform.platform_family) {
        case Family.PlayStation:
          if (availablePlatforms.playStation.found) return;
          availablePlatforms.playStation.found = true;
          return;

        case Family.Xbox:
          if (availablePlatforms.xbox.found) return;
          availablePlatforms.xbox.found = true;
          return;

        case Family.Linux:
          if (availablePlatforms.linux.found) return;
          availablePlatforms.linux.found = true;
          return;

        case Family.Nintendo:
          if (availablePlatforms.nintendo.found) return;
          availablePlatforms.nintendo.found = true;
          return;
      }
    }

    if (availablePlatforms.otherPlatforms.found) return;
    availablePlatforms.otherPlatforms.found = true;
    return;
  });

  return (
    <div css={styles.mainContainer}>
      {Object.keys(availablePlatforms).map((platform) => {
        return (
          availablePlatforms[platform].found && (
            <Tooltip
              label={availablePlatforms[platform].displayName}
              key={availablePlatforms[platform].displayName}
            >
              <div>
                {/* I use clone element in order to be able to pass extra props to the icon programatically */}
                {cloneElement(availablePlatforms[platform].icon, {
                  'aria-label': availablePlatforms[platform].displayName,
                })}
              </div>
            </Tooltip>
          )
        );
      })}
    </div>
  );
};

export default PlatformIcons;

// {windows && <FaWindows aria-label='windows' />}
// {playStation && <FaPlaystation aria-label='playStation' />}
// {xbox && <FaXbox aria-label='xbox' />}
// {nintendo && <SiNintendo aria-label='nintendo' />}
// {linux && <FaLinux aria-label='linux' />}
// {mac && <FaApple aria-label='mac' />}
// {android && <FaAndroid aria-label='android' />}
// {iOS && <FaAppStoreIos aria-label='iOS' />}
// {otherPlatforms && <FaGamepad aria-label='otherPlatforms' />}
