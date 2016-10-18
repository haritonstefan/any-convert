/**
 * Created by Stefan Hariton <hariton.stefan@outlook.com> on 14/10/16.
 */

export default class BaseConverter {
  constructor(server, options) {
    this.server = server;

    server.route(this.routeConfig);
  }

  get routeConfig() {
    return {
      method: this.method,
      path: this.path,
      config: this.config,
      handler: this.handler
    }
  }
}