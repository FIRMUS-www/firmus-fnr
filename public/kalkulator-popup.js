/*
 * FirmaNaRyczałcie — kalkulator wyceny (pop-up)
 * Samowystarczalny. Wgraj jako /kalkulator-popup.js i dodaj w index.html:
 *   <script src="/kalkulator-popup.js"></script>
 * przed </body>.
 * Automatycznie podłącza przycisk "▸ ZRÓBMY SZYBKĄ WYCENĘ" na stronie.
 * Nic nie nadpisuje — tylko dokłada okno pop-up.
 */
(function(){
  if (window.__fnrPopupLoaded) return;
  window.__fnrPopupLoaded = true;

  var PRICES = { prepaid:{m:[55,75,85,95,105], vat:20, annual:true},
                 abo:{m:[95,115,135,155,175], vat:30, annual:false} };
  var IDX = {0:0,20:1,30:2,40:3,50:4};
  var docsLabel = function(d){ return d===0?'0–10':(d===20?'11–20':d===30?'21–30':d===40?'31–40':d===50?'41–50':'50+'); };
  var fmt = function(n){ return new Intl.NumberFormat('pl-PL',{maximumFractionDigits:0}).format(n); };

  if (!window.Intl || !Intl.NumberFormat){ fmt = function(n){ return String(n); }; }

  // 1) style (te same co FNR)
  var css = ''
    + ':root{--cream:#EDE7D9;--cream-dark:#e2dacc;--paper:#F6F2E8;--ink:#0a0a0a;'
    + '--lime:#D8FF3D;--orange:#FF5C28;'
    + '--fdisp:"Archivo Black","Arial Black",sans-serif;'
    + '--fsans:"Space Grotesk",system-ui,Arial,sans-serif;'
    + '--fmono:"JetBrains Mono",ui-monospace,Consolas,monospace;}'
    + '#fnrOv{position:fixed;inset:0;background:rgba(10,10,10,.45);display:none;align-items:center;justify-content:center;z-index:99990;padding:18px;}'
    + '#fnrOv.open{display:flex;}'
    + '#fnrOv *{box-sizing:border-box;}'
    + '#fnrFrame{background:var(--cream);border:2px solid var(--ink);'
    + 'width:min(680px,100%);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;font-family:var(--fsans);color:var(--ink);'
    + 'box-shadow:12px 12px 0 var(--lime);}'
    + '#fnrFrame .bar{background:var(--ink);color:var(--cream);display:flex;align-items:center;justify-content:space-between;padding:14px 20px;}'
    + '#fnrFrame .bar .t{font-family:var(--fmono);font-size:12px;text-transform:uppercase;letter-spacing:.14em;}'
    + '#fnrClose{background:none;border:none;color:var(--cream);font-family:var(--fdisp);font-size:30px;line-height:1;cursor:pointer;padding:0 2px;}'
    + '#fnrClose:hover{color:var(--orange);}'
    + '#fnrBody{padding:24px 22px 30px;overflow-y:auto;}'
    + '#fnrBody .q{font-family:var(--fmono);font-size:12px;text-transform:uppercase;letter-spacing:.12em;margin:0 0 12px;}'
    + '#fnrBody .sub{font-family:var(--fmono);font-size:11px;color:rgba(10,10,10,.5);margin:-6px 0 16px;}'
    + '#fnrPills{display:flex;flex-wrap:wrap;gap:8px;}'
    + '#fnrPills .pill{font-family:var(--fmono);font-size:12px;padding:9px 12px;border:2px solid rgba(10,10,10,.3);'
    + 'background:transparent;color:var(--ink);cursor:pointer;transition:border-color .12s;}'
    + '#fnrPills .pill:hover{border-color:var(--ink);}'
    + '#fnrPills .pill.sel{background:var(--ink);color:var(--lime);border-color:var(--ink);}'
    + '#fnrCheck{display:flex;align-items:flex-start;gap:12px;border-top:2px solid rgba(10,10,10,.2);padding-top:20px;margin-top:22px;cursor:pointer;}'
    + '#fnrCheck input{width:20px;height:20px;margin:2px 0 0;accent-color:var(--ink);cursor:pointer;}'
    + '#fnrCheck .lbl{font-family:var(--fmono);font-size:12px;text-transform:uppercase;letter-spacing:.12em;display:block;}'
    + '#fnrCheck .h{display:block;margin-top:4px;font-family:var(--fmono);font-size:10px;color:rgba(10,10,10,.5);}'
    + '#fnrRes{margin-top:26px;border-top:2px solid var(--ink);padding-top:24px;}'
    + '#fnrRes .rq{font-family:var(--fmono);font-size:12px;text-transform:uppercase;letter-spacing:.14em;margin:0 0 14px;}'
    + '#fnrVars{display:grid;grid-template-columns:1fr 1fr;gap:16px;}'
    + '#fnrVars .var{background:var(--paper);border:2px solid var(--ink);display:flex;flex-direction:column;}'
    + '#fnrVars .var .hd{padding:16px 18px;border-bottom:2px solid var(--ink);}'
    + '#fnrVars .var .hd .eb{font-family:var(--fmono);font-size:10px;text-transform:uppercase;letter-spacing:.14em;}'
    + '#fnrVars .var .hd h4{font-family:var(--fdisp);text-transform:uppercase;font-size:24px;margin:8px 0 0;line-height:1;}'
    + '#fnrVars .var .hd.lime{background:var(--lime);}'
    + '#fnrVars .var .hd.orange{background:var(--orange);}'
    + '#fnrVars .var .bd{padding:18px;}'
    + '#fnrVars .var .pr{font-family:var(--fdisp);font-size:40px;line-height:1;}'
    + '#fnrVars .var .pr small{font-size:13px;font-family:var(--fmono);font-weight:400;color:rgba(10,10,10,.55);}'
    + '#fnrVars .var .ex{font-family:var(--fmono);font-size:11px;color:rgba(10,10,10,.6);margin-top:6px;}'
    + '#fnrVars .var .nt{font-size:13px;margin-top:10px;}'
    + '#fnrBadge{display:inline-block;font-family:var(--fmono);font-size:10px;font-weight:700;letter-spacing:.1em;'
    + 'text-transform:uppercase;background:var(--ink);color:var(--lime);padding:3px 7px;margin-bottom:8px;}'
    + '#fnrCont{border:2px dashed var(--ink);padding:22px;text-align:center;background:var(--paper);}'
    + '#fnrCont .n{font-family:var(--fdisp);font-size:30px;letter-spacing:-.01em;margin-top:8px;}'
    + '#fnrCont .n a{color:var(--ink);text-decoration:none;}'
    + '#fnrEmpty{border:2px dashed rgba(10,10,10,.25);padding:22px;text-align:center;font-family:var(--fmono);'
    + 'font-size:12px;color:rgba(10,10,10,.5);}'
    + '#fnrFoot{margin-top:20px;border-top:2px solid var(--ink);padding-top:22px;}'
    + '#fnrFoot h3{font-family:var(--fdisp);font-size:24px;line-height:1;text-transform:uppercase;margin:0 0 8px;}'
    + '#fnrFoot .lead{font-size:14px;margin:0 0 16px;}'
    + '#fnrConsentLabel{display:flex;align-items:flex-start;gap:10px;margin:0 0 16px;font-size:11px;line-height:1.45;color:rgba(10,10,10,.7);cursor:pointer;}'
    + '#fnrConsentLabel input{width:18px;height:18px;min-width:18px;margin:1px 0 0;accent-color:var(--ink);cursor:pointer;}'
    + '#fnrConsentLabel a{color:var(--ink);font-weight:700;text-decoration:underline;text-underline-offset:2px;}'
    + '#fnrPhoneForm,#fnrEmailForm{margin:0;}'
    + '#fnrLeadFields{display:grid;grid-template-columns:1.35fr 1fr;gap:10px;margin-bottom:10px;}'
    + '#fnrFoot input[type="tel"],#fnrFoot input[type="text"],#fnrFoot input[type="email"]{width:100%;border:2px solid var(--ink);background:var(--paper);'
    + 'color:var(--ink);padding:13px 14px;font-family:var(--fsans);font-size:14px;border-radius:0;}'
    + '#fnrFoot input::placeholder{color:rgba(10,10,10,.5);}'
    + '#fnrGo{background:var(--lime);color:var(--ink);border:2px solid var(--ink);cursor:pointer;'
    + 'font-family:var(--fmono);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;'
    + 'padding:14px 20px;transition:background .15s,color .15s;}'
    + '#fnrGo:hover{background:var(--ink);color:var(--lime);}'
    + '#fnrEmailToggle{display:flex;align-items:center;gap:10px;margin-top:16px;font-family:var(--fmono);font-size:11px;cursor:pointer;}'
    + '#fnrEmailToggle input{width:18px;height:18px;margin:0;accent-color:var(--ink);}'
    + '#fnrEmailForm{display:none;margin-top:12px;grid-template-columns:1fr auto;gap:10px;}'
    + '#fnrEmailForm.open{display:grid;}'
    + '#fnrEmailGo{background:var(--ink);color:var(--cream);border:2px solid var(--ink);cursor:pointer;white-space:nowrap;'
    + 'font-family:var(--fmono);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:14px 20px;}'
    + '#fnrEmailGo:hover{background:var(--lime);color:var(--ink);}'
    + '@media(max-width:640px){#fnrVars{grid-template-columns:1fr;}#fnrLeadFields,#fnrEmailForm.open{grid-template-columns:1fr;}#fnrGo,#fnrEmailGo{width:100%;}}';

  // 2) markup pop-upu
  var html = ''
    + '<div id="fnrOv" role="dialog" aria-modal="true">'
    + '  <div id="fnrFrame">'
    + '    <div class="bar"><span class="t">SZYBKA WYCENA · 2 MINUTY</span><button id="fnrClose" aria-label="Zamknij">×</button></div>'
    + '    <div id="fnrBody">'
    + '      <p class="q">Ile dokumentów miesięcznie?</p>'
    + '      <p class="sub">Wybierz najbliższy przedział.</p>'
    + '      <div id="fnrPills">'
    + '        <button class="pill" data-docs="0">0–10</button>'
    + '        <button class="pill" data-docs="20">11–20</button>'
    + '        <button class="pill" data-docs="30">21–30</button>'
    + '        <button class="pill" data-docs="40">31–40</button>'
    + '        <button class="pill" data-docs="50">41–50</button>'
    + '        <button class="pill" data-docs="51">50+</button>'
    + '      </div>'
    + '      <label id="fnrCheck"><input type="checkbox" id="fnrVat">'
    + '        <span><span class="lbl">Jestem na VAT</span></span>'
    + '      </label>'
    + '      <div id="fnrRes"><p class="rq">Koszt na miesiąc</p><div id="fnrVR"></div></div>'
    + '      <div id="fnrFoot">'
    + '        <h3>Chcesz taką księgowość?</h3>'
    + '        <p class="lead">Zostaw numer. Resztę ogarniemy razem.</p>'
    + '        <label id="fnrConsentLabel"><input type="checkbox" id="fnrConsent">'
    + '          <span>Wyrażam zgodę na wykorzystanie podanych danych do kontaktu w sprawie wyceny oraz akceptuję <a href="/polityka" target="_blank" rel="noopener">politykę prywatności</a> i <a href="/regulamin" target="_blank" rel="noopener">regulamin</a>.</span></label>'
    + '        <form id="fnrPhoneForm">'
    + '          <div id="fnrLeadFields"><input type="tel" id="fnrPhone" name="phone" placeholder="Telefon" aria-label="Telefon" required>'
    + '          <input type="text" id="fnrName" name="name" placeholder="Imię" aria-label="Imię" required></div>'
    + '          <button id="fnrGo" type="submit">Oddzwoń do mnie →</button>'
    + '        </form>'
    + '        <label id="fnrEmailToggle"><input type="checkbox" id="fnrEmailMode"> Wolisz e-mail?</label>'
    + '        <form id="fnrEmailForm"><input type="email" id="fnrEmail" name="email" placeholder="Twój e-mail" aria-label="Twój e-mail">'
    + '          <button id="fnrEmailGo" type="submit">Napisz do mnie →</button></form>'
    + '      </div>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var host = document.createElement('div');
  host.innerHTML = html;
  // przenieś node'y do body (żeby działały selectory)
  var frag = document.createDocumentFragment();
  while(host.firstChild) frag.appendChild(host.firstChild);
  document.body.appendChild(frag);

  var ov = document.getElementById('fnrOv');
  var resEl = document.getElementById('fnrVR');
  var docSel = null, isVat = false;

  function monthly(base, vat){ return base + (isVat ? vat : 0); }

  function render(){
    if(docSel===null){ resEl.innerHTML = '<div id="fnrEmpty">Wybierz liczbę dokumentów, żeby zobaczyć koszt na miesiąc.</div>'; return; }
    if(docSel===51){
      resEl.innerHTML = '<div id="fnrCont"><div style="font-family:var(--fmono);font-size:12px;color:rgba(10,10,10,.6);">Ponad 50 dokumentów miesięcznie</div>'
        + '<div class="n"><a href="tel:+48727791155">+48 727 791 155</a></div>'
        + '<div style="font-family:var(--fmono);font-size:11px;color:rgba(10,10,10,.6);margin-top:6px;">Takie firmy wyceniam indywidualnie — zadzwoń, policzymy razem.</div></div>';
      return;
    }
    var i = IDX[docSel];
    var preM = monthly(PRICES.prepaid.m[i], PRICES.prepaid.vat);
    var aboM = monthly(PRICES.abo.m[i], PRICES.abo.vat);
    var preY = preM*12;
    var vatTxt = isVat ? '(cena z VAT)' : '(bez VAT)';
    resEl.innerHTML = '<div id="fnrVars">'
      + '<div class="var"><div class="hd lime"><span class="eb">Z góry za rok</span><h4>Pre-Paid</h4></div>'
      + '<div class="bd"><span id="fnrBadge">Najlepsza cena</span>'
      + '<div class="bd"><div class="pr">'+fmt(preM)+' zł <small>/ mies.</small></div></div>'
      + '<div class="ex">Za rok, z góry: <b>'+fmt(preY)+' zł</b></div>'
      + '<p class="nt">Płacisz znacznie mniej. Płacisz raz i masz spokój na rok.</p></div></div>'
      + '<div class="var"><div class="hd orange"><span class="eb">Co miesiąc</span><h4>Abonament</h4></div>'
      + '<div class="bd"><span id="fnrBadge">Elastyczny</span>'
      + '<div class="bd"><div class="pr">'+fmt(aboM)+' zł <small>/ mies.</small></div></div>'
      + '<div class="ex">Bez umowy długoterminowej</div>'
      + '<p class="nt">Nie chcesz obsługi? Nie płacisz kolejnego miesiąca.</p></div></div>'
      + '</div>';
  }

  function open(){
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
  }
  function close(){
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('fnrClose').addEventListener('click', close);
  document.querySelectorAll('#fnrPills .pill').forEach(function(p){
    p.addEventListener('click', function(){
      document.querySelectorAll('#fnrPills .pill').forEach(function(x){ x.classList.remove('sel'); });
      p.classList.add('sel');
      docSel = Number(p.getAttribute('data-docs'));
      render();
    });
  });
  document.getElementById('fnrVat').addEventListener('change', function(){ isVat = this.checked; render(); });

  function quoteSummary(){
    if(docSel===null || docSel===51) return 'Wycena indywidualna';
    var i = IDX[docSel];
    return 'Dokumenty: '+docsLabel(docSel)+', VAT: '+(isVat?'tak':'nie')+', Pre-Paid: '
      +(PRICES.prepaid.m[i]+(isVat?PRICES.prepaid.vat:0))+' zł/mies., Abonament: '
      +(PRICES.abo.m[i]+(isVat?PRICES.abo.vat:0))+' zł/mies.';
  }

  function hasConsent(){
    var consent = document.getElementById('fnrConsent');
    if(consent.checked) return true;
    alert('Zaznacz zgodę na kontakt i akceptację dokumentów.');
    consent.focus();
    return false;
  }

  document.getElementById('fnrPhoneForm').addEventListener('submit', function(e){
    e.preventDefault();
    if(!hasConsent()) return;
    var phone = document.getElementById('fnrPhone').value.trim();
    var name = document.getElementById('fnrName').value.trim();
    var subject = encodeURIComponent('Prośba o kontakt telefoniczny — wycena księgowości');
    var body = encodeURIComponent('Imię: '+name+'\nTelefon: '+phone+'\n'+quoteSummary());
    window.location.href = 'mailto:czesc@firmanaryczalcie.pl?subject='+subject+'&body='+body;
  });

  document.getElementById('fnrEmailMode').addEventListener('change', function(){
    var form = document.getElementById('fnrEmailForm');
    var email = document.getElementById('fnrEmail');
    form.classList.toggle('open', this.checked);
    email.required = this.checked;
    if(this.checked) email.focus();
  });

  document.getElementById('fnrEmailForm').addEventListener('submit', function(e){
    e.preventDefault();
    if(!hasConsent()) return;
    var email = document.getElementById('fnrEmail').value.trim();
    var subject = encodeURIComponent('Kontakt e-mail — wycena księgowości');
    var body = encodeURIComponent('Mój e-mail: '+email+'\n'+quoteSummary());
    window.location.href = 'mailto:czesc@firmanaryczalcie.pl?subject='+subject+'&body='+body;
  });

  ov.addEventListener('click', function(e){ if(e.target === ov) close(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });

  // 3) Otwarcie kalkulatora przez JEDNOZNACZNĄ kotwicę #wycena.
  //    Przycisk "▸ ZRÓBMY SZYBKĄ WYCENĘ" ma teraz href="#wycena";
  //    przechwytujemy klik w dowolny element a[href="#wycena"] i otwieramy popup.
  //    Żadne dopasowanie po tekście — czyste, przewidywalne.
  //    Przyciski #kontakt (np. "Zarejestruj firmę za 0 zł") NIE są ruszane.
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href="#wycena"]') : null;
    if(a){
      e.preventDefault();
      open();
    }
  }, true);

  // 4) komunikat w konsoli dla pewności, że skrypt się załadował (nie blokuje strony)
  if(window.console && console.debug){ console.debug('[FNR] kalkulator wyceny: załadowano (kotwica #wycena)'); }
})();
