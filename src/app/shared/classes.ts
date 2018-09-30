export interface Data {
    time: string;
    zipcode: string;
    gender: string;
    age: string;
    colors: string[];
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}


export enum RGB_COLORS{
    Red = '#FF0000',
    Black = '#000000',
    Blue = '#0000FF',
    Brown = '#A52A2A',
    Green = '#008000',
    Grey = '#808080',
    LGreen = '#90EE90',
    Orange = '#FFA500',
    Pink = '#FFC0CB',
    Purple = '#800080',
    White = '#FFFFFF',
    Yellow = '#FFFF00'
}


export let questions = [
    'What color shirt are you wearing?',
    'What color are your eyes?',
    'What color is your favorite food?',
    'What is your favorite color?',
    'What color is your favorite song?',
    'What color is boredom?',
    'What color is the sky right now?',
    'What color is hope?',
    'What color is peace?',
    'What color is calm?',
    'What color is friendship?',
    'What color is courage?',
    'What color is love?',
    'What color is anger?',
    'What color is death?'
];

