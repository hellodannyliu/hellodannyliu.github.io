import{n as e,t}from"./alarm-CdkFL2Fr.js";var n=`20260801c`;function r(e){return new Promise((t,n)=>{let r=document.querySelector(`script[data-vad-src="${e}"]`);if(r){r.dataset.loaded===`1`?t():r.addEventListener(`load`,()=>t(),{once:!0});return}let i=document.createElement(`script`);i.src=e,i.async=!0,i.dataset.vadSrc=e,i.onload=()=>{i.dataset.loaded=`1`,t()},i.onerror=()=>n(Error(`Failed to load script: ${e}`)),document.head.appendChild(i)})}function i(){if(typeof navigator>`u`)return!1;let e=navigator.userAgent;return/iPhone|iPad|iPod/i.test(e)?!0:/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR|Firefox|Android/i.test(e)}function a(){if(typeof navigator>`u`)return!1;let e=navigator.userAgent;return/iPad|iPhone|iPod/.test(e)?!0:navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1}function o(e){e.env.logLevel=`error`,e.env.wasm.numThreads=1,e.env.wasm.proxy=!1,(a()||i())&&(e.env.wasm.simd=!1)}var s=null;function c(){if(window.vad?.MicVAD)return Promise.resolve(window.vad);if(s)return s;let e=`/humanVoiceDetectionWebsite/vad/`,t=`v=${n}`;return s=(async()=>{if(await r(`${e}ort.wasm.min.js?${t}`),window.ort&&o(window.ort),await r(`${e}bundle.min.js?${t}`),!window.vad?.MicVAD)throw Error(`VAD library did not initialize (window.vad missing)`);return window.vad})(),s.finally(()=>{s=null})}var l=32;function u(e){let t=Math.min(.95,Math.max(.05,e)),n=Math.max(.02,t-.1),r=Math.round(200+t*300);return{positiveSpeechThreshold:t,negativeSpeechThreshold:n,minSpeechFrames:Math.max(3,Math.round(r/l))}}var d=new class{mic=null;speaking=!1;smoothed=0;onFrameProcessed=()=>{};onSpeechChange=()=>{};get isSpeaking(){return this.speaking}async start(e){await this.stop(),this.onFrameProcessed=e.onFrameProcessed,this.onSpeechChange=e.onSpeechChange,this.smoothed=0,this.speaking=!1;let t=u(e.sensitivity),n=`/humanVoiceDetectionWebsite/vad/`,{MicVAD:r}=await c();this.mic=await r.new({model:`v5`,baseAssetPath:n,onnxWASMBasePath:n,startOnLoad:!1,ortConfig:o,positiveSpeechThreshold:t.positiveSpeechThreshold,negativeSpeechThreshold:t.negativeSpeechThreshold,minSpeechFrames:t.minSpeechFrames,redemptionFrames:Math.round(900/l),onFrameProcessed:e=>{let t=e.isSpeech;this.smoothed=this.smoothed*.55+t*.45,this.onFrameProcessed({isSpeech:t,smoothed:this.smoothed})},onSpeechStart:()=>{this.setSpeaking(!0)},onSpeechEnd:()=>{this.setSpeaking(!1)},onVADMisfire:()=>{this.setSpeaking(!1)}}),await this.mic.start()}setSensitivity(e){if(!this.mic)return;let t=u(e);this.mic.setOptions(t)}async stop(){if(this.mic){try{await this.mic.pause()}catch{}try{await this.mic.destroy()}catch{}this.mic=null}this.speaking&&(this.speaking=!1,this.onSpeechChange(!1)),this.smoothed=0,this.onFrameProcessed({isSpeech:0,smoothed:0})}setSpeaking(e){e!==this.speaking&&(this.speaking=e,this.onSpeechChange(this.speaking))}},f=new e,p=`ready`,m=[{sec:10,label:`10 秒`},{sec:20,label:`20 秒`},{sec:40,label:`40 秒`},{sec:60,label:`60 秒`},{sec:60,label:`1 分钟`},{sec:180,label:`3 分钟`},{sec:300,label:`5 分钟`}],h=20,g=.1,_=!0,v=`doorbell`,y=null,b=!1,x=0,S=``,C=0,w=document.querySelector(`#app`);function T(){return Math.round(u(g).positiveSpeechThreshold*100)}function E(){let e=j(),n=Math.round((w.dataset.level?Number(w.dataset.level):C)*100),r=Math.round(C*100),i=Math.round(g*100),a=T();w.innerHTML=`
    <div class="atmosphere" aria-hidden="true"></div>
    <div class="flash-overlay" aria-hidden="true"></div>

    <main class="shell">
      <nav class="site-nav" aria-label="功能切换">
        <a href="./index.html" aria-current="page">人声监测</a>
        <a href="./lip.html">唇动监测</a>
      </nav>

      <header class="brand-block">
        <p class="brand">声哨</p>
        <h1>无人说话时，立刻提醒</h1>
        <p class="lede">用 Silero 神经网络识别人声；超过设定时间没有说话，就会闪灯告警。</p>
      </header>

      <section class="stage" aria-live="polite">
        <div class="beacon ${D()}" data-speaking="${b}">
          <div class="beacon-ring ring-a"></div>
          <div class="beacon-ring ring-b"></div>
          <div class="beacon-core">
            <span class="beacon-label">${O()}</span>
            <strong class="countdown">${A(e)}</strong>
          </div>
        </div>
        <div class="prob-row">
          <div class="prob-head">
            <p class="prob-readout" id="speech-prob">人声概率 <strong>${r}%</strong></p>
            <p class="prob-threshold" id="speech-threshold">判定线 ${a}%</p>
          </div>
          <div class="level-meter" aria-hidden="true">
            <div class="level-fill" style="transform: scaleX(${Math.min(1,n/100)})"></div>
            <div class="level-threshold" id="level-threshold" style="left: ${a}%"></div>
          </div>
          <label class="field sens-field">
            <span>人声概率灵敏度 <em id="sensitivity-label">${i}%</em><span class="sens-hint">与判定线同步，越低越容易触发</span></span>
            <input id="sensitivity" type="range" min="5" max="95" step="1" value="${i}" />
          </label>
        </div>
        <p class="status-line">${k(e)}</p>
      </section>

      <section class="controls">
        <div class="field">
          <span>静默超时 <em id="timeout-label">${M(h)}</em></span>
          <div class="quick-timeouts" role="group" aria-label="快捷超时">
            ${m.map(e=>`<button type="button" class="chip ${h===e.sec?`is-active`:``}" data-timeout="${e.sec}">${e.label}</button>`).join(``)}
          </div>
          <input id="timeout" type="range" min="1" max="300" step="1" value="${h}" />
        </div>
        <label class="toggle">
          <input id="sound" type="checkbox" ${_?`checked`:``} />
          <span>警报声音</span>
        </label>
        <div class="field sound-picker ${_?``:`is-disabled`}">
          <span>警报音色 <em id="sound-hint">${t.find(e=>e.id===v)?.hint??``}</em></span>
          <div class="quick-timeouts sound-chips" role="group" aria-label="警报音色">
            ${t.map(e=>`<button type="button" class="chip ${v===e.id?`is-active`:``}" data-sound="${e.id}" title="${e.hint}" ${_?``:`disabled`}>${e.label}</button>`).join(``)}
          </div>
          <button type="button" class="btn btn-preview" id="preview-sound" ${_?``:`disabled`}>试听当前音色</button>
        </div>

        <div class="actions">
          ${p===`monitoring`||p===`alerting`?`<button type="button" class="btn btn-stop" id="toggle">停止监测</button>
                 ${p===`alerting`?`<button type="button" class="btn btn-mute" id="ack">关闭警报</button>`:``}`:`<button type="button" class="btn btn-start" id="toggle">开始监测</button>`}
        </div>
        ${S?`<p class="error" role="alert">${S}</p>`:``}
        <p class="hint">Silero VAD 本地推理 · 需要麦克风权限 · 数据不上传</p>
      </section>
    </main>
  `,P()}function D(){return p===`alerting`?`is-alert`:p===`monitoring`?b?`is-voice`:`is-listen`:p===`error`?`is-error`:`is-idle`}function O(){return p===`alerting`?`告警`:p===`monitoring`?b?`检测到人声`:`等待人声`:p===`error`?`无法启动`:`待命`}function k(e){return p===`error`?S||`请检查麦克风权限后重试`:p===`alerting`?`已超过 ${h} 秒未检测到人声`:p===`monitoring`?b?`正在说话 · 计时器已重置`:e===null?`监测中…`:`距告警还剩 ${e} 秒`:`点选超时时间即可开始，将请求麦克风权限`}function A(e){return p===`alerting`?`!`:p!==`monitoring`||e===null?`—`:String(e)}function j(){if(p!==`monitoring`||b||y===null)return null;let e=(performance.now()-y)/1e3;return Math.max(0,Math.ceil(h-e))}function M(e){return e>=60&&e%60==0?`${e/60} 分钟`:`${e} 秒`}function N(e,t={}){h=Math.min(300,Math.max(1,Math.round(e)));let n=document.getElementById(`timeout-label`);n&&(n.textContent=M(h));let r=document.getElementById(`timeout`);if(r&&(r.value=String(h)),w.querySelectorAll(`.chip[data-timeout]`).forEach(e=>{e.classList.toggle(`is-active`,Number(e.dataset.timeout)===h)}),t.autoStart&&(p===`ready`||p===`error`)){F();return}if(p===`alerting`){f.stop(document.documentElement),p=`monitoring`,y=b?null:performance.now(),E(),R();return}if(p===`monitoring`&&!b){y=performance.now();let e=w.querySelector(`.countdown`),t=w.querySelector(`.status-line`);e&&(e.textContent=String(h)),t&&(t.textContent=`距告警还剩 ${h} 秒`)}}function P(){document.getElementById(`timeout`)?.addEventListener(`change`,e=>{N(Number(e.target.value),{autoStart:!0})}),document.getElementById(`timeout`)?.addEventListener(`input`,e=>{N(Number(e.target.value))}),w.querySelectorAll(`.chip[data-timeout]`).forEach(e=>{e.addEventListener(`click`,()=>{N(Number(e.dataset.timeout),{autoStart:!0})})}),document.getElementById(`sensitivity`)?.addEventListener(`input`,e=>{g=Number(e.target.value)/100,d.setSensitivity(g);let t=Math.round(g*100),n=document.getElementById(`sensitivity-label`);n&&(n.textContent=`${t}%`);let r=document.getElementById(`speech-threshold`);r&&(r.textContent=`判定线 ${t}%`);let i=document.getElementById(`level-threshold`);i&&(i.style.left=`${t}%`)}),document.getElementById(`sound`)?.addEventListener(`change`,e=>{_=e.target.checked,f.setSoundEnabled(_);let t=w.querySelector(`.sound-picker`),n=document.getElementById(`preview-sound`);t?.classList.toggle(`is-disabled`,!_),w.querySelectorAll(`.chip[data-sound]`).forEach(e=>{e.disabled=!_}),n&&(n.disabled=!_)}),w.querySelectorAll(`.chip[data-sound]`).forEach(e=>{e.addEventListener(`click`,()=>{v=e.dataset.sound,f.setSound(v),w.querySelectorAll(`.chip[data-sound]`).forEach(e=>{e.classList.toggle(`is-active`,e.dataset.sound===v)});let n=document.getElementById(`sound-hint`),r=t.find(e=>e.id===v);n&&r&&(n.textContent=r.hint),f.preview(v)})}),document.getElementById(`preview-sound`)?.addEventListener(`click`,()=>{f.preview(v)}),document.getElementById(`toggle`)?.addEventListener(`click`,()=>{p===`monitoring`||p===`alerting`?I():F()}),document.getElementById(`ack`)?.addEventListener(`click`,()=>{L()})}async function F(){S=``;let e=document.getElementById(`toggle`);e&&(e.disabled=!0,e.textContent=`加载模型中…`);try{await d.start({sensitivity:g,onFrameProcessed:({isSpeech:e,smoothed:t})=>{C=e,w.dataset.level=String(t);let n=w.querySelector(`.level-fill`);n&&(n.style.transform=`scaleX(${Math.min(1,t)})`);let r=document.getElementById(`speech-prob`);r&&(r.innerHTML=`人声概率 <strong>${Math.round(e*100)}%</strong>`)},onSpeechChange:e=>{b=e;let t=w.querySelector(`.beacon`);t&&(t.setAttribute(`data-speaking`,String(b)),t.classList.toggle(`is-voice`,b&&p===`monitoring`),t.classList.toggle(`is-listen`,!b&&p===`monitoring`));let n=w.querySelector(`.beacon-label`);n&&p===`monitoring`&&(n.textContent=b?`检测到人声`:`等待人声`),p===`alerting`&&e&&L(),p===`monitoring`&&(y=e?null:performance.now())}}),p=`monitoring`,b=!1,y=performance.now(),f.setSoundEnabled(_),f.setSound(v),E(),R()}catch(e){p=`error`;let t=e instanceof Error?e.message:String(e);S=e instanceof DOMException&&e.name===`NotAllowedError`?`麦克风权限被拒绝，请在浏览器设置中允许后重试`:/microphone|getUserMedia|NotFound|NotReadable/i.test(t)?`无法访问麦克风，请确认设备可用且页面通过 localhost 或 HTTPS 打开`:`人声模型加载失败：${t||`请刷新页面重试`}`,E()}}async function I(){cancelAnimationFrame(x),x=0,f.stop(document.documentElement),await d.stop(),p=`ready`,b=!1,y=null,C=0,S=``,E()}function L(){f.stop(document.documentElement),p===`alerting`&&(p=`monitoring`,y=b?null:performance.now(),E(),R())}function R(){cancelAnimationFrame(x);let e=()=>{if(p!==`monitoring`&&p!==`alerting`)return;let t=w.querySelector(`.countdown`),n=w.querySelector(`.status-line`);if(p===`monitoring`&&!b&&y!==null){let e=h-(performance.now()-y)/1e3,r=Math.max(0,Math.ceil(e));if(t&&(t.textContent=String(r)),n&&(n.textContent=e>0?`距告警还剩 ${r} 秒`:`触发告警`),e<=0){p=`alerting`,f.start(document.documentElement),E();return}}else p===`monitoring`&&b&&(t&&(t.textContent=`—`),n&&(n.textContent=`正在说话 · 计时器已重置`));x=requestAnimationFrame(e)};x=requestAnimationFrame(e)}E(),window.addEventListener(`beforeunload`,()=>{d.stop(),f.dispose()});