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

    // const files: NodeJS.ReadableStream[] = []
    // const uploads: cloudinary.UploadApiResponse[] = []

    const createUploader = () => {
      return cloudinary.v2.uploader.upload_stream((err, image) => {
        if (err) reject(err)
        else if (image) resolve(image)
      })
    }

    form.on("file", (_fieldname, file, _filename, _encoding, _mimetype) =>
      file.pipe(createUploader())
    )

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
