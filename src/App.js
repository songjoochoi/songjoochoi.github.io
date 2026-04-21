//import logo from './logo.svg';
//import './App.css';

//function App() {
  //return (
    //<div className="App">
      //<header className="App-header">
       // <img src={logo} className="App-logo" alt="logo" />
        //<p>
        //  Edit <code>src/App.js</code> and save to reload.
        //</p>
       // <a
          //className="App-link"
         /// href="https://reactjs.org"
         // target="_blank"
         // rel="noopener noreferrer"
       // >
         // Learn React
       // </a>
      //</header>
    //</div>
 // );
//}

//export default App;

import { useState } from "react";

const GAMES = [
  { id: 1, title: "The Sims 2", genre: "Life Sim", platform: "PC", year: "2004", featured: true, desc: "현실과 가상의 경계에서 펼쳐지는 나만의 인생 시뮬레이션. 어릴 때부터 가장 오래 플레이한 게임 중 하나!", longDesc: "심즈2는 단순한 시뮬레이션 게임이 아니다. 내가 만든 캐릭터가 태어나고, 자라고, 사랑하고, 늙어가는 모든 과정을 직접 지켜보는 경험은 다른 어떤 게임에서도 느끼기 어렵다. 초등학생 때 처음 접한 이후로 수백 시간을 쏟아부었고, 지금도 가끔 켜보면 시간이 어떻게 가는지 모른다. 커스터마이징의 자유도, 다양한 확장팩, 그리고 예측 불가능한 시뮬레이션이 만들어내는 드라마. 이 게임이 지금까지도 사랑받는 이유는 바로 그 자유로움에 있다.", img: "https://m.media-amazon.com/images/M/MV5BMGY3MzRhZTgtMjJmMC00ZTM2LWJlNGMtNTE3NjFiMTRmYTM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", imgPos: "center center" },
  { id: 2, title: "Red Dead Redemption 2", genre: "Action Adventure", platform: "PS4 / PC", year: "2018", featured: false, desc: "광활한 서부의 황야 속 아름다운 이야기. 그래픽과 스토리 모두 압도적.", longDesc: "레드데드 리뎀션2는 게임이 예술이 될 수 있다는 걸 증명한 작품이다. 아서 모건이라는 캐릭터의 이야기는 단순한 서부극을 넘어, 인간의 죄와 구원, 그리고 시대의 변화에 관한 깊은 성찰을 담고 있다. 광활한 오픈월드는 그 자체로 하나의 살아있는 세계다. 지나가는 NPC들도 각자의 일상을 살아가고, 날씨와 시간에 따라 세상이 변한다. 엔딩 이후에도 한동안 멍하니 앉아있었던 기억이 난다. 게임 역사에 남을 명작.", img: "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg", imgPos: "center 30%" },
  { id: 3, title: "Cyberpunk 2077", genre: "RPG", platform: "PC / PS5", year: "2020", featured: false, desc: "네온이 가득한 미래 도시에서 살아남기. 2077년 속으로 가보자!", longDesc: "출시 초기의 혼란을 기억하는 사람도 있겠지만, 지금의 사이버펑크 2077은 완전히 다른 게임이다. 수많은 패치와 팬텀 리버티 DLC를 거쳐 진정한 명작으로 거듭났다. 나이트시티라는 도시는 그 자체로 하나의 캐릭터다. 화려한 네온사인 아래 숨겨진 어둠, 기술이 발전해도 변하지 않는 인간의 욕망. V와 조니 실버핸드의 이야기는 생각보다 훨씬 깊고 감동적이다. 한번은 꼭 플레이해볼 만한 게임.", img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/a757b56d2078be8b09a04e2ad531f1fefafaa129/capsule_616x353.jpg?t=1769690377", imgPos: "center center" },
  { id: 4, title: "Biohazard Requiem", genre: "Survival Horror", platform: "PS5", year: "2025", featured: false, desc: "바이오하자드 시리즈의 새로운 공포. 시리즈 팬이라면 꼭 해봐야할 올해의 명작", longDesc: "바이오하자드 시리즈를 오래 좋아해온 팬으로서 레퀴엠은 기대 이상이었다. 공포라는 감정을 단순히 깜짝 놀라게 하는 것이 아니라, 긴장감과 압박감으로 풀어내는 방식이 인상적이다. PS5의 하드웨어를 최대한 활용한 그래픽과 사운드 디자인은 공포 분위기를 극대화한다. 시리즈를 처음 접하는 사람에게도, 오랜 팬에게도 모두 추천할 수 있는 작품.", img: "https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/5e8b40959df1e7c253ba5ba290c9b91d0adf262e3288cb2a.jpg", imgPos: "center 20%" },
  { id: 5, title: "Detroit: Become Human", genre: "Adventure", platform: "PS4 / PC", year: "2018", featured: false, desc: "선택이 이야기를 바꾸는 안드로이드의 이야기. 여러 번 플레이해도 새로운 결말!", longDesc: "디트로이트: 비컴 휴먼은 게임이라는 매체가 가진 가장 큰 강점인 인터랙티비티를 극한으로 활용한 작품이다. 세 명의 안드로이드 주인공 — 코너, 마커스, 카라 — 의 이야기는 서로 얽히고 플레이어의 선택에 따라 완전히 다른 방향으로 흘러간다. 인간과 안드로이드의 경계, 자유의지와 프로그래밍의 충돌. 단순한 오락을 넘어 진지한 질문을 던지는 작품이다. 최소 두 번은 플레이해야 진정한 재미를 알 수 있다.", img: "https://cdn1.epicgames.com/columbine/offer/DETROIT_1-2560x1440-4fd6608a56880dc5d8e9d968517113c3.jpg", imgPos: "center 25%" },
  { id: 6, title: "모여봐요 동물의 숲", genre: "Life Sim", platform: "Switch", year: "2020", featured: false, desc: "무인도에서 나만의 마을을 만드는 힐링 게임. 계절마다 다른 즐거움!", longDesc: "코로나 시기에 전 세계 수많은 사람들이 이 게임으로 위안을 받았다. 경쟁도, 전투도, 목표도 없다. 그저 자신만의 속도로 섬을 꾸미고, 물고기를 낚고, 주민들과 대화하면 된다. 계절에 따라 섬의 풍경이 바뀌고, 특별한 이벤트가 찾아온다. 처음에는 단순해 보이지만 빠져들면 헤어나오기 어렵다. 지친 하루 끝에 켜는 힐링 게임으로 이만한 게 없다.", img: "https://www.nintendo.com/kr/switch/acbaa/sns.png?200220", imgPos: "center top" },
  { id: 7, title: "젤다의 전설 야생의 숨결", genre: "Action Adventure", platform: "Switch", year: "2017", featured: false, desc: "광활한 하이랄을 자유롭게 탐험. 오픈월드의 기준을 바꾼 게임!", longDesc: "야생의 숨결이 등장했을 때, 오픈월드 게임의 패러다임이 바뀌었다. 보이는 곳은 어디든 갈 수 있고, 정해진 순서 없이 자유롭게 이야기를 풀어나간다. 물리 엔진을 활용한 창의적인 문제 해결은 플레이어마다 완전히 다른 경험을 만들어낸다. 광활한 하이랄 대륙을 처음 바라봤을 때의 그 벅찬 감동은 지금도 잊을 수 없다. 게임이 가진 가능성의 한계를 넓혀준 작품.", img: "https://i.namu.wiki/i/S66iBPwJwpp_sPdmF1vdHUTmAVawerAHCmH0vps93PCZg986ttafD3tUfT-vUHxlwUa1sy29MDuD5W8Vp6c6EQ.webp", imgPos: "center 35%" },
  { id: 8, title: "파이널판타지7 리버스", genre: "RPG", platform: "PS5", year: "2024", featured: false, desc: "전설적인 FF7의 리메이크 2부작. 압도적인 스케일과 감동적인 스토리!", longDesc: "파이널판타지7은 많은 사람들에게 특별한 의미를 가진 게임이다. 리버스는 그 추억을 현대적으로 완벽하게 재해석했다. 방대한 세계를 탐험하는 재미, 긴장감 넘치는 전투 시스템, 그리고 원작을 알면 더욱 감동적인 스토리의 전개. PS5의 성능을 최대한 활용한 비주얼은 말 그대로 압도적이다. 클라우드와 동료들의 여정을 따라가다 보면 어느새 감정이 벅차오른다.", img: "https://i.ytimg.com/vi/y1OYkOeZ0cw/maxresdefault.jpg", imgPos: "center 20%" },
  { id: 9, title: "용과같이 7", genre: "RPG", platform: "PS4 / PS5 / PC", year: "2020", featured: false, desc: "야쿠자 시리즈의 새로운 출발. 턴제 RPG로 바뀌고의 첫 시작!", longDesc: "용과같이 시리즈가 액션에서 턴제 RPG로 장르를 바꾼다고 했을 때 많은 팬들이 우려했다. 하지만 결과는 대성공이었다. 이치반 카스가라는 새로운 주인공은 드래곤퀘스트를 사랑하는 순수한 청년으로, 그의 시선을 통해 야쿠자 세계를 완전히 새롭게 바라볼 수 있다. 개성 넘치는 동료들, 웃음과 감동이 공존하는 스토리, 그리고 의외로 깊이 있는 전투 시스템까지. 시리즈 입문작으로도 완벽하다.", img: "https://image.api.playstation.com/vulcan/ap/rnd/202012/2409/PMqg5YfQ45re7uNObASPi9vr.jpg", imgPos: "center 15%" },
  { id: 10, title: "Marvel's Spider-Man", genre: "Action", platform: "PS5", year: "2022", featured: false, desc: "뉴욕을 누비는 스파이더맨의 상쾌한 액션. PS5 독점의 대표작!", longDesc: "스파이더맨 리마스터드는 PS5의 성능이 게임 경험을 얼마나 바꿀 수 있는지 보여주는 대표적인 사례다. 거미줄로 뉴욕 빌딩 사이를 누비는 이동감은 게임 역사상 가장 상쾌한 경험 중 하나다. DualSense 컨트롤러의 햅틱 피드백과 어댑티브 트리거로 거미줄을 쏠 때의 물리적 느낌까지 전달된다. 스파이더맨이라는 캐릭터를 좋아한다면, 그리고 PS5를 가지고 있다면 반드시 플레이해야 할 게임.", img: "https://www.nvidia.com/content/dam/en-zz/Solutions/GeForce/campaigns/marvel-spider-man-remastered-bundle/geforce-spider-man-remastered-bundle-og-1200x630.jpg", imgPos: "center 30%" },
];

const SEASONS = [
  { num: "01", label: "Spring — Now", ko: "봄", title: "Persona 3 Reload", current: true, genre: "RPG", platform: "PC / PS5 / Xbox", year: "2024", img: "https://personacentral.com/wp-content/uploads/2023/06/P3R-Key-Art.jpg", thumb: "https://m.media-amazon.com/images/I/81rOCWGohjL.jpg", desc: "봄은 시작의 계절이다. 새로운 학기, 새로운 만남, 그리고 새로운 모험. 페르소나3 리로드는 그 모든 것을 담고 있다. 낮에는 학교에서 친구들과 일상을 보내고, 밤이 되면 타르타로스라는 거대한 던전을 탐험하는 이중적인 삶. 삶과 죽음, 시간의 유한함이라는 묵직한 주제를 다루면서도, 등장인물 하나하나와 쌓아가는 유대감이 진짜 감동을 만들어낸다. 원작의 감성을 그대로 살리면서도 현대적으로 완벽하게 재탄생한 리메이크. 봄의 시작을 이 게임과 함께하길 강력히 추천한다." },
  { num: "02", label: "Summer", ko: "여름", title: "Marvel's Spider-Man", current: false, genre: "Action", platform: "PS5", year: "2022", img: "https://gaming-cdn.com/images/news/articles/9092/cover/1000x563/insomniac-games-shows-marvel-s-spider-man-2-running-on-the-ps5-pro-cover6727d7c0047f4.jpg", thumb: "https://m.media-amazon.com/images/I/81d6JU6g1pL.jpg", desc: "여름의 뜨거운 태양 아래, 뉴욕의 고층빌딩 사이를 종횡무진 누비는 스파이더맨. 이 게임은 단순한 히어로 액션을 넘어, 피터 파커라는 인간의 이야기를 진지하게 풀어낸다. 거미줄로 빌딩 사이를 자유롭게 날아다니는 이동감은 게임 역사상 최고 수준이며, 전투 역시 스파이더맨 특유의 민첩함과 기술을 완벽하게 재현했다. PS5의 성능을 최대한 활용한 그래픽과 빠른 로딩, 햅틱 피드백까지 더해져 완성도가 극히 높다. 여름방학, 시원한 실내에서 뉴욕의 하늘을 날아보자." },
  { num: "03", label: "Autumn", ko: "가을", title: "젤다의 전설 야생의 숨결", current: false, genre: "Action Adventure", platform: "Switch", year: "2017", img: "https://img1.daumcdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/gnAJ/image/SP4oHtaFR89zGgmr1-nVtWY-00w.heic", thumb: "https://i.namu.wiki/i/r_pj0Djugb71uS8Us-TAhD1T65s8u22IC9bhaTe5x7pNXFhqrv0PrgDrYCNEOeYdUmdpRX8tktSnB01mOXcDVw.webp", desc: "가을의 쓸쓸하고 광활한 풍경처럼, 야생의 숨결의 하이랄 대륙은 어디를 걸어도 아름답다. 이 게임이 특별한 이유는 단 하나, 완전한 자유다. 목표도, 순서도, 정해진 길도 없다. 보이는 산은 모두 올라갈 수 있고, 보이는 곳은 어디든 갈 수 있다. 그 자유 속에서 스스로 이야기를 만들어가는 경험은 다른 어떤 게임에서도 느끼기 어렵다. 가을 저녁, 느긋하게 하이랄을 산책하듯 탐험하다 보면 시간이 어떻게 가는지 모른다." },
  { num: "04", label: "Winter", ko: "겨울", title: "Detroit: Become Human", current: false, genre: "Adventure", platform: "PS4 / PC", year: "2018", img: "https://assets.nuuvem.com/image/upload/t_product_sharing_banner/v1/products/5fbc2424c883e62937046bec/sharing_images/xb6wholg7wcluf1kggzu.jpg", thumb: "https://image.api.playstation.com/vulcan/img/rnd/202010/2119/wl4DB5QGzlEHAXy1KLUVgOAu.png", desc: "겨울의 차갑고 고요한 분위기 속에서, 디트로이트: 비컴 휴먼은 인간이란 무엇인가라는 질문을 던진다. 안드로이드가 일상화된 미래 사회에서, 세 명의 안드로이드 주인공이 각자의 방식으로 자유와 감정, 존재의 의미를 찾아가는 이야기다. 플레이어의 선택 하나하나가 스토리를 바꾸고, 결말을 바꾼다. 영화 같은 연출과 배우들의 모션캡처 연기가 어우러져 게임이 아닌 인터랙티브 영화를 보는 느낌이다. 긴 겨울 밤, 담요를 덮고 이 감동적인 이야기에 빠져들어 보길 바란다." },
];

const MENUS = ["Game", "Review", "Genre", "Songty", "Songpick of the Season"];
const currentSeason = SEASONS.find((s) => s.current);
const GRID_GAMES = [GAMES[5], GAMES[7], GAMES[8], GAMES[9]];

function Nav({ activePage, setActivePage }) {
  return (
    <div style={{ borderBottom: "5px solid #111", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFE000", flexWrap: "wrap", gap: "8px" }}>
      <div onClick={() => setActivePage("Home")} style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: "32px", color: "#111", lineHeight: 1.0, letterSpacing: "-2px", cursor: "pointer" }}>
        Songpick!<br />Games
      </div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
        {MENUS.map((m) => (
          <span key={m} onClick={() => setActivePage(m)} style={{ fontSize: "11px", color: "#111", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", cursor: "pointer", textDecoration: activePage === m ? "underline" : "none", textUnderlineOffset: "3px" }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function GameEntry({ game, isLast, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ borderBottom: isLast ? "none" : "2px solid #111", padding: "10px 14px", cursor: "pointer", background: hovered ? "#111" : "transparent", transition: "background 0.15s", display: "flex", gap: "10px", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(game)}
    >
      <img src={game.img} alt={game.title} style={{ width: "44px", height: "44px", objectFit: "cover", objectPosition: game.imgPos, borderRadius: "4px", flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: "9px", color: hovered ? "#888" : "#555", marginBottom: "3px", textTransform: "uppercase", fontWeight: 500 }}>
          {game.genre} · {game.year}{game.featured ? " · Featured" : ""}
        </div>
        <div style={{ fontSize: "13px", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", lineHeight: 1.1, color: hovered ? "#FFE000" : "#111" }}>
          {game.title}
        </div>
      </div>
    </div>
  );
}

function MidCell({ game, noBorderRight, noBorderBottom, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ borderRight: noBorderRight ? "none" : "2px solid #111", borderBottom: noBorderBottom ? "none" : "2px solid #111", cursor: "pointer", position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(game)}
    >
      <img src={game.img} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: game.imgPos, display: "block" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "20px 12px 10px" }}>
        <div style={{ fontSize: "9px", color: "#aaa", textTransform: "uppercase", fontWeight: 500, marginBottom: "2px" }}>{game.genre} · {game.year}</div>
        <div style={{ fontSize: "12px", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", lineHeight: 1.1, color: hovered ? "#FFE000" : "#fff" }}>{game.title}</div>
      </div>
    </div>
  );
}

function SeasonEntry({ season, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ borderBottom: isLast ? "none" : "2px solid #111", cursor: "pointer", background: hovered ? "#111" : "transparent", transition: "background 0.15s", flex: 1, display: "flex", overflow: "hidden" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: "72px", flexShrink: 0, overflow: "hidden" }}>
        <img src={season.thumb} alt={season.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>
      <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "20px", fontWeight: 900, fontFamily: "'Arial Black', sans-serif", lineHeight: 1, color: hovered ? "#FFE000" : "#111" }}>{season.num}</div>
        <div style={{ fontSize: "9px", color: hovered ? "#888" : "#555", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700, marginTop: "2px" }}>{season.label}</div>
        <div style={{ fontSize: "11px", fontWeight: 700, color: hovered ? "#FFE000" : "#111", marginTop: "2px", lineHeight: 1.2 }}>{season.title}</div>
      </div>
    </div>
  );
}

// ── 게임 상세 페이지 ──────────────────────────────────────
function GameDetailPage({ game, onBack, activePage, setActivePage }) {
  return (
    <div style={{ background: "#FFE000", height: "100vh", border: "8px solid #111", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>

        {/* 왼쪽 — 이미지 */}
        <div style={{ position: "relative", overflow: "hidden", borderRight: "5px solid #111" }}>
          <img src={game.img} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: game.imgPos, display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "32px 28px 24px" }}>
            <div style={{ fontSize: "10px", color: "#FFE000", textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px", marginBottom: "6px" }}>
              {game.genre} · {game.platform} · {game.year}
            </div>
            <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "36px", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-1.5px" }}>
              {game.title}
            </div>
          </div>
        </div>

        {/* 오른쪽 — 상세 정보 */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* 뒤로가기 */}
          <div
            onClick={onBack}
            style={{ padding: "14px 28px", borderBottom: "5px solid #111", fontSize: "11px", fontWeight: 700, color: "#111", textTransform: "uppercase", letterSpacing: "0.8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
          >
            ← Back to Home
          </div>

          <div style={{ flex: 1, padding: "32px 36px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto" }}>
            {/* 태그 */}
            <div style={{ display: "flex", gap: "20px" }}>
              {[["Genre", game.genre], ["Platform", game.platform], ["Year", game.year]].map(([label, val]) => (
                <div key={label} style={{ borderLeft: "4px solid #111", paddingLeft: "12px" }}>
                  <div style={{ fontSize: "9px", color: "#555", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.8px", marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "15px", fontWeight: 900, color: "#111" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* 구분선 */}
            <div style={{ borderTop: "3px solid #111" }} />

            {/* 한줄 소개 */}
            <div>
              <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.8px", marginBottom: "8px" }}>Song's Pick</div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "18px", fontWeight: 900, color: "#111", lineHeight: 1.3 }}>{game.desc}</div>
            </div>

            {/* 상세 설명 */}
            <div>
              <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.8px", marginBottom: "10px" }}>Review</div>
              <div style={{ fontSize: "14px", color: "#222", lineHeight: 2.0 }}>{game.longDesc}</div>
            </div>

            {game.featured && (
              <div style={{ background: "#111", padding: "14px 18px", display: "inline-block" }}>
                <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "13px", fontWeight: 900, color: "#FFE000", textTransform: "uppercase", letterSpacing: "1px" }}>
                  ★ Song's Featured Pick
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function HomePage({ activePage, setActivePage, onGameClick }) {
  return (
    <div style={{ background: "#FFE000", height: "100vh", border: "8px solid #111", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "260px 1fr 200px", overflow: "hidden" }}>

        <div style={{ borderRight: "5px solid #111", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", borderBottom: "3px solid #111", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", flexShrink: 0 }}>
            Games — Song's Pick
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {GAMES.map((game, i) => (
              <GameEntry key={game.id} game={game} isLast={i === GAMES.length - 1} onClick={onGameClick} />
            ))}
          </div>
        </div>

        <div style={{ borderRight: "5px solid #111", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: "0 0 60%", position: "relative", overflow: "hidden", borderBottom: "5px solid #111" }}>
            <img src={currentSeason.img} alt={currentSeason.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.9))", padding: "40px 28px 20px" }}>
              <div style={{ fontSize: "9px", fontWeight: 700, color: "#FFE000", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>Songpick of the Season — Spring</div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "24px", fontWeight: 900, color: "#fff", lineHeight: 1.0, letterSpacing: "-1px" }}>{currentSeason.title}</div>
              <div style={{ fontSize: "11px", color: "#aaa", marginTop: "5px", textTransform: "uppercase" }}>{currentSeason.genre} · {currentSeason.platform} · {currentSeason.year}</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", overflow: "hidden" }}>
            {GRID_GAMES.map((game, i) => (
              <MidCell key={game.id} game={game} noBorderRight={i % 2 !== 0} noBorderBottom={i >= 2} onClick={onGameClick} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", borderBottom: "3px solid #111", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", fontFamily: "'Arial Black', sans-serif", lineHeight: 1.2, flexShrink: 0 }}>
            Songpick of the Season
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {SEASONS.map((season, i) => (
              <SeasonEntry key={season.num} season={season} isLast={i === SEASONS.length - 1} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function GamesPage({ activePage, setActivePage, onGameClick }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ background: "#FFE000", height: "100vh", border: "8px solid #111", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "12px 28px", borderBottom: "5px solid #111", display: "flex", alignItems: "baseline", gap: "14px", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: "24px", color: "#111", letterSpacing: "-1px" }}>All Games</div>
          <div style={{ fontSize: "10px", color: "#555", textTransform: "uppercase", fontWeight: 700 }}>Song's Pick — {GAMES.length} titles</div>
        </div>
        <div style={{ flex: 1, display: "flex", overflowX: "auto", overflowY: "hidden" }}>
          {GAMES.map((game, i) => (
            <div
              key={game.id}
              style={{ minWidth: "180px", maxWidth: "200px", borderRight: i === GAMES.length - 1 ? "none" : "5px solid #111", display: "flex", flexDirection: "column", background: hovered === game.id ? "#111" : "transparent", cursor: "pointer", transition: "background 0.15s", flexShrink: 0, overflow: "hidden" }}
              onMouseEnter={() => setHovered(game.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onGameClick(game)}
            >
              <div style={{ width: "100%", height: "120px", overflow: "hidden", flexShrink: 0 }}>
                <img src={game.img} alt={game.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: game.imgPos, display: "block" }} />
              </div>
              <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
                <div>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "28px", fontWeight: 900, color: hovered === game.id ? "#FFE000" : "#111", lineHeight: 1, marginBottom: "10px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: "9px", color: hovered === game.id ? "#888" : "#555", textTransform: "uppercase", fontWeight: 700, marginBottom: "5px" }}>{game.genre}</div>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "13px", fontWeight: 900, color: hovered === game.id ? "#FFE000" : "#111", lineHeight: 1.1, marginBottom: "8px" }}>{game.title}</div>
                  <div style={{ fontSize: "11px", color: hovered === game.id ? "#aaa" : "#555", lineHeight: 1.6 }}>{game.desc}</div>
                </div>
                <div style={{ fontSize: "9px", color: hovered === game.id ? "#888" : "#555", textTransform: "uppercase", fontWeight: 700, borderTop: hovered === game.id ? "1px solid #333" : "1px solid #111", paddingTop: "8px", marginTop: "10px" }}>
                  {game.platform} · {game.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SeasonPage({ activePage, setActivePage }) {
  const [selected, setSelected] = useState(0);
  const season = SEASONS[selected];
  return (
    <div style={{ background: "#FFE000", height: "100vh", border: "8px solid #111", boxSizing: "border-box", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Nav activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "240px 1fr", overflow: "hidden" }}>
        <div style={{ borderRight: "5px solid #111", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "8px 14px", borderBottom: "3px solid #111", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", flexShrink: 0 }}>
            Season Select
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {SEASONS.map((s, i) => (
              <div
                key={s.num}
                onClick={() => setSelected(i)}
                style={{ flex: 1, borderBottom: i === SEASONS.length - 1 ? "none" : "2px solid #111", cursor: "pointer", background: selected === i ? "#111" : "transparent", display: "flex", overflow: "hidden", transition: "background 0.15s" }}
              >
                <div style={{ width: "80px", flexShrink: 0, overflow: "hidden" }}>
                  <img src={s.thumb} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                </div>
                <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "22px", fontWeight: 900, color: selected === i ? "#FFE000" : "#111", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "9px", color: selected === i ? "#888" : "#555", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700, marginTop: "2px" }}>{s.label} {s.ko}</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: selected === i ? "#FFE000" : "#111", marginTop: "2px" }}>{s.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: "0 0 65%", position: "relative", overflow: "hidden", borderBottom: "5px solid #111", background: "#111" }}>
            {season.img && (
              <img src={season.img} alt={season.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            )}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.9))", padding: "48px 36px 24px" }}>
              <div style={{ fontSize: "9px", fontWeight: 700, color: "#FFE000", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                Songpick of the Season — {season.label} {season.ko}
              </div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "32px", fontWeight: 900, color: "#fff", lineHeight: 0.95, letterSpacing: "-2px" }}>
                {season.title}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, padding: "20px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px", overflowY: "auto", background: "#FFE000" }}>
            <div style={{ display: "flex", gap: "24px" }}>
              {[["Genre", season.genre], ["Platform", season.platform], ["Year", season.year]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontSize: "9px", color: "#555", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.8px", marginBottom: "3px" }}>{label}</div>
                  <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "14px", fontWeight: 900, color: "#111" }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "13px", color: "#222", lineHeight: 1.9, maxWidth: "680px" }}>
              {season.desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 메인 App ─────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedGame, setSelectedGame] = useState(null);

  // 게임 클릭 핸들러
  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  // 게임 상세 페이지
  if (selectedGame) {
    return (
      <GameDetailPage
        game={selectedGame}
        onBack={() => setSelectedGame(null)}
        activePage={activePage}
        setActivePage={(page) => { setActivePage(page); setSelectedGame(null); }}
      />
    );
  }

  if (activePage === "Game") return <GamesPage activePage={activePage} setActivePage={setActivePage} onGameClick={handleGameClick} />;
  if (activePage === "Songpick of the Season") return <SeasonPage activePage={activePage} setActivePage={setActivePage} />;
  return <HomePage activePage={activePage} setActivePage={setActivePage} onGameClick={handleGameClick} />;
}
