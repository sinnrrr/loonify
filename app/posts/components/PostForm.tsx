import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      <LabeledTextField name="ownerId" type="number" label="Owner" placeholder="Owner" />
    </Form>
  )
}
