import * as child from "child_process";
import * as fs from "fs";
import * as path from "path";

export class ACSEngine {
  public static acsProjectPath: string = "lib/acs-engine";

  public static getACSEnginePath(): string {
    return path.join(__dirname, "..", "..", this.acsProjectPath);
  }

  public static async acsIsInstalled(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      fs.access(this.getACSEnginePath(), fs.constants.X_OK, err => {
        if (err) {
          console.error(err);
          return resolve(false);
        }
        return resolve(true);
      });
    });
  }

  public static async getVersion(): Promise<string> {
    const out = await this.call(["version", "-o json"]);
    const versionObject: { GitTag: string; GitCommit: string; GitTreeState: string } = JSON.parse(
      out,
    );

    return versionObject.GitTag;
  }

  public static async call(args: string[] = []): Promise<string> {
    const argString: string = args.reduce<string>((joined, arg) => {
      return `${joined} ${arg}`;
    }, "");

    // note: promisify(exec) was returning string instead of {stdout, stderr}; conflicting with types. Use normal Promise wrap instead
    return new Promise<string>((resolve, reject) => {
      child.exec(`${this.getACSEnginePath()} ${argString}`, (error, stdout, stderr) => {
        if (error) {
          console.error(error.message);
          return reject(error.message);
        } else if (stderr) {
          console.error(stderr);
          return reject(stderr);
        } else {
          return resolve(stdout);
        }
      });
    });
  }
}
