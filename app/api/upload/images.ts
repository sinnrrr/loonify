import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import cloudinary from "cloudinary"
import Busboy from "busboy"

cloudinary.v2.config({
  cloud_name: process.env.STORAGE_NAME,
  api_key: process.env.STORAGE_API_KEY,
  api_secret: process.env.STORAGE_API_SECRET,
})

const parseForm = async (req: BlitzApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new Busboy({ headers: req.headers })

    const uploadStream = cloudinary.v2.uploader.upload_stream((err, image) => {
      if (err) reject(err)
      else resolve(image)
    })

    form.on("file", (fieldname, file, filename, encoding, mimetype) => {
      file.pipe(uploadStream)
    })

    form.on("error", (e) => reject(e))

    req.pipe(form)
  })
}

const uploadImages = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "POST") {
    try {
      res.json(await parseForm(req))
    } catch (error) {
      res.json(error)
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default uploadImages
