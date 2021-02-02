const middleware = {}

middleware['validateMode'] = require('../middleware/validateMode.js')
middleware['validateMode'] = middleware['validateMode'].default || middleware['validateMode']

middleware['validateStep'] = require('../middleware/validateStep.js')
middleware['validateStep'] = middleware['validateStep'].default || middleware['validateStep']

export default middleware
