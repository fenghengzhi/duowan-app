import {autobind} from "core-decorators";
import * as React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Image} from "react-native-expo-image-cache"
import {NavigationInjectedProps} from "react-navigation";
import pxToDp from "../../../utils/pxToDp";

interface Props {
    title: string;
    cover: string;
    id: number;
}

export default class Item extends React.Component<Props & NavigationInjectedProps> {
    @autobind
    itemClickHandler(event) {
        // console.log(event);
        this.props.navigation.push('Detail', {id: this.props.id, title: this.props.title});
    }

    render() {
        return (
            <View onTouchEnd={this.itemClickHandler} key={this.props.id} style={styles.item}>
                <Image style={styles.itemImage} uri={this.props.cover}/>
                <Text style={{}}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {width: pxToDp(200), height: pxToDp(400)},
    itemImage: {width: pxToDp(200), height: pxToDp(200)}
});