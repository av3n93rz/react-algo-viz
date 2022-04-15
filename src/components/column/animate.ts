type AnimateProps = {
    timing: (fraction:number) => number;
    draw: (progress:number) => void;
    duration: number;
};
  
export const animate = ({ timing, draw, duration }: AnimateProps) => {
  let start = performance.now();

  const animateLoop = (time: number) => {
    const durationFraction = Math.min(
      1,
      Math.max(0, (time - start) / duration)
    );
    const progress = timing(durationFraction);
    draw(progress);
    if (durationFraction < 1) {
      requestAnimationFrame(animateLoop);
    };
  };

  requestAnimationFrame(animateLoop);
};