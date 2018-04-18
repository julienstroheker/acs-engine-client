import * as React from "react";

export const StdOut = (stdout: string) => (
  <div className="StdOut">
    <h3>stdout</h3>
    <pre>
      <code>{stdout}</code>
    </pre>
  </div>
);
