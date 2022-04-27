import React from 'react';
import { Text, Box, Newline } from 'ink';

export const FRAMES_SLASHES = [
  '\\', '|', '/', '>',
];

export const FRAMES_PENG = [
  '||     ',
  '>|     ',
  '>>     ',
  '=>>    ',
  ' =>>   ',
  '  =>>  ',
  '   =>> ',
  '    =>>',
  '     >>',
  '     |>',
  '     ||',
  '     |<',
  '     <<',
  '    <<=',
  '   <<= ',
  '  <<=  ',
  ' <<=   ',
  '<<=    ',
  '<<     ',
  '<|     ',
];

export const FRAMES_SHIFT = [
  '>>>>>>     ',
  ' >>>>>>    ',
  '  >>>>>>   ',
  '   >>>>>>  ',
  '    >>>>>> ',
  '     >>>>>>',
  '      >>>>>',
  '       >>>>',
  '>       >>>',
  '>>       >>',
  '>>>       >',
  '>>>>       ',
  '>>>>>      ',
];

export const FRAMES_DOTS = [
  '.     .',
  '..     ',
  '...    ',
  '....   ',
  '.....  ',
  '...... ',
  ' ......',
  '  .....',
  '   ....',
  '    ...',
  '     ..',
];

export const FRAMES_TEXT = [
  'LOADING       ',
  ' LOADING      ',
  '  LOADING     ',
  '   LOADING    ',
  '    LOADING   ',
  '     LOADING  ',
  '      LOADING ',
  '       LOADING',
  '        LOADIN',
  '          LOAD',
  'G          LOA',
  'NG          LO',
  'ING          L',
  'DING          ',
  'ADING         ',
  'OADING        ',
];

interface LoadingProps {
  loading?: boolean;
  endText?: string;
  frames?: string[];
  interval?: number;
  firstFrame?: number;
}

export function Loading(props: LoadingProps) {
  const { frames = FRAMES_PENG, interval = 100, firstFrame = 0, loading, endText = '' } = props;
  const [pointer, setPointer] = React.useState(firstFrame);

  const toNext = () => {
    setPointer(pointer => (pointer + 1) % frames.length);
  }

  React.useEffect(() => {
    if (!loading) {
      return;
    };

    const timer = setInterval(() => {
      toNext();
    }, interval);
    return () => {
      clearInterval(timer);
    }
  }, [loading]);

  if (!loading) {
    return <Text>{endText}</Text>
  }

  return (
    <Text>{frames[pointer]}</Text>
  );
}
