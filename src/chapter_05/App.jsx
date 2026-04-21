import { useState } from "react";

const GAMES = [
  {
    id: 1,
    title: "The Sims 2",
    genre: "Life Sim",
    platform: "PC",
    year: "2004",
    featured: true,
    desc: "현실과 가상의 경계에서 펼쳐지는 나만의 인생 시뮬레이션.",
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    genre: "Action Adventure",
    platform: "PS4 / PC",
    year: "2018",
    featured: false,
    desc: "광활한 서부의 황야 속 아름다운 이야기.",
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    genre: "RPG",
    platform: "PC / PS5",
    year: "2020",
    featured: false,
    desc: "네온이 가득한 미래 도시에서 살아남기.",
  },
  {
    id: 4,
    title: "Biohazard Requiem",
    genre: "Survival Horror",
    platform: "PS5",
    year: "2025",
    featured: false,
    desc: "바이오하자드 시리즈의 새로운 공포.",
  },
  {
    id: 5,
    title: "Detroit: Become Human",
    genre: "Adventure",
    platform: "PS4 / PC",
    year: "2018",
    featured: false,
    desc: "선택이 이야기를 바꾸는 안드로이드의 이야기.",
  },
];

const SEASONS = [
  {
    num: "01",
    label: "Spring — Now",
    title: "Persona 3 Reload",
    current: true,
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Persona_3_Reload_cover_art.jpg/220px-Persona_3_Reload_cover_art.jpg",
    sub: "RPG · PC / PS5 / Xbox · 2024",
  },
  { num: "02", label: "Summer", title: "Game Title", current: false, img: null, sub: "" },
  { num: "03", label: "Autumn", title: "Game Title", current: false, img: null, sub: "" },
  { num: "04", label: "Winter", title: "Game Title", current: false, img: null, sub: "" },
];

const MENUS = ["Game", "Review", "Genre", "Songty", "Songpick of the Season"];

const currentSeason = SEASONS.find((s) => s.current);

const S = {
  wrap: {
    background: "#FFE000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  site: {
    background: "#FFE000",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    border: "10px solid #111",
  },
  navTop: {
    borderBottom: "5px solid #111",
    padding: "14px 40px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "112px",
    background: "#FFE000",
  },
  logo: {
    fontFamily: "'Arial Black', sans-serif",
    fontWeight: 900,
    fontSize: "46px",
    color: "#111",
    lineHeight: 0.95,
    letterSpacing: "-2px",
  },
  navLinks: {
    display: "flex",
    gap: "36px",
    paddingTop: "10px",
    alignItems: "center",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "380px 1fr 300px",
    height: "920px",
  },
  colLeft: {
    borderRight: "5px solid #111",
    display: "flex",
    flexDirection: "column",
  },
  colHead: {
    padding: "12px 22px",
    borderBottom: "5px solid #111",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  colMid: {
    borderRight: "5px solid #111",
    display: "flex",
    flexDirection: "column",
  },
  midImgWrap: {
    width: "100%",
    height: "572px",
    position: "relative",
    overflow: "hidden",
    borderBottom: "5px solid #111",
    flexShrink: 0,
  },
  midImgEl: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
  },
  midOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.88))",
    padding: "40px 32px 28px",
  },
  midSeasonTag: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#FFE000",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    marginBottom: "8px",
  },
  midGameTitle: {
    fontFamily: "'Arial Black', sans-serif",
    fontSize: "36px",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.0,
    letterSpacing: "-1px",
  },
  midGameSub: {
    fontSize: "13px",
    color: "#aaa",
    marginTop: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  midGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    flex: 1,
  },
  colRight: {
    display: "flex",
    flexDirection: "column",
  },
  rightHead: {
    fontSize: "14px",
    fontWeight: 900,
    color: "#111",
    padding: "12px 22px",
    borderBottom: "5px solid #111",
    textTransform: "uppercase",
    fontFamily: "'Arial Black', sans-serif",
    lineHeight: 1.2,
    height: "68px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
};

function GameEntry({ game, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : "3px solid #111",
        padding: "16px 22px",
        cursor: "pointer",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: hovered ? "#111" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontSize: "11px",
        color: hovered ? "#888" : "#555",
        marginBottom: "5px",
        textTransform: "uppercase",
        fontWeight: 500,
        letterSpacing: "0.3px",
      }}>
        {game.genre} · {game.platform} · {game.year}
        {game.featured ? " · Featured" : ""}
      </div>
      <div style={{
        fontSize: "20px",
        fontWeight: 900,
        fontFamily: "'Arial Black', sans-serif",
        lineHeight: 1.1,
        color: hovered ? "#FFE000" : "#111",
        ...(game.featured ? {
          border: hovered ? "3px solid #FFE000" : "3px solid #111",
          padding: "8px 10px",
        } : {}),
      }}>
        {game.title}
      </div>
    </div>
  );
}

function MidCell({ game, noBorderRight, noBorderBottom }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        padding: "20px 24px",
        borderRight: noBorderRight ? "none" : "3px solid #111",
        borderBottom: noBorderBottom ? "none" : "3px solid #111",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: hovered ? "#111" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontSize: "11px",
        color: hovered ? "#888" : "#555",
        marginBottom: "8px",
        textTransform: "uppercase",
        fontWeight: 500,
      }}>
        {game.genre} · {game.platform} · {game.year}
      </div>
      <div style={{
        fontSize: "17px",
        fontWeight: 900,
        fontFamily: "'Arial Black', sans-serif",
        lineHeight: 1.2,
        color: hovered ? "#FFE000" : "#111",
      }}>
        {game.title}
      </div>
    </div>
  );
}

function SeasonEntry({ season, isLast }) {
  const [hovered, setHovered] = useState(false);
  const active = season.current || hovered;

  return (
    <div
      style={{
        padding: "18px 22px",
        borderBottom: isLast ? "none" : "3px solid #111",
        cursor: "pointer",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: active ? "#111" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontSize: "36px",
        fontWeight: 900,
        fontFamily: "'Arial Black', sans-serif",
        lineHeight: 1,
        color: active ? "#FFE000" : "#111",
      }}>
        {season.num}
      </div>
      <div style={{
        fontSize: "10px",
        color: active ? "#888" : "#555",
        textTransform: "uppercase",
        letterSpacing: "0.8px",
        fontWeight: 700,
        marginTop: "4px",
      }}>
        {season.label}
      </div>
      <div style={{
        fontSize: "14px",
        fontWeight: 700,
        color: active ? "#FFE000" : "#111",
        marginTop: "5px",
        lineHeight: 1.3,
      }}>
        {season.title}
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Game");

  return (
    <div style={S.wrap}>
      <div style={S.site}>
        <div style={S.navTop}>
          <div style={S.logo}>
            Songpick!<br />Games
          </div>
          <div style={S.navLinks}>
            {MENUS.map((m) => (
              <span
                key={m}
                onClick={() => setActivePage(m)}
                style={{
                  fontSize: "13px",
                  color: "#111",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  cursor: "pointer",
                  textDecoration: activePage === m ? "underline" : "none",
                  textUnderlineOffset: "3px",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div style={S.body}>
          <div style={S.colLeft}>
            <div style={S.colHead}>Games — Song's Pick</div>
            {GAMES.map((game, i) => (
              <GameEntry
                key={game.id}
                game={game}
                isLast={i === GAMES.length - 1}
              />
            ))}
          </div>

          <div style={S.colMid}>
            <div style={S.midImgWrap}>
              <img
                src={currentSeason.img}
                alt={currentSeason.title}
                style={S.midImgEl}
              />
              <div style={S.midOverlay}>
                <div style={S.midSeasonTag}>
                  Songpick of the Season — Spring
                </div>
                <div style={S.midGameTitle}>{currentSeason.title}</div>
                <div style={S.midGameSub}>{currentSeason.sub}</div>
              </div>
            </div>
            <div style={S.midGrid}>
              {GAMES.slice(0, 4).map((game, i) => (
                <MidCell
                  key={game.id}
                  game={game}
                  noBorderRight={i % 2 !== 0}
                  noBorderBottom={i >= 2}
                />
              ))}
            </div>
          </div>

          <div style={S.colRight}>
            <div style={S.rightHead}>Songpick of the Season</div>
            {SEASONS.map((season, i) => (
              <SeasonEntry
                key={season.num}
                season={season}
                isLast={i === SEASONS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}