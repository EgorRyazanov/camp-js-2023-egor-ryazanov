var m=Object.defineProperty;var d=(n,t,e)=>t in n?m(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var s=(n,t,e)=>(d(n,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";function r(n,t,e="beforeend"){n.insertAdjacentElement(e,t)}function c(n){const t=document.createElement("div");return t.innerHTML=n,t.firstChild}function u(n,t){n.replaceWith(t)}function p(n){return n.reduce((t,e)=>t+e,0)}class a{getElement(){return this.element}generateElement(t){return t!=null?c(t):c(this.template)}}class y extends a{constructor(e=[]){super();s(this,"points");s(this,"element");this.points=e,this.element=this.generateElement()}get template(){return`<div class="scores__total">
      <h4 class="total__title">Total</h4>
      <h4 class="total__scores">${p(this.points)}</h4>
      <div class="total__text-container">
        <p class="total__text">${this.points.join(" ")}</p>
      </div>
    </div>`}update(e){this.points.push(e.turnPoints);const i=this.element,o=this.generateElement();u(i,o),this.element=o}}class E extends a{constructor(e,i){super();s(this,"element");s(this,"points");s(this,"name");this.points=e,this.name=i,this.element=this.generateElement()}get template(){return this.getPlayerTemplate()}update(e){this.points=e.points;const i=this.generateElement(this.getPlayerTemplate(e.isWin,e.isNext));u(this.element,i),this.element=i}getPlayerTemplate(e=!1,i=!1){return`<li class="scores__player player">
      <h4 class="player__name ${i?"player__name_next":""}">${this.name}</h4>
      <h4 class="player__scores">Scores: ${p(this.points)}</h4>
      <div class="player__text-container ${e?"player__text-container_win":""}">
        <p class="player__text text">${this.points.join(" ")}</p>
      <div>
    </li>`}}class w extends a{constructor(){super();s(this,"element");this.element=this.generateElement()}get template(){return'<ul class="scores__players"></ul>'}}class x extends a{constructor(){super();s(this,"element");s(this,"events");this.element=this.generateElement(),this.events=[]}get template(){return'<button class="primary-button game__roll-button">Make roll</button>'}addEvents(e){e.forEach(i=>{this.element.addEventListener(i.name,i.callback),this.events.push(i)})}removeEvents(){this.events.forEach(e=>{this.element.removeEventListener(e.name,e.callback)})}}class _ extends a{constructor(e){super();s(this,"element");s(this,"title");this.title=e,this.element=this.generateElement()}get template(){return`<h1 class="game__title title">${this.title}</h1>`}}class b extends a{constructor(){super();s(this,"element");this.element=this.generateElement()}get template(){return'<div class="game__scores"></div>'}}class l{constructor(){s(this,"subscribers",[])}subscribe(t){this.subscribers.includes(t)||this.subscribers.push(t)}unsubscribe(t){const e=this.subscribers.findIndex(i=>i===t);e!==-1&&this.subscribers.splice(e,1)}notify(t){this.subscribers.forEach(e=>e.update(t))}}class g extends l{constructor(e){super();s(this,"currentPlayerIndex");s(this,"playersCount");this.playersCount=e,this.currentPlayerIndex=-1}next(){this.currentPlayerIndex=this.calculateIndex();const e=this.calculateIndex();this.notify({nextPlayerIndex:e,currentPlayerIndex:this.currentPlayerIndex})}calculateIndex(){const e=this.currentPlayerIndex+1;return this.playersCount===e?0:e}}const V=21,h=1,f=6,P=1;class I extends l{constructor(){super()}update(t){const e=this.getRandomValue();this.notify({turnPoints:e,currentPlayerIndex:t.currentPlayerIndex,nextPlayerIndex:t.nextPlayerIndex})}getRandomValue(){return Math.floor(Math.random()*(f+P-h)+h)}}class S extends l{constructor(e,i){super();s(this,"name");s(this,"points");s(this,"isWin");s(this,"pointsSum");s(this,"sequenceIndex");this.name=e,this.sequenceIndex=i,this.points=[],this.isWin=!1,this.pointsSum=0}update(e){e.currentPlayerIndex===this.sequenceIndex&&(this.points.push(e.turnPoints),this.pointsSum+=e.turnPoints,this.pointsSum>=V&&(this.isWin=!0),this.notify({isWin:this.isWin,pointsSum:this.pointsSum,points:this.points})),e.nextPlayerIndex===this.sequenceIndex&&this.notify({isWin:this.isWin,isNext:!0,pointsSum:this.pointsSum,points:this.points})}}class C{constructor(t,e,i){s(this,"appElement");s(this,"playersContainerView");s(this,"rollButtonView");s(this,"playersGenerators");s(this,"playersViews");s(this,"totalScoresView");s(this,"titleView");s(this,"scoresContainerView");s(this,"turnGenerator");s(this,"diceGenerator");this.playersNames=i,this.appElement=t,this.playersContainerView=e,this.totalScoresView=new y,this.rollButtonView=new x,this.titleView=new _("Blackjack game"),this.scoresContainerView=new b,this.turnGenerator=new g(i.length),this.diceGenerator=new I,this.playersGenerators=this.createPlayerGenerators(i),this.playersViews=this.createPlayersViews()}init(){this.makeEventSubscribes(),r(this.appElement,this.titleView.getElement()),r(this.appElement,this.rollButtonView.getElement()),r(this.appElement,this.scoresContainerView.getElement()),r(this.scoresContainerView.getElement(),this.playersContainerView.getElement()),this.playersViews.forEach(t=>r(this.playersContainerView.getElement(),t.getElement())),r(this.scoresContainerView.getElement(),this.totalScoresView.getElement())}createPlayerGenerators(t){return t.map((e,i)=>new S(e,i))}createPlayersViews(){const t=[];return this.playersGenerators.forEach(e=>{const i=new E(e.points,e.name);t.push(i),e.subscribe(i)}),t}makeEventSubscribes(){this.turnGenerator.subscribe(this.diceGenerator),this.diceGenerator.subscribe(this.totalScoresView),this.rollButtonView.addEvents([{name:"click",callback:()=>this.turnGenerator.next()}]),this.playersGenerators.forEach(t=>this.diceGenerator.subscribe(t))}}window.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("#app"),t=new w,e=["John","Jack"];if(n==null)throw Error("Element not found");new C(n,t,e).init()});
