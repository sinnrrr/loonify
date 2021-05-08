import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import { chromium } from "playwright"

const generatePdf = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(
    (process.env.NODE_ENV === "production"
      ? "https://loonify.rocks"
      : `http://localhost:${process.env.PORT}`) + `/office/posts/${req.query.id}/pdf`
  )

  await page.waitForLoadState("networkidle")

  const pdf = await page.pdf({ format: "a4" })

  await browser.close()

  res.setHeader("Content-Type", "application/pdf")
  res.send(pdf)
}

export default generatePdf
