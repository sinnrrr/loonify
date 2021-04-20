import FormComponent, { FormComponentProps } from "app/core/components/form/FormComponent"
import { CircleLocation } from "../map/EditControl"
import Map from "../map/Map"

export type LocationFieldProps = {
  onChange: ((locations: CircleLocation[]) => void) | undefined
}

export const locationFieldAsProps = ({ onChange }: LocationFieldProps): FormComponentProps => ({
  isRequired: true,
  label: "Місцезнаходження",
  helperText:
    "Виберіть місце на карті (просто клацніть на карті) або видаліть маркер, клацнувши правою кнопкою миші або тримаючи палець на маркері",
  getError: () => undefined,
  children: <Map onChange={onChange} style={{ height: "30vh" }} />,
})

const LocationField = ({ onChange }: LocationFieldProps) => (
  <FormComponent
    {...locationFieldAsProps({
      onChange,
    })}
  />
)

export default LocationField
