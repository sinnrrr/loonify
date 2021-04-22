import { BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import LoginForm from "app/auth/components/LoginForm"

const redirectAuthenticatedTo = "/"

const LoginPage: BlitzPage = () => {
  const { push } = useRouter()
  return <LoginForm onSuccess={() => push(redirectAuthenticatedTo)} />
}

LoginPage.redirectAuthenticatedTo = redirectAuthenticatedTo
LoginPage.getLayout = (page) => <Layout>{page}</Layout>

export default LoginPage
