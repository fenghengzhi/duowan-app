import {autobind} from "core-decorators";
import {WebBrowser} from 'expo';
import React from "react";
import {View} from "react-native";
// import {List} from "antd-mobile-rn";
import {CacheManager} from "react-native-expo-image-cache";

import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from "react-native-image-zoom-viewer/src/image-viewer.type";
import {NavigationInjectedProps} from "react-navigation";
import {PicInfo} from "../Detail";

// const Item = List.Item;
interface State {
    imageUrls: IImageInfo[]
}

export default class ImageZommer extends React.Component<NavigationInjectedProps, State> {
    picInfo: PicInfo = this.props.navigation.getParam('picInfo');
    state: Readonly<State> = {imageUrls: []};


    componentDidMount() {
        this.loadImage();

    }

    @autobind
    clickHandler() {
        // console.log('test');
        // console.log(this.picInfo);
        // const picInfo: PicInfo = this.props.navigation.getParam('picInfo');
        const commentUrl = `http://www.duowan.com/mComment/index.html?domain=tu.duowan.com&uniqid=${this.picInfo.cmt_md5}&url=/`;
        console.log(commentUrl);
        WebBrowser.openBrowserAsync(commentUrl);
    }

    @autobind
    async loadImage() {
        // console.log(this.props.navigation.getParam('source'));
        // const picInfo: PicInfo = this.props.navigation.getParam('picInfo');
        const path = await CacheManager.get(this.picInfo.source).getPath();
        this.setState({imageUrls: [{url: path}]});
    }

    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
                {this.state.imageUrls.length ?
                    <ImageViewer renderIndicator={() => null as any} onDoubleClick={this.clickHandler}
                                 imageUrls={this.state.imageUrls}/> : null}
            </View>
        );
    }
}