import {autobind} from "core-decorators";
import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Image} from "react-native-expo-image-cache";
import {NavigationInjectedProps} from "react-navigation";
// import {Image} from "react-native";
import pxToDp from "../../../utils/pxToDp";
import {PicInfo} from "../index";

interface Props {
    picInfo: PicInfo;
    show: boolean;
}

export default class Item extends React.Component<Props & NavigationInjectedProps> {

    @autobind
    touchHandler() {
        this.props.navigation.push('ImageZommer', {picInfo: this.props.picInfo});
    }

    render() {
        const picInfo = this.props.picInfo;
        const width = pxToDp(700);
        return (
            <View onTouchEnd={this.touchHandler}
                  style={{width: '100%', paddingHorizontal: pxToDp(10), paddingTop: pxToDp(10)}}>
                <View style={{
                    width: width,
                    height: width / Number(picInfo.file_width) * Number(picInfo.file_height)
                }}>

                    <Image preview={{uri: picInfo.cover_url}} style={{width: '100%', height: '100%'}}
                           transitionDuration={0}
                           uri={this.props.show ? picInfo.source : picInfo.cover_url}/>

                </View>
                <Text>{picInfo.add_intro}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {width: pxToDp(200), height: pxToDp(400)},
    itemImage: {width: pxToDp(200), height: pxToDp(200)}
});
