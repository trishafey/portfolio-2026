/* ============================================================
   Simple client-side password gate.
   NOTE: Not real security — anyone can read this file. It only
   discourages casual access to in-progress / confidential case
   studies.
   ============================================================ */
(function () {
  var PASSWORD = 'trishafey';
  var STORAGE_KEY = 'tf_gate_unlocked';

  if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '.tf-gate{position:fixed;inset:0;z-index:9999;background:#fafafa;',
    'display:flex;align-items:center;justify-content:center;',
    'font-family:"Inter Tight",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;',
    'color:#111;padding:24px;}',
    '.tf-gate__card{width:100%;max-width:440px;display:flex;flex-direction:column;gap:18px;text-align:center;}',
    '.tf-gate__eyebrow{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;',
    'font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#6b6b6b;}',
    '.tf-gate__title{font-size:clamp(34px,5vw,52px);line-height:1.02;letter-spacing:-0.03em;',
    'font-weight:300;margin:0;}',
    '.tf-gate__title em{font-family:"Newsreader",Georgia,serif;font-style:italic;font-weight:300;color:#F26B5C;}',
    '.tf-gate__copy{color:#5a5a5a;font-size:15px;line-height:1.55;max-width:36ch;margin:4px auto 8px;}',
    '.tf-gate__form{display:flex;gap:8px;width:100%;margin-top:6px;}',
    '.tf-gate__input{flex:1;min-width:0;padding:14px 16px;border-radius:999px;',
    'border:1px solid #d8d8d8;background:#fff;font:inherit;font-size:15px;color:#111;outline:none;',
    'transition:border-color .15s,box-shadow .15s;}',
    '.tf-gate__input:focus{border-color:#111;box-shadow:0 0 0 3px rgba(17,17,17,0.08);}',
    '.tf-gate--error .tf-gate__input{border-color:#F26B5C;box-shadow:0 0 0 3px rgba(242,107,92,0.12);}',
    '.tf-gate__btn{padding:14px 22px;border-radius:999px;border:1px solid #111;background:#111;',
    'color:#fff;font:inherit;font-size:15px;font-weight:500;cursor:pointer;',
    'transition:transform .15s,background .15s,border-color .15s;}',
    '.tf-gate__btn:hover{transform:translateY(-1px);background:#F26B5C;border-color:#F26B5C;}',
    '.tf-gate__error{font-size:13px;color:#F26B5C;min-height:18px;margin-top:2px;',
    'opacity:0;transition:opacity .15s;}',
    '.tf-gate--error .tf-gate__error{opacity:1;}',
    '.tf-gate__back{display:inline-block;margin-top:10px;color:#6b6b6b;font-size:13px;',
    'text-decoration:none;border-bottom:1px solid transparent;transition:color .15s,border-color .15s;}',
    '.tf-gate__back:hover{color:#111;border-color:#111;}',
    'html.tf-gate-open,body.tf-gate-open{overflow:hidden;}'
  ].join('');
  document.head.appendChild(style);

  // Build DOM
  var gate = document.createElement('div');
  gate.className = 'tf-gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-modal', 'true');
  gate.setAttribute('aria-labelledby', 'tf-gate-title');
  gate.innerHTML = [
    '<div class="tf-gate__card">',
    '  <span class="tf-gate__eyebrow">Protected case study</span>',
    '  <h1 class="tf-gate__title" id="tf-gate-title">Enter <em>password</em></h1>',
    '  <p class="tf-gate__copy">This case study contains confidential work. Please enter the password to continue.</p>',
    '  <form class="tf-gate__form" autocomplete="off" novalidate>',
    '    <input class="tf-gate__input" type="password" name="password" placeholder="Password" aria-label="Password" autofocus />',
    '    <button class="tf-gate__btn" type="submit">Enter</button>',
    '  </form>',
    '  <div class="tf-gate__error" role="alert">Incorrect password — try again.</div>',
    '  <a class="tf-gate__back" href="work.html">← Back to work</a>',
    '</div>'
  ].join('');

  function mount() {
    document.documentElement.classList.add('tf-gate-open');
    document.body.classList.add('tf-gate-open');
    document.body.appendChild(gate);

    var form = gate.querySelector('.tf-gate__form');
    var input = gate.querySelector('.tf-gate__input');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, '1');
        document.documentElement.classList.remove('tf-gate-open');
        document.body.classList.remove('tf-gate-open');
        gate.remove();
      } else {
        gate.classList.add('tf-gate--error');
        input.select();
      }
    });

    input.addEventListener('input', function () {
      gate.classList.remove('tf-gate--error');
    });
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
