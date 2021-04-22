import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User } from "db"
import { LegacyRef, ReactNode } from "react"
import { FieldError } from "react-hook-form"

export type ModalComponentProps<T = any> = {
  isOpen: boolean
  onClose: () => void
  onFinish: (data: T) => void
}

export type SubmittableFormProps = { onSuccess?: (...args: unknown[]) => void }

export type UnregisteredFormFieldProps = {
  getError: () => FieldError | undefined
}

export type FormFieldProps = {
  getError: () => FieldError | undefined
  register: LegacyRef<HTMLInputElement>
}

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
