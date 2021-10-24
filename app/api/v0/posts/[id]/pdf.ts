import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import chromium from "chrome-aws-lambda"

const generatePdf = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()

  await page.goto(
    (process.env.NODE_ENV === "production"
      ? "https://loonify.vercel.app"
      : `http://localhost:${process.env.PORT}`) + `/office/posts/${req.query.id}/pdf`,
    {
      waitUntil: "networkidle2",
    }
  )

  const pdf = await page.pdf({ format: "a4" })

  await browser.close()

  res.setHeader("Content-Type", "application/pdf")
  res.send(pdf)
}

export default generatePdf
