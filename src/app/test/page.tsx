import "../../app/styles/fonts.css";

const fonts = [
  "Sprat-Variable",
  "Sprat-CondensedBlack",
  "Sprat-CondensedBold",
  "Sprat-CondensedLight",
  "Sprat-CondensedMedium",
  "Sprat-CondensedThin",
  "Sprat-CondensedRegular",
  "Sprat-ExtendedBlack",
  "Sprat-ExtendedBold",
  "Sprat-ExtendedLight",
  "Sprat-ExtendedMedium",
  "Sprat-ExtendedRegular",
  "Sprat-ExtendedThin",
  "Sprat-Regular",
  "Sprat-RegularBlack",
  "Sprat-RegularBold",
  "Sprat-RegularLight",
  "Sprat-RegularMedium",
  "Sprat-RegularThin",
];

export default function FontPage() {
  return (
    <div style={{ padding: 40 }} className="my-30">
      <h1 style={{ marginBottom: 30 }}>Font Preview Page</h1>

      {fonts.map((fontName) => (
        <div key={fontName} style={{ marginBottom: 10 }}>
          <h2>{fontName}</h2>
          <p
            style={{
              fontFamily: fontName,
              fontSize: 28,
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 6,
              // maxWidth: 600,
            }}
          >
            The quick brown 
          </p>
        </div>
      ))}
    </div>
  );
}
