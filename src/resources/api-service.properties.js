/*
 * Started Application with Config API environment
 *
 * _envi_dbService, selecting DB using local or UAT endpoint
 * (_envi_dbService, Option : uat, local)
 *
 * _envi_portSight, using access from port sight UAT or DEV
 * (_envi_portSight, Option : uat, dev)
 * */

// const process = import.meta.env.DEV
const process = import.meta.env
/* SETTING ENVIRONMENT */
const Direction = {
  MENU: process.VITE_MENU,
  PARAMETER: process.VITE_PARAMETER,
  REPORT: process.VITE_REPORT,
  TRANSACTION: process.VITE_TRANSACTION
}

export class ApiServices {
  constructor(service) {
    this._service = service.toUpperCase()
  }

  get getService() {
    let url = ''
    if (this._service === 'MENU') url = Direction.MENU
    if (this._service === 'PARAMETER') url = Direction.PARAMETER
    if (this._service === 'TRANSACTION') url = Direction.TRANSACTION
    if (this._service === 'REPORT') url = Direction.REPORT
    return url
  }
}

export class ApiPortSightService {
  constructor() {}

  get getService() {
    // console.log("URL PORT : ", process.env.VUE_APP_PORT_SIGHT)
    return process.VITE_PORT_SIGHT
  }
}
