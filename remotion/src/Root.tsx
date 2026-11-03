import React from 'react';
import { Composition, Still } from 'remotion';
import { Video, Cover } from './ep/scenes';
import { W, H, FPS } from './lib';
import { END } from './ep/ep';
export const RemotionRoot: React.FC = () => (<>
  <Composition id="Pay" component={Video} width={W} height={H} fps={FPS} durationInFrames={Math.ceil(END * FPS)} />
  <Still id="Cover" component={Cover} width={W} height={H} />
</>);
