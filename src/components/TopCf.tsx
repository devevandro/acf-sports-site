import styles from "./TopCf.module.css";

const rainAsset =
  "https://www.figma.com/api/mcp/asset/0a5ebd9a-ca6b-4c81-91ec-78d6392b38d4";

const dividerAsset =
  "https://www.figma.com/api/mcp/asset/42f439f8-9c02-4f7c-8316-9402af0700c9";

const rainTiles = [
  [-183, -142, 460],
  [-63, -104, 460],
  [62, -37, 460],
  [183, 5, 460],
  [279, -219, 460],
  [302, 23, 460],
  [409, -207, 460],
  [151, -235, 460],
  [15, -275, 460],
  [420, 32, 460],
  [532, -170, 460],
  [547, 67, 460],
  [663, -157, 460],
  [672, 73, 460],
  [808, -101, 398],
  [893, -217, 461],
  [1032, -105, 461],
  [831, 101, 398],
  [950, 32, 398],
  [1004, -332, 461],
  [1162, -59, 461],
  [1275, -20, 461],
  [1154, -279, 461],
  [1287, -270, 461],
  [1372, 45, 461],
  [1412, -210, 461],
  [1490, -46, 461],
  [1525, -303, 461],
  [1642, -133, 461],
  [1596, 54, 461]
];

export function TopCf() {
  return (
    <section className={styles.topCf} data-node-id="739:2348" data-name="cf">
      <div className={styles.rainLayer} data-name="chuva 01" aria-hidden="true">
        {rainTiles.map(([left, top, size], index) => (
          <img
            key={`${left}-${top}-${index}`}
            alt=""
            className={styles.rainTile}
            src={rainAsset}
            style={{
              left,
              top,
              width: size,
              height: size
            }}
          />
        ))}
      </div>
      <img
        alt=""
        className={styles.centerDivider}
        src={dividerAsset}
        data-name="Component 8"
      />
    </section>
  );
}
