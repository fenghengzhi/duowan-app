import {Dimensions} from 'react-native';

// 58 app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 640
const uiWidthPx = 720;

function pxToDp(uiElementPx: number): number {
    const dp = uiElementPx * deviceWidthDp / uiWidthPx;
    if (0 < dp && dp < 1) {
        return 1;
    }
    if (-1 < dp && dp < 0) {
        return -1;
    }
    return dp;
}

export default pxToDp;