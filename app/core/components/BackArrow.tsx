import { ArrowBackIcon } from "@chakra-ui/icons"
import { useBackRedirect } from "../hooks/useBackRedirect"

const BackArrow = () => {
  const backRedirect = useBackRedirect()

  return <ArrowBackIcon cursor="pointer" w={10} h={10} onClick={backRedirect} />
}

export default BackArrow
