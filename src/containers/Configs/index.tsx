import {autobind} from "core-decorators";
import React from "react";
import {Alert, View} from "react-native";
import {List, ListItem} from "react-native-elements";
import {CacheManager} from "react-native-expo-image-cache";
import {NavigationEventSubscription, NavigationInjectedProps} from "react-navigation";

// const Item = List.Item;
interface State {
    size: string;
}

export default class Configs extends React.Component<NavigationInjectedProps, State> {
    state: Readonly<State> = {size: '获取中'};

    subscriptions: NavigationEventSubscription[] = [];

    componentDidMount() {
        this.getCacheSize();
        this.subscriptions.push(this.props.navigation.addListener('willFocus', payload => this.getCacheSize()));
    }

    componentWillUnmount() {
        this.subscriptions.forEach(subscription => subscription.remove());
    }

    @autobind
    async getCacheSize() {
        const size = await CacheManager.getCacheSize();
        this.setState({size: `${Number((size / 1024).toFixed(2)) || 0}MB`})
    }

    @autobind
    clearCache() {
        Alert.alert('', '确认要清除缓存吗？', [
            {
                text: '取消', onPress: () => {
                }, style: 'cancel'
            },
            {
                text: '确定', onPress: async () => {
                    await CacheManager.clearCache();
                    this.getCacheSize();
                }
            },
        ], {cancelable: false});
    }

    render() {
        return (
            <View>
                <List>
                    <ListItem title="清除缓存" rightTitle={this.state.size} onPress={this.clearCache}/>
                </List>
            </View>
        );
    }
}