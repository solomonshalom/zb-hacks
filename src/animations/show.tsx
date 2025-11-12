import { motion, AnimatePresence } from "framer-motion";

interface MotionProps {
  routerKey?: string;
  children: React.ReactNode;
}

const Show = (props: MotionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={props.routerKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            y: 10,
          },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            opacity: 0,
            y: -10,
            transition: {
              duration: 0.2,
            },
          },
        }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Show;
