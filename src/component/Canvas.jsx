import React,{ useEffect } from 'react';
import styled from 'styled-components';
import * as PIXI from 'pixi.js';
import { TweenLite ,Bounce} from 'gsap';

const CanvasDiv = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
`
const characterList = {
    mario: {
        url:"./dis/img/character1.png",
        title:"Hello, I'm Mario",
    },
    luigi:{
        url:"./dis/img/character2.png",
        title:"Hello, I'm Luigi",
    } 
}
const frameList = {
    normal: "./dis/img/dialog.png",
}
const Canvas = (location) => {
    const createCharacter = (title,objWidth,objHeight,objImg,frameImg,container,otherContainer) => {
        let text = new PIXI.Text(title,{
            fontFamily : 'Arial', 
            fontSize: 24, 
            fill : 0x000000,
        });
        let obj = new PIXI.Sprite.from(objImg);
        obj.anchor.set(0.5);
        obj.width = objWidth;
        obj.height = objHeight;
        obj.interactive = true;
        obj.buttonMode = true;
        obj.isClick = false;
        let frame = new PIXI.Sprite.from(frameImg);
        frame.anchor.set(0,0.5);
        frame.width = objWidth * 3;
        frame.height = objHeight * 3;
        frame.y = -objHeight * 2;
        frame.interactive = false;
        frame.buttonMode = true;
        frame.alpha = 0;
        frame.isClick = false;
        text.anchor.set(0.5,0)
        text.x = (frame.width / 2) - 10;
        text.y = -50;
        frame.addChild(text);
        obj.on('pointerdown', ()=>{
            obj.isClick = !obj.isClick;
            obj.isClick ? (
                TweenLite.to(obj, 1, {y:-50,ease:Bounce.easeOut}),
                frame.alpha = 1,
                frame.interactive = true,
                otherContainer.children[0].isClick = false,
                TweenLite.to(otherContainer.children[0], 1, {y:0,ease:Bounce.easeOut}),
                otherContainer.children[1].alpha = 0,
                otherContainer.children[1].interactive = false
            ) : (
                TweenLite.to(obj, 1, {y:0,ease: Bounce.easeOut}),
                frame.alpha = 0,
                frame.interactive = false
            );
        });
        container.addChild(obj,frame);
    };
    const PixiApp = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
    });
    // mario
    const marioContainer = new PIXI.Container();
    marioContainer.x = (PixiApp.screen.width / 2 - 75);
    marioContainer.y = PixiApp.screen.height - 50;
    // luigi
    const liugiContainer = new PIXI.Container();
    liugiContainer.x = (PixiApp.screen.width / 2 + 75);
    liugiContainer.y = PixiApp.screen.height - 50;
    // create
    createCharacter(characterList.mario.title,100,100,characterList.mario.url,
        frameList.normal,marioContainer,liugiContainer);
    createCharacter(characterList.luigi.title,100,100,characterList.luigi.url,
        frameList.normal,liugiContainer,marioContainer);
    PixiApp.ticker.add(() => {
        PixiApp.renderer.autoResize = true;
        PixiApp.renderer.resize(window.innerWidth,window.innerHeight)
    }); 
    PixiApp.stage.addChild(marioContainer);
    PixiApp.stage.addChild(liugiContainer);
    location.appendChild(PixiApp.view);
}
export default () => {
    useEffect(()=>{
        Canvas(document.getElementById('canvas'))
    },[]);
    return(<CanvasDiv id="canvas" />);
}