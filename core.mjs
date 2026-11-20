export function normalize(s) { return String(s).normalize('NFKC').toLocaleLowerCase('tr').replace(/\s+/gu,' ').trim(); }
export function tokens(s) { return new Set(normalize(s).match(/[\p{L}\p{N}]+/gu) || []); }
export function similarity(a,b) { const x=tokens(a), y=tokens(b), union=new Set([...x,...y]); return union.size ? [...x].filter(t=>y.has(t)).length/union.size : 1; }
export function evaluate(input) {
 if (!input || typeof input.baseline !== 'string' || !Array.isArray(input.variants) || !Array.isArray(input.rules)) throw new TypeError('Invalid experiment');
 if (!input.baseline.trim() || !input.variants.length) throw new Error('Add a baseline and at least one variant');
 const rules=input.rules.map(r=>{if (!r || !['contains','forbids','exact'].includes(r.type) || typeof r.value!=='string' || !r.value.trim()) throw new Error('Invalid rule');return r;});
 const inspect=(answer)=>rules.map(r=>{const a=normalize(answer),v=normalize(r.value);return {...r,pass:r.type==='contains'?a.includes(v):r.type==='forbids'?!a.includes(v):a===v};});
 const baselineChecks=inspect(input.baseline);
 return {baselineChecks, variants:input.variants.map(v=>{if(!v || typeof v.label!=='string'|| typeof v.answer!=='string'||!v.answer.trim()) throw new Error('Invalid variant'); const checks=inspect(v.answer);return {label:v.label, similarity:similarity(input.baseline,v.answer), checks, regressions:checks.filter((r,i)=>!r.pass&&baselineChecks[i].pass).length, failures:checks.filter(r=>!r.pass).length};})};
}
