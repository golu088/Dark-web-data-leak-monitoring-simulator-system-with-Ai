import React, { useState } from "react";
import { checkEmail } from "../api";

function EmailCheck() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    const res = await checkEmail(email);
    setResult(res);
  };

  return (
    <div>
      <h2>Email Check</h2>

      <input
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleCheck}>Check</button>

      {result && (
        <div>
          <p>Status: {result.status}</p>
          <p>Risk: {result.risk}</p>
          <p>Breaches: {result.breaches_found}</p>

          <h4>Breach Details:</h4>
          {result.breach_details.map((b, i) => (
            <div key={i}>
              <p>{b.source} ({b.year})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailCheck;