
declare module 'react-native-expo-image-cache' {
    import React from "react";
    import {ImageStyle, ViewStyle} from "react-native";

    export class Image extends React.Component<{ style?: ViewStyle & ImageStyle & any, preview?: string, uri: string, }>{

    }

    type Listener = (uri: string) => any;

    interface CacheEntry {

        uri: string
        path: string;

        constructor(uri: string)


        getPath(): Promise<string>
    }

    export class CacheManager {
        static listeners: { [uri: string]: Listener[] };
        static cache: (uri: string, listener: Listener) => Promise<void>;

        static get(uri: string): CacheEntry;
        static getCacheSize(): Promise<number>
        static clearCache(): Promise<void>;
    }

}
