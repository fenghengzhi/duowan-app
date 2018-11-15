import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from 'react-navigation';
import Configs from "../../../containers/Configs";
import GifJiongtu from '../../../containers/GifJiongtu/index';
import Jinrijiongtu from '../../../containers/Jinrijiongtu/index';
import Zuixinjiongtu from "../../../containers/Zuixinjiongtu";

const BottomTabs = createBottomTabNavigator({
    '最新囧图': {
        screen: Zuixinjiongtu,
        navigationOptions: {
            title: '最新囧图',
        }
    },
    '今日囧图': {
        screen: Jinrijiongtu,

        navigationOptions: {
            title: '今日囧图',
            // tabBarIcon: null
        }
    },
    'GIF囧图': {
        screen: GifJiongtu,
        navigationOptions: {
            title: 'GIF囧图',
        }
    },
    '设置': {
        screen: Configs,
        navigationOptions: {
            title: '设置',
        }
    },

}, {
    navigationOptions: ({navigation}) => ({

        tabBarIcon: ({focused, tintColor}) => {
            // if()
            const {routeName} = navigation.state;
            let iconName;
            if (routeName === '设置') {
                iconName = `ios-settings${focused ? '' : '-outline'}`;
            } else {
                iconName = `ios-photos${focused ? '' : '-outline'}`;
            }
            return <Ionicons name={iconName} size={25} color={tintColor}/>
        }
    }),
    initialRouteName: '最新囧图',
    backBehavior: 'none',

});


// export default (props) => {
//     return (
//         <View style={{paddingTop: 24, height: '100%', width: '100%'}}>
//             <BottomTabs navigation={props.navigation}/>
//         </View>
//     )
// }
export default BottomTabs;