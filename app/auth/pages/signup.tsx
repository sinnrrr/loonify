import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import SignupForm from "app/auth/components/SignupForm"

const redirectAuthenticatedTo = "/"

const SignupPage: BlitzPage = () => {
  const { push } = useRouter()
  return <SignupForm onSuccess={() => push(redirectAuthenticatedTo)} />
}

SignupPage.redirectAuthenticatedTo = redirectAuthenticatedTo
SignupPage.getLayout = (page) => <Layout>{page}</Layout>

export default SignupPage
