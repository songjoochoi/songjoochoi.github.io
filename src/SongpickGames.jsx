import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const Y  = "#FFE000";
const BK = "#0f0f0f";
const WH = "#ffffff";

/* ══════════════════════════════════════════
   계절 테마 — 밝고 선명하게
══════════════════════════════════════════ */
const SEASON_THEME = {
  spring: {
    badge:"봄 / SPRING", emoji:"🌸",
    /* 하늘색 — P3R 타르타로스의 밤하늘+벚꽃 */
    pageBg:"linear-gradient(160deg, #0d1e38 0%, #112848 30%, #0e2240 60%, #0a1828 100%)",
    navBg:"linear-gradient(90deg, #1a6abf 0%, #1255a0 50%, #1a6abf 100%)",
    navText:"#ffffff",
    navActive:"#FFE000",
    navBorder:"rgba(255,255,255,0.2)",
    sidebarBg:"linear-gradient(180deg, #112848 0%, #0d1e38 100%)",
    sidebarBorder:"rgba(42,130,220,0.3)",
    infoBg:"linear-gradient(180deg, #112848 0%, #0d1e38 100%)",
    infoText:"#d4e8ff",
    infoSubText:"#a8ccf5",
    infoMuted:"rgba(212,232,255,0.8)",
    accent:"#6ab8ff",
    accent2:"#e0b0f0",
    divider:"rgba(106,184,255,0.25)",
    scoreColor:"#6ab8ff",
    glowColor:"rgba(106,184,255,0.4)",
    textOnImg:WH,
    imgBadgeBg:"rgba(21,101,192,0.85)",
    particle:{ colors:["#90caf9","#64b5f6","#42a5f5","#f8bbd0","#ce93d8"], count:70, type:"petal" },
  },
  summer: {
    badge:"여름 / SUMMER", emoji:"🕷️",
    /* 강렬한 레드+블루 — 뜨거운 뉴욕 */
    pageBg:"linear-gradient(160deg, #b71c1c 0%, #880000 25%, #0d0019 50%, #0d2060 75%, #880000 100%)",
    navBg:"linear-gradient(90deg, #b71c1c 0%, #c62828 50%, #b71c1c 100%)",
    navText:"#ffffff",
    navActive:"#FFE000",
    navBorder:"rgba(255,255,255,0.2)",
    sidebarBg:"linear-gradient(180deg, #4a0000 0%, #1a0010 100%)",
    sidebarBorder:"rgba(255,50,50,0.2)",
    infoBg:"linear-gradient(180deg, #1a0010 0%, #0d0019 100%)",
    infoText:"#ff8a80",
    infoSubText:"#ff5252",
    infoMuted:"rgba(255,130,128,0.6)",
    accent:"#ff1744",
    accent2:"#2979ff",
    divider:"rgba(255,23,68,0.25)",
    scoreColor:"#ff1744",
    glowColor:"rgba(255,23,68,0.4)",
    textOnImg:WH,
    imgBadgeBg:"rgba(183,28,28,0.9)",
    particle:{ colors:["#ff1744","#2979ff","#ff5252","#448aff","#ff8a80"], count:45, type:"web" },
  },
  autumn: {
    badge:"가을 / AUTUMN", emoji:"🍂",
    /* 선명한 황혼 오렌지+황금 */
    pageBg:"linear-gradient(160deg, #e65100 0%, #bf360c 25%, #4e342e 50%, #e65100 75%, #ff6f00 100%)",
    navBg:"linear-gradient(90deg, #e65100 0%, #f57c00 50%, #e65100 100%)",
    navText:"#fff8e1",
    navActive:"#FFE000",
    navBorder:"rgba(255,248,225,0.2)",
    sidebarBg:"linear-gradient(180deg, #3e1a00 0%, #2e1100 100%)",
    sidebarBorder:"rgba(255,152,0,0.2)",
    infoBg:"linear-gradient(180deg, #2e1100 0%, #1a0a00 100%)",
    infoText:"#ffcc80",
    infoSubText:"#ffa726",
    infoMuted:"rgba(255,204,128,0.6)",
    accent:"#ff6f00",
    accent2:"#4caf50",
    divider:"rgba(255,111,0,0.25)",
    scoreColor:"#ff6f00",
    glowColor:"rgba(255,111,0,0.4)",
    textOnImg:WH,
    imgBadgeBg:"rgba(230,81,0,0.9)",
    particle:{ colors:["#ff6f00","#e65100","#f57c00","#ff8f00","#ffb300"], count:60, type:"leaf" },
  },
  winter: {
    badge:"겨울 / WINTER", emoji:"❄️",
    /* 차갑고 딥한 — 안드로이드 LED, 아이스 화이트+청회색 */
    pageBg:"linear-gradient(160deg, #020810 0%, #040c18 25%, #060e1c 55%, #020810 100%)",
    navBg:"linear-gradient(90deg, #050d1a 0%, #030a14 50%, #050d1a 100%)",
    navText:"#cfd8e8",
    navActive:"#7eb8f7",
    navBorder:"rgba(126,184,247,0.15)",
    sidebarBg:"linear-gradient(180deg, #060e20 0%, #030810 100%)",
    sidebarBorder:"rgba(126,184,247,0.1)",
    infoBg:"linear-gradient(180deg, #060e20 0%, #030810 100%)",
    infoText:"#e8eef6",
    infoSubText:"#b8ccdf",
    infoMuted:"rgba(232,238,246,0.75)",
    accent:"#9ec8f5",
    accent2:"#c8ddf0",
    divider:"rgba(158,200,245,0.18)",
    scoreColor:"#9ec8f5",
    glowColor:"rgba(158,200,245,0.25)",
    textOnImg:WH,
    imgBadgeBg:"rgba(3,8,20,0.9)",
    particle:{ colors:["#cfd8e8","#8ea8c8","#7eb8f7","#e8eef4","#b0c8e8"], count:80, type:"snow" },
  },
};

/* ── 파티클 ── */
function SeasonParticles({ seasonKey }) {
  const canvasRef=useRef(null); const rafRef=useRef(null);
  const cfg=SEASON_THEME[seasonKey].particle;
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
    const W=canvas.width, H=canvas.height;
    const particles=Array.from({length:cfg.count},(_,i)=>({
      x:Math.random()*W, y:Math.random()*H,
      size:Math.random()*10+5,
      speed:Math.random()*1.3+0.3,
      swing:(Math.random()-0.5)*2.5,
      swingAng:Math.random()*Math.PI*2, swingSpd:Math.random()*0.028+0.006,
      rot:Math.random()*Math.PI*2, rotSpd:(Math.random()-0.5)*0.065,
      opacity:Math.random()*0.75+0.3,
      color:cfg.colors[i%cfg.colors.length],
      rays:Math.floor(Math.random()*4)+5, rayLen:Math.random()*14+8,
    }));
    const drawPetal=(ctx,p)=>{
      ctx.beginPath(); ctx.ellipse(0,-p.size*.55,p.size*.38,p.size*.78,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0,p.size*.55,p.size*.38,p.size*.78,Math.PI*.18,0,Math.PI*2); ctx.fill();
    };
    const drawLeaf=(ctx,p)=>{
      ctx.beginPath(); ctx.moveTo(0,-p.size);
      ctx.bezierCurveTo(p.size*.85,-p.size*.5,p.size*.85,p.size*.5,0,p.size);
      ctx.bezierCurveTo(-p.size*.85,p.size*.5,-p.size*.85,-p.size*.5,0,-p.size);
      ctx.fill();
      ctx.strokeStyle="rgba(0,0,0,0.15)"; ctx.lineWidth=0.7;
      ctx.beginPath(); ctx.moveTo(0,-p.size); ctx.lineTo(0,p.size); ctx.stroke();
    };
    const drawSnow=(ctx,p)=>{
      ctx.beginPath(); ctx.arc(0,0,p.size*.5,0,Math.PI*2); ctx.fill();
      for(let k=0;k<6;k++){
        const a=(k/6)*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*p.size,Math.sin(a)*p.size);
        ctx.strokeStyle=p.color; ctx.lineWidth=0.9; ctx.globalAlpha=p.opacity*.5; ctx.stroke();
      }
    };
    const drawWeb=(ctx,p)=>{
      for(let k=0;k<p.rays;k++){
        const a=(k/p.rays)*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*p.size,Math.sin(a)*p.size);
        ctx.strokeStyle=p.color; ctx.lineWidth=1; ctx.globalAlpha=p.opacity*.65; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(0,0,p.size*.28,0,Math.PI*2); ctx.fill();
    };
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      particles.forEach(p=>{
        p.swingAng+=p.swingSpd; p.x+=Math.sin(p.swingAng)*p.swing;
        p.y+=p.speed; p.rot+=p.rotSpd;
        if(p.y>H+20){p.y=-20; p.x=Math.random()*W;}
        ctx.save(); ctx.globalAlpha=p.opacity; ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color;
        if(cfg.type==="petal") drawPetal(ctx,p);
        else if(cfg.type==="leaf") drawLeaf(ctx,p);
        else if(cfg.type==="snow") drawSnow(ctx,p);
        else if(cfg.type==="web") drawWeb(ctx,p);
        ctx.restore();
      });
      rafRef.current=requestAnimationFrame(draw);
    };
    draw(); return()=>cancelAnimationFrame(rafRef.current);
  },[seasonKey]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:3}}/>;
}

function MiniParticles({ seasonKey }) {
  const canvasRef=useRef(null); const rafRef=useRef(null);
  const cfg=SEASON_THEME[seasonKey].particle;
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
    const W=canvas.width, H=canvas.height;
    const count=Math.floor(cfg.count*.4);
    const particles=Array.from({length:count},(_,i)=>({
      x:Math.random()*W, y:Math.random()*H, size:Math.random()*4+2,
      speed:Math.random()*.7+.15, swing:(Math.random()-.5)*1.3,
      swingAng:Math.random()*Math.PI*2, swingSpd:Math.random()*.022+.005,
      rot:Math.random()*Math.PI*2, rotSpd:(Math.random()-.5)*.05,
      opacity:Math.random()*.6+.3, color:cfg.colors[i%cfg.colors.length],
    }));
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      particles.forEach(p=>{
        p.swingAng+=p.swingSpd; p.x+=Math.sin(p.swingAng)*p.swing; p.y+=p.speed; p.rot+=p.rotSpd;
        if(p.y>H+10){p.y=-10; p.x=Math.random()*W;}
        ctx.save(); ctx.globalAlpha=p.opacity; ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color;
        ctx.beginPath();
        if(cfg.type==="petal") ctx.ellipse(0,0,p.size*.4,p.size*.8,0,0,Math.PI*2);
        else if(cfg.type==="leaf") ctx.ellipse(0,0,p.size*.4,p.size*.9,0,0,Math.PI*2);
        else ctx.arc(0,0,p.size*.5,0,Math.PI*2);
        ctx.fill(); ctx.restore();
      });
      rafRef.current=requestAnimationFrame(draw);
    };
    draw(); return()=>cancelAnimationFrame(rafRef.current);
  },[seasonKey]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}/>;
}

function WesternParticles() {
  const canvasRef=useRef(null); const rafRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d");
    canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight;
    const W=canvas.width, H=canvas.height;
    const dust=Array.from({length:70},(_,i)=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2.5+.5,vx:(Math.random()-.3)*.8,vy:-Math.random()*.4-.1,opacity:Math.random()*.3+.08,color:["#c8860a","#8b2500","#d4a017","#a0522d","#cd853f"][i%5]}));
    const stars=Array.from({length:10},()=>({x:Math.random()*W,y:Math.random()*H,size:Math.random()*9+5,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.2,rot:Math.random()*Math.PI*2,rotSpd:(Math.random()-.5)*.02,opacity:Math.random()*.45+.2}));
    const drawStar=(ctx,x,y,size,rot)=>{ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.beginPath();for(let k=0;k<10;k++){const a=(k*Math.PI)/5-Math.PI/2;const r=k%2===0?size:size*.42;k===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();ctx.restore();};
    const draw=()=>{ctx.clearRect(0,0,W,H);dust.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<-5)p.x=W+5;if(p.x>W+5)p.x=-5;if(p.y<-5){p.y=H+5;p.x=Math.random()*W;}ctx.save();ctx.globalAlpha=p.opacity;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();ctx.restore();});stars.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.rotSpd;if(p.x<-20)p.x=W+20;if(p.x>W+20)p.x=-20;if(p.y<-20)p.y=H+20;if(p.y>H+20)p.y=-20;ctx.save();ctx.globalAlpha=p.opacity;ctx.fillStyle="#d4a017";drawStar(ctx,p.x,p.y,p.size,p.rot);ctx.restore();});rafRef.current=requestAnimationFrame(draw);};
    draw(); return()=>cancelAnimationFrame(rafRef.current);
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:2}}/>;
}

/* ── 서부 슬라이더 (송티용) ── */
function WesternSlider({ slides, score }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const total = slides.length;
  return (
    <div style={{position:"relative",width:580,filter:"drop-shadow(0 20px 60px rgba(0,0,0,.9)) drop-shadow(0 0 40px rgba(139,69,0,.4))"}}>
      <div style={{position:"relative",overflow:"hidden",borderRadius:6,border:"2px solid rgba(212,160,23,.4)",background:"#0d0400",height:380}}>
        {slides.map((src,i)=>(
          <img key={i} src={src} alt={`RDR2 ${i+1}`}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",
              objectFit:"cover",objectPosition:"center center",
              borderRadius:6,
              opacity:i===slideIdx?1:0,transition:"opacity .5s ease"}}/>
        ))}
        {total>1&&(
          <>
            <button onClick={()=>setSlideIdx(i=>(i-1+total)%total)}
              style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",
                background:"rgba(0,0,0,0.6)",border:"1px solid #d4a01799",color:"#d4a017",
                width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:18,
                display:"flex",alignItems:"center",justifyContent:"center",zIndex:5}}>‹</button>
            <button onClick={()=>setSlideIdx(i=>(i+1)%total)}
              style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",
                background:"rgba(0,0,0,0.6)",border:"1px solid #d4a01799",color:"#d4a017",
                width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:18,
                display:"flex",alignItems:"center",justifyContent:"center",zIndex:5}}>›</button>
            <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,zIndex:5}}>
              {slides.map((_,i)=>(
                <div key={i} onClick={()=>setSlideIdx(i)}
                  style={{width:i===slideIdx?20:6,height:6,borderRadius:3,
                    background:i===slideIdx?"#d4a017":"#d4a01766",cursor:"pointer",transition:"all .3s"}}/>
              ))}
            </div>
          </>
        )}
      </div>
      <div style={{position:"absolute",bottom:-20,right:-20,width:80,height:80,borderRadius:"50%",
        background:"radial-gradient(circle,#8b0000,#5a0000)",border:"3px solid #d4a017",
        display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 20px rgba(0,0,0,.8)"}}>
        <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:32,color:"#d4a017",lineHeight:1}}>{score}</div>
        <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#8b4500",letterSpacing:1}}>/10</div>
      </div>
    </div>
  );
}

/* ── 계절 슬라이더 (송픽오브더시즌용) ── */
function SeasonSlider({ slides, subtitle, t, isLight, mood, pos }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const total = slides.length;
  return (
    <div style={{position:"relative",height:520,overflow:"hidden",flexShrink:0,
      background:isLight?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.2)"}}>
      {slides.map((src,i)=>(
        <img key={i} src={src} alt={`${subtitle} ${i+1}`}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",
            objectFit:"cover",objectPosition:pos||"center center",display:"block",
            opacity:i===slideIdx?1:0,transition:"opacity .5s ease",zIndex:1}}/>
      ))}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
        background:`linear-gradient(to bottom, transparent 50%, ${isLight?"rgba(255,240,245,0.8)":"rgba(0,0,0,0.4)"} 100%)`}}/>
      {/* 계절 뱃지 */}
      <div style={{position:"absolute",top:20,left:24,zIndex:5}}>
        <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:t.accent,letterSpacing:4,marginBottom:6,opacity:0.9,
          textShadow:isLight?"0 1px 4px rgba(255,255,255,0.8)":"0 1px 12px rgba(0,0,0,0.9)"}}>
          SONGPICK OF THE SEASON
        </div>
        <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:62,color:t.accent,lineHeight:.88,letterSpacing:1,
          textShadow:isLight?`0 2px 0 rgba(255,255,255,0.8),0 4px 20px ${t.glowColor}`:`0 2px 0 rgba(0,0,0,0.5),0 0 60px ${t.glowColor}`}}>
          {t.badge}
        </div>
      </div>
      {/* 무드 텍스트 */}
      <div style={{position:"absolute",bottom:16,right:total>1?72:20,zIndex:5,textAlign:"right"}}>
        <div style={{fontFamily:"var(--fb)",fontSize:12,color:isLight?t.infoText:t.infoSubText,
          fontStyle:"italic",lineHeight:1.7,maxWidth:280,
          textShadow:isLight?"0 1px 4px rgba(255,255,255,0.6)":"0 1px 10px rgba(0,0,0,0.9)"}}>
          {mood}
        </div>
      </div>
      {/* 화살표 + 인디케이터 */}
      {total>1&&(
        <>
          <button onClick={()=>setSlideIdx(i=>(i-1+total)%total)}
            style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",zIndex:6,
              background:"rgba(0,0,0,0.45)",border:`1px solid ${t.accent}55`,color:t.accent,
              width:40,height:40,borderRadius:"50%",cursor:"pointer",fontSize:18,
              display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>‹</button>
          <button onClick={()=>setSlideIdx(i=>(i+1)%total)}
            style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",zIndex:6,
              background:"rgba(0,0,0,0.45)",border:`1px solid ${t.accent}55`,color:t.accent,
              width:40,height:40,borderRadius:"50%",cursor:"pointer",fontSize:18,
              display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>›</button>
          <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",zIndex:6,display:"flex",gap:6}}>
            {slides.map((_,i)=>(
              <div key={i} onClick={()=>setSlideIdx(i)}
                style={{width:i===slideIdx?20:6,height:6,borderRadius:3,
                  background:i===slideIdx?t.accent:`${t.accent}55`,cursor:"pointer",transition:"all .3s"}}/>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── DATA ── */
const GAMES=[
  {id:1,title:"The Sims 2",genre:"Life Sim",platform:"PC",year:2004,featured:true,
   color:"#1db954",
   pick:"현실과 가상의 경계에서 펼쳐지는 나만의 인생 시뮬레이션. 어릴 때부터 가장 오래 플레이한 게임.",
   review:"The Sims 2는 단순한 생활 시뮬레이션을 넘어, 플레이어가 직접 이야기를 만들어가는 게임이다. 캐릭터의 욕구와 관계, 성격이 유기적으로 맞물리며 예상치 못한 드라마가 자연스럽게 생겨난다. 심의 기분, 직업, 연애, 가족 관계까지 세밀하게 설계되어 있어 플레이어마다 전혀 다른 스토리가 펼쳐진다. 어린 시절부터 지금까지 세대를 초월해 계속 돌아오게 만드는 마성의 게임이며, 한 번 빠지면 시간이 순식간에 지나가 버린다.",
   score:9,cover:"https://static.wikia.nocookie.net/sims/images/6/6c/TheSims2%28SpecialDVDEdition%29-1-.jpg/revision/latest/scale-to-width-down/640?cb=20081220054508",pos:"center top"},
  {id:2,title:"Red Dead Redemption 2",genre:"Action Adventure",platform:"PS4 / PC",year:2018,
   color:"#c8690a",
   pick:"광활한 서부의 땅 속 아름다운 이야기. 그래픽과 스토리 모두 압도적.",
   review:"Rockstar가 만들어낸 최고의 서사시. 아서 모건의 이야기는 단순한 게임 서사를 넘어 문학적 깊이를 갖는다. 말을 타며 지평선을 바라보는 순간만으로도 이 게임의 가치는 충분하다. 그래픽, 사운드, 스토리 모든 면에서 당대 최고이며, 게임이라는 매체가 예술이 될 수 있다는 것을 증명한 작품이다. 아서 모건이라는 캐릭터는 게임 역사상 가장 입체적인 주인공 중 하나로, 그의 내면적 갈등과 성장 서사는 영화나 소설에 견줘도 손색이 없다.",
   score:10,
   cover:"https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA08519_00/12/i_3da1cf7c41dc7652f9b639e1680d96436773658668c7dc3930c441291095713b/i/icon0.png",
   pos:"center top",
   gridCover:"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg?t=1759502961",
   screenshots:[
     "https://sm.ign.com/t/ign_kr/trailer/r/red-dead-r/red-dead-redemption-2-launch-trailer_t19z.1200.jpg",
     "https://www.digitaltrends.com/tachyon/2018/10/red-dead-redemption-2-review-feature-header.jpg?resize=1200%2C720",
     "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16CC9/production/_103958339_mediaitem103958331.jpg",
   ],
  },
  {id:3,title:"Cyberpunk 2077",genre:"RPG",platform:"PC / PS5",year:2020,
   color:"#f0d000",
   pick:"네온이 가득한 미래 도시에서 살아남기. 2077년 속으로 가보자.",
   review:"출시 초기의 혹평을 딛고 완성형으로 거듭난 게임. 나이트시티는 현존하는 오픈월드 중 가장 밀도 높은 도시다. 거리마다 다른 분위기, 갱단, 기업들의 권력 다툼이 생생하게 살아 숨쉰다. 팬텀 리버티 DLC까지 더하면 최고의 RPG 경험 중 하나가 된다.",
   score:9,cover:"https://static.wikia.nocookie.net/cyberpunk/images/e/e0/Cyberpunk2077-keyart-female_v.png/revision/latest?cb=20201201001215",pos:"center top"},
  {id:4,title:"Biohazard Requiem",genre:"Survival Horror",platform:"PS5",year:2025,
   color:"#b00020",
   pick:"바이오하자드 시리즈의 새로운 공포. 시리즈 팬이라면 꼭 해봐야 할 올해의 게임.",
   review:"바이오하자드 시리즈가 다시 한번 진화했다. RE 엔진이 극한까지 활용된 비주얼과 함께, 시리즈 특유의 긴장감과 공포가 완벽하게 살아있다. 좁은 복도와 예상치 못한 공간에서 터져 나오는 공포 연출은 일품이다.",
   score:9,cover:"https://image.directg.net/v85eFGJMov",pos:"center top"},
  {id:5,title:"Detroit: Become Human",genre:"Adventure",platform:"PS4 / PC",year:2018,
   color:"#1e88e5",
   pick:"선택이 이야기를 바꾸는 안드로이드의 이야기. 여러 번 플레이해도 새로운 결말.",
   review:"겨울의 차갑고 고요한 분위기 속에서, 디트로이트: 비컴 휴먼은 인간이란 무엇인가라는 질문을 던진다. 안드로이드가 일상화된 미래 사회에서 세 명의 주인공이 각자의 방식으로 자유와 감정, 존재의 의미를 찾아가는 이야기다. 플레이어의 선택 하나하나가 스토리를 바꾸고 결말을 바꾼다. 영화 같은 연출과 배우들의 모션캡처 연기가 어우러져 게임이 아닌 인터랙티브 영화를 보는 느낌이다.",
   score:10,
   cover:"https://image.api.playstation.com/vulcan/img/rnd/202010/2119/W83G1nGF7wGs2J7Cq3LhpwwI.png",
   pos:"center center",
   cardPos:"center top",
   screenshots:[
     "https://cdn1.epicgames.com/columbine/offer/DETROIT_1-2560x1440-4fd6608a56880dc5d8e9d968517113c3.jpg",
     "https://t1.daumcdn.net/brunch/service/user/7hWb/image/KFgHFyNrBxzcw31alX2MbcqFY9A",
     "https://nfapi.noobfeed.com/storage/gallery/41129/Detroit-Become-Human-2.jpg",
   ],
  },
  {id:6,title:"모여봐요 동물의 숲",genre:"Life Sim",platform:"Switch",year:2020,
   color:"#5bbf7a",
   pick:"무인도에서 나만의 마을을 만드는 힐링 게임. 계절마다 다른 즐거움.",
   review:"코로나 시기에 전 세계 수많은 사람들이 이 게임으로 위안을 받았다. 경쟁도, 전투도, 목표도 없다. 그저 자신만의 속도로 섬을 꾸미고, 물고기를 낚고, 주민들과 대화하면 된다. 계절에 따라 섬의 풍경이 바뀌고, 벚꽃이 피고 눈이 내린다.",
   score:9,cover:"https://upload.wikimedia.org/wikipedia/ko/6/67/%EB%AA%A8%EC%97%AC%EB%B4%90%EC%9A%94_%EB%8F%99%EB%AC%BC%EC%9D%98_%EC%88%B2_%ED%95%9C%EA%B5%AD%EC%96%B4_%EC%95%84%ED%8A%B8.jpg",pos:"center center"},
  {id:7,title:"젤다의 전설 야생의 숨결",genre:"Action Adventure",platform:"Switch",year:2017,
   color:"#e8a020",
   pick:"광활한 하이랄을 자유롭게 탐험. 오픈월드의 기준을 바꾼 게임.",
   review:"오픈월드의 패러다임을 바꾼 게임. 어디든 갈 수 있고 무엇이든 시도할 수 있다는 자유로움이 핵심이다. 퍼즐, 전투, 탐험 모든 요소가 완벽하게 조화를 이루며, 가을의 선선한 바람처럼 계속 걷고 싶어지는 세계관을 만들어냈다. 높은 산에 올라 드넓은 하이랄 평원을 내려다보는 순간은 게임 역사에 길이 남을 명장면이다.",
   score:10,
   cover:"https://i.namu.wiki/i/r_pj0Djugb71uS8Us-TAhD1T65s8u22IC9bhaTe5x7pNXFhqrv0PrgDrYCNEOeYdUmdpRX8tktSnB01mOXcDVw.webp",
   pos:"center 25%",
   cardPos:"center 15%",
   screenshots:[
     "https://i.ytimg.com/vi/hbI1BPgXTQI/maxresdefault.jpg",
     "https://cdn.gamemeca.com/data_center/242/904/20220330151002.jpg",
     "https://i.ytimg.com/vi/CKYjsB0ZJ7I/maxresdefault.jpg",
   ],
  },
  {id:8,title:"파이널판타지7 리버스",genre:"RPG",platform:"PS5",year:2024,
   color:"#7c3aed",
   pick:"클라우드와 함께하는 새로운 이야기. FF7 리메이크의 완성.",
   review:"FF7 리메이크 3부작의 두 번째 작품. 광활한 오픈 필드로 무대를 확장하며 리메이크의 가능성을 극한까지 끌어올렸다. 원작의 장면들이 현대 기술로 재현되는 감동은 원작 팬이라면 눈물이 날 정도다.",
   score:9,cover:"https://image.api.playstation.com/vulcan/ap/rnd/202308/3005/537b5208a8ee42935286a44b3b981da86d976bf54899bf98.jpg",pos:"center center",cardPos:"center top"},
  {id:9,title:"용과같이 7",genre:"RPG",platform:"PC / PS4",year:2020,
   color:"#e53935",
   pick:"턴제 RPG로 새롭게 태어난 용과같이. 이치반의 열정이 가득한 이야기.",
   review:"드래곤 엔진과 턴제 RPG를 결합한 대담한 시도가 성공한 케이스. 카스가 이치반의 밝고 열정적인 캐릭터가 기존 시리즈와 전혀 다른 분위기를 만들어냈다. 요코하마를 배경으로 펼쳐지는 진짜 사나이들의 이야기는 웃음과 감동을 동시에 선사한다.",
   score:8,cover:"https://i.namu.wiki/i/liikT-_CXbQY3WG02PGDGNkvkmzUG1iM9pvYkMN8EqFP8IkMJuBqPiSF4UdMelOGsi0KYpzy9LXBA6MnizUvbA.webp",pos:"center center"},
  {id:10,title:"Marvel's Spider-Man Remastered",genre:"Action",platform:"PS5",year:2022,
   color:"#e53050",
   pick:"뉴욕을 누비는 스파이더맨의 상쾌한 액션. PS5 독점의 대표작.",
   review:"거미줄로 뉴욕 빌딩 사이를 누비는 이동감은 게임 역사상 가장 상쾌한 경험 중 하나다. DualSense 컨트롤러의 햅틱 피드백과 어댑티브 트리거로 거미줄을 쏠 때의 물리적 느낌까지 전달된다. 스파이더맨이라는 캐릭터를 완벽하게 구현한 게임이며, PS5의 성능을 극한까지 활용한 비주얼도 인상적이다.",
   score:9,
   cover:"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/capsule_616x353.jpg?t=1763569047",
   pos:"center center",
   screenshots:[
     "https://img2.quasarzone.com/editor/2022/08/13/51cbaf9b49a11b836f07d782077f2778.webp",
     "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/ss_dfe778bf6d66e952e4acd4e1f926f7615b609ddf.1920x1080.jpg?t=1763569047",
     "https://cdn.gamevu.co.kr/news/photo/202012/18710_46803_4956.jpg",
   ],
  },
];

const P3R={id:11,title:"Persona 3 Reload",genre:"RPG",platform:"PC / PS5 / XBOX",year:2024,
  color:"#0ea5e9",
  pick:"봄의 청춘과 죽음을 마주한 고교생들의 이야기. 페르소나 시리즈 최고의 감동.",
  review:"2006년 원작의 완벽한 리메이크. 봄의 감성과 청춘, 그리고 죽음이라는 주제가 어우러진 JRPG의 명작. 타르타로스를 오르며 느끼는 긴장감과 일상 속 친구들과의 유대가 절묘하게 균형을 이룬다. 각 캐릭터의 사회적 링크는 단순한 보너스가 아니라 이야기의 핵심이며, 이들과 쌓아가는 유대가 엔딩을 더욱 무겁고 아름답게 만든다. 엔딩의 여운은 수년이 지나도 남는다.",
  score:10,
  cover:"https://i.namu.wiki/i/4HR1d8-tU7DfiSGp3cjF8MxRzqF1iDq0HvbOCY5HCku5WxzqywFUY30klaZt6zC8-xkFTR1Fvaw2JR_cGe36SQ.webp",
  pos:"center 20%",
  screenshots:[
    "https://image.api.playstation.com/vulcan/ap/rnd/202307/2605/19353f11f85964dd2be8eae4564a0e78b011a81824d9b4a9.png",
    "https://images.squarespace-cdn.com/content/v1/5b1591bf70e802d439edd4de/1a311337-a4b3-4f9f-9da9-a50d2ac315ea/Persona+3+Reload+-+1.jpg",
    "https://djf7qc4xvps5h.cloudfront.net/resource/store/persona-3-reload/9044ec53-a1f3-4ad9-add1-5b6d51376de8.jpg",
  ],
};

const RDR2=GAMES[1];

const SEASONS=[
  {key:"spring",num:"01",game:P3R,
   cover:P3R.cover,
   sidebarCover:"https://gamewoori.com/web/product/big/shop1_8d8f6a13e62c1f7fa4847883090ba12d.jpg",
   subtitle:"Persona 3 Reload",mood:"청춘과 죽음의 봄, 타르타로스가 기다린다"},
  {key:"summer",num:"02",game:GAMES[9],
   cover:GAMES[9].cover,
   sidebarCover:"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1817070/capsule_616x353.jpg?t=1763569047",
   subtitle:"Marvel's Spider-Man",mood:"뜨거운 뉴욕의 여름, 거미줄이 도시를 가른다"},
  {key:"autumn",num:"03",game:GAMES[6],
   cover:GAMES[6].cover,
   sidebarCover:"https://i.namu.wiki/i/r_pj0Djugb71uS8Us-TAhD1T65s8u22IC9bhaTe5x7pNXFhqrv0PrgDrYCNEOeYdUmdpRX8tktSnB01mOXcDVw.webp",
   subtitle:"젤다의 전설 야생의 숨결",mood:"바람이 이끄는 가을 하이랄, 어디든 갈 수 있다"},
  {key:"winter",num:"04",game:GAMES[4],
   cover:GAMES[4].cover,
   sidebarCover:"https://img.danawa.com/prod_img/500000/748/599/img/5599748_1.jpg?shrink=360:360&_v=20240827184455",
   subtitle:"Detroit: Become Human",mood:"차가운 디트로이트의 겨울, 인간이란 무엇인가"},
];

const MENUS=["GAME","REVIEW","GENRE","SONGTY","SONGPICK OF THE SEASON"];
const GENRES=["All","Action Adventure","RPG","Life Sim","Adventure","Survival Horror","Action"];

const CSS=`
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

body{background:#111;color:#fff;}
.sp{font-family:var(--fb);background:#111;min-height:100vh;}
:root{--y:#FFE000;--bk:#0f0f0f;--wh:#fff;--fd:'Pretendard',sans-serif;--fb:'Pretendard',sans-serif;}
.nav{position:sticky;top:0;z-index:300;border-bottom:2px solid #000;display:flex;align-items:stretch;justify-content:space-between;height:56px;padding:0 2rem;transition:background .5s,border-color .5s;}
.nav.normal{background:var(--y);}
.nav.western{background:#1a0800;border-color:#5a2a00;}
.nav-logo{font-family:var(--fd);font-weight:900;font-size:22px;cursor:pointer;display:flex;align-items:center;letter-spacing:.5px;text-transform:uppercase;transition:color .5s;}
.nav.normal .nav-logo{color:#000;}
.nav.western .nav-logo{color:#d4a017;}
.nav-items{display:flex;}
.nav-item{font-family:var(--fd);font-weight:700;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;padding:0 14px;cursor:pointer;display:flex;align-items:center;border-bottom:3px solid transparent;transition:all .15s;}
.nav.normal .nav-item{color:#000;}
.nav.western .nav-item{color:#c8860a;}
.nav.normal .nav-item:hover{background:rgba(0,0,0,.07);}
.nav.western .nav-item:hover{background:rgba(212,160,23,.08);}
.nav.normal .nav-item.active{border-bottom-color:#000;}
.nav.western .nav-item.active{border-bottom-color:#d4a017;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
.page{animation:fadeUp .3s ease both;}
.custom-scroll{scrollbar-width:thin;scrollbar-color:#333 transparent;}
.custom-scroll::-webkit-scrollbar{width:3px;}
.custom-scroll::-webkit-scrollbar-track{background:transparent;}
.custom-scroll::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
.gc{display:flex;flex-direction:column;background:#1a1a1a;border:1px solid #2a2a2a;cursor:pointer;overflow:hidden;transition:transform .2s,box-shadow .2s,border-color .2s,background .2s;}
.gc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.8);border-color:var(--y);background:var(--y);}
.gc-img{position:relative;aspect-ratio:3/4;overflow:hidden;background:#222;}
.gc-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s;}
.gc:hover .gc-img img{transform:scale(1.06);}
.gc-body{padding:14px 14px 18px;flex:1;display:flex;flex-direction:column;gap:3px;}
.gc-num{font-family:var(--fd);font-weight:900;font-size:40px;color:var(--y);line-height:1;transition:color .15s;}
.gc-genre{font-family:var(--fd);font-weight:700;font-size:10px;letter-spacing:2px;color:var(--y);transition:color .15s;}
.gc-title{font-family:var(--fd);font-weight:900;font-size:17px;color:#fff;line-height:1.1;margin:3px 0 7px;transition:color .15s;}
.gc-pick{font-size:11px;color:#888;line-height:1.7;flex:1;transition:color .15s;}
.gc-meta{font-family:var(--fd);font-weight:600;font-size:10px;color:#555;margin-top:10px;letter-spacing:1px;transition:color .15s;}
.gc:hover .gc-num,.gc:hover .gc-genre{color:#333;}
.gc:hover .gc-title,.gc:hover .gc-pick{color:#000;}
.gc:hover .gc-meta{color:#555;}
.sh{background:var(--y);padding:1.1rem 2rem;border-bottom:2px solid #000;}
.sh-title{font-family:var(--fd);font-weight:900;font-size:40px;color:#000;letter-spacing:.5px;line-height:1;}
.sh-sub{font-family:var(--fd);font-weight:600;font-size:11px;letter-spacing:2px;color:#555;margin-top:2px;}
.gf-btn{font-family:var(--fd);font-weight:700;font-size:11px;letter-spacing:1px;padding:5px 14px;border:2px solid #000;cursor:pointer;transition:all .12s;}
.gf-btn.on{background:#000;color:var(--y);}
.gf-btn.off{background:transparent;color:#000;}
@keyframes crownFloat{0%,100%{transform:translateY(0) rotate(-3deg);}50%{transform:translateY(-5px) rotate(3deg);}}
@keyframes stampIn{0%{opacity:0;transform:scale(2.5) rotate(-15deg);}70%{transform:scale(.9) rotate(3deg);}100%{opacity:1;transform:scale(1) rotate(0);}}
@keyframes slideInLeft{0%{opacity:0;transform:translateX(-50px);}100%{opacity:1;transform:translateX(0);}}
@keyframes slideInRight{0%{opacity:0;transform:translateX(50px);}100%{opacity:1;transform:translateX(0);}}
@keyframes fadeInSlow{0%{opacity:0;}100%{opacity:1;}}
@keyframes seasonFade{0%{opacity:0;transform:scale(1.02);}100%{opacity:1;transform:scale(1);}}
.season-enter{animation:seasonFade .5s ease both;}
`;

/* ── 계절 Nav ── */
function SeasonNav({ activeKey, setPage }) {
  const t = SEASON_THEME[activeKey];
  return (
    <nav style={{ position:"sticky", top:0, zIndex:300, height:56, padding:"0 2rem",
      background:t.navBg, borderBottom:`1px solid ${t.navBorder}`,
      display:"flex", alignItems:"stretch", justifyContent:"space-between",
      transition:"background .6s,border-color .6s" }}>
      <div style={{ fontFamily:"var(--fd)", fontWeight:900, fontSize:22, color:t.navText,
        cursor:"pointer", display:"flex", alignItems:"center", letterSpacing:.5, textTransform:"uppercase",
        transition:"color .5s" }}
        onClick={()=>setPage("home")}>
        Songpick! Games
      </div>
      <div style={{ display:"flex" }}>
        {MENUS.map(m=>{
          const k=m.toLowerCase().replace(/ /g,"_");
          const isActive=k==="songpick_of_the_season";
          return(
            <div key={m} onClick={()=>setPage(k)}
              style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:12, letterSpacing:1.5,
                textTransform:"uppercase", padding:"0 14px", cursor:"pointer", display:"flex", alignItems:"center",
                color:isActive?t.navActive:t.navText,
                opacity:isActive?1:0.75,
                borderBottom:isActive?`3px solid ${t.navActive}`:"3px solid transparent",
                transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.opacity="1";}}
              onMouseLeave={e=>{if(!isActive)e.currentTarget.style.opacity="0.75";}}>
              {m}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

/* ── 일반 Nav ── */
function Nav({ page, setPage, fromPage }) {
  const isWestern=page==="songty"||(page==="detail"&&fromPage==="songty");
  const go=useCallback((k)=>setPage(k),[setPage]);
  return(
    <nav className={`nav ${isWestern?"western":"normal"}`}>
      <div className="nav-logo" onClick={()=>go("home")}>Songpick! Games</div>
      <div className="nav-items">
        {MENUS.map(m=>{const k=m.toLowerCase().replace(/ /g,"_");return(
          <div key={m} className={"nav-item"+(page===k?" active":"")} onClick={()=>go(k)}>{m}</div>
        );})}
      </div>
    </nav>
  );
}

/* ── GAME CARD ── */
function GameCard({ game, index, onClick }) {
  const handleClick=useCallback(()=>onClick(game),[game,onClick]);
  return(
    <div className="gc" onClick={handleClick}>
      <div className="gc-img">
        {game.cover?<img src={game.cover} alt={game.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:game.cardPos||game.pos||"center center",display:"block"}}/>
          :<div style={{width:"100%",height:"100%",background:"#1a1a2e",display:"flex",alignItems:"center",justifyContent:"center",padding:10}}><span style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:15,color:"#FFE000",textAlign:"center"}}>{game.title}</span></div>}
        {game.featured&&<div style={{position:"absolute",top:8,right:8,background:"#FFE000",color:"#000",fontFamily:"var(--fd)",fontWeight:700,fontSize:9,padding:"3px 8px",letterSpacing:1.5}}>FEATURED</div>}
      </div>
      <div className="gc-body">
        <div className="gc-num">{String(index+1).padStart(2,"0")}</div>
        <div className="gc-genre">{game.genre.toUpperCase()}</div>
        <div className="gc-title">{game.title}</div>
        <div className="gc-pick">{game.pick}</div>
        <div className="gc-meta">{game.platform} · {game.year}</div>
      </div>
    </div>
  );
}

/* ── GAME DETAIL ── */
function GameDetail({ game, onBack, fromPage }) {
  useEffect(()=>{window.scrollTo(0,0);},[]);
  const handleBack=useCallback(()=>onBack(fromPage),[onBack,fromPage]);
  const isWestern=fromPage==="songty";
  if(isWestern){
    return(
      <div style={{minHeight:"calc(100vh - 56px)",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#0d0400 0%,#1a0800 30%,#2a1000 60%,#1a0500 100%)"}}>
        <div style={{position:"absolute",inset:0,zIndex:0}}><img src={game.cover} alt={game.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:game.pos||"center center",opacity:.18,display:"block"}}/><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,.88) 100%)"}}/></div>
        <WesternParticles/>
        <div style={{position:"relative",zIndex:5,display:"grid",gridTemplateColumns:"50% 1fr",minHeight:"calc(100vh - 56px)"}}>
          <div style={{position:"relative",overflow:"hidden"}}><img src={game.cover} alt={game.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:game.pos||"center center",display:"block",minHeight:500}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to right,transparent 55%,rgba(13,4,0,.9))"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"80px 2rem 2.5rem",background:"linear-gradient(transparent,rgba(10,4,0,.98))"}}><div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#8b4500",letterSpacing:2,marginBottom:6}}>{game.genre.toUpperCase()} · {game.platform} · {game.year}</div><div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:40,color:"#d4a017",lineHeight:1}}>{game.title}</div></div></div>
          <div style={{padding:"2.5rem 2rem",display:"flex",flexDirection:"column",overflowY:"auto",background:"rgba(10,4,0,.6)"}}>
            <div onClick={handleBack} style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:11,color:"#8b4500",letterSpacing:1.5,marginBottom:"2rem",cursor:"pointer"}}>← BACK</div>
            <div style={{display:"flex",gap:"1.8rem",borderBottom:"1px solid rgba(139,69,0,.4)",paddingBottom:"1.4rem",marginBottom:"1.4rem",flexWrap:"wrap"}}>{[["GENRE",game.genre],["PLATFORM",game.platform],["YEAR",game.year]].map(([k,v])=>(<div key={k} style={{borderLeft:"2px solid #8b4500",paddingLeft:11}}><div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#8b4500",letterSpacing:1.5,marginBottom:2}}>{k}</div><div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:18,color:"#d4a017"}}>{v}</div></div>))}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#8b4500",letterSpacing:1.5,marginBottom:5}}>SONG'S PICK</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:20,color:"#d4a017",lineHeight:1.3,marginBottom:"1.4rem"}}>{game.pick}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#8b4500",letterSpacing:1.5,marginBottom:7}}>REVIEW</div>
            <div style={{fontSize:13.5,color:"rgba(212,180,140,.85)",lineHeight:2,flex:1}}>{game.review}</div>
            <div style={{marginTop:"2rem",display:"flex",alignItems:"baseline",gap:8,borderTop:"1px solid rgba(139,69,0,.4)",paddingTop:"1.4rem"}}><div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#8b4500",letterSpacing:1.5}}>SCORE</div><div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:64,color:"#d4a017",lineHeight:1}}>{game.score}</div><div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:24,color:"#5a3000"}}>/10</div></div>
          </div>
        </div>
      </div>
    );
  }
  const mc = game.color || "#FFE000";

  return (
    <div className="page" style={{
      minHeight:"calc(100vh - 56px)", position:"relative", overflow:"hidden",
      background:`linear-gradient(160deg, #080808 0%, #0d0d0d 50%, #080808 100%)`,
    }}>

      {/* ── 배경 레이어: 게임 이미지 풀블러 + 컬러 오버레이 ── */}
      <div style={{position:"absolute",inset:0,zIndex:0}}>
        {game.cover && (
          <img src={game.cover} alt="" style={{
            width:"100%", height:"100%", objectFit:"cover",
            objectPosition:game.pos||"center center",
            opacity:0.12, display:"block", filter:"blur(2px)", transform:"scale(1.05)",
          }}/>
        )}
        {/* 게임 컬러 radial glow — 왼쪽 중앙 */}
        <div style={{position:"absolute",inset:0,
          background:`radial-gradient(ellipse at 25% 50%, ${mc}28 0%, transparent 60%)`}}/>
        {/* 오른쪽 어둡게 */}
        <div style={{position:"absolute",inset:0,
          background:"linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.92) 100%)"}}/>
      </div>

      {/* ── 메인 2단 레이아웃 ── */}
      <div style={{position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"52% 1fr",minHeight:"calc(100vh - 56px)"}}>

        {/* ── 왼쪽: 게임 커버 이미지 ── */}
        <div style={{position:"relative",overflow:"hidden",display:"flex",alignItems:"stretch"}}>
          {game.cover
            ? <img src={game.cover} alt={game.title} style={{
                width:"100%", height:"100%", objectFit:"cover",
                objectPosition:game.pos||"center center", display:"block", minHeight:500,
              }}/>
            : <div style={{width:"100%",minHeight:500,background:"#111",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:36,color:mc}}>{game.title}</span>
              </div>
          }
          {/* 오른쪽 그라디언트 페이드 */}
          <div style={{position:"absolute",inset:0,
            background:`linear-gradient(to right, transparent 45%, rgba(8,8,8,0.7) 75%, rgba(8,8,8,0.98) 100%)`}}/>
          {/* 하단 그라디언트 */}
          <div style={{position:"absolute",inset:0,
            background:`linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.85) 100%)`}}/>
          {/* 게임 컬러 하단 glow */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",
            background:`linear-gradient(to top, ${mc}22, transparent)`}}/>
          {/* 하단 제목 오버레이 */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"60px 2.5rem 2.5rem",zIndex:3}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:3,height:20,background:mc,borderRadius:2}}/>
              <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,
                color:mc,letterSpacing:2.5,opacity:0.9}}>
                {game.genre.toUpperCase()} · {game.platform} · {game.year}
              </div>
            </div>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:46,color:WH,lineHeight:1,
              textShadow:`0 2px 40px rgba(0,0,0,0.9), 0 0 80px ${mc}44`}}>
              {game.title}
            </div>
          </div>
        </div>

        {/* ── 오른쪽: 정보 패널 ── */}
        <div style={{
          padding:"3rem 3rem 3rem 3.5rem",
          display:"flex", flexDirection:"column",
          overflowY:"auto", position:"relative",
        }}>
          {/* 왼쪽 컬러 선 */}
          <div style={{position:"absolute",left:0,top:"10%",bottom:"10%",width:1,
            background:`linear-gradient(to bottom, transparent, ${mc}88, transparent)`}}/>

          {/* BACK */}
          <div onClick={handleBack}
            style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:11,color:"rgba(255,255,255,0.35)",
              letterSpacing:2,marginBottom:"3rem",cursor:"pointer",display:"inline-flex",
              alignItems:"center",gap:8,transition:"color .15s",width:"fit-content"}}
            onMouseEnter={e=>e.currentTarget.style.color=mc}
            onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.35)"}>
            ← BACK
          </div>

          {/* 장르 / 플랫폼 / 연도 뱃지 */}
          <div style={{display:"flex",gap:"1.5rem",marginBottom:"2.5rem",flexWrap:"wrap"}}>
            {[["GENRE",game.genre],["PLATFORM",game.platform],["YEAR",game.year]].map(([k,v])=>(
              <div key={k} style={{borderLeft:`3px solid ${mc}`,paddingLeft:12,
                boxShadow:`-3px 0 16px ${mc}33`}}>
                <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,
                  color:`${mc}88`,letterSpacing:2,marginBottom:4}}>{k}</div>
                <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:19,color:WH}}>{v}</div>
              </div>
            ))}
          </div>

          {/* 구분선 */}
          <div style={{height:1,background:`linear-gradient(to right, ${mc}66, ${mc}22, transparent)`,
            marginBottom:"2rem"}}/>

          {/* SONG'S PICK */}
          <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,
            color:`${mc}99`,letterSpacing:2.5,marginBottom:10}}>SONG'S PICK</div>
          <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:22,color:WH,
            lineHeight:1.45,marginBottom:"2.5rem",
            textShadow:`0 0 60px ${mc}33`}}>
            {game.pick}
          </div>

          {/* REVIEW */}
          <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,
            color:`${mc}99`,letterSpacing:2.5,marginBottom:12}}>REVIEW</div>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.65)",lineHeight:2.2,flex:1,
            borderLeft:`1px solid ${mc}22`,paddingLeft:16}}>
            {game.review}
          </div>

          {/* 구분선 */}
          <div style={{height:1,background:`linear-gradient(to right, ${mc}44, transparent)`,
            margin:"2rem 0"}}/>

          {/* SCORE */}
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div>
              <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,
                color:`${mc}66`,letterSpacing:2,marginBottom:4}}>SCORE</div>
              <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:80,
                  color:mc,lineHeight:1,
                  textShadow:`0 0 50px ${mc}99, 0 0 100px ${mc}44`}}>
                  {game.score}
                </div>
                <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:28,
                  color:`${mc}44`}}>/10</div>
              </div>
            </div>
            {/* 점수 바 */}
            <div style={{flex:1}}>
              <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${game.score*10}%`,
                  background:`linear-gradient(to right, ${mc}88, ${mc})`,
                  borderRadius:2,transition:"width 1s ease",
                  boxShadow:`0 0 12px ${mc}88`}}/>
              </div>
              <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:10,
                color:`${mc}66`,letterSpacing:1,marginTop:6}}>
                {game.score === 10 ? "MASTERPIECE" : game.score >= 9 ? "EXCELLENT" : game.score >= 8 ? "GREAT" : "GOOD"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── HOME ── */
function HomePage({ setPage, setSelectedGame, setFromPage, setSeasonIdx }) {
  const [hovSidebar,setHovSidebar]=useState(null);
  const [hovGrid,setHovGrid]=useState(null);
  const [hovSeason,setHovSeason]=useState(null);
  const goDetail=useCallback((game)=>{setSelectedGame(game);setFromPage("home");setPage("detail");},[setSelectedGame,setFromPage,setPage]);
  return(
    <div className="page" style={{background:"#181818"}}>
      <div style={{display:"grid",gridTemplateColumns:"255px 1fr 220px",minHeight:"calc(100vh - 56px)"}}>
        <div className="custom-scroll" style={{borderRight:"1px solid #2a2a2a",overflowY:"auto",maxHeight:"calc(100vh - 56px)",background:"#181818"}}>
          <div style={{background:"#FFE000",padding:"8px 14px",fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#000",letterSpacing:1.5,position:"sticky",top:0,zIndex:1}}>GAMES — SONG'S PICK</div>
          {GAMES.map((g,i)=>(
            <div key={g.id} style={{display:"flex",gap:10,padding:"12px 14px",borderBottom:"1px solid #252525",cursor:"pointer",alignItems:"center",borderLeft:hovSidebar===i?`3px solid #FFE000`:"3px solid transparent",background:hovSidebar===i?"#252525":"transparent",transition:"background .12s,border-left-color .12s"}}
              onClick={()=>goDetail(g)} onMouseEnter={()=>setHovSidebar(i)} onMouseLeave={()=>setHovSidebar(null)}>
              <div style={{width:36,height:48,flexShrink:0,overflow:"hidden",background:"#2a2a2a",transform:hovSidebar===i?"scale(1.05)":"scale(1)",transition:"transform .2s"}}>
                {g.cover&&<img src={g.cover} alt={g.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:g.cardPos||g.pos||"center center"}}/>}
              </div>
              <div>
                <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:hovSidebar===i?"#FFE000":"#888",letterSpacing:1,marginBottom:2,transition:"color .12s"}}>{g.genre.toUpperCase()} · {g.year}</div>
                <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:13,color:hovSidebar===i?WH:"#ddd",lineHeight:1.2,transition:"color .12s"}}>{g.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <div onClick={()=>goDetail(P3R)} style={{flex:"0 0 56%",position:"relative",cursor:"pointer",overflow:"hidden",background:"#0d0d0d"}}>
            <img src={P3R.screenshots?.[0]||P3R.cover} alt="featured" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center",minHeight:300,display:"block",transition:"transform .5s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(10,10,10,.95))"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"60px 2rem 2rem"}}>
              <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#FFE000",letterSpacing:2,marginBottom:5}}>SONGPICK OF THE SEASON — SPRING 봄</div>
              <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:34,color:WH,lineHeight:1}}>Persona 3 Reload</div>
              <div style={{fontFamily:"var(--fb)",fontSize:11,color:"#ddd",marginTop:5}}>RPG · PC / PS5 / XBOX · 2024</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",flex:1}}>
            {GAMES.slice(1,5).map((g,i)=>(
              <div key={g.id} onClick={()=>goDetail(g)} onMouseEnter={()=>setHovGrid(i)} onMouseLeave={()=>setHovGrid(null)}
                style={{position:"relative",overflow:"hidden",cursor:"pointer",borderTop:"1px solid #2a2a2a",borderRight:"1px solid #2a2a2a",minHeight:155,background:"#1a1a1a",outline:hovGrid===i?`2px solid #FFE000`:"2px solid transparent",transition:"outline .15s"}}>
                {g.cover&&<img src={g.gridCover||g.cover} alt={g.title} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:g.pos||"center center",position:"absolute",inset:0,opacity:hovGrid===i?.9:.75,transform:hovGrid===i?"scale(1.04)":"scale(1)",transition:"opacity .3s,transform .4s"}}/>}
                <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(0,0,0,.88))"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 13px 11px"}}>
                  <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:hovGrid===i?"#FFE000":"#ddd",letterSpacing:1.5,transition:"color .15s"}}>{g.genre.toUpperCase()} · {g.year}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:15,color:WH}}>{g.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{borderLeft:"1px solid #2a2a2a",display:"flex",flexDirection:"column",background:"#181818"}}>
          <div style={{background:"#FFE000",padding:"8px 14px",fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#000",letterSpacing:1.5,flexShrink:0}}>SONGPICK OF THE SEASON</div>
          {SEASONS.map((s,i)=>{const t=SEASON_THEME[s.key];const isHov=hovSeason===i;return(
            <div key={s.key} onClick={()=>{setSeasonIdx(i);setPage("songpick_of_the_season");}} onMouseEnter={()=>setHovSeason(i)} onMouseLeave={()=>setHovSeason(null)}
              style={{position:"relative",overflow:"hidden",cursor:"pointer",flex:1,background:isHov?t.sidebarBg:"#1e1e1e",borderBottom:"1px solid #2a2a2a",borderLeft:isHov?`4px solid ${t.accent}`:"4px solid transparent",transition:"background .3s,border-left-color .2s",filter:isHov?"brightness(1.1)":"brightness(1)"}}>
              {isHov&&<MiniParticles seasonKey={s.key}/>}
              <div style={{position:"relative",zIndex:2,padding:"14px",display:"flex",gap:10,alignItems:"center",height:"100%"}}>
                <div style={{width:38,height:50,flexShrink:0,overflow:"hidden",background:"#333",transform:isHov?"scale(1.06)":"scale(1)",transition:"transform .25s"}}>
                  <img src={s.sidebarCover||s.cover} alt={s.subtitle} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center"}}/>
                </div>
                <div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:26,color:isHov?t.accent:"#FFE000",lineHeight:1,transition:"color .2s"}}>{s.num}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:isHov?t.infoText:"#999",letterSpacing:1.2,margin:"2px 0",transition:"color .2s"}}>{t.badge}</div>
                  <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:11,color:isHov?t.infoText:"#e0e0e0",lineHeight:1.25,transition:"color .15s"}}>{s.subtitle}</div>
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
}

function GamePage({ setPage, setSelectedGame, setFromPage }) {
  useEffect(()=>{window.scrollTo(0,0);},[]);
  const goDetail=useCallback((game)=>{setSelectedGame(game);setFromPage("game");setPage("detail");},[setSelectedGame,setFromPage,setPage]);
  return(<div className="page" style={{background:"#111",minHeight:"calc(100vh - 56px)"}}><div className="sh"><div className="sh-title">All Games</div><div className="sh-sub">SONG'S PICK — {GAMES.length} TITLES</div></div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,padding:1,background:"#222"}}>{GAMES.map((g,i)=><GameCard key={g.id} game={g} index={i} onClick={goDetail}/>)}</div></div>);
}

function ReviewPage({ setPage, setSelectedGame, setFromPage }) {
  useEffect(()=>{window.scrollTo(0,0);},[]);
  const [hovRow,setHovRow]=useState(null);
  const goDetail=useCallback((game)=>{setSelectedGame(game);setFromPage("review");setPage("detail");},[setSelectedGame,setFromPage,setPage]);
  return(
    <div className="page" style={{background:"#111",minHeight:"calc(100vh - 56px)"}}>
      <div className="sh"><div className="sh-title">Reviews</div><div className="sh-sub">SONG'S PICK — ALL {GAMES.length} TITLES · CLICK TO READ MORE</div></div>
      {GAMES.map((g,i)=>{const isHov=hovRow===i;return(
        <div key={g.id} onClick={()=>goDetail(g)} onMouseEnter={()=>setHovRow(i)} onMouseLeave={()=>setHovRow(null)}
          style={{display:"grid",gridTemplateColumns:"60px 220px 1fr 70px",gap:"1.5rem",padding:"1.6rem 2rem",borderBottom:"1px solid #1e1e1e",alignItems:"start",cursor:"pointer",background:isHov?"#1e1e1e":(i%2===0?"#141414":"#111"),borderLeft:isHov?`4px solid #FFE000`:"4px solid transparent",transition:"background .15s,border-left-color .15s"}}>
          <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:42,color:isHov?"#FFE000":"#333",lineHeight:1,transition:"color .15s"}}>{String(i+1).padStart(2,"0")}</div>
          <div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#666",letterSpacing:1.5,marginBottom:4}}>{g.genre.toUpperCase()} · {g.platform} · {g.year}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:19,color:isHov?WH:"#ddd",lineHeight:1.15,marginBottom:7,transition:"color .15s"}}>{g.title}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:11,color:isHov?"#FFE000":"#666",lineHeight:1.45,transition:"color .15s"}}>{g.pick}</div>
          </div>
          <div style={{fontSize:13,color:isHov?"#bbb":"#666",lineHeight:1.9,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",transition:"color .15s"}}>{g.review}</div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:50,color:isHov?"#FFE000":"#333",lineHeight:1,transition:"color .15s"}}>{g.score}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:600,fontSize:12,color:"#555"}}>/10</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:isHov?"#FFE000":"#444",letterSpacing:1,marginTop:8,transition:"color .15s"}}>READ →</div>
          </div>
        </div>
      );})}
    </div>
  );
}

function GenrePage({ setPage, setSelectedGame, setFromPage }) {
  const [activeGenre,setActiveGenre]=useState("All");
  useEffect(()=>{window.scrollTo(0,0);},[]);
  const filtered=useMemo(()=>activeGenre==="All"?GAMES:GAMES.filter(g=>g.genre===activeGenre),[activeGenre]);
  const goDetail=useCallback((game)=>{setSelectedGame(game);setFromPage("genre");setPage("detail");},[setSelectedGame,setFromPage,setPage]);
  return(<div className="page" style={{background:"#111",minHeight:"calc(100vh - 56px)"}}><div className="sh" style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:34,color:"#000",marginRight:16}}>Genre</div>{GENRES.map(g=><div key={g} className={"gf-btn "+(activeGenre===g?"on":"off")} onClick={()=>setActiveGenre(g)}>{g}</div>)}</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,padding:1,background:"#222"}}>{filtered.map(g=><GameCard key={g.id} game={g} index={GAMES.indexOf(g)} onClick={goDetail}/>)}</div></div>);
}

/* ── SONGTY ── */
function SongtyPage({ setPage, setSelectedGame, setFromPage }) {
  useEffect(()=>{window.scrollTo(0,0);},[]);
  const [entered,setEntered]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setEntered(true),100);return()=>clearTimeout(t);},[]);
  const goDetail=useCallback(()=>{setSelectedGame(RDR2);setFromPage("songty");setPage("detail");},[setSelectedGame,setFromPage,setPage]);
  return(
    <div style={{minHeight:"calc(100vh - 56px)",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#0d0400 0%,#1a0800 30%,#2a1000 60%,#1a0500 100%)"}}>
      <div style={{position:"absolute",inset:0,zIndex:0}}><img src="https://static0.srcdn.com/wordpress/wp-content/uploads/2018/10/Red-Dead-Redemption-2-Key-Art-Cropped.jpg?w=1600&h=900&fit=crop" alt="RDR2 bg" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center",opacity:entered?.35:0,transform:entered?"scale(1)":"scale(1.1)",transition:"opacity 1.8s ease,transform 2s ease",filter:"blur(3px)"}}/><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,.85) 100%)"}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(20,8,0,.6) 0%,transparent 25%,transparent 70%,rgba(10,4,0,.9) 100%)"}}/></div>
      <div style={{position:"absolute",inset:0,zIndex:1}}><WesternParticles/></div>
      <div style={{position:"relative",zIndex:5,display:"flex",flexDirection:"column",minHeight:"calc(100vh - 56px)"}}>
        <div style={{padding:"3rem 4rem 0",opacity:entered?1:0,animation:entered?"slideInLeft .8s .2s ease both":"none"}}>
          <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:11,color:"#8b4500",letterSpacing:4,marginBottom:6}}>✦ SONG'S GAME OF THE YEAR ✦</div>
          <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
            <div style={{animation:"crownFloat 2s ease-in-out infinite",flexShrink:0}}>
              <svg width="52" height="40" viewBox="0 0 64 50" fill="none"><path d="M4 40 L8 16 L20 28 L32 4 L44 28 L56 16 L60 40 Z" fill="#2a1000"/><path d="M4 40 L8 16 L20 28 L32 4 L44 28 L56 16 L60 40 Z" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinejoin="round"/><rect x="4" y="38" width="56" height="8" rx="2" fill="#2a1000" stroke="#d4a017" strokeWidth="1.5"/><circle cx="32" cy="8" r="3.5" fill="#8b0000"/><circle cx="20" cy="28" r="3" fill="#d4a017"/><circle cx="44" cy="28" r="3" fill="#d4a017"/><circle cx="8" cy="20" r="2.5" fill="#8b4500"/><circle cx="56" cy="20" r="2.5" fill="#8b4500"/></svg>
            </div>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:72,color:"#d4a017",lineHeight:.9,letterSpacing:2,textShadow:"0 0 60px rgba(212,160,23,.4),0 2px 0 rgba(0,0,0,.8)"}}>SONGTY</div>
          </div>
        </div>
        <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,padding:"2rem 4rem 3rem",alignItems:"center"}}>
          <div style={{opacity:entered?1:0,animation:entered?"slideInLeft 1s .4s ease both":"none",display:"flex",justifyContent:"center"}}>
            <WesternSlider slides={RDR2.screenshots||[RDR2.cover]} score={RDR2.score}/>
          </div>
          <div style={{paddingLeft:"3rem",opacity:entered?1:0,animation:entered?"slideInRight 1s .6s ease both":"none"}}>
            <div style={{display:"flex",gap:"1.5rem",marginBottom:"1.2rem"}}>{[["GENRE",RDR2.genre],["PLATFORM",RDR2.platform],["YEAR",RDR2.year]].map(([k,v])=>(<div key={k} style={{borderLeft:"2px solid #8b4500",paddingLeft:10}}><div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#8b4500",letterSpacing:1.5,marginBottom:2}}>{k}</div><div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:15,color:"#d4a017"}}>{v}</div></div>))}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:54,color:WH,lineHeight:.95,marginBottom:".8rem",textShadow:"0 2px 30px rgba(0,0,0,.9)"}}>{RDR2.title}</div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:"1.2rem"}}><div style={{flex:1,height:1,background:"linear-gradient(to right,#8b4500,transparent)"}}/><span style={{color:"#d4a017",fontSize:16}}>✦</span><div style={{flex:1,height:1,background:"linear-gradient(to left,#8b4500,transparent)"}}/></div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#8b4500",letterSpacing:1.5,marginBottom:6}}>SONG'S PICK</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:20,color:"#d4a017",lineHeight:1.3,marginBottom:"1.2rem"}}>{RDR2.pick}</div>
            <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:9,color:"#8b4500",letterSpacing:1.5,marginBottom:6}}>REVIEW</div>
            <div style={{fontSize:13.5,color:"rgba(212,180,140,.85)",lineHeight:2,marginBottom:"2rem"}}>{RDR2.review}</div>
            <button onClick={goDetail} style={{fontFamily:"var(--fd)",fontWeight:900,fontSize:14,letterSpacing:2,padding:"12px 28px",background:"linear-gradient(135deg,#8b0000,#5a0000)",color:"#d4a017",border:"2px solid #d4a017",cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,#a00000,#700000)";}} onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,#8b0000,#5a0000)";}}>READ MORE →</button>
          </div>
        </div>
        <div style={{padding:"1.2rem 4rem",borderTop:"1px solid rgba(139,69,0,.3)",display:"flex",justifyContent:"space-between",alignItems:"center",opacity:entered?1:0,animation:entered?"fadeInSlow 1s 1.4s ease both":"none"}}>
          <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#5a2a00",letterSpacing:3}}>✦ THE WEST WAS NEVER THIS BEAUTIFUL ✦</div>
          <div style={{fontFamily:"var(--fd)",fontWeight:700,fontSize:10,color:"#5a2a00",letterSpacing:2}}>ROCKSTAR GAMES · 2018</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SEASON PAGE — 밝고 선명한 계절감
══════════════════════════════════════════ */
function SeasonPage({ setPage, initialIdx=0 }) {
  const [active,setActive]=useState(initialIdx);
  const [hovItem, setHovItem] = useState(null);
  useEffect(()=>{window.scrollTo(0,0);},[]);

  const s  = SEASONS[active];
  const g  = s.game;
  const t  = SEASON_THEME[s.key];

  /* 봄/겨울은 밝은 배경이라 텍스트 어둡게, 여름/가을은 어두운 배경이라 밝게 */
  const isLight = false;

  return (
    <>
      <SeasonNav activeKey={s.key} setPage={setPage}/>

      <div key={s.key} className="season-enter"
        style={{ minHeight:"calc(100vh - 56px)", background:t.pageBg, transition:"background .7s", position:"relative", overflow:"hidden" }}>

        {/* 파티클 — 전체 위에 */}
        <div style={{position:"absolute",inset:0,zIndex:10,pointerEvents:"none"}}>
          <SeasonParticles seasonKey={s.key}/>
        </div>

        <div style={{ position:"relative", zIndex:4, display:"grid", gridTemplateColumns:"240px 1fr", minHeight:"calc(100vh - 56px)" }}>

          {/* ── 왼쪽 시즌 목록 ── */}
          <div style={{ background:t.sidebarBg, transition:"background .7s", borderRight:`1px solid ${t.sidebarBorder}`, display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"12px 16px", fontFamily:"var(--fd)", fontWeight:700, fontSize:10,
              color:t.infoSubText, letterSpacing:2, borderBottom:`1px solid ${t.divider}`,
              background: isLight ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)" }}>
              SEASON SELECT
            </div>
            {SEASONS.map((ss, i) => {
              const st=SEASON_THEME[ss.key]; const on=active===i; const hov=hovItem===i;
              return (
                <div key={ss.key} onClick={()=>setActive(i)} onMouseEnter={()=>setHovItem(i)} onMouseLeave={()=>setHovItem(null)}
                  style={{ flex:1, display:"flex", gap:12, padding:"14px 16px", cursor:"pointer", alignItems:"center",
                    borderLeft: on?`5px solid ${st.accent}`:hov?`5px solid ${st.accent}77`:"5px solid transparent",
                    background: on ? (isLight?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.1)") : hov ? (isLight?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.05)") : "transparent",
                    borderBottom:`1px solid ${t.divider}`, transition:"all .2s" }}>
                  <div style={{ width:50, height:68, flexShrink:0, overflow:"hidden", borderRadius:4,
                    border: on?`3px solid ${st.accent}`:`2px solid ${isLight?"rgba(0,0,0,0.1)":"rgba(255,255,255,0.15)"}`,
                    transform:on||hov?"scale(1.07)":"scale(1)", transition:"transform .2s,border-color .2s",
                    boxShadow: on?`0 4px 20px ${st.glowColor}`:"0 2px 8px rgba(0,0,0,0.2)" }}>
                    <img src={ss.sidebarCover||ss.cover} alt={ss.subtitle} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center center"}}/>
                  </div>
                  <div>
                    <div style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:11,
                      color:on?st.accent:hov?`${st.accent}cc`:(isLight?"rgba(0,0,0,0.45)":"rgba(255,255,255,0.4)"),
                      letterSpacing:2, marginBottom:2, transition:"color .2s" }}>{st.emoji} {st.badge}</div>
                    <div style={{ fontFamily:"var(--fd)", fontWeight:900, fontSize:30, lineHeight:.9,
                      color:on?st.accent:hov?`${st.accent}99`:(isLight?"rgba(0,0,0,0.2)":"rgba(255,255,255,0.15)"),
                      transition:"color .2s", marginBottom:5 }}>{ss.num}</div>
                    <div style={{ fontFamily:"var(--fd)", fontWeight:900, fontSize:13, lineHeight:1.2,
                      color:on?(isLight?"#111":WH):hov?(isLight?"#333":"rgba(255,255,255,0.75)"):(isLight?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.35)"),
                      transition:"color .2s" }}>{ss.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── 오른쪽 메인 ── */}
          <div style={{ display:"flex", flexDirection:"column" }}>

            {/* 슬라이더 배너 영역 */}
            <SeasonSlider
              slides={g?.screenshots?.length ? g.screenshots : (g?.cover ? [g.cover] : [])}
              subtitle={s.subtitle}
              t={t}
              isLight={isLight}
              mood={s.mood}
              pos={g?.pos||"center center"}
            />

            {/* 정보 패널 */}
            {g&&(
              <div style={{ flex:1, padding:"2rem 2.5rem 2.5rem", background:t.infoBg, transition:"background .7s" }}>
                {/* 구분선 */}
                <div style={{ height:2, background:`linear-gradient(to right, ${t.accent}, ${t.accent2||t.accent}88, transparent)`,
                  marginBottom:"1.6rem" }}/>

                <div style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:10, color:t.infoMuted, letterSpacing:3, marginBottom:6 }}>
                  NOW PLAYING — {t.badge}
                </div>
                <div style={{ fontFamily:"var(--fd)", fontWeight:900, fontSize:42, color: isLight?t.infoText:WH,
                  lineHeight:1, marginBottom:"1.4rem" }}>
                  {s.subtitle}
                </div>

                <div style={{ display:"flex", gap:"2rem", borderBottom:`1px solid ${t.divider}`, paddingBottom:"1.2rem", marginBottom:"1.2rem", flexWrap:"wrap" }}>
                  {[["GENRE",g.genre],["PLATFORM",g.platform],["YEAR",g.year]].map(([k,v])=>(
                    <div key={k} style={{ borderLeft:`3px solid ${t.accent}`, paddingLeft:11 }}>
                      <div style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:9, color:t.infoMuted, letterSpacing:1.5, marginBottom:2 }}>{k}</div>
                      <div style={{ fontFamily:"var(--fd)", fontWeight:900, fontSize:17, color:t.infoSubText }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize:14, color: isLight?t.infoText:t.infoSubText, lineHeight:2, maxWidth:700 }}>{g.review}</div>

                <div style={{ marginTop:"1.8rem", display:"flex", alignItems:"baseline", gap:8 }}>
                  <div style={{ fontFamily:"var(--fd)", fontWeight:700, fontSize:10, color:t.infoMuted, letterSpacing:2 }}>SCORE</div>
                  <div style={{ fontFamily:"var(--fd)", fontWeight:900, fontSize:72, color:t.scoreColor, lineHeight:1 }}>{g.score}</div>
                  <div style={{ fontFamily:"var(--fd)", fontWeight:600, fontSize:26, color:t.infoMuted }}>/10</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── APP ROOT ── */
export default function App() {
  const [page,setPage]=useState("home");
  const [selectedGame,setSelectedGame]=useState(null);
  const [fromPage,setFromPage]=useState("home");
  const [seasonIdx,setSeasonIdx]=useState(0);
  const handleBack=useCallback((origin)=>setPage(origin||"home"),[]);
  const isWestern=page==="songty"||(page==="detail"&&fromPage==="songty");
  const isSeason=page==="songpick_of_the_season";

  const renderPage=()=>{
    if(page==="detail"&&selectedGame) return <GameDetail game={selectedGame} onBack={handleBack} fromPage={fromPage}/>;
    if(page==="game")   return <GamePage   setPage={setPage} setSelectedGame={setSelectedGame} setFromPage={setFromPage}/>;
    if(page==="review") return <ReviewPage setPage={setPage} setSelectedGame={setSelectedGame} setFromPage={setFromPage}/>;
    if(page==="genre")  return <GenrePage  setPage={setPage} setSelectedGame={setSelectedGame} setFromPage={setFromPage}/>;
    if(page==="songty") return <SongtyPage setPage={setPage} setSelectedGame={setSelectedGame} setFromPage={setFromPage}/>;
    if(page==="songpick_of_the_season") return <SeasonPage setPage={setPage} initialIdx={seasonIdx}/>;
    return <HomePage setPage={setPage} setSelectedGame={setSelectedGame} setFromPage={setFromPage} setSeasonIdx={setSeasonIdx}/>;
  };

  return(
    <>
      <style>{CSS}</style>
      <div className="sp">
        {!isSeason&&<Nav page={page} setPage={setPage} fromPage={fromPage}/>}
        {renderPage()}
      </div>
    </>
  );
}
