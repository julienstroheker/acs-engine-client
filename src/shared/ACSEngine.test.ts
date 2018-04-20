import { ACSEngine } from "./ACSEngine";

describe("ACSEngine", () => {
  it("Should return getACSEnginePath", () => {
    expect(ACSEngine.getACSEnginePath()).toContain(ACSEngine.acsProjectPath);
  });
});
