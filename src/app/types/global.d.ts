declare const __IS_DEV__: boolean;
declare const __IS_STORYBOOK__: boolean;
declare const __API__: string;
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}
