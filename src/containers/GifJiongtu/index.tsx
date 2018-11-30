import axios from 'axios';
import cheerio from '../../cheerio';
import {autobind} from "core-decorators";
import * as React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {NavigationInjectedProps} from "react-navigation";
import pxToDp from "../../utils/pxToDp";
import Item from "./Item";

interface State {
    data: { title: string; cover: string; id: number }[];
    refreshing: boolean;
}

export default class GifJiongtu extends React.Component<{} & NavigationInjectedProps, State> {
    state: Readonly<State> = {data: [], refreshing: false};


    componentDidMount() {
        this.getData();
    }

    @autobind
    async getData() {
        this.setState({refreshing: true});
        try {
            // const res = await axios.get('http://tu.duowan.com/m/bxgif');
            const res = await axios.get('http://tu.duowan.com/m/bxgif?offset=0&order=created&math=1');
            const $ = cheerio.load(res.data.html);
            // console.log($('#pic-list li.box:not(.tags)'));
            const data = $('li.box').toArray().map((value) => ({
                title: $(value).find('em a').text(),
                cover: $(value).find('img').attr('src'),
                id: Number($(value).find('a').attr('href').match(/^http:\/\/tu.duowan.com\/gallery\/([0-9]*).html$/))[1]
            }));

            // console.log('data', data);

            this.setState({data, refreshing: false});

        } catch (error) {
            this.setState({refreshing: false});
        }
    }

    render() {

        return (
            <ScrollView contentContainerStyle={styles.container}
                        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData}/>}>
                {
                    this.state.data.map(value => (
                        <Item key={value.id} cover={value.cover} id={value.id} title={value.title}
                              navigation={this.props.navigation}/>
                    ))
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        width: '100%',
        // height         : '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: pxToDp(20)
    }
});
