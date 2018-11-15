import axios from "axios";
import {autobind} from "core-decorators";
import * as React from "react";
import {FlatList} from "react-native";
import {CacheManager} from "react-native-expo-image-cache";
import {NavigationInjectedProps} from "react-navigation";
import Item from "./Item";

interface State {
    picInfos: PicInfo[]
    viewableItems: string[];
}

export interface PicInfo {
    add_intro: string;
    source: string;
    pic_id: string;
    file_height: string;
    file_width: string;
    cover_url: string;
    cmt_md5: string;
}

export default class Detail extends React.Component<NavigationInjectedProps, State> {
    static navigationOptions = ({navigation}) => ({title: navigation.getParam('title')});
    state: Readonly<State> = {picInfos: [], viewableItems: []};
    mount = true;

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        this.mount = false;
    }


    async getData() {
        const res = await axios.get(`http://tu.duowan.com/index.php?r=show/getByGallery/&gid=${this.props.navigation.getParam('id')}`);
        const picInfos: PicInfo[] = res.data.picInfo;
        this.setState({picInfos});
        for (const picInfo of picInfos) {
            for (let i = 1; i < 3; i++) {
                try {
                    if (this.mount) {
                        const path = await CacheManager.get(picInfo.source).getPath();
                        if (!path) {
                            break;
                        }
                    } else {
                        return;
                    }
                } catch (e) {

                }
            }
        }
        // .then(res => res.data)
        // .then(data => this.setState({picInfos: data.picInfos}));
    }

    @autobind
    viewChangedHandler({viewableItems, changed}) {
        // console.log(viewableItems, changed, viewableItems.map(v => v.key));

        this.setState({viewableItems: [...viewableItems.map(v => v.key)]});
    }

    @autobind
    renderItem({item}: { item: PicInfo }) {
        return <Item show={this.state.viewableItems.includes(item.pic_id)}
                     picInfo={item} navigation={this.props.navigation}/>
    }

    render() {
        // return (
        //     <ScrollView contentContainerStyle={styles.container}>
        //         {
        //             this.state.picInfos.map(value => {
        //                 return (
        //                     <Item key={value.pic_id} {...value} navigation={this.props.navigation}/>
        //                 )
        //             })
        //         }
        //     </ScrollView>
        // )

        return (
            <FlatList onViewableItemsChanged={this.viewChangedHandler} extraData={this.state.viewableItems}
                      data={this.state.picInfos} keyExtractor={item => item.pic_id}
                      renderItem={this.renderItem}/>
        )

        // return (
        //     <Swiper onIndexChanged={index=>console.log(index)} loadMinimal={true} loop={false} showsButtons={false} showsPagination={false}>
        //         {
        //             this.state.picInfos.map((value, index) =>
        //                 <View key={value.pic_id}>
        //                     <Item pic_id={value.pic_id} add_intro={value.add_intro} source={value.source}
        //                           show={true} navigation={this.props.navigation}/>
        //                 </View>
        //             )
        //         }
        //     </Swiper>
        // )
    }
}
