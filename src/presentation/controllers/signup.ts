export class SignUpController {
  handle (httpReqest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
