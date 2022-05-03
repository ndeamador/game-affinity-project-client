import AnimatedCanvas from './AnimatedCanvas';
import Composition from './Composition';

const Background = () => {
  return (
    <AnimatedCanvas>
      <Composition />
    </AnimatedCanvas>
  );
};

export default Background;