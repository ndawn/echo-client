import pcIconGraphBlack from '@/assets/img/graph/pc_black.svg';
import pcIconGraphWhite from '@/assets/img/graph/pc_white.svg';
import pcIconGraphBlue from '@/assets/img/graph/pc_blue.svg';

import mobileIconGraphBlack from '@/assets/img/graph/mobile_black.svg';
import mobileIconGraphWhite from '@/assets/img/graph/mobile_white.svg';
import mobileIconGraphBlue from '@/assets/img/graph/mobile_blue.svg';

import serverIconGraphBlack from '@/assets/img/graph/server_black.svg';
import serverIconGraphWhite from '@/assets/img/graph/server_white.svg';
import serverIconGraphBlue from '@/assets/img/graph/server_blue.svg';

import echoIconGraphBlack from '@/assets/img/graph/echo_black.svg';
import echoIconGraphWhite from '@/assets/img/graph/echo_white.svg';
import echoIconGraphBlue from '@/assets/img/graph/echo_blue.svg';

import routerIconGraphBlack from '@/assets/img/graph/router_black.svg';
import routerIconGraphWhite from '@/assets/img/graph/router_white.svg';
import routerIconGraphBlue from '@/assets/img/graph/router_blue.svg';

import switchIconGraphBlack from '@/assets/img/graph/switch_black.svg';
import switchIconGraphWhite from '@/assets/img/graph/switch_white.svg';
import switchIconGraphBlue from '@/assets/img/graph/switch_blue.svg';

import accessPointIconGraphBlack from '@/assets/img/graph/access_point_black.svg';
import accessPointIconGraphWhite from '@/assets/img/graph/access_point_white.svg';
import accessPointIconGraphBlue from '@/assets/img/graph/access_point_blue.svg';

import voipIconGraphBlack from '@/assets/img/graph/voip_black.svg';
import voipIconGraphWhite from '@/assets/img/graph/voip_white.svg';
import voipIconGraphBlue from '@/assets/img/graph/voip_blue.svg';

import printerIconGraphBlack from '@/assets/img/graph/printer_black.svg';
import printerIconGraphWhite from '@/assets/img/graph/printer_white.svg';
import printerIconGraphBlue from '@/assets/img/graph/printer_blue.svg';

import unknownIconGraphBlack from '@/assets/img/graph/unknown_black.svg';
import unknownIconGraphWhite from '@/assets/img/graph/unknown_white.svg';
import unknownIconGraphBlue from '@/assets/img/graph/unknown_blue.svg';

import pcIconMini from '@/assets/img/mini/pc.png';
import mobileIconMini from '@/assets/img/mini/mobile.png';
import serverIconMini from '@/assets/img/mini/server.png';
import echoIconMini from '@/assets/img/mini/echo.png';
import routerIconMini from '@/assets/img/mini/router.png';
import switchIconMini from '@/assets/img/mini/switch.png';
import accessPointIconMini from '@/assets/img/mini/access_point.png';
import voipIconMini from '@/assets/img/mini/voip.png';
import printerIconMini from '@/assets/img/mini/printer.png';
import unknownIconMini from '@/assets/img/mini/unknown.png';


export default {
    defaultType: {
        name: 'unknown',
        verboseName: 'Неизвестно',
        verboseNamePlural: 'Неизвестно',
        icon: {
            black: unknownIconGraphBlack,
            white: unknownIconGraphWhite,
            blue: unknownIconGraphBlue,
            mini: unknownIconMini
        }
    },
    types: [
        {
            name: 'unknown',
            verboseName: 'Неизвестно',
            verboseNamePlural: 'Прочие',
            icon: {
                black: unknownIconGraphBlack,
                white: unknownIconGraphWhite,
                blue: unknownIconGraphBlue,
                mini: unknownIconMini
            }
        },
        {
            name: 'pc',
            verboseName: 'ПК',
            verboseNamePlural: 'ПК',
            icon: {
                black: pcIconGraphBlack,
                white: pcIconGraphWhite,
                blue: pcIconGraphBlue,
                mini: pcIconMini
            }
        },
        {
            name: 'mobile',
            verboseName: 'Мобильное устройство',
            verboseNamePlural: 'Мобильные устройства',
            icon: {
                black: mobileIconGraphBlack,
                white: mobileIconGraphWhite,
                blue: mobileIconGraphBlue,
                mini: mobileIconMini
            }
        },
        {
            name: 'server',
            verboseName: 'Сервер',
            verboseNamePlural: 'Серверы',
            icon: {
                black: serverIconGraphBlack,
                white: serverIconGraphWhite,
                blue: serverIconGraphBlue,
                mini: serverIconMini
            }
        },
        {
            name: 'echo',
            verboseName: 'Echo агент',
            verboseNamePlural: 'Echo агенты',
            icon: {
                black: echoIconGraphBlack,
                white: echoIconGraphWhite,
                blue: echoIconGraphBlue,
                mini: echoIconMini
            }
        },
        {
            name: 'switch',
            verboseName: 'Коммутатор',
            verboseNamePlural: 'Коммутаторы',
            icon: {
                black: switchIconGraphBlack,
                white: switchIconGraphWhite,
                blue: switchIconGraphBlue,
                mini: switchIconMini
            }
        },
        {
            name: 'access_point',
            verboseName: 'Точка доступа',
            verboseNamePlural: 'Точки доступа',
            icon: {
                black: accessPointIconGraphBlack,
                white: accessPointIconGraphWhite,
                blue: accessPointIconGraphBlue,
                mini: accessPointIconMini
            }
        },
        {
            name: 'voip',
            verboseName: 'VoIP-телефон',
            verboseNamePlural: 'VoIP-телефоны',
            icon: {
                black: voipIconGraphBlack,
                white: voipIconGraphWhite,
                blue: voipIconGraphBlue,
                mini: voipIconMini
            }
        },
        {
            name: 'printer',
            verboseName: 'Принтер',
            verboseNamePlural: 'Принтеры',
            icon: {
                black: printerIconGraphBlack,
                white: printerIconGraphWhite,
                blue: printerIconGraphBlue,
                mini: printerIconMini
            }
        },
        {
            name: 'router',
            verboseName: 'Маршрутизатор',
            verboseNamePlural: 'Маршрутизаторы',
            icon: {
                black: routerIconGraphBlack,
                white: routerIconGraphWhite,
                blue: routerIconGraphBlue,
                mini: routerIconMini
            }
        }
    ],
    connectOptions: [
        {
            name: 'ssh',
            verboseName: 'SSH'
        },
        {
            name: 'telnet',
            verboseName: 'Telnet'
        },
        {
            name: 'vnc',
            verboseName: 'VNC'
        }
    ]
}
