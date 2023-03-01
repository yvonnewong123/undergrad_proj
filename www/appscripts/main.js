require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        //console.log("Yo, I am alive!");

        //FUNCTIONS
        Math.dist=function(x1,y1,x2,y2){ 
            if(!x2) x2=0; 
            if(!y2) y2=0;
            return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
        };

        var rantInt=function(m,n){
            var range=n-m;
            var frand=Math.random()*range;
            return m+Math.floor(frand);
        };

        //-----------------------------------
        // SOUNDS
        //-----------------------------------

        bgmusic=new Audio("sounds/bgmusic.mp3"); 
        bgmusic.addEventListener("ended",function(){
            this.currentTime=0;
            this.play();
        }, false);
        lowerBgMusic=function(){
            bgmusic.volume=0.5
        };

        bgmusic.play();
        lowerBgMusic();

        whoosh=new Audio("sounds/whoosh.mp3");
        switchclick=new Audio("sounds/switch.mp3");
        ticksound=new Audio("sounds/tick.mp3");
        thunder=new Audio("sounds/thunder.mp3");

        thunder.addEventListener("ended",function(){
            this.currentTime=0;
            this.play();
        },false);


        paper1=document.getElementById("paper1");
        paper2=document.getElementById("paper2");
        paper3=document.getElementById("paper3");
        paper4=document.getElementById("paper4");
        paper5=document.getElementById("paper5");
        paper7=document.getElementById("paper7");
        paper8=document.getElementById("paper8");
        paper9=document.getElementById("paper9");

        var paper1=new Raphael(paper1);
        var paper2=new Raphael(paper2);
        var paper3=new Raphael(paper3);
        var paper4=new Raphael(paper4);
        var paper5=new Raphael(paper5);
        var paper7=new Raphael(paper7);
        var paper8=new Raphael(paper8);
        var paper9=new Raphael(paper9);

        var pWidth=({
            p1:paper1.width,
            p2:paper2.width,
            p3:paper3.width,
            p4:paper4.width,
            p5:paper5.width,
            p7:paper7.width,
            p8:paper8.width,
            p9:paper9.width
        });

        var pHeight=({
            p1:paper1.height,
            p2:paper2.height,
            p3:paper3.height,
            p4:paper4.height,
            p5:paper5.height,
            p7:paper7.height,
            p8:paper8.height,
            p9:paper9.height
        });


        var bg1=paper1.rect(0,0,pWidth.p1,pHeight.p1).attr({fill:"black"});
        var bg2=paper2.rect(0,0,pWidth.p2,pHeight.p2).attr({fill:"grey"});
        var bg3=paper3.rect(0,0,pWidth.p3,pHeight.p3).attr({fill:"black"});
        var bg4=paper4.rect(0,0,pWidth.p4,pHeight.p4).attr({fill:"grey"});
        var bg5=paper5.rect(0,0,pWidth.p5,pHeight.p5).attr({fill:"black"});
        var bg7=paper7.rect(0,0,pWidth.p7,pHeight.p7).attr({fill:"grey"});
        var bg8=paper8.rect(0,0,pWidth.p8,pHeight.p8).attr({fill:"black"});
        var bg9=paper9.rect(0,0,pWidth.p9,pHeight.p9).attr({fill:"grey"});

        console.log("bg done, width="+pWidth.p1+" ,height="+pHeight.p1);

        //-----------------------------------------
        //            PAPER 1 DISPLAY
        //-----------------------------------------
        // Simple dot following path of cirlce
        //-----------------------------------------

        console.log("width="+pWidth.p1+" height="+pHeight.p1);

        var p1=({
            mouseStatus:0,
            deg:Math.PI*2/260,
            angle:0,
            pos:({
                x:0,
                y:0
            }),
            i:0
        });


        var p1bgDots=[];

        while(p1.i<=199){

            p1bgDots[p1.i]=paper1.circle(pWidth.p1-100,pHeight.p1-100,10);

            p1bgDots[p1.i].x=rantInt(0,pWidth.p1);
            p1bgDots[p1.i].y=rantInt(0,pHeight.p1);

            p1bgDots[p1.i].xrate=rantInt(-10,10);
            p1bgDots[p1.i].yrate=rantInt(-10,10);

            p1bgDots[p1.i].colString="hsl("+rantInt(0,360)+",70%,90%)";

            p1bgDots[p1.i].attr({
                cx:p1bgDots[p1.i].x,
                cy:p1bgDots[p1.i].y,
                fill:p1bgDots[p1.i].colString,
                stroke:p1bgDots[p1.i].colString
            });

            p1bgDots[p1.i].hide();
            
            p1.i++;

        };

        var p1dot=paper1.circle(pWidth.p1/2+70,pHeight/2,10).attr({
            fill:"white",
            opacity:0.6,
            stroke:"white"
        });


        p1animate=function(){
            p1.angle+=p1.deg;
            p1.pos.x=Math.sin(p1.angle)*80+pWidth.p1/2;
            p1.pos.y=Math.cos(p1.angle)*80+pHeight.p1/2;

            p1dot.attr({
                cx:p1.pos.x,
                cy:p1.pos.y
            });            
        };

        setInterval(p1animate,50);

        p1Hidden=function(){

            var j=0
            while (j<=199){
                p1bgDots[j].x+=p1bgDots[j].xrate;
                p1bgDots[j].y+=p1bgDots[j].yrate;

                if (p1bgDots[j].x>=pWidth.p1){
                    p1bgDots[j].xrate=-p1bgDots[j].xrate;
                } 
                else if (p1bgDots[j].y>=pHeight.p1){
                    p1bgDots[j].yrate=-p1bgDots[j].yrate;
                } 
                else if (p1bgDots[j].x<=0){
                    p1bgDots[j].xrate=-p1bgDots[j].xrate;
                } 
                else if (p1bgDots[j].y<=0){
                    p1bgDots[j].yrate=-p1bgDots[j].yrate;
                };

                p1bgDots[j].attr({
                    cx:p1bgDots[j].x,
                    cy:p1bgDots[j].y
                });
                j++;
            };
        };

        var p1mouselistener=paper1.rect(0,0,pWidth.p1,pHeight.p1).attr({
            fill:"white",
            opacity:0
        });

        var p1interval=0;


        p1mouselistener.addEventListener("mouseover",function(e){
            console.log("mouse on p1");

            thunder.play();
            var i=0;
            while(i<=199){
                p1bgDots[i].show();
                i++;
            };
            p1interval=setInterval(p1Hidden,100);


        });

        p1mouselistener.addEventListener("mouseout",function(){

            thunder.pause();
            clearInterval(p1interval);
            var i=0;
            while(i<=199){
                p1bgDots[i].hide();
                i++;
            };
        });


        //-----------------------------------------
        //            PAPER 2 DISPLAY
        //-----------------------------------------
        // 
        //-----------------------------------------

        p2x=[];
        p2y=[];

        p2x[0]=pWidth.p2/2;
        p2y[0]=pHeight.p2/2-100;

        p2x[1]=pWidth.p2/2-120;
        p2y[1]=pHeight.p2/2-10;
        p2x[2]=pWidth.p2/2+120;
        p2y[2]=pHeight.p2/2-10;
        p2x[3]=pWidth.p2/2-75;
        p2y[3]=pHeight.p2/2+100;
        p2x[4]=pWidth.p2/2+75;
        p2y[4]=pHeight.p2/2+100;

        p2x[5]=(p2x[0]+p2x[1]+p2x[2]+p2x[3]+p2x[4])/5;
        p2y[5]=(p2y[0]+p2y[1]+p2y[2]+p2y[3]+p2y[4])/5;

        var p2point=[];
        var p2lines=[];

        var middle=(p2x[0]+p2x[1]+p2x[2]+p2x[3]+p2x[4])/5+","+(p2y[0]+p2y[1]+p2y[2]+p2y[3]+p2y[4])/5;
        var midforever=p2x[5]+","+p2y[5];

        
        p2DrawPath=function(){

            var i=0;
            
            while(i<=4){

                p2lines[i]=paper2.path("M"+p2x[i]+","+p2y[i]+"L"+middle).attr({fill:"white","stroke-width":5});
                i++;
            };

            p2lines[5]=paper2.path("M"+p2x[0]+","+p2y[0]+"L"+p2x[1]+","+p2y[1]).attr({fill:"white","stroke-width":5});
            p2lines[6]=paper2.path("M"+p2x[0]+","+p2y[0]+"L"+p2x[2]+","+p2y[2]).attr({fill:"white","stroke-width":5});
            p2lines[7]=paper2.path("M"+p2x[1]+","+p2y[1]+"L"+p2x[3]+","+p2y[3]).attr({fill:"white","stroke-width":5});
            p2lines[8]=paper2.path("M"+p2x[2]+","+p2y[2]+"L"+p2x[4]+","+p2y[4]).attr({fill:"white","stroke-width":5});
            p2lines[9]=paper2.path("M"+p2x[3]+","+p2y[3]+"L"+p2x[4]+","+p2y[4]).attr({fill:"white","stroke-width":5});

            p2lines[10]=paper2.path("M"+p2x[0]+","+p2y[0]+"L"+midforever).attr({fill:"white","stroke-width":5});
            p2lines[11]=paper2.path("M"+p2x[1]+","+p2y[1]+"L"+midforever).attr({fill:"white","stroke-width":5});
            p2lines[12]=paper2.path("M"+p2x[2]+","+p2y[2]+"L"+midforever).attr({fill:"white","stroke-width":5});
            p2lines[13]=paper2.path("M"+p2x[3]+","+p2y[3]+"L"+midforever).attr({fill:"white","stroke-width":5});
            p2lines[14]=paper2.path("M"+p2x[4]+","+p2y[4]+"L"+midforever).attr({fill:"white","stroke-width":5});

        };

        p2DrawPath();

        p2updatepath=function(){
            var i=0;
            while(i<=4){
                p2lines[i].attr({
                    path:"M"+p2x[i]+","+p2y[i]+"L"+middle
                });
                i++;
            }
        }

        p2point[0]=paper2.circle(p2x[0],p2y[0],10).attr({fill:"white",stroke:"white"});
        p2point[1]=paper2.circle(p2x[1],p2y[1],10).attr({fill:"white",stroke:"white"});
        p2point[2]=paper2.circle(p2x[2],p2y[2],10).attr({fill:"white",stroke:"white"});
        p2point[3]=paper2.circle(p2x[3],p2y[3],10).attr({fill:"white",stroke:"white"});
        p2point[4]=paper2.circle(p2x[4],p2y[4],10).attr({fill:"white",stroke:"white"});

        
        var p2mouselistener=paper2.rect(0,0,pWidth.p2,pHeight.p2).attr({
            fill:"white",
            opacity:0
        });


        p2mouselistener.addEventListener("mousemove",function(e){
            console.log("mouse on p2");
            middle=e.offsetX+","+e.offsetY;

            p2updatepath();

        });


        //-----------------------------------------
        //            PAPER 3 DISPLAY
        //-----------------------------------------
        // yin following yang, emit diff colours
        //-----------------------------------------

        var p3=({
            deg:Math.PI*2/360,
            angle:0,
            angle2:0,
            i:0,
            n:0
        });

        var p3bgCircle=[];

        while(p3.i<=2099){

            p3bgCircle[p3.i]=paper3.circle(pWidth.p3-100,pHeight.p3-100,5).attr({
                fill:"white",
                stroke:"white"
            });

            if (p3.i<=99){p3.n=100};
            if(p3.i<=199 && p3.i>=99){p3.n=120};
            if(p3.i<=299 && p3.i>=199){p3.n=140};
            if(p3.i<=399 && p3.i>=299){p3.n=160};
            if(p3.i<=499 && p3.i>=399){p3.n=180};
            if(p3.i<=599 && p3.i>=499){p3.n=200};
            if(p3.i<=699 && p3.i>=599){p3.n=220};
            if(p3.i<=799 && p3.i>=699){p3.n=240};
            if(p3.i<=899 && p3.i>=799){p3.n=260};
            if(p3.i<=999 && p3.i>=899){p3.n=280};
            if(p3.i<=1099 && p3.i>=999){p3.n=300};
            if(p3.i<=1199 && p3.i>=1099){p3.n=320};
            if(p3.i<=1350 && p3.i>=1199){p3.n=340};
            if(p3.i<=1599 && p3.i>=1350){p3.n=360};
            if(p3.i<=1799 && p3.i>=1599){p3.n=380};
            if(p3.i<=2099 && p3.i>=1799){p3.n=400};
            
            
            
            p3bgCircle[p3.i].x=Math.sin(p3.angle2)*p3.n+pWidth.p3/2;
            p3bgCircle[p3.i].y=Math.cos(p3.angle2)*p3.n+pHeight.p3/2;
            p3bgCircle[p3.i].attr({
                cx:p3bgCircle[p3.i].x,
                cy:p3bgCircle[p3.i].y
            });

            p3bgCircle[p3.i].hide();
            p3.angle2+=6*p3.deg;
            p3.i++;
        };

        var yin=paper3.circle(pWidth.p3/2+50,pHeight.p3/2,40).attr({
            fill:"white",
            opacity:0.5,
            stroke:"white"
        });

        var yinPos=({
            x:pWidth.p3/2+50,
            y:pHeight.p3/2
        });

        var yang=paper3.circle(pWidth.p3/2-50,pHeight.p3/2,40).attr({
            fill:"grey",
            opacity:0.5,
            stroke:"grey"
        });

        var yangPos=({
            x:pWidth.p3/2-50,
            y:pHeight.p3/2
        });


        p3animate=function(){

            p3.angle+=p3.deg;

            yinPos.x=Math.sin(p3.angle)*50+pWidth.p3/2;
            yinPos.y=Math.cos(p3.angle)*50+pHeight.p3/2;

            yangPos.x=Math.sin(p3.angle+Math.PI)*50+pWidth.p3/2;
            yangPos.y=Math.cos(p3.angle+Math.PI)*50+pHeight.p3/2;

            yin.attr({
                cx:yinPos.x,
                cy:yinPos.y
            });

            yang.attr({
                cx:yangPos.x,
                cy:yangPos.y
            });

        };

        setInterval(p3animate,50);

        p3changeColour=function(){

            var yinrad=rantInt(0,180);
            var yangrad=rantInt(181,360);

            yin.attr({
                fill:"hsl("+yinrad+",80%,90%)",
                stroke:"hsl("+yinrad+",80%,90%)"
            });

            yang.attr({
                fill:"hsl("+yangrad+",80%,90%)",
                stroke:"hsl("+yangrad+",80%,90%)"
            });

        };

        p3bgChange=function(){
            var col=rantInt(0,360);
            var l=0;
            var s=0;

            var i=0;
            while(i<=999){

                if (i<=99){s=80; l=95};
                if(i<=199 && i>=99){s=70; l=90};
                if(i<=299 && i>=199){s=70; l=90};
                if(i<=399 && i>=299){s=60; l=80};
                if(i<=499 && i>=399){s=60; l=80};
                if(i<=599 && i>=499){s=60; l=80};
                if(i<=699 && i>=599){s=50; l=85};
                if(i<=799 && i>=699){s=50; l=85};
                if(i<=899 && i>=799){s=50; l=85};
                if(i<=999 && i>=899){s=50; l=85};

                p3bgCircle[i].colstring="hsl("+col+", "+s+"%, "+l+"%)";
                p3bgCircle[i].attr({
                    fill:p3bgCircle[i].colstring,
                    stroke:p3bgCircle[i].colstring
                });

                p3bgCircle[i].show();

                i++;
            };

        }

        var p3mouselistener=paper3.rect(0,0,pWidth.p3,pHeight.p3).attr({
            fill:"white",
            opacity:0
        });

        var p3animation=0;

        p3mouselistener.addEventListener("mouseover",function(){
            console.log("mouse on p3");

            p3changeColour();
            p3animation=setInterval(p3bgChange,50);
        });


        p3mouselistener.addEventListener("mouseout",function(){
            console.log("mouse out of p3");

            yang.attr({
                fill:"grey",
                opacity:0.5,
                stroke:"grey"
            });

            yin.attr({
                fill:"white",
                opacity:0.5,
                stroke:"white"
            });

            var i=0;
            while(i<=999){
                p3bgCircle[i].hide();

                i++;
            };

            clearInterval(p3animation);

        });

        //-----------------------------------------
        //            PAPER 4 DISPLAY
        //-----------------------------------------
        // 
        //-----------------------------------------

        
        var p4stat=0;
        var stop=0;

        var p4switch=paper4.rect(pWidth.p4/2-40,pHeight.p4/2-20,80,40);
        p4switch.attr({
            "stroke-width":3,
            "fill":"black"
        });


        var p4pos=({
            offx:pWidth.p4/2-40,
            offy:pHeight.p4/2,
            onx:pWidth.p4/2+40,
            ony:pHeight.p4/2
        })

        var p4toggle=paper4.circle(p4pos.offx,p4pos.offy,27).attr({
            fill:"white",
            stroke:"white"
        });

        fire=function(){

            stop=stop+1;

            var fireworks=[];
            var i=0;
            var g=0.3;

            while(i<=99){

                fireworks[i]=paper4.circle(pWidth.p4/2,pHeight.p4/2-70,3);

                fireworks[i].col=rantInt(0,360);
                fireworks[i].attr({
                    fill:"hsl("+fireworks[i].col+",80%,90%)",
                    stroke:"hsl("+fireworks[i].col+",80%,90%)",
                    opacity:0.5
                });

                fireworks[i].x=pWidth.p4/2;
                fireworks[i].y=pHeight.p4/2-100;
                fireworks[i].xrate=-5+10*Math.random();
                fireworks[i].yrate=-7+14*Math.random();

                i++;
            };

            setInterval(function(){
                var k=0;
                while(k<=99){
                    fireworks[k].x+=fireworks[k].xrate;
                    fireworks[k].y+=fireworks[k].yrate;
                    fireworks[k].yrate+=g;

                    fireworks[k].attr({cx:fireworks[k].x,cy:fireworks[k].y}); 
                k++;
                };
            },50);

            console.log(stop);

            if(stop>=10){
                clearInterval(call);
                p4toggle.attr({
                    cx:p4pos.offx,
                    cy:p4pos.offy
                });
                p4switch.attr({
                    fill:"black"
                });

                switchclick.play();
                p4stat=0;
                stop=0;
            }

        };

        var call=0;          

        p4toggle.addEventListener("mousedown",function(){

            if(p4stat===0){
                p4toggle.attr({
                    cx:p4pos.onx,
                    cy:p4pos.ony
                });
                p4switch.attr({
                    fill:"green"
                });

                switchclick.play();
                p4stat=1;

                call=setInterval(fire,400);


            }else if(p4stat===1){
                p4toggle.attr({
                    cx:p4pos.offx,
                    cy:p4pos.offy
                });
                p4switch.attr({
                    fill:"black"
                });

                switchclick.play();
                p4stat=0;
                stop=0;
                clearInterval(call);
            };
        });
        

        //-----------------------------------------
        //            PAPER 5 DISPLAY
        //-----------------------------------------
        // circulating flower petals
        //-----------------------------------------

        var p5=({
            i:0,
            j:0,
            deg:Math.PI*2/360,
            angle1:0,
            angle2:0,
            lag:0,
            mouseStatus:0
        });

        var petal=[];

        while(p5.i<=7){

            
            petal[p5.i]=paper5.circle(pWidth.p5/2+Math.sin(p5.angle1)*70,pHeight.p5/2+Math.cos(p5.angle1)*70,60);
            petal[p5.i].attr({
                fill:"white",
                stroke:"white",
                opacity:0.2
            });

            petal[p5.i].x=pWidth.p5/2+Math.sin(p5.angle1)*70;
            petal[p5.i].y=pHeight.p5/2+Math.cos(p5.angle1)*70;

            //console.log("p5.i="+p5.i+" x="+petal[p5.i].x+" y="+petal[p5.i].y);

            //console.log(p5.angle1);

            p5.angle1+=2*Math.PI/8;

            p5.i++;
        };

        p5animate=function(){

            while(p5.j<=7){

                p5.angle2+=p5.deg;


                petal[p5.j].x=pWidth.p5/2+Math.sin(p5.angle2+p5.lag)*70;
                petal[p5.j].y=pHeight.p5/2+Math.cos(p5.angle2+p5.lag)*70;

                petal[p5.j].attr({
                    cx:petal[p5.j].x,
                    cy:petal[p5.j].y
                });

                p5.lag+=Math.PI/4;
                p5.j++;  
            };

            if(p5.j===8){
                p5.j=0;
            };

            if(p5.lag===2*Math.PI){
                p5.lag=0;
            };

        };


        setInterval(p5animate,100);

        var p5mouselistener=paper5.rect(0,0,pWidth.p5,pHeight.p5).attr({
            fill:"white",
            opacity:0
        });

        p5Wheel=["red","orange","yellow","green","blue","indigo","violet","pink"];

        p5change=function(){
            var i=0;
            while(i<=7){
                petal[i].attr({
                    fill:p5Wheel[i],
                    stroke:p5Wheel[i],
                    opacity:0.7
                });

                i++;
            };         
        };

        p5changeBack=function(){
            var i=0;
            while(i<=7){
                petal[i].attr({
                    fill:"white",
                    stroke:"white"
                });
                i++;
            };
        };

        p5mouselistener.addEventListener("mouseover",function(){
            console.log("mouse on p5");
            p5change();
        });

        p5mouselistener.addEventListener("mouseout",function(){
            console.log("mouse out of p5")
            p5changeBack();
        });


        

        //-----------------------------------------
        //            PAPER 7 DISPLAY
        //-----------------------------------------
        //
        //-----------------------------------------

        var rightcenterx=pWidth.p7/2-100;
        var rightcentery=pHeight.p2/2;
        var leftcenterx=pWidth.p7/2+100;
        var leftcentery=pHeight.p2/2;

        var right=paper7.circle(rightcenterx,rightcentery,80).attr({
            fill:"white",
            stroke:"white"
        });

        var left=paper7.circle(leftcenterx,leftcentery,80).attr({
            fill:"white",
            stroke:"white"
        });

        var rightbrow=paper7.rect(rightcenterx-50,rightcentery-100,100,10).attr({
            fill:"white",
            stroke:"white"
        });

        var leftbrow=paper7.rect(leftcenterx-50,leftcentery-100,100,10).attr({
            fill:"white",
            stroke:"white"
        });

        var rightball=paper7.circle(pWidth.p7/2-100,pHeight.p2/2+40,40).attr({
            fill:"blue",
            stroke:"blue",
            opacity:0.5
        });

        var leftball=paper7.circle(pWidth.p7/2+100,pHeight.p2/2+40,40).attr({
            fill:"black",
            stroke:"black",
            opacity:0.5
        });

        var p7mouselistener=paper7.rect(0,0,pWidth.p7,pHeight.p7).attr({
            fill:"white",
            opacity:0
        });

        var rightdist=0;
        var leftdist=0;
        var dum=0;
        var p7rightoldx=0;
        var p7rightoldy=0;
        var p7rightoldr=0;
        var p7rightprop=0;

        var p7leftoldx=0;
        var p7leftoldy=0;
        var p7leftoldr=0;
        var p7leftprop=0;

        var fromOtherSide=0;

        

        p7mouselistener.addEventListener("mousemove",function(e){

            console.log("on p7");

            if(e.offsetX<=pWidth.p7/2){
                if(fromOtherSide===1){
                    whoosh.play();
                    fromOtherSide=0;
                }
            }
            if(e.offsetX>=pWidth.p7/2){
                if(fromOtherSide===0){
                    whoosh.play();
                    fromOtherSide=1;
                }
            }

            
            rightdist=Math.dist(pWidth.p7/2-100,pHeight.p7/2,e.offsetX,e.offsetY);
            leftdist=Math.dist(pWidth.p7/2+100,pHeight.p7/2,e.offsetX,e.offsetY);
        
            if(rightdist<=40){
                rightball.attr({
                    cx:e.offsetX,
                    cy:e.offsetY
                });
            } else if(rightdist>=41){

                p7rightoldx=e.offsetX-rightcenterx;
                p7rightoldy=e.offsetY-rightcentery;

                p7rightoldr=Math.sqrt(Math.pow(p7rightoldx,2)+Math.pow(p7rightoldy,2));

                p7rightprop=40/p7rightoldr;

                rightball.attr({
                    cx:(p7rightoldx*p7rightprop)+rightcenterx,
                    cy:(p7rightoldy*p7rightprop)+rightcentery
                });

            };

            if(leftdist<=40){
                leftball.attr({
                    cx:e.offsetX,
                    cy:e.offsetY
                });
            } else if(leftdist>=41){

                p7leftoldx=e.offsetX-leftcenterx;
                p7leftoldy=e.offsetY-leftcentery;

                p7leftoldr=Math.sqrt(Math.pow(p7leftoldx,2)+Math.pow(p7leftoldy,2));

                p7leftprop=40/p7leftoldr;


                leftball.attr({
                    cx:(p7leftoldx*p7leftprop)+leftcenterx,
                    cy:(p7leftoldy*p7leftprop)+leftcentery
                });
            }
             
        });



        //-----------------------------------------
        //            PAPER 8 DISPLAY
        //-----------------------------------------
        // swimming b/w fish on bg
        //-----------------------------------------

        var clockcenter=({
            x:pWidth.p8/2,
            y:pHeight.p8/2
        });

        var clockface=paper8.circle(clockcenter.x,clockcenter.y,160).attr({
            fill:"white",
            stroke:"white"
        });

        var p8time=[];

        p8time[0]=paper8.text(clockcenter.x,clockcenter.y-140,"time").attr({"font-size":14});
        p8time[0].x=clockcenter.x;
        p8time[0].y=clockcenter.y-140;
        p8time[1]=paper8.text(clockcenter.x+70,clockcenter.y-115,"effort").attr({"font-size":14});
        p8time[1].x=clockcenter.x+70;
        p8time[1].y=clockcenter.y-115;
        p8time[2]=paper8.text(clockcenter.x+115,clockcenter.y-60,"time").attr({"font-size":14});
        p8time[2].x=clockcenter.x+115;
        p8time[2].y=clockcenter.y-60;
        p8time[3]=paper8.text(clockcenter.x+130,clockcenter.y,"effort").attr({"font-size":14});
        p8time[3].x=clockcenter.x+130;
        p8time[3].y=clockcenter.y;
        p8time[4]=paper8.text(clockcenter.x+115,clockcenter.y+60,"time").attr({"font-size":14});
        p8time[4].x=clockcenter.x+115;
        p8time[4].y=clockcenter.y+60;
        p8time[5]=paper8.text(clockcenter.x+70,clockcenter.y+115,"effort").attr({"font-size":14});
        p8time[5].x=clockcenter.x+70;
        p8time[5].y=clockcenter.y+115;
        p8time[6]=paper8.text(clockcenter.x,clockcenter.y+140,"time").attr({"font-size":14});
        p8time[6].x=clockcenter.x;
        p8time[6].y=clockcenter.y+140;
        p8time[7]=paper8.text(clockcenter.x-70,clockcenter.y+115,"effort").attr({"font-size":14});
        p8time[7].x=clockcenter.x-70;
        p8time[7].y=clockcenter.y+115;
        p8time[8]=paper8.text(clockcenter.x-115,clockcenter.y+60,"time").attr({"font-size":14});
        p8time[8].x=clockcenter.x-115;
        p8time[8].y=clockcenter.y+60;
        p8time[9]=paper8.text(clockcenter.x-130,clockcenter.y,"effort").attr({"font-size":14});
        p8time[9].x=clockcenter.x-130;
        p8time[9].y=clockcenter.y;
        p8time[10]=paper8.text(clockcenter.x-115,clockcenter.y-60,"time").attr({"font-size":14});
        p8time[10].x=clockcenter.x-115;
        p8time[10].y=clockcenter.y-60;
        p8time[11]=paper8.text(clockcenter.x-70,clockcenter.y-115,"effort").attr({"font-size":14});
        p8time[11].x=clockcenter.x-70;
        p8time[11].y=clockcenter.y-115;

        /*p8textline1=paper8.text(clockcenter.x,clockcenter.y-10,"yvonne's");
        p8textline2=paper8.text(clockcenter.x,clockcenter.y+10,"project recipe");*/

        var p8path=paper8.path("M"+clockcenter.x+","+clockcenter.y+"L"+p8time[0].x+","+p8time[0].y).attr({
            fill:"red",
            stroke:"red",
            "stroke-width":5
        });

        var time=0;

        clockTick=function(){

            p8path.hide();
            p8path=paper8.path("M"+clockcenter.x+","+clockcenter.y+"L"+p8time[time].x+","+p8time[time].y).attr({
                fill:"red",
                stroke:"red",
                "stroke-width":5
            });

            ticksound.play();
            time++;

            if(time===12){
                time=0;
            };
        };

        var p8mouselistener=paper8.rect(0,0,pWidth.p8,pHeight.p8).attr({
            fill:"white",
            opacity:0
        });

        var ticking=0;

        p8mouselistener.addEventListener("mouseover",function(){
            console.log("mouse on p8");
            ticking=setInterval(clockTick,500);
        });

        p8mouselistener.addEventListener("mouseout",function(){
            console.log("mouse out of p8");
            clearInterval(ticking);
        })

        
        //-----------------------------------------
        //            PAPER 9 DISPLAY
        //-----------------------------------------
        // NO YES
        //-----------------------------------------

        var p9=({
            mouseStatus:0,
            x:0,
            y:0,
            distance:0,
            rad:0,
        });

        var yes=paper9.text(pWidth.p9/2,pHeight.p9/2,"YES").attr({
            stroke:"white",
            "font-size":200,
            "font-family":"Impact",
            fill:"grey"
        });

        var no=paper9.text(pWidth.p9+100,pHeight.p9+100,"NO").attr({
            stroke:"white",
            fill:"hsla(1, 100%, 50%, 0)",
            "font-size":200,
            "font-family":"Impact"
        });

        var p9mouselistener=paper9.rect(0,0,pWidth.p9,pHeight.p9).attr({
            fill:"hsla(1, 100%, 50%, 0)"
        });

        p9colour=function(){

            p9.rad=rantInt(0,360);
            var string="hsla("+p9.rad+", 100%, 90%, 1)";

            console.log(string);

            yes.attr({
                fill:string,
            });



        };

        p9mouselistener.addEventListener("mousemove",function(e){

            p9.x=e.offsetX;
            p9.y=e.offsetY;

            p9.distance=Math.dist(p9.x,p9.y,pWidth.p9/2,pHeight.p9/2);

            //console.log("on p9, mouse x="+p9.x+" ,y="+p9.y);

            no.attr({
                x:p9.x,
                y:p9.y
            });

            if(p9.distance<=80){
                p9colour();

                console.log("here")
            } else {
                yes.attr({
                    fill:"hsla(1, 100%, 50%, 0)"
                });
            };
            
        });

});