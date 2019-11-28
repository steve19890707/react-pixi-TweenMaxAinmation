import React,{ useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TimelineMax, TimelineLite,TweenMax, Bounce  } from 'gsap';

const TweenMaxDiv = styled.div`
    position: relative;
    width:100%;
    min-height:100vh;
    background:#fff;
    z-index:1;
    .simple1 {
        position: relative;
        background-color: #FFBF00;
        height:100%;
        width: 0%;
        .title {
            position: absolute;
            top:0;
            color:#fff;
            font-size:24px;
        }
        .smallCar {
            position: absolute;
            left:-16.6666%;
            bottom:0;
            transform:scale(0,0);
            width: 141px;
            height: 68px;
            background-image: url("./dis/img/car.png");
            background-size:100%;
            &-2 {
                left:0%;
            };
            &-3 {
                left:16.6666%;
            };
            &-4 {
                left:33.3333%;
            };
            &-5 {
                left:50%;
            };
            &-6 {
                left:66.6666%;
            };
        }
        .background {
            position: relative;
            width:100%;
            padding-bottom:47%;
            background-color: #2f8cff;
            background-image: url("./dis/img/background.png");
            background-size:100%;
            .car {
                position: absolute;
                left:0;
                bottom:5%;
                width: 20%;
                padding-bottom:9.6%;
                transform:scale(0,0);
                background-image: url("./dis/img/car.png");
                background-size:100%;
            }
        }
        .parallaxList {
            width: 141px;
            margin:0 auto;
            padding:0 0 100px 0;
            .parallaxCar {
                padding: 100px 0;
                .runCar {
                    width: 141px;
                    height: 68px;
                    background-image: url("./dis/img/car.png");
                    background-size:100%;
                    transform:translate(-200%,-200%);
                    opacity:0;
                }
            }
        }
    }
`
export default () => {
    const savedHandlerScroll = useRef();
    const savedHandlerMousemove = useRef();
    const TLL = new TimelineLite;
    // const TLMax = new TimelineMax();
    const [testNumber, setTestNumber] = useState({
        number: 100,
    })

    useEffect(() => {
        savedHandlerScroll.current = scrollEvent;
    }, [scrollEvent]);

    useEffect(() => {
        savedHandlerMousemove.current = mousemoveEvent;
    }, [mousemoveEvent]);

    useEffect(() => {
        TLL.to(".runCar-1",1,{ opacity:1, x:"0%", y:"50%"});
        TLL.to(".runCar-2",1,{ opacity:1, x:"0%", y:"50%"});
        TLL.to(".runCar-3",1,{ opacity:1, x:"0%", y:"50%"});
        TLL.to(".runCar-4",1,{ opacity:1, x:"0%", y:"50%"});
        TLL.to(".runCar-5",1,{ opacity:1, x:"0%", y:"50%"});
        TLL.to(".runCar-6",1,{ opacity:1, x:"0%", y:"50%"});
        TLL.pause();
    },[ TLL ]);

    useEffect(() => {
        const isSupported = window && window.addEventListener;
        if (!isSupported) return;
        const eventListener = scrollEvent => savedHandlerScroll.current(scrollEvent);
        window.addEventListener('scroll', eventListener);
        return () => {
            window.removeEventListener('scroll', eventListener);
        };
    },['scroll', window]);

    useEffect(() => {
        const isSupported = window && window.addEventListener;
        if (!isSupported) return;
        const eventListener = mousemoveEvent => savedHandlerMousemove.current(mousemoveEvent);
        window.addEventListener('mousemove', eventListener);
        return () => {
            window.removeEventListener('mousemove', eventListener);
        };
    },['mousemove', window]);

    useEffect(()=>{
        divAinmation()
    },[]);
    const divAinmation = ()=> { 
        TweenMax.to("#box",1,{ 
            width:"100%",
            ease: Bounce.easeOut,
            onComplete: () => {
                carAinmation();
                NumberUpdate();
            },
        });
    };
    const carAinmation = ()=> {
        TweenMax.to("#car", 2 ,{ 
            transformOrigin:"-50% 50%",
            scaleX: 1,
            scaleY: 1,
            x: window.innerWidth / 2,
            ease: Bounce.easeOut,
        });
    };
    // const allCarAnimation = ()=> {
    //     TLMax.staggerTo(".smallCar",2,{
    //         scaleX: 1,
    //         scaleY: 1,
    //         x:"100%",
    //         ease: Bounce.easeOut,
    //     }, 0.3)
    // };
    const NumberUpdate = ()=> {
        TweenMax.to(testNumber, 2 ,{
            number:0,
            onUpdate: ()=> {
                setTestNumber({
                    number: Math.ceil(testNumber.number),
                })
            },
        })
    };
    const scrollEvent = (e)=> {
        let scrollTop = window.pageYOffset;
        let docHeight = e.srcElement.body.scrollHeight;
        let wh = window.innerHeight;
        let progress = scrollTop / (docHeight - wh);
        TLL.progress(progress);
    };
    const mousemoveEvent = (e)=> {
        let pageX = e.clientX;
        TweenMax.to(".background",1.2,{"background-position-x": pageX + "px"})
    };
    return(
        <TweenMaxDiv>
            <div id="box" className="simple1">
                <div className="title">Numder add: {testNumber.number}</div>
                <div className="background"><div id="car" className="car"></div></div>
                {/* <div className="smallCar smallCar-1"></div>
                <div className="smallCar smallCar-2"></div>
                <div className="smallCar smallCar-3"></div>
                <div className="smallCar smallCar-4"></div>
                <div className="smallCar smallCar-5"></div>
                <div className="smallCar smallCar-6"></div> */}
                <ul className="parallaxList">
                    <li className="parallaxCar parallaxCar-1">
                        <div className="runCar runCar-1"></div>
                    </li>
                    <li className="parallaxCar parallaxCar-2">
                        <div className="runCar runCar-2"></div>
                    </li>
                    <li className="parallaxCar parallaxCar-3">
                        <div className="runCar runCar-3"></div>
                    </li>
                    <li className="parallaxCar parallaxCar-4">
                        <div className="runCar runCar-4"></div>
                    </li>
                    <li className="parallaxCar parallaxCar-5">
                        <div className="runCar runCar-5"></div>
                    </li>
                    <li className="parallaxCar parallaxCar-6">
                        <div className="runCar runCar-6"></div>
                    </li>
                </ul>
            </div>
        </TweenMaxDiv>
    );
}