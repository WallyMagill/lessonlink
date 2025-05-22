import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

function EmailPage() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [email, setEmail] = useState('');

  function handleEmailClick() {
    setShowPrompt(true);
  }

  function handleSendEmail() {
    if (!email) return;

    const subject = encodeURIComponent('View my lesson on LessonLink!');
    const body = encodeURIComponent(`Hi,\n\nPlease view my lesson plan linked below:\n${window.location.href}`);

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setShowPrompt(false);
    setEmail('');
  }

  function handleCancel() {
    setShowPrompt(false);
    setEmail('');
  }

  return (
    <>
      <button
        type="button"
        onClick={handleEmailClick}
        style={{
          backgroundColor: 'rgb(245, 245, 245)',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          color: 'black',
        }}
      >
        <FaExternalLinkAlt />
      </button>

      {showPrompt && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '300px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div>
              Enter recipient email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                style={{
                  width: '100%', marginTop: '8px', marginBottom: '12px', padding: '8px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="submit" onClick={handleCancel} style={{ padding: '8px 12px' }}>
                Cancel
              </button>
              <button type="submit" onClick={handleSendEmail} style={{ padding: '8px 12px' }} disabled={!email}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmailPage;
