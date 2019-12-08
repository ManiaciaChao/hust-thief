import Shell from "node-powershell";

/**
 * > $PS_GET_USB_LETTER
 * E:
 * F:
 */
export const PS_GET_USB_LETTER = `Get-WmiObject -Class Win32_Volume | Where {$_.DriveType -eq 5} | ForEach-Object {$_.DriveLetter}`;

export const shell = new Shell({
  executionPolicy: "Bypass",
  noProfile: true
});

export const getUSBLetters = async () => {
  try {
    await shell.addCommand(PS_GET_USB_LETTER);
    const res = await shell.invoke();
    if (!res) {
      return [];
    } else {
      return res.split("\n");
    }
  } catch (e) {
    throw e;
  }
};
