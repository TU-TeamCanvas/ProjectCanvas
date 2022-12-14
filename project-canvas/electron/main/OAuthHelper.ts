import { BrowserWindow } from "electron"

export function handleOAuth2(win) {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
  })
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  // join scopes with space (in url encoding)
  const SCOPE = [
    "read:me",
    "read:jira-user",
    "manage:jira-configuration",
    "read:jira-work",
    "read:account",
    "manage:jira-project",
    "manage:jira-configuration",
    "write:jira-work",
    "manage:jira-webhook",
    "manage:jira-data-provider",
  ].join("%20")
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
  const AUDIENCE = "api.atlassian.com"

  const authUrl = `https://auth.atlassian.com/authorize?audience=${AUDIENCE}&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=consent`

  authWindow.loadURL(authUrl)
  authWindow.show()

  authWindow.webContents.on("will-redirect", (_, url) => {
    if (url.startsWith(REDIRECT_URI)) {
      const code = handleCallback(url, authWindow)
      // Send OAuth code back to renderer proces
      win.webContents.send("code", code)
    }
  })
}

function handleCallback(url, authWindow) {
  const rawCode = /\?code=(.+)/.exec(url) || null
  const code = rawCode && rawCode.length > 1 ? rawCode[1] : null
  const error = /\?error=(.+)\$/.exec(url)

  if (code || error) {
    authWindow.destroy()
  }

  if (code) {
    return code
  }

  return error
}
