import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import ResetForm from "app/auth/components/ResetForm"
import { useIndexRedirect } from "app/core/hooks/useIndexRedirect"

const ResetPasswordPage: BlitzPage = () => {
  const indexRedirect = useIndexRedirect()

  return <ResetForm onSuccess={indexRedirect} />
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout>{page}</Layout>

export default ResetPasswordPage
