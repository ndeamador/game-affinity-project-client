// /** @jsxImportSource @emotion/react */

// import { Platform } from '../types';
// import {
//   FaPlaystation,
//   FaXbox,
//   FaLinux,
//   FaWindows,
//   FaGamepad,
//   FaApple,
//   FaAndroid,
//   FaAppStoreIos,
// } from 'react-icons/fa';
// import { SiNintendo } from 'react-icons/si';
// import { useState } from 'react';

// // https://api-docs.igdb.com/#platform-family
// enum Family {
//   PlayStation = 1,
//   Xbox, // 2
//   Sega, // 3
//   Linux, // 4
//   Nintendo, // 5
// }

// // https://api-docs.igdb.com/#platform
// enum Category {
//   console = 1, // FaGamepad
//   arcade, // 2 -
//   platform, // 3
//   operating_system, // 4
//   portable_console, // 5
//   computer, // 6
// }

// enum PlatformIds {
//   Windows = 6,
//   Mac = 14,
//   Linux = 3,
//   Android = 34,
//   iOS = 39,
// }

// const PlatformIconSelector = ({ platforms }: { platforms: Platform[] }) => {
//   const [foundPlatforms, setFoundPlatforms] = useState({
//     playStation: false, // FaPlaystation
//     xbox: false, // FaXbox
//     // sega: false, // SiSega
//     linux: false, // FaLinux
//     nintendo: false, // SiNintendo
//     // console: false, // FaGamepad
//     // arcade: false, // BiGame
//     windows: false, // FaWindows
//     mac: false, // FaApple
//     android: false, // FaAndroid
//     iOS: false, // FaAppStoreIos
//     otherDevices: false, // MdDevicesOther
//   });

//   // console.log('foundPlatforms: ', platforms[0].platform_family? true : false , platforms[0]);
//   // platforms.map((platforms) =>
//   //   console.log(
//   //     'platform id:',
//   //     platforms.id === PlatformIds.Windows,
//   //     platforms.id,
//   //     typeof platforms.id,
//   //     PlatformIds.Windows,
//   //     typeof PlatformIds.Windows
//   //   )
//   // );

//   platforms.map((platform: Platform) => {
//     switch (platform.id) {
//       case PlatformIds.Windows:
//         if (foundPlatforms.windows) return;
//         setFoundPlatforms({ ...foundPlatforms, windows: true });
//         return;

//       case PlatformIds.Mac:
//         if (foundPlatforms.mac) return;
//         setFoundPlatforms({ ...foundPlatforms, mac: true });
//         return;

//       case PlatformIds.Linux:
//         if (foundPlatforms.linux) return;
//         setFoundPlatforms({ ...foundPlatforms, linux: true });
//         return;

//       case PlatformIds.Android:
//         if (foundPlatforms.android) return;
//         setFoundPlatforms({ ...foundPlatforms, android: true });
//         return;

//       case PlatformIds.iOS:
//         if (foundPlatforms.iOS) return;
//         setFoundPlatforms({ ...foundPlatforms, iOS: true });
//         return;
//     }

//     if (platform.platform_family) {
//       switch (platform.platform_family) {
//         case Family.PlayStation:
//           if (foundPlatforms.playStation) return;
//           setFoundPlatforms({ ...foundPlatforms, playStation: true });
//           return;

//         case Family.Xbox:
//           if (foundPlatforms.xbox) return;
//           setFoundPlatforms({ ...foundPlatforms, xbox: true });
//           return;

//         // case Family.Sega:
//         //   if (foundPlatforms.sega) return;
//         //   setFoundPlatforms({...foundPlatforms, sega: true})
//         //   return <SiSega key={i} />;

//         case Family.Linux:
//           if (foundPlatforms.linux) return;
//           setFoundPlatforms({ ...foundPlatforms, linux: true });
//           return;

//         case Family.Nintendo:
//           if (foundPlatforms.nintendo) return;
//           setFoundPlatforms({ ...foundPlatforms, nintendo: true });
//           return;
//       }
//     }

//     // if (platform.category) {
//     //   switch (platform.category) {
//     //     case Category.arcade:
//     //       if (foundPlatforms.arcade) return;
//     //       setFoundPlatforms({...foundPlatforms, arcade: true})
//     //       return <BiGame key={i} />;

//     //     case Category.console:
//     //       if (foundPlatforms.console) return;
//     //       setFoundPlatforms({...foundPlatforms, console: true})
//     //       return <FaGamepad key={i} />;
//     //   }
//     // }

//     if (foundPlatforms.otherDevices) return;
//     setFoundPlatforms({ ...foundPlatforms, otherDevices: true });
//     return;
//   });

//   return (
//     <div
//       css={{
//         display: 'flex',
//         '> *': {
//           padding: '0 4px',
//         },
//       }}
//     >
//       {foundPlatforms.windows && <FaWindows />}
//       {foundPlatforms.playStation && <FaPlaystation />}
//       {foundPlatforms.xbox && <FaXbox />}
//       {foundPlatforms.nintendo && <SiNintendo />}
//       {foundPlatforms.linux && <FaLinux />}
//       {foundPlatforms.mac && <FaApple />}
//       {foundPlatforms.android && <FaAndroid />}
//       {foundPlatforms.iOS && <FaAppStoreIos />}
//       {foundPlatforms.otherDevices && <FaGamepad />}
//     </div>
//   );
// };

// export default PlatformIconSelector;

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

const PlatformIconSelector = ({ platforms }: { platforms: Platform[] }) => {
  // I don't use useState because I want to avoid rerenders during the icon calculations.
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

export default PlatformIconSelector;
