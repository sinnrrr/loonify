import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import Busboy from "busboy"
import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name: process.env.STORAGE_NAME,
  api_key: process.env.STORAGE_API_KEY,
  api_secret: process.env.STORAGE_API_SECRET,
})

export type UploadApiResponse = cloudinary.UploadApiResponse

const parseForm = async (req: BlitzApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new Busboy({ headers: req.headers })

    let filesCount = 0
    const uploads: UploadApiResponse[] = []

    const createUploader = () => {
      return cloudinary.v2.uploader.upload_stream((err, image) => {
        if (err) reject(err)
        else if (image) {
          uploads.push(image)

          if (filesCount === uploads.length) resolve(uploads)
        }
      })
    }

    form.on("file", (_fieldname, file, _filename, _encoding, _mimetype) => {
      file.pipe(createUploader())

      file.on("end", () => (filesCount = filesCount + 1))
    })

    req.pipe(form)
  })
}

const uploadImages = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  switch (req.method) {
    case "GET":
      break
    case "POST":
      res.json(await parseForm(req))
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default uploadImages
