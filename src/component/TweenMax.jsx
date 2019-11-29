import React,{ useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TimelineMax, TimelineLite,TweenMax, Bounce  } from 'gsap';
import { IoMdClose, IoIosCube, IoIosList } from "react-icons/io";
import cx from 'classnames';

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
            .title {
                position: absolute;
                top:10px;
                right:10px;
                color:#fff;
                font-size:24px;
            }
            .mainTitle {
                position: absolute;
                top:25%;
                left:60%;
                transform: translate(-50%,-50%);
                font-size:35px;
                color:#fff;
                text-shadow:0 0 5px rgb(0,0,0,0.5);
                z-index:2;
            }
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
    .flexArea {
        position: fixed;
        top:0;
        left:0;
        margin-top:20px;
        transform:translateX(-100%);
        transition:0.2s;
        z-index:2;
        &.active {
            transform:translateX(0%);
            .clickBtn { 
                width:30px;
                height:30px;
                right:0;
                border-radius:50px;
                background-color:#fff;
                transform:translateX(0%);
                svg {
                    width:20px;
                    height:20px;
                    margin:5px;
                    &:nth-child(1) { display:none; }
                    &:nth-child(2) { display:block; }
                }
                &:hover { svg { color:#777; } }
            }
        }
        .clickBtn {
            position: absolute;
            top:0px;
            right:-20px;
            transform:translateX(100%);
            width:40px;
            height:40px;
            border-radius:5px;
            background-color:#1d1d1d;
            cursor: pointer;
            svg {
                width:30px;
                height:30px;
                margin:5px;
                color:#777;
                transition:0.2s;
                &:nth-child(2) { display:none; }
            }
            &:hover { svg { color:#fff; } }
        }
        .list {
            margin-top:45px;
            li {
                box-sizing:border-box;
                padding:15px 20px 15px 15px;
                margin-bottom:8px;
                border-radius:0 50px 50px 0;
                display:flex;
                align-items:center;
                box-shadow:0 0 5px rgb(0,0,0,0.5);
                cursor: pointer;
                svg {
                    width:18px;
                    height:18px;
                    color:#fff;
                    margin-right:8px;
                }
                span {
                    font-size:18px;
                    color:#fff;
                }
                &.red {
                    background:linear-gradient(to bottom,#ff0101,#840000);
                    text-shadow:0 0 2px #840000;
                    border:1px solid #ff0101;
                    border-left:none;
                    &:hover { background:linear-gradient(to top,#ff0101,#840000); }
                }
                &.blue {
                    background:linear-gradient(to bottom,#3c4bff,#001767);
                    text-shadow:0 0 2px #001767;
                    border:1px solid #3c4bff;
                    border-left:none;
                    &:hover { background:linear-gradient(to top,#3c4bff,#001767); }
                }
                &.green {
                    background:linear-gradient(to bottom,#00e607,#006504);
                    text-shadow:0 0 2px #006504;
                    border:1px solid #00e607;
                    border-left:none;
                    &:hover { background:linear-gradient(to top,#00e607,#006504); }
                }
                &.purple {
                    background:linear-gradient(to bottom,#730aff,#27005d);
                    text-shadow:0 0 2px #27005d;
                    border:1px solid #673ab7;
                    border-left:none;
                    &:hover { background:linear-gradient(to top,#730aff,#27005d); }
                }
                &:last-child {
                    margin-bottom:0;
                }
            }
        }
    }
`
export default () => {
    const savedHandlerScroll = useRef();
    const savedHandlerMousemove = useRef();
    const background = document.getElementById('background') || null;
    const TLL = new TimelineLite;
    const TLMax = new TimelineMax();
    const [ testNumber, setTestNumber ] = useState({
        number: 100,
    })
    const [ asideOpen, setAsideOpen ] = useState(false)

    // useEffect

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
        const isSupported = background && background.addEventListener;
        if (!isSupported) return;
        const eventListener = mousemoveEvent => savedHandlerMousemove.current(mousemoveEvent);
        background.addEventListener('mousemove', eventListener);
        return () => {
            background.removeEventListener('mousemove', eventListener);
        };
    },['mousemove', background]);
    useEffect(()=>{
        divAinmation()
    },[]);

    // TweenMax
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
    const staggerList = ()=> {
        setAsideOpen(!asideOpen);
        if(asideOpen === false) {
            TLMax.kill()
            TLMax.staggerFrom(".option", 0.5,
                {
                    x:"-100%",
                    scaleX:0,
                    scaleY:0,
                }, 
            0.2);
        }else { 
            TLMax.kill()
            TLMax.set(".option",
                {
                    x:"0%",
                    scaleX:1,
                    scaleY:1,
                } 
            );
        }
    };

    // Event

    const scrollEvent = (e)=> {
        let scrollTop = window.pageYOffset;
        let docHeight = e.srcElement.body.scrollHeight;
        let wh = window.innerHeight;
        let progress = scrollTop / (docHeight - wh);
        TLL.progress(progress);
    };
    const mousemoveEvent = (e)=> {
        let pageX = e.clientX / 10;
        let pageY = e.clientY / 10;
        TweenMax.to(".background",1,{"background-position-x": -pageX + "px"});
        TweenMax.to(".background",1,{"background-position-y": -pageY + "px"});
    };
    return(
        <TweenMaxDiv>
            <aside className={cx("flexArea",{ active : asideOpen })}>
                <div className="clickBtn" onClick={ 
                    ()=> { staggerList()}
                 }>
                    <IoIosList />
                    <IoMdClose />
                </div>
                <ul className="list">
                    <li className="option red"><IoIosCube /><span>select bar - RED</span></li>
                    <li className="option blue"><IoIosCube /><span>select bar - BLUE</span></li>
                    <li className="option green"><IoIosCube /><span>select bar - GREEN</span></li>
                    <li className="option purple"><IoIosCube /><span>select bar - PURPLE</span></li>
                </ul>
            </aside>
            <div id="box" className="simple1">
                <div id="background" className="background">
                    <div className="mainTitle">Hello! Welcome</div>
                    <div className="title">Numder add: {testNumber.number}</div>
                    <div id="car" className="car" />
                </div>
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