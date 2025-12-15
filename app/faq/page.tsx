export default function FAQPage() {
    return (
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h1>Frequently Asked Questions</h1>
  
        <h2>What languages does Kreyai support?</h2>
        <p>
          Kreyai is a multilingual transcription platform with deep specialization
          in Haitian Creole and mixed-language speech.
        </p>
  
        <h2>Do I need to create an account?</h2>
        <p>
          No. You can upload, pay, and download transcripts without creating an account.
        </p>
  
        <h2>Can Kreyai handle video files?</h2>
        <p>
          Yes. MP4 video files are supported. Audio is extracted automatically.
        </p>
  
        <h2>Is my data private?</h2>
        <p>
          Yes. Files are deleted automatically based on the retention option you select.
          Data is never used for training.
        </p>
      </main>
    );
  }
  