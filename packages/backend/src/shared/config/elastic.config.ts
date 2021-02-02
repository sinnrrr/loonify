import { registerAs } from '@nestjs/config';
import { ClientOptions } from '@elastic/elasticsearch';

export default registerAs('elastic', () => <ClientOptions>{
  node: (parseInt(process.env.ELASTIC_PORT) || 6379) == 443
    ? "https://" + process.env.ELASTIC_HOST || 'localhost' + ":" + parseInt(process.env.ELASTIC_PORT) || 6379
    : "http://" + process.env.ELASTIC_HOST || 'localhost' + ":" + parseInt(process.env.ELASTIC_PORT) || 6379,
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS
  }
});
