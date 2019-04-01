// example of matching string in executable path:
// `/snap/github-desktop/52/app/github-desktop`
const snapExecPathRe = /^\/snap\/github-desktop\/(\d*)\/app\/github-desktop$/

const knownEdgeVersions = [
  '52', // the previous edge version
  '53', // the next edge version
]

export async function detectSnapInstall(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const { execPath } = process

      const match = snapExecPathRe.exec(execPath)
      if (match === null || match.length !== 2) {
        resolve(false)
        return
      }

      const version = match[1]

      const edgeVersionFound = knownEdgeVersions.indexOf(version) > -1

      resolve(edgeVersionFound)
    } catch {
      resolve(false)
    }
  })
}
