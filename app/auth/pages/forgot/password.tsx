import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import ForgotForm from "app/auth/components/ForgotForm"

const ForgotPasswordPage: BlitzPage = () => <ForgotForm />

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout>{page}</Layout>

export default ForgotPasswordPage
