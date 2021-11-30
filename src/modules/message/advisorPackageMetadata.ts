import {JSDOM} from 'jsdom'
import https from 'https'

async function getAdvisorPackagePage(packageName: string): Promise<string> {
  const options = {
    hostname: 'snyk.io',
    port: 443,
    path: '/advisor/npm-package/' + packageName,
    method: 'GET'
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      res.setEncoding('utf8')
      let data: any = []
      res.on('data', chunk => {
        data.push(chunk)
      })

      res.on('end', () => {
        const bodyHTML: string = Buffer.concat(data).toString('utf-8')
        resolve(bodyHTML)
      })
    })

    req.on('error', error => {
      reject(error)
    })

    req.end()
  })
}

export async function getAdvisorPackageScore(
  packageName: string
): Promise<string> {
  const pageBody: string = await getAdvisorPackagePage(packageName)

  const dom = new JSDOM(pageBody)
  for (const tag of dom.window.document.getElementsByTagName('meta')) {
    if (tag.getAttribute('property') === 'og:image') {
      return String(tag.getAttribute('content'))
    }
  }

  return ''
}
