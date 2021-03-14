import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { motion, HTMLMotionProps } from "framer-motion"
import { FunctionComponent } from "react"

type Merge<P, T> = Omit<P, keyof T> & T

export const MotionBox: FunctionComponent<
  Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>
> = motion(chakra.div)
