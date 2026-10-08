// Node.js smoke tests for the assessment prototype's standalone business logic.
// These are code-level checks, NOT a substitute for browser screenshots or stakeholder validation.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('script.js','utf8');
const storage=new Map();
const elements=new Map();
class Elem{
 constructor(){this.value='';this.textContent='';this.className='';this.dataset={};this.children=[];this.disabled=false;this.valid=true;this.style={};this.classList={add(){},remove(){},toggle(){}}}
 append(...nodes){this.children.push(...nodes)}
 replaceChildren(){this.children=[]}
 addEventListener(){}
 checkValidity(){return this.valid}
 reset(){}
 close(){}
 showModal(){}
}
const document={
 getElementById(id){if(!elements.has(id))elements.set(id,new Elem());return elements.get(id)},
 querySelectorAll(){return []},
 createElement(){return new Elem()}
};
const context={document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},Intl,Date,Number,Math,JSON,String,Array,console,confirm:()=>true};
vm.createContext(context);
vm.runInContext(source+'\n;globalThis.__api={getCustomer,addCustomer,purchase,redeem,seed,tier};globalThis.__state=()=>state;',context);
const api=context.__api,field=id=>document.getElementById(id);
function verify(name,callback){callback();console.log('PASS '+name)}
verify('R1: register customer and reject duplicate email',()=>{
 field('new-name').value='Test Reader';field('new-email').value='reader@example.test';field('new-phone').value='';
 api.addCustomer({preventDefault(){}});
 assert.equal(context.__state().customers.length,3);
 api.addCustomer({preventDefault(){}});
 assert.equal(context.__state().customers.length,3);
});
verify('R2: automatic points on AUD 25.90 purchase',()=>{
 field('purchase-customer').value='NS003';field('purchase-book').value='Test Book';field('purchase-amount').value='25.90';
 api.purchase({preventDefault(){}});
 assert.equal(api.getCustomer('NS003').points,25);
 assert.equal(context.__state().purchases[0].amountCents,2590);
});
verify('R3: enforce insufficient points and deduct exact cost',()=>{
 const c=api.getCustomer('NS003'),start=context.__state().redemptions.length;
 api.redeem('NS003','voucher5');
 assert.equal(c.points,25);
 assert.equal(context.__state().redemptions.length,start);
 field('purchase-amount').value='500.00';api.purchase({preventDefault(){}});
 assert.equal(c.points,525);
 api.redeem('NS003','voucher5');
 assert.equal(c.points,25);
 assert.equal(context.__state().redemptions.length,start+1);
});
verify('R4: transaction and redemption events recorded',()=>{
 assert.equal(context.__state().purchases.length,2);
 assert.equal(context.__state().redemptions.length,1);
 assert.ok(context.__state().events.some(x=>x.type==='purchase'));
 assert.ok(context.__state().events.some(x=>x.type==='redemption'));
});
verify('R5: serialized demo state stored after actions',()=>{
 const saved=JSON.parse(storage.get('northstar-ict923-demo-v2'));
 assert.equal(saved.customers.length,3);
 assert.equal(saved.purchases.length,2);
 assert.equal(saved.redemptions.length,1);
});
console.log('5 of 5 code-level smoke tests passed. Browser reload and visual tests remain to be done.');
