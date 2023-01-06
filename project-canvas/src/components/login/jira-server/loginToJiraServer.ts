import { showNotification } from "@mantine/notifications"

// eslint-disable-next-line import/no-mutable-exports
export let FailedtoLogin: boolean

export function loginToJiraServer({
  onSuccess,
  loginOptions,
}: {
  onSuccess: () => void
  loginOptions: { url: string; username: string; password: string }
}) {
  fetch(`${import.meta.env.VITE_EXTENDER}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "JiraServer",
      ...loginOptions,
    }),
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 401) {
        return showNotification({
          title: "Wrong Password or username",
          message: "Please check your username or password 🤥",
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[6],
              borderColor: theme.colors.red[6],

              "&::before": { backgroundColor: theme.white },
            },

            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              "&:hover": { backgroundColor: theme.colors.blue[7] },
            },
          }),
        })
      }
      if (response.status === 400) {
        return showNotification({
          title: "Wrong URL",
          message:
            "Please check your URL it should be in this form : localhost.. 🤥",
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[6],
              borderColor: theme.colors.red[6],

              "&::before": { backgroundColor: theme.white },
            },

            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              "&:hover": { backgroundColor: theme.colors.blue[7] },
            },
          }),
        })
      }
      if (response.ok) onSuccess()
    })
    .catch(() => {})

  // EXEMPLE
  // await fetch(`${import.meta.env.VITE_EXTENDER}/projects`).then(
  //   async (response) => console.log(await response.json())
  // )
}
