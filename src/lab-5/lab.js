import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import tennisBall from "./tennis ball.png";

const initialBallStyle = {
  position: "fixed",
  zIndex: 3,
  top: `calc(80vh - 50px)`,
  left: `${Math.random() * 97}vw`,
};

function App() {
  const [ballStyle, setBallStyle] = useState(initialBallStyle);
  const [isHit, setIsHit] = useState(false);
  const ball = useRef(null);
  const darts = useRef(null);
  const line = useRef(null);

  let dragImg = new Image(0, 0);
  dragImg.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  const dragBall = (event) => {
    const a = ball.current.getBoundingClientRect();
    const b = darts.current.getBoundingClientRect();
    const c = darts.current.getBoundingClientRect();

    const x = event.clientX - a.width;
    let y = event.clientY - a.height;

    if (y > b.top + b.height + a.height)
      y = b.top + b.height + a.height;

    setBallStyle({
      ...ballStyle,
      top: `${y}px`,
      left: `${x}px`,
    });

    if (
      a.top <= b.top + b.height &&
      a.top + a.height > b.top &&
      a.left <= b.left + b.width &&
      a.left + a.width > b.left
    ) {
      setIsHit(true);
    } else {
      setIsHit(false);
    }
  };

  return (
    <>
      <div className={styles.darts__wrapper}>
        <img
          ref={darts}
          src="https://cdn.pixabay.com/photo/2016/08/23/10/48/dart-board-1614051_1280.png"
          height="350px"
          className={styles.darts}
          onDragEnter={() => setIsHit(true)}
          onDragLeave={() => setTimeout(() => setIsHit(false), 1)}
        />
      </div>

      <div className={styles.line} ref={line}>
        <img
          //   className={styles.ball}
          src={tennisBall}
          ref={ball}
          height="100px"
          style={ballStyle}
          onDrag={dragBall}
          draggable="true"
          onDragStart={(event) =>
            event.dataTransfer.setDragImage(dragImg, 10, 10)
          }
          onDragEnd={(event) => {
            dragBall(event);
            event.target.classList.add(`${styles.ball}`);
            setTimeout(() => {
              event.target.classList.remove(`${styles.ball}`);
              if (isHit) {
                alert("Hit");
                setBallStyle({
                  ...initialBallStyle,
                  left: `${Math.random() * 97}vw`,
                });
              } else {
                alert("Miss");
                setBallStyle(initialBallStyle);
              }
            }, 1000);
          }}
        />
      </div>
    </>
  );
}

export default App;
