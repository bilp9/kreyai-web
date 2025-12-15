export default function UploadPage() {
    return (
      <main
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
        }}
      >
        <h1>Upload audio or video</h1>
  
        <p style={{ marginTop: "1rem", color: "#444" }}>
          Upload your audio or video file to receive a clean, readable transcript.
          No account required.
        </p>
  
        {/* Upload box (non-functional for now) */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "2rem",
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            textAlign: "center",
            color: "#555",
          }}
        >
          <p style={{ fontWeight: 500 }}>
            Drag & drop your file here
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            or click to select a file
          </p>
  
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#777" }}>
            Supported formats: MP3, WAV, M4A, MP4
          </p>
        </div>
  
        {/* Options */}
        <section style={{ marginTop: "3rem" }}>
          <h2>Options</h2>
  
          <div style={{ marginTop: "1rem" }}>
            <label>
              <strong>Quality</strong>
            </label>
            <select
              disabled
              style={{
                display: "block",
                marginTop: "0.5rem",
                padding: "0.5rem",
                width: "100%",
              }}
            >
              <option>Balanced (recommended)</option>
              <option>Fast</option>
              <option>Best</option>
            </select>
            <p style={{ fontSize: "0.85rem", color: "#777", marginTop: "0.25rem" }}>
              Quality selection will affect accuracy and processing time.
            </p>
          </div>
  
          <div style={{ marginTop: "1.5rem" }}>
            <label>
              <strong>Language</strong>
            </label>
            <select
              disabled
              style={{
                display: "block",
                marginTop: "0.5rem",
                padding: "0.5rem",
                width: "100%",
              }}
            >
              <option>Auto-detect (recommended)</option>
              <option>Haitian Creole</option>
            </select>
          </div>
        </section>
  
        {/* Next step */}
        <div style={{ marginTop: "3rem" }}>
          <button
            disabled
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "not-allowed",
              opacity: 0.7,
            }}
          >
            Continue to pricing
          </button>
  
          <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#777" }}>
            File processing and checkout will be enabled soon.
          </p>
        </div>
  
        {/* Privacy note */}
        <p style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#666" }}>
          Files are processed securely and deleted automatically based on your
          selected retention option. Customer data is never used for training.
        </p>
      </main>
    );
  }
  