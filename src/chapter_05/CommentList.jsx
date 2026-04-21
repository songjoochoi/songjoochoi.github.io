//function CommentList(props) {
   // return (
       // <div>
          //  <Comment name={"제니"} comment={"안녕하세요, 블랙핑크 입니다."}/>
             //<Comment name={"로제"} comment={"리액트 재미있어요."}/>
              //<Comment name={"리사"} comment={"저는 잘 모르겠네요."}/>
              // <Comment name={"지수"} comment={"리액트 너무 어려워요."}/>
       // </div>
  //  );
//}

import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "곤",
        comment: "안녕! 나는 곤 모두 친하게 지내자~",
        source: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2FPdUjNqIBL3pb7Yk7-qSyJN4A01Jn2dLQWj_6eHUZfauTYFrZHVDjp3a5RuUOwaQ6Qbc_UqrQRBMoIIkvSGCLTg.webp&type=sc960_832",
        color: "#4CAF50"
    },
    {
        name: "키르아",
        comment: "곤!! 지금 어디에 있어??",
        source: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA4MjVfNDYg%2FMDAxNTM1MTM3NjczNzM4.IYqNpaG5mhDXTMbkkyHhb2orw-NmIW47UeNa0h6TBVEg.2-1ef1YiX3f0GRbHXTdGGlQZxjzOwsGHiZb20OBNr9Ug.PNG.minte__%2Ffbd65552-4035-494d-a8cb-7d6bf2501ebb.png&type=sc960_832",
        color: "#7B68EE"
    },
    {
        name: "레오리오",
        comment: "나는 레오리오고 내 꿈은 의사가 되는거야!",
        source: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAzMTZfMjI3%2FMDAxNTUyNjgyMjUxNTAz.k72sMEOxUh6BV32NnusaiiBX6jKMafmh1wLRR5auamwg.2FxjJO9et5NQrivFRodZV0BeYMwxU7p4zj1p0pOlIpgg.JPEG.minte__%2F3dd4ed1c-01cb-4c26-b723-4b5e7da6c6de.jpg&type=sc960_832",
        color: "#8B6347"
    },
    {
        name: "크라피카",
        comment: "나는 크라피카. 환영여단을 무찌를거야",
        source: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi2.ruliweb.com%2Fimg%2F5%2F3%2F9%2FA%2F539A850E3A7E300005&type=sc960_832",
        color: "#FFD700"
    },
    {
        name: "이르미",
        comment: "나는 이르미. 키르아를 찾고있어",
        source: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MzFfODMg%2FMDAxNjkwNzc5NzA0NDcz.MSZ0EAY2kSUa-6uWUX3mO_u_xXW42kba1FySJIpjJAkg.B9k1M8kiJx-bzFSFdT5_5USPXfU_fFZnGaVdrh7H3cgg.JPEG.ouido%2FIMG_7199.JPG&type=sc960_832",
        color: "#20B2AA"
    }
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment
                        name={comment.name}
                        comment={comment.comment}
                        source={comment.source}
                        color={comment.color}
                    />
                );
            })}
        </div>
    );
}

export default CommentList;



