import Shell from "node-powershell";

const PS_GET_USB_LETTER = `Get-Volume | where DriveType -eq Removable | select DriveLetter | ConvertTo-Json`;

export const shell = new Shell({
  executionPolicy: "Bypass",
  noProfile: true
});

export const getUSBLetters = async () => {
  try {
    await shell.addCommand(PS_GET_USB_LETTER);
    const res = await shell.invoke();
    if (!res) {
        return []
    } else {
        return JSON.parse(res).map(a=>a.DriveLetter) as string[];
    }
  } catch (e) {
    throw(e)
  }
};
