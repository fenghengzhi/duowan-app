import {Constants} from "expo";
import * as React from "react";
import {StatusBar, View} from "react-native";
import {createStackNavigator} from "react-navigation";
import Detail from "../../containers/Detail";
import ImageZommer from "../../containers/ImageViewer";
import BottomTabs from "./BottomTabs";

const RootStack = createStackNavigator({
    Root: {
        screen: BottomTabs,
        navigationOptions: {
            header: null
        }
        // headerMode: 'none',
        // path: '/roo',
    },
    Detail: {
        screen: Detail,

        // headerMode: 'screen',
        // path: '/detail/:id'
    },
    ImageZommer: {
        screen: ImageZommer
    }
}, {
    initialRouteName: 'Root',
    headerMode: 'screen',
    navigationOptions: {headerStyle: {marginTop: -Constants.statusBarHeight}}
});
// export default RootStack;
export default class extends React.Component {
    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <StatusBar
                    showHideTransition={'slide'}
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor={'#000000'} //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
                />
                <RootStack/>
            </View>
        )
    }
}