/** @jsxImportSource @emotion/react */

import { Platform } from '../types';
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
import { useState } from 'react';

// https://api-docs.igdb.com/#platform-family
enum Family {
  PlayStation = 1,
  Xbox, // 2
  Sega, // 3
  Linux, // 4
  Nintendo, // 5
}

// https://api-docs.igdb.com/#platform
enum Category {
  console = 1, // FaGamepad
  arcade, // 2 -
  platform, // 3
  operating_system, // 4
  portable_console, // 5
  computer, // 6
}

enum PlatformIds {
  Windows = 6,
  Mac = 14,
  Linux = 3,
  Android = 34,
  iOS = 39,
}

const PlatformIcons = ({ platforms }: { platforms: Platform[] }) => {
  // I don't use useState because I want to avoid rerenders during the icon calculations and because the component is static
  let playStation = false; // FaPlaystation
  let xbox = false; // FaXbox
  let linux = false; // FaLinux
  let nintendo = false; // SiNintendo
  let windows = false; // FaWindows
  let mac = false; // FaApple
  let android = false; // FaAndroid
  let iOS = false; // FaAppStoreIos
  let otherDevices = false; // MdDevicesOther

  if (!platforms) return <FaQuestion />;

  platforms.map((platform: Platform) => {
    switch (platform.id) {
      case PlatformIds.Windows:
        if (windows) return;
        windows = true;
        return;

      case PlatformIds.Mac:
        if (mac) return;
        mac = true;
        return;

      case PlatformIds.Linux:
        if (linux) return;
        linux = true;
        return;

      case PlatformIds.Android:
        if (android) return;
        android = true;
        return;

      case PlatformIds.iOS:
        if (iOS) return;
        iOS = true;
        return;
    }

    if (platform.platform_family) {
      switch (platform.platform_family) {
        case Family.PlayStation:
          if (playStation) return;
          playStation = true;
          return;

        case Family.Xbox:
          if (xbox) return;
          xbox = true;
          return;

        case Family.Linux:
          if (linux) return;
          linux = true;
          return;

        case Family.Nintendo:
          if (nintendo) return;
          nintendo = true;
          return;
      }
    }

    if (otherDevices) return;
    otherDevices = true;
    return;
  });

  return (
    <div
      css={{
        display: 'flex',
        '> *': {
          padding: '0 4px',
        },
      }}
    >
      {windows && <FaWindows />}
      {playStation && <FaPlaystation />}
      {xbox && <FaXbox />}
      {nintendo && <SiNintendo />}
      {linux && <FaLinux />}
      {mac && <FaApple />}
      {android && <FaAndroid />}
      {iOS && <FaAppStoreIos />}
      {otherDevices && <FaGamepad />}
    </div>
  );
};

export default PlatformIcons;
