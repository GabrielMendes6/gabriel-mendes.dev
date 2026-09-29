import { useEffect, useRef, useState } from 'react';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handlePointerDown(e) {
    e.preventDefault();

    dragging.current = false;

    document.body.classList.add('scroll-dragging');

    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();

    function move(ev) {
      ev.preventDefault();

      dragging.current = true;

      const percent = Math.min(
        1,
        Math.max(0, (ev.clientY - rect.top) / rect.height)
      );

      const scroll =
        percent *
        (document.documentElement.scrollHeight - window.innerHeight);

      window.scrollTo({
        top: scroll,
        behavior: 'auto',
      });
    }

    move(e);

    function up() {
      document.body.classList.remove('scroll-dragging');

      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
  }

  function handleClick(e) {
    if (dragging.current) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const percent = Math.min(
      1,
      Math.max(0, (e.clientY - rect.top) / rect.height)
    );

    const scroll =
      percent *
      (document.documentElement.scrollHeight - window.innerHeight);

    window.scrollTo({
      top: scroll,
      behavior: 'smooth',
    });
  }

  return (
    <div className="scroll-ruler" aria-hidden="true">
      <div
        className="scroll-ruler-track"
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        <div
          className="scroll-ruler-fill"
          style={{ height: `${progress}%` }}
        />

        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="scroll-ruler-tick"
            style={{ top: `${i * 10}%` }}
          />
        ))}
      </div>

      <span
        className="scroll-ruler-value mono"
        style={{ top: `${progress}%` }}
      >
        {String(Math.round(progress)).padStart(2, '0')}
      </span>
    </div>
  );
}