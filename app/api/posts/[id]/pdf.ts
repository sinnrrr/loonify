import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import puppeteer from "puppeteer"

const generatePdf = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  })

  const pdf = await page.pdf({ format: "a4" })

  await browser.close()

  res.setHeader("Content-Type", "application/pdf")
  res.send(pdf)
}

export default generatePdf
